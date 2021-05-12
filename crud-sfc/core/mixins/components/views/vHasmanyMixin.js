import crud from "../../../crud";

crud.conf['v-hasmany'] = {
    confParent: 'v-record',
    defaultWidgetType: 'w-input',
    widgetTemplate: 'tpl-full-no',
}

const vHasmanyMixin = {
    methods: {
        getFieldName: function (key) {
            var that = this
            return that.cModel + '-' + key + '[]'
        },
        getValue: function () {
            var that = this
            var value = {}
            for (var k in that.widgets) {
                value[k] = that.getWidget(k).getValue()
            }
            return value
        }
    }
}

export default vHasmanyMixin
