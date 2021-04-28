import crud from "../../../crud";

crud.conf['v-edit'] = {
    confParent: 'v-record',
    beforeForm: null,
    beforeActions: null,
    primaryKey: 'id',
    routeName: 'edit',
    widgetTemplate: 'tpl-record',
    actions: ['action-save', 'action-back'],
    customActions: {},
    fieldsConfig: {
        id: 'w-hidden'
    },
    fields: []
}

const vEditMixin = {
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

export default vEditMixin
