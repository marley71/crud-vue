crud.components.widgets.coreWDatePicker = Vue.component('core-w-date-picker', {
    extends : crud.components.widgets.wBase,
    data : function() {
        var that = this;
        var _conf = that._getConf() || {};
        var d = {};
        if (!( 'resources' in _conf) ) {
            d.resources = [
                'https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.24.0/moment.min.js',
                'https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datepicker/1.9.0/css/bootstrap-datepicker.min.css',
                'https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datepicker/1.9.0/js/bootstrap-datepicker.js'
            ];
        }
        d.displayFormat = _conf.displayFormat || "mm/dd/yyyy";
        d.dateFormat = _conf.dateFormat || d.displayFormat;
        return d;
    },
    methods : {
        afterLoadResources : function () {
            var that = this;
            jQuery(that.$el).find('[c-picker]').datepicker({
                format : that.displayFormat,
            }).on('changeDate', function(ev) {
                that.value =  moment(ev.date.toISOString()).format(that.dateFormat.toUpperCase()); //ev.date.toISOString();
                that.change();
            });
            console.log('dateformat',that.dateFormat.toUpperCase())
            jQuery(that.$el).find('[c-picker]').datepicker('update',moment(that.value).format(that.displayFormat.toUpperCase()));
        }
    }
});
