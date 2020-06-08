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
                    text : that.getLabel(that.value[i]),
                    selected : true,
                });
            }
            jQuery(that.$el).find('[c-select2]').select2({
                data : selected,
                ajax : that._getAjaxConf(),
                allowClear : that.allowClear,
                placeholder: that.placeholder?that.placeholder:"Seleziona",
            });

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
        _renderHidden : function () {
            var that = this;
            var values = that.getValue();
            that.jQe('[c-selected-items]').html(' ');
            for (var i in values) {
                jQuery('<input type="hidden">').attr({
                    'name': that.getFieldName() + '-' + that.primaryKey + '[]',
                    'value':values[i]
                }).appendTo(that.jQe('[c-selected-items]'));
            }

        },
        getValue : function () {
            var that = this;
            var selValues = jQuery(that.$el).find('[c-select2]').select2('data');
            //console.log('selValues',selValues);
            var values = [];
            for (var i in selValues) {
                values.push(selValues[i].id);
            }
            //console.log('values',values);
            return values;
        },
    }

});
