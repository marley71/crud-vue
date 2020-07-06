crud.components.views.vBase = Vue.component('v-base', {
    props : ['cFields','cTargetRef','cRouteConf'],
    extends : crud.components.cComponent,
    components : {
        vAction : Vue.component('v-action', {
            props: ['cAction'],
            data: function () {
                var that = this;
                var aConf = {};
                if (that.cAction) {
                    //console.log('V-RENDER2 ',this.cRender,this.$parent.widgets);
                    aConf = {
                        name: that.cAction.name,
                        conf: that.cAction
                    }
                } else {
                    console.warn('configurazione azione non valida', this.cAction);
                }
                //console.log('v-action create', aConf);
                return aConf;
            },
            template: '<component :is="name" :c-conf="conf"></component>'
        }),
        vWidget : Vue.component('v-widget', {
            props : ['cWidget'],
            data : function() {
                if (this.cWidget) {
                    var conf = null;
                    if (typeof this.cWidget === 'string' || this.cWidget instanceof String) {
                        conf = this.getDescendantProp(window, this.cWidget);
                        if (!conf) {
                            conf = this.getDescendantProp(this.$crud.conf, this.cWidget);
                        }
                    } else
                        conf = this.cWidget;

                    //console.log('cWidget ',conf);
                    return {
                        cTemplate : conf.template,
                        conf : conf
                    }
                }
                console.warn('configurazione non valida',this.cWidget);
                return {
                    cTemplate : 'tpl-no',
                    conf : {
                        type : 'w-text'
                    },
                }

            },
            template : '<component :is="cTemplate" :c-widget="conf"></component>'
        }),
    },
    data : function () {
        console.log('that.cRouteConf',this.cRouteConf);
        return {
            viewTitle : '',
            langContext : '',
            targetRef : this.cTargetRef,
            errorMsg : '',
            routeConf : this.cRouteConf || null
        }
    },
    methods : {
        // evento chiamato quando la view ha caricato i dati e disegnato tutti i controlli e azioni
        completed : function() {

        },
        fetchData: function (route,callback) {
            var that = this;
            if (!route) {
                callback({});
                return;
            }
            //console.log('fetchData',route.getConf());
            Server.route(route,function (json) {
                if (json.error) {
                    that.errorDialog(json.msg);
                    that.errorMsg = json.msg;
                    return
                }
                callback(json);
            })
        },
        getActionConfig : function(name,type) {
            //console.log('v-base.getActionConfig',name,type,this.conf);
            // se non esiste il componente di azione lo creo al volo
            if (!this.$options.components[name]) {
                //console.log('estendo azioni ',name);
                Vue.component(name, {
                    extends : crud.components.actions.actionBase
                });
            }


            var aConf = this.$crud.actions[name] || {};
            var customConf = this.conf.customActions[name] || {};

            aConf = this.merge(aConf,customConf);

            //console.log('getActionConfig',aConf);
            return aConf;
        },

        _loadConf : function() {
            var that = this;
            var conf = null;
            var d = {};
            var type = that.cType;
            var modelName = that.cModel;
            var defaultConf = this.$crud.conf[type];
            console.log('_loadConf',modelName,type,'defaultConf',defaultConf,'cConf',this.cConf);

            if (this.cConf) {
                if (typeof this.cConf === 'string' || this.cConf instanceof String) {
                    conf = this.getDescendantProp(window, this.cConf);
                    if (!conf) {
                        conf = this.getDescendantProp(this.$crud.conf, this.cConf);
                    }
                }
                else
                    conf = this.cConf;
            } else {
                console.log('Check exist default conf '+ 'Model'+this.pascalCase(modelName));
                if (window['Model'+this.pascalCase(modelName)]) {
                    var cm = window['Model'+this.pascalCase(modelName)];
                    if (cm[type])
                        conf = cm[type];
                    else {
                        if (type == 'insert' && cm['edit'])
                            conf = cm['edit'];
                        else {
                            conf = this.$crud.conf[type];
                        }
                    }

                } else {
                    //onsole.log('get default crud conf ',type)
                    conf = this.$crud.conf[type];
                }
            }
            if (!conf) {
                console.trace();
                throw "Nessuna configurazione trovata per questa view";
            }
            //console.log('merge confs',defaultConf,conf);
            var finalConf = this.confMerge(defaultConf,conf);

            for (var k in finalConf) {
                if (k == 'methods')
                    continue;
                d[k] = finalConf[k];
            }
            d.conf = finalConf;
            //console.log('finalConf',finalConf);
            return d;
        },

        _loadRouteConf : function() {
            var that = this;
            var conf = null;
            var d = {};
            console.log('_load routeConf',that.routeConf,'cConf',this.cConf);
            if (that.routeConf) {
                if (typeof that.routeConf === 'string' || that.routeConf instanceof String) {
                    conf = this.getDescendantProp(that.$crud, that.routeConf);
                }
                else
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
        _defaultWidgetConfig : function(key,configName) {
            var that = this;
            var c = {
                type:that.defaultWidgetType,
                value : null,
            };
            configName = configName?configName:'fieldsConfig';
            var conf = (that.conf[configName] && that.conf[configName][key])?that.conf[configName][key]:null;
            //console.log('CONF',key,conf,configName,that.conf[configName]);
            if (conf) {
                // in caso di stringa lo considero come il type del render
                if (typeof conf === 'string' || conf instanceof String) {
                    c.type = conf;
                } else {
                    c = this.merge(c,conf);
                }
            }

            if (!c.template)
                c.template = that.conf.widgetTemplate;
            c = this.merge( c ,(that.metadata[key] || {}));
            //console.log('that.metadata',that.metadata);
            //console.log('_defaultWidgetConfig',key,c,that.conf[configName][key]);
            return c;
        },
        getFieldName : function (key) {
            return key;
        },
        isHiddenField : function(key) {
            var type = this.defaultWidgetType;
            if (this.fieldsConfig[key]) {
                if (typeof this.fieldsConfig[key] === 'string' || this.fieldsConfig[key] instanceof String)
                    type = this.fieldsConfig[key];
                else
                    type = this.fieldsConfig[key].type?this.fieldsConfig[key].type:type;

                if (type === 'w-hidden')
                    return true;
            }
            return false;
        }
    }
});
