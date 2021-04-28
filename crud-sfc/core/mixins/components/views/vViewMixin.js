import crud from "../../../crud";

crud.conf['v-view'] = {
    confParent: 'v-record',
    defaultWidgetType: 'w-text',
    beforeActions: null,
    primaryKey: 'id',
    routeName: 'view',
    fieldsConfig: {},
    actions: [],
    customActions: {},
    widgetTemplate: 'tpl-record-view'
}


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
