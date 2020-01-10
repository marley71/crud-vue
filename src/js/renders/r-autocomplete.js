Vue.component('r-autocomplete', {
    extends : crud.components.renders.rBase,
    template: '#r-autocomplete-template',
    data : function() {
        var d = this.defaultData();
        if (!( 'resources' in d.conf) ) {
            d.conf.resources = [
                'https://cdnjs.cloudflare.com/ajax/libs/jquery-autocomplete/1.0.7/jquery.auto-complete.min.css',
                'https://cdnjs.cloudflare.com/ajax/libs/jquery-autocomplete/1.0.7/jquery.auto-complete.min.js'
//                'autocomplete-typeahead-bootstrap/dist/latest/bootstrap-autocomplete.js'
            ];
        }
        return d;
    },
    methods : {
        afterLoadResources : function () {
            var that = this;
            jQuery(that.$el).find('[c-autocomplete]').autoComplete({
                source : function(term,suggest) {
                    jQuery.getJSON(that._createUrl(),{query:term},function (json) {
                        var suggestions = [];
                        for (var i in json.result) {
                            var s = "";
                            for (var k in that.metadata.fields) {
                                s += json.result[i][that.metadata.fields[k]] + " ";
                            }
                            suggestions.push(s);
                        }
                        return suggest(suggestions)
                    })
                },
                onSelect: function(e, term, item){
                    //alert('Item "'+item.data('langname')+' ('+item.data('lang')+')" selected by '+(e.type == 'keydown' ? 'pressing enter' : 'mouse click')+'.');
                    that.setValue(item.id);
                }
                // resolverSettings: {
                //     url: that._createUrl()
                // },
                // valueKey : 'email'
            });
            //{
            //data: that.conf.metadata.domainValues

            //});
        },
        _createUrl : function () {
            var that = this;
            var r = Route.factory(that.conf.routeName,{values : {modelName:that.conf.metadata.autocompleteModel} });

            //var url = that.url?that.url:"/api/json/autocomplete/" + that.metadata.autocompleteModel + "?";
            var url = that.url?that.url:r.getUrl();
            url+= '?';

            if (that.conf.metadata.fields) {
                for(var f in that.conf.metadata.fields) {
                    url+="field[]="+that.conf.metadata.fields[f]+"&";
                }
            }
            /* @TODO se metto la description diventa difficile cambiare la
             if (that.model_description) {
             for(var f in that.model_description) {
             url+="description[]="+that.model_description[f]+"&";
             }
             }
             */
            url += that.conf.metadata.separator ? '&separator=' + that.conf.metadata.separator : '';
            url += that.conf.metadata.n_items ? '&n_items=' + that.conf.metadata.n_items : '';
            url += that.conf.metadata.method ? '&method=' + that.conf.metadata.method: '';
            return url;
        },

    }

});