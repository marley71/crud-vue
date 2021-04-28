import crud from "../../../crud";

crud.conf['w-date-text'] = {
    resources: [
        'https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.24.0/moment.min.js'
    ],
    displayFormat: 'dd/mm/yyyy',
    dateFormat: 'yyyy-mm-dd',
    formattedValue: null
}

const wDateTextMixin = {
    methods: {
        afterLoadResources () {
            var that = this
            that.formattedValue = moment(that.value).format(that.displayFormat.toUpperCase())
        }
    }
}
export default wDateTextMixin
