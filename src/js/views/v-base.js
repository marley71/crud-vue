crud.components.views.vAction = Vue.component('v-action', {
    extends : crud.components.cComponent,
    props : ['cName','cAction'],
    data : function () {
        var that = this;
        //console.log('v-action',this.cKey,this.cAction);
        var aConf =  {
            name: 'action-base',
            conf: {},
        }
        if (this.cAction) {
            //console.log('V-RENDER2 ',this.cRender,this.$parent.renders);
            aConf =  {
                name : this.cName,
                conf : this.cAction
            }
        } else {
            console.warn('configurazione azione non valida', this.cName, this.cAction);
        }
        aConf.conf.view = that.$parent;
        console.log('v-action create',aConf);
        return aConf;
    },
    template : '<component :is="name" :c-conf="conf"></component>'
})

crud.components.views.vRender =  Vue.component('v-render', {
    extends : crud.components.cComponent,
    props : ['cKey','cRender'],
    // When the bound element is inserted into the DOM...
    mounted: function () {
        //console.log('v-render',this.cConf);
    },
    data : function() {
        if (this.cKey) {
            var ckeys = this.cKey.split(',');
            var render = null;
            for (var i in ckeys) {
                render = this.$parent.renders[ckeys[i]];
            }
            //var render = this.$parent.renders[this.cKey];
            console.log('key',ckeys,'V-RENDER ',render,this.$parent.renders);
            return {
                type : render.type,
                conf : render
            }
        }

        if (this.cRender) {
            var conf = null;
            if (typeof this.cRender === 'string' || this.cRender instanceof String) {
                conf = this.$crud.getDescendantProp(window, this.cRender);
                if (!conf) {
                    conf = this.$crud.getDescendantProp(this.$crud.conf, this.cRender);
                }
            } else
                conf = this.cRender;

            console.log('V-RENDER2 ',conf,this.$parent.renders);
            return {
                type : conf.type,
                conf : conf
            }
        }
        console.warn('configurazione non valida',this.cKey,this.cRender);
        return {
            type : 'r-text',
            conf : {},
        }

    },
    template : '<component :is="type" :c-conf="conf"></component>'
})

crud.components.views.vBase = Vue.component('v-base', {
    props : ['cFields'],
    extends : crud.components.cComponent,
    // created : function() {
    //     var that = this;
    //     var _conf = that.getConf(that.cConf) || {};
    //     for (var k in _conf.methods) {
    //         console.log('v-base implements methods',k);
    //         that[k] = function () {
    //             var arguments = this.arguments;
    //             console.log('arguments');
    //             _conf.methods[k].apply(that,arguments);
    //         }
    //     }
    // },
    data : function () {
        //var d = this._loadConf();
        return {
            viewTitle : '',
            langContext : '',
        }
        // d.viewTitle = '';
        // d.langContext = null;
        // return d;
    },
    // mounted : function() {
    //     var that = this;
    //     var __call = function (lk) {
    //         that[lk] = function () {
    //             var localk = new String(lk);
    //             //var arguments = this.arguments;
    //             console.log(localk,'arguments',arguments);
    //             return that.conf.methods[localk].apply(that,arguments);
    //         }
    //     }
    //     for (var k in that.conf.methods) {
    //         __call(k);
    //     }
    //
    //     if ( that.conf.mounted ) {
    //         that.conf.mounted.apply(that);
    //     }
    // },
    methods : {
        // defaultData : function () {
        //     var _c = this.cConf || {};
        //     return {
        //         viewTitle : '',
        //         conf : _c,
        //         langContext : null,
        //     }
        // },

        fetchData: function (route,callback) {
            var that = this;
            if (!route) {
                callback({});
                return;
            }
            console.log('fetchData',route.getConf());
            Server.route(route,function (json) {
                if (json.error) {
                    that.$crud.errorDialog(json.msg);
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
                        extends : actionBase
                    });
                } else {
                    aConf = this.$crud.recordActions[name]?this.$crud.recordActions[name]:(this.$crud.collectionActions[name]?this.$crud.collectionActions[name]:{})
                }
                aConf = this.$crud.merge(aConf,this.conf.customActions[name]);
                //console.log('CUSTOM',name,aConf);
                return aConf;
            }
            if (type == 'record') {
                if (this.$crud.recordActions[name]) {
                    return this.$crud.cloneObj(this.$crud.recordActions[name]);
                } else
                    throw "Azione " + name +  " di tipo record non trovata nelle azioni generali";
            }
            if (type == 'collection') {
                if (this.$crud.collectionActions[name]) {
                    return this.$crud.cloneObj(this.$crud.collectionActions[name]);
                } else
                    throw "Azione " + name +  " di tipo collection non trovata nelle azioni generali";
            }
            throw "tipo azione type " + type +  " con nome " + name + " non trovata!";
        },
        /**
         * prende la configurazione assegnata alla view
         * @param modelName
         * @param type
         */
        // getConf : function (modelName,type) {
        //     var conf = null;
        //     var defaultConf = this.$crud.conf[type];
        //     //console.log('cConf',this.cConf);
        //
        //     if (this.cConf) {
        //         if (typeof this.cConf === 'string' || this.cConf instanceof String)
        //             conf = window[this.cConf]?window[this.cConf]:(this.$crud.conf[this.cConf]?this.$crud.conf[this.cConf]:null);
        //         else
        //             conf = this.cConf;
        //     } else {
        //         console.log('Check exist default conf '+ 'Model'+this.$crud.pascalCase(modelName));
        //         if (window['Model'+this.$crud.pascalCase(modelName)]) {
        //             var cm = window['Model'+this.$crud.pascalCase(modelName)];
        //             if (cm[type])
        //                 conf = cm[type];
        //             else {
        //                 if (type == 'insert' && cm['edit'])
        //                     conf = cm['edit'];
        //                 else {
        //                     conf = this.$crud.conf[type];
        //                 }
        //             }
        //
        //         } else {
        //             //onsole.log('get default crud conf ',type)
        //             conf = this.$crud.conf[type];
        //         }
        //     }
        //     if (!conf)
        //         throw "Nessuna configurazione trovata per questa view";
        //     //console.log('merge confs',defaultConf,conf);
        //     var finalConf = this.$crud.confMerge(defaultConf,conf);
        //     console.log('finalConf',finalConf);
        //     return finalConf;
        // },

        _loadConf : function(modelName,type) {
            var conf = null;
            var d = {};
            var defaultConf = this.$crud.conf[type];
            console.log('_loadConf',modelName,type,'defaultConf',defaultConf,'cConf',this.cConf);

            if (this.cConf) {
                if (typeof this.cConf === 'string' || this.cConf instanceof String) {
                    conf = this.$crud.getDescendantProp(window, this.cConf);
                    if (!conf) {
                        conf = this.$crud.getDescendantProp(this.$crud.conf, this.cConf);
                    }
                }
                else
                    conf = this.cConf;
            } else {
                console.log('Check exist default conf '+ 'Model'+this.$crud.pascalCase(modelName));
                if (window['Model'+this.$crud.pascalCase(modelName)]) {
                    var cm = window['Model'+this.$crud.pascalCase(modelName)];
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
            if (!conf)
                throw "Nessuna configurazione trovata per questa view";
            //console.log('merge confs',defaultConf,conf);
            var finalConf = this.$crud.confMerge(defaultConf,conf);

            for (var k in finalConf) {
                if (k == 'methods')
                    continue;
                d[k] = finalConf[k];
            }
            d.conf = finalConf;
            console.log('finalConf',finalConf);
            return d;

            // var _c = this.cConf || {};
            // var d = {};
            // for (var k in _c) {
            //     if (k == 'methods')
            //         continue;
            //     d[k] = _c[k];
            // }
            // d.conf = _c;
            // return d;
        },




        // /**
        //  * setta la configurazione della route secondo le proprie esigenze.
        //  * @param route
        //  * @returns {*}
        //  */
        // setRouteValues : function(route) {
        //     return route;
        // },

        // _getRoute : function () {
        //     var that = this;
        //     var route = null;
        //     console.log('_getRoute',that.conf);
        //     if (!that.conf)
        //         return route;
        //     if (that.conf.routeName == null)
        //         return route;
        //     if (!that.route) {
        //         if (crud.routes[that.conf.routeName]) {
        //             route =  new Route(crud.routes[that.conf.routeName]);
        //         }
        //     }
        //     return route;
        // },
        /**
         * ritorna la configurazione minimale di base di un render rispettando le priorita' tra le configurazioni
         * @param key : nome del campo di cui vogliamo la configurazione
         * @param confiName : nome variabile configurazione nell'oggetto conf. opzionale
         * @returns {{type: *}}
         * @private
         */
        _defaultRenderConfig : function(key,configName) {
            var that = this;
            var c = {
                type:that.defaultRenderType,
                value : null,
                operator : null,
            };
            configName = configName?configName:'fieldsConfig';
            var conf = (that.conf[configName] && that.conf[configName][key])?that.conf[configName][key]:null;
            //console.log('CONF',key,conf,configName,that.conf[configName]);
            if (conf) {
                // in caso di stringa lo considero come il type del render
                if (typeof conf === 'string' || conf instanceof String) {
                    c.type = conf;
                } else {
                    c = this.$crud.merge(c,conf);
                }
            }

            if (!c.template)
                c.template = that.conf.renderTemplate;
            //c.metadata = this.$crud.merge( (c.metadata || {}),(that.data.metadata[key] || {}));
            c = this.$crud.merge( c ,(that.data.metadata[key] || {}));
            return c;
        },
        getFieldName : function (key) {
            return key;
        }
    },
    template : '<div>view base</div>'
});
