import crud from "../../../crud";

crud.conf['w-date-picker'] = {
    resources: [
        'https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.24.0/moment.min.js',
        'https://cdnjs.cloudflare.com/ajax/libs/datepicker/1.0.10/datepicker.min.js',
        'https://cdnjs.cloudflare.com/ajax/libs/datepicker/1.0.10/datepicker.min.css'
    ],
    displayFormat: 'dd/mm/yyyy',
    dateFormat: 'yyyy-mm-dd'
}

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
