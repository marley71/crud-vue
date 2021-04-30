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
                console.assert(that.modelName,{modelName:that.modelName,errorMsg:'invalid modelName'});
                console.assert(that.pk,{pk:that.pk,errorMsg:'invalid pk'});
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
