crud.components.widgets.wDatePicker = Vue.component('w-date-picker', {
    extends : crud.components.widgets.wBase,
    template: '#w-date-picker-template',
    data : function() {
        var d = this._loadConf();
        if (!( 'resources' in d.conf) ) {
            d.conf.resources = [
                'https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.24.0/moment.min.js',
                'https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datepicker/1.9.0/css/bootstrap-datepicker.min.css',
                'https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datepicker/1.9.0/js/bootstrap-datepicker.js'
            ];
        }
        return d;
    },
    methods : {
        afterLoadResources : function () {
            var that = this;
            var displayFormat = that.displayFormat || "mm/dd/yyyy";
            var dateFormat = that.dateFormat || displayFormat;
            jQuery(that.$el).find('[c-picker]').datepicker({
                format : displayFormat,
            }).on('changeDate', function(ev) {
                that.value =  moment(ev.date.toISOString()).format(dateFormat.toUpperCase()); //ev.date.toISOString();
                that.change();
            });
            console.log('dateformat',dateFormat.toUpperCase())
            jQuery(that.$el).find('[c-picker]').datepicker('update',moment(that.value).format(displayFormat.toUpperCase()));
        }
    }
});
