// import ProtocolRecord from '../../../ProtocolRecord'
import crud from "../../../crud";

crud.conf['v-record'] = {
    modelName: null,
    widgetTemplate: 'tpl-record',
    pk: 0,
    value: {},
    metadata: {},
    route: null,
    widgets: {},
    actionsConf: [],
    actionsName: {},
    defaultWidgetType: 'w-input',
    fields: [],
    fieldsConfig: {}
}


const vRecordMixin = {
    props: {
        'cModel': {
            default: null
        },
        'cPk': {
            default: 0,
        }
    },
    beforeDestroy() {
        for (var key in this.widgets) {
            this.getWidget(key) && this.getWidget(key).$destroy();
        }
        for (var key in this.actionsConf) {
            this.getAction(key) && this.getAction(key).$destroy();
        }
    },

    methods: {
        dynamicData: function (conf) {
            if (this.cModel)
                conf.modelName = this.cModel;
            if (this.cPk)
                conf.pk = this.cPk;
            if (!conf.langContext && conf.langContext !== null) {
                conf.langContext = conf.modelName ? conf.modelName : this.cModel
                conf.langContext += '.fields';
            }
            return conf;
        },

        setRouteValues: function (route) {
            var that = this;
            console.log('setRouteValues', that);
            if (that.routeConf) {
                var _conf = that._loadRouteConf();
                console.log('routeConf params', _conf);
                var params = route.getParams();
                var p2 = _conf.params || {};
                for (var k in p2) {
                    params[k] = p2[k];
                }
                route.setParams(params);
            }
            return route;
        },
        draw: function () {
            var that = this;
            that.checkValidActions();
            that.createActionsConf();
            that.createWidgets();
            that.loading = false;
            setTimeout(function () {
                that.completed();
            }, 10)
        },
        setWidgetValue: function (key, value) {
            var that = this;
            if (!that.widgets[key]) {
                throw 'accesso a render con chiave inesistente ' + key;
            }
            crud.cRefs[that.widgets[key].cRef].setValue(value);
        },

        createWidgets: function () {
            var that = this;
            var keys = (that.fields && that.fields.length > 0) ? that.fields : Object.keys(that.value);
            var widgets = {};
            for (var k in keys) {
                var key = keys[k];
                widgets[key] = that._defaultWidgetConfig(key);
                widgets[key].cRef = that.getRefId(that._uid, 'w', key);
                //widgets[key].value = null;
                widgets[key].modelData = that.value;
                if (that.value && (key in that.value))
                    widgets[key].value = that.value[key];

                widgets[key].name = that.getFieldName(key);
                if (!('label' in widgets[key])) {
                    //console.log('translate key e langContext',key,that.langContext);
                    widgets[key].label = that.$options.filters.translate(key + '.label', that.langContext);
                } else {
                    widgets[key].label = that.$options.filters.translate(widgets[key].label);
                }
            }

            console.log('v-record.widgets', widgets);
            that.widgets = widgets;
        },
        /**
         * controlla la validità delle azioni inserite nel vettore actions
         * se una azione non e' valida viene rimossa dal vettore
         */
        checkValidActions: function () {
            var that = this;
            var actions = [];
            for (var i in that.actions) {
                var aName = that.actions[i];
                if (that.$crud.conf[aName])
                    actions.push(aName);
                else if (that.customActions[aName])
                    actions.push(aName);
                else
                    console.warn("Impossibile trovare la definizione di " + aName);

            }
            that.actions = actions;
        },
        /**
         * crea le configurazioni per tutte le azioni valide
         */
        createActionsConf: function () {
            var that = this;
            var actions = {};
            //console.log('confff',that.actions,that);
            for (var i in that.actions) {
                var aName = that.actions[i];
                var aConf = that.getActionConfig(aName);
                aConf.modelData = this.cloneObj(that.value);
                aConf.modelName = that.cModel;
                aConf.rootElement = that.$el;
                aConf.cRef = that.getRefId(that._uid, 'a', aName);
                aConf.name = aName;
                aConf.view = that;
                actions[aName] = aConf;
            }
            that.actionsConf = actions;
        },
        fillData: function (route, json) {
            var that = this;
            if (route) {
                // istanzio il protocollo associato e riempio i dati nella view
                var protocol = that.createProtocol(route.getProtocol());
                protocol.jsonToData(json);
                var prop = Object.getOwnPropertyNames(protocol);
                for (var i in prop) {
                    that[prop[i]] = protocol[prop[i]];
                }
            }
            that.json = json;
        },
        getViewData: function () {
            var that = this;
            var data = {};
            if (that.jQe('form').length) {
                data = this.getFormData(that.jQe('form'));
            }
            return data;
        },

        reset: function () {
            var that = this;
            for (var k in that.widgets) {
                this.getWidget(k).reset();
            }
        },
        getWidget: function (key) {
            var rConf = this.widgets[key];
            if (!rConf) {
                //console.warn('attenzione widget non trovato key ' + key);
                return null;
            }
            //console.log('getWidget',key,rConf);
            return this.$crud.cRefs[rConf.cRef];
        },
        getAction: function (name) {
            var rConf = this.actionsConf[name];
            if (!rConf) {
                //console.warn('attenzione action non trovata nome ' + name);
                return null;
            }
            //console.log('getAction',name,rConf);
            return this.$crud.cRefs[rConf.cRef];
        }
    }
}
export default vRecordMixin
