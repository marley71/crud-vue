crud.components.widgets.wB2Select2 = Vue.component('w-b2-select2', {
    extends : crud.components.widgets.wBase,
    template: '#w-b2-select2-template',
    data : function () {
        var that = this;
        var _conf = that._getConf() || {};
        var d = {};
        if (!( 'resources' in _conf) ) {
            d.resources = [
                'https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.12/css/select2.min.css',
                'https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.12/js/select2.min.js'
            ];
        }
        d.routeName = _conf.routeName || 'autocomplete';
        d.route = null;
        if (!('primaryKey' in _conf)  )
            d.primaryKey = 'id';
        return d;
    },
    methods : {
        _getAjaxConf : function() {
            var that = this;
            that.route = that._getRoute();
            that.setRouteValues(that.route);
            var url = that.route.getUrl();
            //console.log('conf',that.conf);
            //console.log('url',url);
            var ajax = {
                url : url,
                method : that.route.getMethod(),
                headers: Server.getHearders(),
                dataType: 'json',
                delay: 250,
                data: function(params) {
                    return {
                        value : params.term,
                        field : that.name,
                    }
                },
                processResults: function (json) {
                    // Tranforms the top-level key of the response object from 'items' to 'results'
                    var items = [];
                    for (var i in json.result) {
                        items.push({
                            id : json.result[i][that.primaryKey],
                            text : that.getLabel(json.result[i]),
                            record : json.result[i]
                        });
                    }
                    console.log(that.primaryKey,'items',items);
                    return {
                        results: items
                    };
                },
            };
            return ajax;
        },
        afterLoadResources : function () {
            var that = this;
            var data = [];
            //W2=this;
            // setTimeout(function () {
            //     that.afterLoadResources();
            // },2000)
            //console.log('w2-select MOUNTED',jQuery(that.$el).html());
            if (that.value) {
                data.push({
                    id : that.value,
                    selected : true,
                    text : that.getLabel(that.modelData)
                });
            }


            that.jQe('[c-select2]').select2({
                data : data,
                ajax : that._getAjaxConf(),
                placeholder: that.translate(that.placeholder?that.placeholder:'app.seleziona'),
                allowClear : that.allowClear,
                theme : that.theme,
                // ajax: {
                //     url: 'https://api.github.com/search/repositories',
                //     dataType: 'json'
                //     // Additional AJAX parameters go here; see the end of this chapter for the full code of this example
                // }
            });
            that.jQe('[c-select2]').on('select2:select', function (e) {
                //console.log('value',that.getValue())
                that.change();
                //that.$emit('change',e);
            });
        },
        getLabel : function(value) {
            var that  =this;
            var label = "";
            for (var i in that.fields) {
                label += value[that.fields[i]] + " ";
            }
            return label;
        },
        getValue : function () {
            var that = this;
            var selValue = that.jQe('[c-select2]').select2('data');
            console.log('selvalue',selValue);
            return selValue.length>0?selValue[0].id:null;

        },
        setRouteValues : function(route) {
            route.setValues({modelName:this.modelName});
            return route;
        },
    }

});
