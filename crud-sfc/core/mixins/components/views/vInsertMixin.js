import crud from "../../../crud";

crud.conf['v-insert'] = {
    confParent: 'v-record',
    beforeForm: null,
    beforeActions: null,
    primaryKey: 'id',
    routeName: 'insert',
    widgetTemplate: 'tpl-record',
    actions: ['action-save', 'action-back'],
    customActions: {},
    fieldsConfig: {
        id: 'w-hidden'
    },
    fields: []
}

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
