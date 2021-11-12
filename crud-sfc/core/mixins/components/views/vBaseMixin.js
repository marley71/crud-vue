import Vue from 'vue'
import Server from "../../../Server";
import crud from "../../../crud";

crud.conf['v-base'] = {
    confParent: 'c-component',
    viewTitle: '',
    langContext: '',
    loading: true,
    errorMsg: '',
    routeConf: null,
    autoload: true // carica la sorgente dati automaticamente
}

const vBaseMixin = {
    props: {
        cFields: {
            default: null
        },
        cRouteConf: {
            default: null
        },
        cConfDefaultName: {
            default: 'v-base',
        }
    },
    mounted() {
        var that = this;
        that.route = that._getRoute();
        if (that.autoload) {
            that.load();
        }
    },
    methods: {
        load() {
            let that = this;
            that.beforeLoadData();
            that.setRouteValues(that.route);
            that.fetchData(that.route, function (json) {
                that.json = json;
                that.fillData(that.route, json);
                that.afterLoadData(json);
                that.draw();
            });
        },

        reload() {
            var that = this;
            that.loading = true;
            // non funziona il force update
            //that.$forceUpdate();
            setTimeout(function () {
                that.load();

                // that.setRouteValues(that.route);
                // that.fetchData(that.route, function (json) {
                //     that.fillData(that.route, json);
                //     that.draw();
                //     //that.loading = false;
                // });
            },10)

        },

        // evento chiamato quando la view ha caricato i dati e disegnato tutti i controlli e azioni
        completed: function () {

        },
        fetchData: function (route, callback) {
            var that = this;
            if (!route) {
                //that.afterLoadData({});
                callback({});
                return;
            }
            //console.log('fetchData',route.getConf());
            Server.route(route, function (json) {
                if (json.error) {
                    that.errorDialog(json.msg);
                    that.errorMsg = json.msg;
                    return
                }
                //that.afterLoadData(json);
                callback(json);
            })
        },
        beforeLoadData () {

        },
        afterLoadData () {

        },
        _loadConf: function () {
            var that = this;
            var defaultConf = that._getDefaultConf();
            var currentConf = that._getConf();
            var mergedConf = that.mergeConfView(defaultConf, currentConf);
            //console.log('v-base _loadConf', mergedConf);
            return mergedConf;
        },

        /**
         * crea la configurazione base per ogni singola azione della view, se incontra un'azione
         * custom con una configurazione non definita, la definisce in crud.conf[action-name]
         * @param name
         * @param type
         * @return {*|{}}
         */
        getActionConfig: function (name, type) {

            var that = this;

            var conf = that.$crud.conf[name] || {};
            if (!conf.componentName)
                conf.componentName = 'a-base';
            //var componentName = conf.componentName ? conf.componentName : 'a-base';
            conf = that.merge(that.$crud.conf[conf.componentName], conf);
            if (that.customActions[name])
                conf = that.merge(conf, that.customActions[name]);
            else {
                conf = that.merge(that.$crud.conf[conf.componentName], conf);
            }
            console.log('actionconfig',name,conf)
            conf = that.mergeConf(conf);

            return conf;


            // var that = this;
            // var conf = that.$crud.conf[name] || {};
            // if (!conf.componentName)
            //     conf.componentName = 'a-base';
            // //var componentName = conf.componentName ? conf.componentName : 'a-base';
            // conf = that.merge(that.$crud.conf[conf.componentName],conf);
            // if (that.customActions[name])
            //     conf = that.merge(conf, that.customActions[name]);
            // else {
            //     conf = that.merge(that.$crud.conf['a-base'], conf);
            // }
            // return conf;


            // --- vecchio codice
            // var aClassName = 'a-base';
            // // se non esiste il componente di azione lo creo al volo
            // if (!this.$options.components[name]) {
            //     if (that.$crud.conf[name] && that.$crud.conf[name].confParent) {
            //         aClassName = that.$crud.conf[name].confParent
            //     }
            //     //console.log(aClassName,'non esiste la creao',name,that.$options.components[aClassName])
            //     this.$options.components[name] = Vue.component(name, {
            //         extends: that.$options.components[aClassName]
            //     });
            //     this.$options.components[name].prototype.$crud = this.$crud;
            // }
            // // ritorno la configurazione dell'azione con la configurazione di default mergiata con un eventuale configurazione custom
            // var actionConf =  that.merge(that.$crud.conf[name], (that.customActions[name] || {}));
            // // in caso non sia stato definito il confParent lo forzo.
            // if (!actionConf.confParent)
            //     actionConf.confParent = aClassName;
            // return actionConf;
        },


        _getConf: function () {
            var that = this;
            var conf = {}; //null;
            if (that.cConf) {
                if (typeof that.cConf === 'string' || that.cConf instanceof String) {
                    conf = this.getDescendantProp(window, that.cConf);
                    // if (!conf) {
                    //     conf = this.getDescendantProp(this.$crud.conf, this.cConf);
                    // }
                } else
                    conf = that.cConf;
            } else {
                var modelName = that.cModel;
                var type = that.cType;
                console.log('Check exist default conf ' + 'Model' + this.pascalCase(modelName));
                if (window['Model' + this.pascalCase(modelName)]) {
                    var cm = window['Model' + this.pascalCase(modelName)];
                    if (cm[type])
                        conf = cm[type];
                    else {
                        if (type == 'insert' && cm['edit'])
                            conf = cm['edit'];
                        else {
                            conf = this.$crud.conf[type];
                        }
                    }

                }

            }
            //console.log('v-base _getConf', conf);
            return conf;
        },


        _getDefaultConf: function () {
            var that = this;
            //var _compName = this.$options.name;
            console.log('confDefaultName', that.cConfDefaultName, 'componentName', that.$options.name, 'viewConf', that.cType)
            var defaultConf = that.mergeConf(that.$crud.conf[that.cConfDefaultName]);
            var componentNameConf = that.mergeConf(that.$crud.conf[that.$options.name]);
            //var typeConf = that.mergeConf(that.$crud.conf[that.cType]);

            var mergedConf = that.merge(defaultConf, componentNameConf);
            //mergedConf = that.merge(mergedConf, typeConf);
            console.log('v-base _getDefaultConf', mergedConf);
            return mergedConf;
        },

        _loadRouteConf: function () {
            var that = this;
            var conf = null;
            var d = {};
            console.log('_load routeConf', that.routeConf, 'cConf', this.cConf);
            if (that.routeConf) {
                if (typeof that.routeConf === 'string' || that.routeConf instanceof String) {
                    conf = this.getDescendantProp(that.$crud, that.routeConf);
                } else
                    conf = that.routeConf;
            }
            return conf;
        },
        /**
         * ritorna la configurazione minimale di base di un widget rispettando le priorita' tra le configurazioni
         * @param key : nome del campo di cui vogliamo la configurazione
         * @param confiName : nome variabile configurazione nell'oggetto conf. opzionale
         * @returns {{type: *}}
         * @private
         */
        _defaultWidgetConfig: function (key, configName) {
            var that = this;
            var c = {
                type: that.defaultWidgetType,
            };
            configName = configName ? configName : 'fieldsConfig';
            var conf = (that[configName] && that[configName][key]) ? that[configName][key] : null;
            //console.log('CONF',key,conf,configName,that.conf[configName]);
            if (conf) {
                // in caso di stringa lo considero come il type del render
                if (typeof conf === 'string' || conf instanceof String) {
                    c.type = conf;
                } else {
                    c = this.merge(c, conf);
                }
            }

            if (!c.template)
                c.template = that.widgetTemplate;
            c = this.merge(c, (that.metadata[key] || {}));
            //console.log('_defaultWidgetConfig',c);
            return c;
        },
        getFieldName: function (key) {
            return key;
        },
        isHiddenField: function (key) {
            var type = this.defaultWidgetType;
            if (this.fieldsConfig[key]) {
                if (typeof this.fieldsConfig[key] === 'string' || this.fieldsConfig[key] instanceof String)
                    type = this.fieldsConfig[key];
                else
                    type = this.fieldsConfig[key].type ? this.fieldsConfig[key].type : type;

                if (type === 'w-hidden')
                    return true;
            }
            return false;
        }
    }
}
export default vBaseMixin
