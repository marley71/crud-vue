import jQuery from "jquery";
import crud from "../../../crud";


crud.conf['v-search'] = {
    confParent: 'v-record',
    beforeForm: null,
    beforeActions: null,
    primaryKey: 'id',
    routeName: 'search',
    actions: ['action-search', 'action-reset'],
    fieldsConfig: {},
    customActions: {},
    widgetTemplate: 'tpl-record',
    buttonsClass: null,
    prefixField: 's_'
}

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
