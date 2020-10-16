crud.components.widgets.coreWAutocomplete = Vue.component('crud-w-autocomplete', {
    extends : crud.components.widgets.wBase,
    methods : {
        afterLoadResources : function () {
            var that = this;
            that.jQe('[c-autocomplete]').autoComplete({
                source : function(term,suggest) {
                    var r = that._getRoute(that.routeName);
                    that.setRouteValues(r,term);
                    Server.route(r,function (json) {
                        var suggestions = [];
                        if (json.error) {
                            that.errorDialog(json.msg);
                            return suggest(suggestions)
                        }
                        //that.suggestValues = {};
                        for (var i in json.result) {
                            var s = that._getSuggestion(json.result[i]);
                            suggestions.push(s);
                            that.suggestValues[s] = json.result[i][that.primaryKey];
                        }
                        return suggest(suggestions)
                    })
                },
                onSelect: function(e, term, item){
                    //console.log(term,that.suggestValues,'selected',that.suggestValues[term],'item',item);
                    that.value = that.suggestValues[term];
                    that.label = term;
                    that.change();
                }
            });
            that.getLabel();
        },
        setRouteValues : function (route,term) {
            var that = this;
            route.setValues({modelName:that.modelName});
            var url = that.url?that.url:route.getUrl();
            url+= '?term='+term+'&';

            if (that.labelFields) {
                for(var f in that.labelFields) {
                    url+="field[]="+that.labelFields[f]+"&";
                }
            }
            url += that.separator ? '&separator=' + that.separator : '';
            url += that.n_items ? '&n_items=' + that.n_items : '';
            url += that.method ? '&method=' + that.method: '';
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
            that.change();
        },
        getLabel : function () {
            var that = this;
            if (that.referredData) {
                that.label = that._getSuggestion(that.referredData);
            }
        },
        _getSuggestion: function(rowData) {
            var that = this;
            var s = "";
            for (var k in that.labelFields) {
                s += (s?' ':'') + rowData[that.labelFields[k]];
            }
            return s
        }
    }
});
