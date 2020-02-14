Vue.component('r-autocomplete', {
    extends : crud.components.renders.rBase,
    template: '#r-autocomplete-template',
    mounted : function() {
        this._getLabel();
    },
    data : function() {
        var that = this;
        var d = this.defaultData();
        if (!( 'resources' in d.conf) ) {
            d.conf.resources = [
                'https://cdnjs.cloudflare.com/ajax/libs/jquery-autocomplete/1.0.7/jquery.auto-complete.min.css',
                'https://cdnjs.cloudflare.com/ajax/libs/jquery-autocomplete/1.0.7/jquery.auto-complete.min.js'
//                'autocomplete-typeahead-bootstrap/dist/latest/bootstrap-autocomplete.js'
            ];
        }
        d.label = '';
        d.suggestValues = {};
        return d;
    },
    methods : {
        afterLoadResources : function () {
            var that = this;
            jQuery(that.$el).find('[c-autocomplete]').autoComplete({
                source : function(term,suggest) {
                    jQuery.getJSON(that._createUrl(),{term:term},function (json) {
                        var suggestions = [];
                        //that.suggestValues = {};
                        for (var i in json.result) {
                            // var s = "";
                            // for (var k in that.metadata.fields) {
                            //     s += (s?' ':'') + json.result[i][that.metadata.fields[k]];
                            // }
                            var s = that._getSuggestion(json.result[i]);
                            suggestions.push(s);
                            that.suggestValues[s] = json.result[i]['id'];
                        }
                        return suggest(suggestions)
                    })
                },
                onSelect: function(e, term, item){
                    console.log(term,that.suggestValues,'selected',that.suggestValues[term],'item',item);
                    that.value = that.suggestValues[term];
                    that.label = term;
                    that.change();
                }
            });
        },
        _createUrl : function () {
            var that = this;
            var r = Route.factory(that.conf.routeName,{values : {modelName:that.conf.model} });

            //var url = that.url?that.url:"/api/json/autocomplete/" + that.metadata.autocompleteModel + "?";
            var url = that.url?that.url:r.getUrl();
            url+= '?';

            if (that.conf.fields) {
                for(var f in that.conf.fields) {
                    url+="field[]="+that.conf.fields[f]+"&";
                }
            }
            /* @TODO se metto la description diventa difficile cambiare la
             if (that.model_description) {
             for(var f in that.model_description) {
             url+="description[]="+that.model_description[f]+"&";
             }
             }
             */
            url += that.conf.separator ? '&separator=' + that.conf.separator : '';
            url += that.conf.n_items ? '&n_items=' + that.conf.n_items : '';
            url += that.conf.method ? '&method=' + that.conf.method: '';
            return url;
        },

        clear : function () {
            var that = this;
            that.value = '';
            that.label = '';
            that.suggestValues = {};
            jQuery(that.$el).find('[c-autocomplete]').val('');
        },
        _getLabel : function () {

            var that = this;
            var r = new Route(that.$crud.routes.view);
            r.values.modelName = that.conf.model;
            r.values.pk = that.value;
            var lb = '';
            Server.route(r,function (json) {
                if (json.error) {
                    that.label = json.msg;
                    return ;
                }
                that.label = that._getSuggestion(json.result);
            })
        },
        _getSuggestion: function(rowData) {
            var that = this;
            var s = "";
            for (var k in that.conf.fields) {
                s += (s?' ':'') + rowData[that.conf.fields[k]];
            }
            return s
        }
    }

});