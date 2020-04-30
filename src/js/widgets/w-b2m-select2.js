crud.components.widgets.wB2mSelect2 = Vue.component('w-b2m-select2', {
    extends : crud.components.widgets.wB2Select2,
    template: '#w-b2m-select2-template',
    methods : {
        afterLoadResources : function () {
            var that = this;
            var selected = [];
            for (var i in that.value) {
                selected.push({
                    id : that.value[i].id,
                    text : that._getLabel(that.value[i]),
                    selected : true,
                });
            }

            jQuery(that.$el).find('[c-select2]').select2({
                data : selected,
                ajax : that._getAjaxConf(),
                allowClear : that.allowClear,
                placeholder: that.placeholder?that.placeholder:"Seleziona",
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
                placeholder: that.placeholder?that.placeholder:"Seleziona",
            });

            //
            // jQuery(that.$el).find('[c-select2]').select2({
            //     data : selected,
            //     ajax : {
            //         url : that._createUrl(),
            //         dataType: 'json',
            //         delay: 250,
            //         data: function(params) {
            //             return {
            //                 term: params.term, // search term
            //                 page: params.page
            //             };
            //         },
            //         processResults: function (json) {
            //             // Tranforms the top-level key of the response object from 'items' to 'results'
            //             var items = [];
            //             for (var i in json.result) {
            //                 items.push({
            //                     id : json.result[i].id,
            //                     text : that._getLabel(json.result[i])
            //                 });
            //             }
            //             return {
            //                 results: items
            //             };
            //         },
            //     },
            //     placeholder: that.placeholder?that.placeholder:"Seleziona",
            // });
            jQuery(that.$el).find('[c-select2]').on('select2:select', function (e) {
                that._renderHidden();
                that.change(e);
            });
            jQuery(that.$el).find('[c-select2]').on('select2:unselect', function (e) {
                that._renderHidden();
                that.change(e);
            });
            that._renderHidden();

        },
        // _getLabel : function(value) {
        //     var that  =this;
        //     var label = "";
        //     console.log('_getLabel',value,that.conf.labelFields);
        //     for (var i in that.conf.labelFields) {
        //         label += value[that.conf.labelFields[i]] + " ";
        //     }
        //     return label;
        // },
        _renderHidden : function () {
            var that = this;
            var values = that.getValue();
            that.jQe('[c-selected-items]').html(' ');
            for (var f in that.hiddenFields) {
                var field = that.hiddenFields[f];
                for (var i in values) {
                    jQuery('<input type="hidden">').attr({
                        'name': that.getFieldName() + '-' + field + '[]',
                        'value':values[i][field]
                    }).appendTo(that.jQe('[c-selected-items]'));
                }
            }

        },
        getValue : function () {
            var that = this;
            var selValues = jQuery(that.$el).find('[c-select2]').select2('data');
            var values = [];
            for (var i in selValues) {
                var item = {};
                for (var f in that.hiddenFields) {
                    var field = that.hiddenFields[f];
                    item[field] = selValues[i][field];
                }
                values.push(item);
            }
            return values;
        },
    }

});
