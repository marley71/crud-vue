Vue.component('r-b2-select2', {
    extends : crud.components.renders.rBase,
    template: '#r-b2-select2-template',
    data : function () {
        var d = this.defaultData();
        //d.conf = this.cConf;
        console.log('conf ',d.conf);
        return d;
    },
    methods : {
        afterLoadResources : function () {
            var that = this;
            console.log('b2 afterloadresources')
            var r = Route.factory('autocomplete',{
                values : {
                    modelName : that.conf.metadata.autocompleteModel
                }
            });
            var data = [];
            if (that.value) {
                data.push({
                    id : that.value,
                    selected : true,
                    text : that._getLabel(that.conf.metadata.modelData)
                });
                // that.value.selected = true;
                // that.value.text = that._getLabel(that.value);
                // data.push(that.value);
            }


            jQuery(that.$el).find('[c-select2]').select2({
                data : data,
                ajax : {
                    url : r.getUrl(),
                    dataType: 'json',
                    delay: 250,
                    data: function(params) {
                        return {
                            term: params.term, // search term
                            page: params.page
                        };
                    },
                    processResults: function (data) {
                        // Tranforms the top-level key of the response object from 'items' to 'results'
                        var items = [];
                        for (var i in data.result) {
                            items.push({
                                id : data.result[i].id,
                                text : that._getLabel(data.result[i])
                            });
                        }
                        return {
                            results: items
                        };
                    },
                },
                allowClear : that.allowClear,
                placeholder: that.placeholder?that.placeholder:"Seleziona",
            });
        },
        _getLabel : function(value) {
            var that  =this;
            var label = "";
            for (var i in that.conf.labelFields) {
                label += value[that.conf.labelFields[i]] + " ";
            }
            return label;
        },
        getValue : function () {
            var that = this;
            return jQuery(that.$el).find('[c-select2]').select2('data');
        },
    }

});