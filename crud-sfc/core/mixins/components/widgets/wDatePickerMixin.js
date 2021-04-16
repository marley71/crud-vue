const wDatePickerMixin = {
    methods: {
        afterLoadResources: function () {
            var that = this
            window.jQuery(that.$el).find('[c-picker]').datepicker({
                format: that.displayFormat
            }).on('changeDate', function (ev) {
                that.value = moment(ev.date.toISOString()).format(that.dateFormat.toUpperCase()) // ev.date.toISOString();
                that.change()
            })

            // console.log('dateformat', that.dateFormat.toUpperCase())
            window.jQuery(that.$el).find('[c-picker]').datepicker('update', moment(that.value).format(that.displayFormat.toUpperCase()))
            if (that.value) {
                var d = moment(that.value).toDate()
                window.jQuery(that.$el).find('[c-picker]').datepicker('setDate', d)
            }
        }
    }
}
export default wDatePickerMixin
