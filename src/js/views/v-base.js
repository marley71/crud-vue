crud.components.views.vBase = Vue.component('v-base', {
    props : ['cFields','cTargetRef'],
    extends : crud.components.cComponent,
    components : {
        vAction : Vue.component('v-action', {
            //extends: crud.components.cComponent,
            props: ['cName', 'cAction'],
            data: function () {
                var that = this;
                //console.log('v-action',this.cKey,this.cAction);
                var aConf = {
                    name: 'action-base',
                    conf: {},
                }
                if (this.cAction) {
                    //console.log('V-RENDER2 ',this.cRender,this.$parent.widgets);
                    aConf = {
                        name: this.cName,
                        conf: this.cAction
                    }
                } else {
                    console.warn('configurazione azione non valida', this.cName, this.cAction);
                }
                aConf.conf.view = that.$parent;
                console.log('v-action create', aConf);
                return aConf;
            },
            template: '<component :is="name" :c-conf="conf"></component>'
        }),
        vWidget : Vue.component('v-widget', {
            //extends : crud.components.cComponent,
            props : ['cKey','cWidget'],
            data : function() {
                if (this.cKey) {
                    var ckeys = this.cKey.split(',');
                    var widget = null;
                    for (var i in ckeys) {
                        widget = this.$parent.widgets[ckeys[i]];
                    }
                    //var render = this.$parent.widgets[this.cKey];
                    //console.log('key',ckeys,'V-RENDER ',render,this.$parent.widgets);
                    return {
                        type : widget.type,
                        conf : widget
                    }
                }

                if (this.cWidget) {
                    var conf = null;
                    if (typeof this.cWidget === 'string' || this.cWidget instanceof String) {
                        conf = this.getDescendantProp(window, this.cWidget);
                        if (!conf) {
                            conf = this.getDescendantProp(this.$crud.conf, this.cWidget);
                        }
                    } else
                        conf = this.cWidget;

                    //console.log('V-RENDER2 ',conf,this.$parent.widgets);
                    return {
                        type : conf.type,
                        conf : conf
                    }
                }
                console.warn('configurazione non valida',this.cKey,this.cWidget);
                return {
                    type : 'w-text',
                    conf : {},
                }

            },
            template : '<component :is="type" :c-conf="conf"></component>'
        }),
    },
    data : function () {
        return {
            viewTitle : '',
            langContext : '',
            targetRef : this.cTargetRef,
            errorMsg : '',
        }
    },
    methods : {
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
            if (this.conf.customActions[name]) {
                var aConf = {}
                if (!this.$options.components[name]) {
                    //console.log('estendo azioni ',name);
                    Vue.component(name, {
                        extends : crud.components.actions.actionBase
                    });
                } else {
                    aConf = this.$crud.recordActions[name]?this.$crud.recordActions[name]:(this.$crud.collectionActions[name]?this.$crud.collectionActions[name]:{})
                }
                aConf = this.merge(aConf,this.conf.customActions[name]);
                //console.log('CUSTOM',name,aConf);
                return aConf;
            }
            if (type == 'record') {
                if (this.$crud.recordActions[name]) {
                    return this.cloneObj(this.$crud.recordActions[name]);
                } else
                    throw "Azione " + name +  " di tipo record non trovata nelle azioni generali";
            }
            if (type == 'collection') {
                if (this.$crud.collectionActions[name]) {
                    return this.cloneObj(this.$crud.collectionActions[name]);
                } else
                    throw "Azione " + name +  " di tipo collection non trovata nelle azioni generali";
            }
            throw "tipo azione type " + type +  " con nome " + name + " non trovata!";
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
            console.log('finalConf',finalConf);
            return d;
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
            //c.metadata = this.merge( (c.metadata || {}),(that.data.metadata[key] || {}));
            //console.log('AAAAAAa',that);
            c = this.merge( c ,(that.metadata[key] || {}));
            return c;
        },
        getFieldName : function (key) {
            return key;
        }
    },
    template : '<div>view base</div>'
});
