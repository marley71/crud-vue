crud.components.widgets.coreWAutocomplete = Vue.component('crud-w-autocomplete', {
    extends : crud.components.widgets.wBase,
    data : function() {
        var that = this;
        var _conf = that._getConf() || {};
        var d = {};
        if (!( 'resources' in _conf) ) {
            d.resources = [
                'https://cdnjs.cloudflare.com/ajax/libs/jquery-autocomplete/1.0.7/jquery.auto-complete.min.css',
                'https://cdnjs.cloudflare.com/ajax/libs/jquery-autocomplete/1.0.7/jquery.auto-complete.min.js'
            ];
        }
        d.routeName = _conf.routeName || 'autocomplete';
        d.primaryKey = _conf.primaryKey || 'id';
        d.label = '';
        d.suggestValues = {};
        return d;
    },
    methods : {
        afterLoadResources : function () {
            var that = this;
            that.jQe('[c-autocomplete]').autoComplete({
                source : function(term,suggest) {
                    var r = that._getRoute(that.conf.routeName);
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
                    console.log(term,that.suggestValues,'selected',that.suggestValues[term],'item',item);
                    that.value = that.suggestValues[term];
                    that.label = term;
                    that.change();
                }
            });
            that.getLabel();
        },
        setRouteValues : function (route,term) {
            var that = this;
            //var r = that.$crud.createRoute(that.conf.routeName);
            route.setValues({modelName:that.conf.modelName});
            var url = that.url?that.url:route.getUrl();
            url+= '?term='+term+'&';

            if (that.conf.labelFields) {
                for(var f in that.conf.labelFields) {
                    url+="field[]="+that.conf.labelFields[f]+"&";
                }
            }
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
            for (var k in that.conf.labelFields) {
                s += (s?' ':'') + rowData[that.conf.labelFields[k]];
            }
            return s
        }
    }
});
