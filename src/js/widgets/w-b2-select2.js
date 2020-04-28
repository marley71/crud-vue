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
        if (!('primaryKey' in d)  )
            d.primaryKey = 'id';
        return d;
    },
    methods : {
        _getAjaxConf : function() {
            var that = this;
            that.route = that._getRoute();
            that.setRouteValues(that.route);
            var url = that.route.getUrl();
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
                            text : that._getLabel(json.result[i])
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
            if (that.value) {
                data.push({
                    id : that.value,
                    selected : true,
                    text : that._getLabel(that.modelData)
                });
            }

            jQuery(that.$el).find('[c-select2]').select2({
                data : data,
                ajax : that._getAjaxConf(),
                allowClear : that.allowClear,
                placeholder: that.placeholder?that.placeholder:"Seleziona",
            });
            jQuery(that.$el).find('[c-select2]').on('select2:select', function () {
                console.log('value',that.getValue())
                that.$emit('change');
            });
        },
        _getLabel : function(value) {
            var that  =this;
            var label = "";
            for (var i in that.fields) {
                label += value[that.fields[i]] + " ";
            }
            return label;
        },
        getValue : function () {
            var that = this;
            var selValue = jQuery(that.$el).find('[c-select2]').select2('data');
            return selValue.length>0?selValue[0][that.primaryKey]:null;

        },
        setRouteValues : function(route) {
            route.setValues({modelName:this.modelName});
            return route;
        },
        // _createUrl : function () {
        //     var that = this;
        //     var r = that.$crud.createRoute(that.routeName);
        //     that.route = that.setRouteValues(r);
        //
        //
        //     //var url = that.url?that.url:"/api/json/autocomplete/" + that.metadata.autocompleteModel + "?";
        //     var url = that.url?that.url:r.getUrl();
        //     url+= '?';
        //
        //     if (that.conf.fields) {
        //         for(var f in that.conf.fields) {
        //             url+="field[]="+that.conf.fields[f]+"&";
        //         }
        //     }
        //     /* @TODO se metto la description diventa difficile cambiare la
        //      if (that.model_description) {
        //      for(var f in that.model_description) {
        //      url+="description[]="+that.model_description[f]+"&";
        //      }
        //      }
        //      */
        //     url += that.conf.separator ? '&separator=' + that.conf.separator : '';
        //     url += that.conf.n_items ? '&n_items=' + that.conf.n_items : '';
        //     url += that.conf.method ? '&method=' + that.conf.method: '';
        //     return url;
        // },
    }

});
