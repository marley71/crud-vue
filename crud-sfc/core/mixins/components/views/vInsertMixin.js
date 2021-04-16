const vInsertMixin = {
    methods: {
        setRouteValues: function (route) {
            var that = this
            if (route) {
                route.setValues({
                    modelName: that.modelName
                })
            }
            return route
        }
    }
}
export default vInsertMixin
