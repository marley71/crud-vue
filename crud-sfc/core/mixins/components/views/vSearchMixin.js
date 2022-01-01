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
    prefixField: 's_',
    advancedFields: [],
    advancedWidgets: {},

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
        },
        /**
         * crea le configurazioni per i widgets della view
         */
        createWidgets: function () {
            var that = this;
            var keys = (that.fields && that.fields.length > 0) ? that.fields : Object.keys(that.value);
            var widgets = {};
            for (var k in keys) {
                var key = keys[k];
                widgets[key] = that._createWidgetConfig(key,that.value);
                widgets[key].cRef = that.getRefId(that._uid, 'w', key);
            }
            that.widgets = widgets;
            var adF = that.advancedFields || [];
            var adW = {};
            for (var k in adF) {
                var key = adF[k];
                adW[key] = that._createWidgetConfig(key, that.value);
                adW[key].cRef = that.getRefId(that._uid, 'w', key);
            }
            that.advancedWidgets = adW;

        },
    }
}
export default vSearchMixin
