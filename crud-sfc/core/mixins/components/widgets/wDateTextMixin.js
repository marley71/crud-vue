import crud from "../../../crud";

crud.conf['w-date-text'] = {
    resources: [
        'https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.24.0/moment.min.js'
    ],
    displayFormat: 'dd/mm/yyyy',
    dateFormat: 'yyyy-mm-dd',
    formattedValue: null,
    invalidDateString:'app.data-non-valida',
}

const wDateTextMixin = {
    methods: {
        afterLoadResources () {
            var that = this
            var md = moment(that.value);
            if (md.isValid()) {
                that.formattedValue = md.format(that.displayFormat.toUpperCase())
            } else {
                that.formattedValue = that.translate(that.invalidDateString) ;
            }

        }
    }
}
export default wDateTextMixin
