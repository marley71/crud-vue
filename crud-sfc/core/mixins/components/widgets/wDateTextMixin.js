const wDateTextMixin = {
    methods: {
        afterLoadResources () {
            var that = this
            that.formattedValue = moment(that.value).format(that.displayFormat.toUpperCase())
        }
    }
}
export default wDateTextMixin
