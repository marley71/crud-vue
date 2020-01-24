crud.components.renders.rB2Select2 = Vue.component('r-b2-select2', {
    extends : crud.components.renders.rBase,
    template: '#r-b2-select2-template',
    data : function () {
        var d = this.defaultData();
        if (!( 'resources' in d.conf) ) {
            d.conf.resources = [
                'https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.12/css/select2.min.css',
                'https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.12/js/select2.min.js'

            ];
        }
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
                    processResults: function (json) {
                        // Tranforms the top-level key of the response object from 'items' to 'results'
                        var items = [];
                        for (var i in json.result) {
                            items.push({
                                id : json.result[i].id,
                                text : that._getLabel(json.result[i])
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
            jQuery(that.$el).find('[c-select2]').on('select2:select', function () {
                console.log('value',that.getValue())
                that.$emit('change');
            });
        },
        _getLabel : function(value) {
            var that  =this;
            var label = "";
            for (var i in that.conf.metadata.labelFields) {
                label += value[that.conf.metadata.labelFields[i]] + " ";
            }
            return label;
        },
        getValue : function () {
            var that = this;
            var selValue = jQuery(that.$el).find('[c-select2]').select2('data');
            return selValue.length>0?selValue[0]['id']:null;

        },
    }

});