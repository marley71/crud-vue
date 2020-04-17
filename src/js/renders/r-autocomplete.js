crud.components.renders.rAutocomplete = Vue.component('r-autocomplete', {
    extends : crud.components.renders.rBase,
    mounted : function() {
        //this._getLabel();
    },
    data : function() {
        var that = this;
        var d = this._loadConf();
        if (!( 'resources' in d.conf) ) {
            d.conf.resources = [
                'https://cdnjs.cloudflare.com/ajax/libs/jquery-autocomplete/1.0.7/jquery.auto-complete.min.css',
                'https://cdnjs.cloudflare.com/ajax/libs/jquery-autocomplete/1.0.7/jquery.auto-complete.min.js'
//                'autocomplete-typeahead-bootstrap/dist/latest/bootstrap-autocomplete.js'
            ];
        }
        if (!('routeName' in d))
            d.routeName = 'autocomplete';
        if (!('primaryKey' in d))
            d.primaryKey = 'id';
        d.label = '';
        d.suggestValues = {};
        console.log('CONFF',d);
        return d;
    },
    methods : {
        afterLoadResources : function () {
            var that = this;
            jQuery(that.$el).find('[c-autocomplete]').autoComplete({
                source : function(term,suggest) {
                    var r = that._getRoute(that.conf.routeName);
                    that.setRouteValues(r,term);
                    Server.route(r,function (json) {
                        var suggestions = [];
                        if (json.error) {
                            that.$crud.errorDialog(json.msg);
                            return suggest(suggestions)
                        }
                        //that.suggestValues = {};
                        for (var i in json.result) {
                            // var s = "";
                            // for (var k in that.metadata.fields) {
                            //     s += (s?' ':'') + json.result[i][that.metadata.fields[k]];
                            // }
                            var s = that._getSuggestion(json.result[i]);
                            suggestions.push(s);
                            that.suggestValues[s] = json.result[i][that.primaryKey];
                        }
                        return suggest(suggestions)
                    })
                    // jQuery.getJSON(that._createUrl(),{term:term},function (json) {
                    //     var suggestions = [];
                    //     //that.suggestValues = {};
                    //     for (var i in json.result) {
                    //         // var s = "";
                    //         // for (var k in that.metadata.fields) {
                    //         //     s += (s?' ':'') + json.result[i][that.metadata.fields[k]];
                    //         // }
                    //         var s = that._getSuggestion(json.result[i]);
                    //         suggestions.push(s);
                    //         that.suggestValues[s] = json.result[i]['id'];
                    //     }
                    //     return suggest(suggestions)
                    // })
                },
                onSelect: function(e, term, item){
                    console.log(term,that.suggestValues,'selected',that.suggestValues[term],'item',item);
                    that.value = that.suggestValues[term];
                    that.label = term;
                    that.change();
                }
            });
            that._getLabel();
        },
        setRouteValues : function (route,term) {
            var that = this;
            //var r = that.$crud.createRoute(that.conf.routeName);
            route.setValues({modelName:that.conf.modelName});
            //var r = new Route(routeConf);

            //var url = that.url?that.url:"/api/json/autocomplete/" + that.metadata.autocompleteModel + "?";
            var url = that.url?that.url:route.getUrl();
            url+= '?term='+term+'&';

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
            route.setUrl(url);
            return route;
            //return url;
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

            if (that.modelData) {
                that.label = that._getSuggestion(that.modelData);
            }

            // var r = new Route(that.$crud.routes.view);
            // console.log('r-autocomplete getLabel',that.conf);
            // r.setValues({
            //     modelName : that.conf.modelName,
            //     pk : that.value
            // });
            // // r.values.modelName = that.conf.model;
            // // r.values.pk = that.value;
            // var lb = '';
            // Server.route(r,function (json) {
            //     if (json.error) {
            //         that.label = json.msg;
            //         return ;
            //     }
            //     that.label = that._getSuggestion(json.result);
            // })
        },
        _getSuggestion: function(rowData) {
            var that = this;
            var s = "";
            for (var k in that.conf.fields) {
                s += (s?' ':'') + rowData[that.conf.fields[k]];
            }
            return s
        }
    },
    template: "#r-autocomplete-template",
});
