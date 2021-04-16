import jQuery from "jquery";

const vSearchMixin = {
    methods: {
        completed: function () {
            var that = this
            that.jQe('form').each(function () {
                jQuery(this).find('input').keypress(function (e) {
                    // Enter pressed?
                    if (e.which === 10 || e.which === 13) {
                        var a = that.getAction('action-search')
                        a.execute()
                    }
                })
            })
        },
        getFieldName: function (key) {
            return this.prefixField?this.prefixField + key:key
        },
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
export default vSearchMixin
