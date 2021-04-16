const wBelongsToMixin = {
    methods: {
        getFieldName: function () {
            return this.name + '[]'
        }
    }
}
export default wBelongsToMixin
