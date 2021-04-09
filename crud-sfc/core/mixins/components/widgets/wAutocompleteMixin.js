import jQuery from "jquery";

const wAutocompleteMixin = {
    methods: {
        afterLoadResources: function () {
            var that = this;
            if (that.routeName === null) {  // caso di valori statici
                that._initStatic();
            } else {
                that._initAjax();
            }
            that.getLabel();
        },
        _initAjax: function () {
            var that = this;
            that.jQe('[c-autocomplete]').autoComplete({
                minLength: that.minLength,
                source: function (term, suggest) {
                    var r = that._getRoute(that.routeName);
                    that.setRouteValues(r, term);
                    Server.route(r, function (json) {
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
                onSelect: that._onSelect
            });
        },
        _initStatic: function () {
            var that = this;
            var data = that.data || [];
            for (var i in data) {
                data[i].text = that._getSuggestion(that.data[i]);
                if (data[i][that.primaryKey] == that.value) {
                    data[i].selected = true;
                }
            }
            //data = ['ciao','cianon'];
            console.log('data', data);
            that.jQe('[c-autocomplete]').autoComplete({
                source: function (term, suggest) {
                    var suggestions = [];
                    //that.suggestValues = {};
                    for (var i in data) {
                        var s = that._getSuggestion(data[i]);
                        suggestions.push(s);
                        that.suggestValues[s] = data[i][that.primaryKey];
                    }
                    return suggest(suggestions)
                },
                minLength: that.minLength,
                onSelect: that._onSelect
            });
        },
        setRouteValues: function (route, term) {
            var that = this;
            route.setValues({foormName: that.foormName, viewType: that.viewType});
            var url = that.url ? that.url : route.getUrl();
            url += '?value=' + term + '&';
            route.setParams({
                field: that.name
            })
            route.setUrl(url);
            return route;

            // configurazione standard
            var that = this;
            route.setValues({modelName: that.modelName});
            var url = that.url ? that.url : route.getUrl();
            url += '?term=' + term + '&';
            if (that.labelFields) {
                for (var f in that.labelFields) {
                    url += "field[]=" + that.labelFields[f] + "&";
                }
            }
            url += that.separator ? '&separator=' + that.separator : '';
            url += that.n_items ? '&n_items=' + that.n_items : '';
            url += that.method ? '&method=' + that.method : '';
            route.setUrl(url);
            return route;
            //return url;
        },

        clear: function () {
            var that = this;
            that.value = '';
            that.label = '';
            that.suggestValues = {};
            jQuery(that.$el).find('[c-autocomplete]').val('');
            that.change();
        },
        getLabel: function () {
            var that = this;
            if (that.referredData) {
                that.label = that._getSuggestion(that.referredData);
            }
        },
        _getSuggestion: function (rowData) {
            var that = this;
            var s = "";
            if (that.labelFields.length == 0) {
                console.log('rowData', rowData[that.primaryKey], ' primaryKey', that.primaryKey)
                return rowData[that.primaryKey] + "";
            }
            for (var k in that.labelFields) {
                s += (s ? ' ' : '') + rowData[that.labelFields[k]];
            }
            return s
        },
        _onSelect: function (e, term, item) {
            var that = this;
            //console.log(term,that.suggestValues,'selected',that.suggestValues[term],'item',item);
            that.value = that.suggestValues[term];
            that.label = term;
            that.change();
        }
    }
}
export default wAutocompleteMixin
