const vViewMixin = {
    methods: {
        setRouteValues: function (route) {
            var that = this
            if (route) {
                route.setValues({
                    modelName: that.modelName,
                    pk: that.pk
                })
            }
            return route
        }
    }
}

export default vViewMixin
