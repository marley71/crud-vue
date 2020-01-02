Vue.component('v-action', {
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

Vue.component('v-render', {
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
            //console.log('V-RENDER2 ',this.cRender,this.$parent.renders);
            return {
                type : this.cRender.type,
                conf : this.cRender
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
    props : ['cConf','cFields'],
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
        return this.defaultData();
    },
    mounted : function() {
        var that = this;
        //var methods = that.conf?that.conf.methods:{};
        // for (var k in methods) {
        //     console.log('v-base implements methods',k);
        //     that.methods[k] = function () {
        //         methods.apply(that,this.arguments);
        //     }
        // }
        var __call = function (lk) {
            that[lk] = function () {
                var localk = new String(lk);
                //var arguments = this.arguments;
                console.log(localk,'arguments',arguments);
                return that.conf.methods[localk].apply(that,arguments);
            }
        }
        for (var k in that.conf.methods) {
            //console.log('v-base implements methods',k);
            __call(k);
            // that[k] = function () {
            //     var localk = new String(k);
            //     //var arguments = this.arguments;
            //     console.log(localk,'arguments',arguments);
            //     return that.conf.methods[k].apply(that,arguments);
            // }
        }

        if ( that.conf.mounted ) {
            that.conf.mounted.apply(that);
        }
    },
    methods : {
        defaultData : function () {
            var _c = this.cConf || {};
            return {
                viewTitle : '',
                conf : _c,
            }
        },

        fetchData: function (route,callback) {
            var that = this;
            console.log('fetchData',route);
            if (!route) {
                callback({});
                return;
            }
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
                    aConf = this.$crud.recordActions[name]?this.$crud.recordActions[name]:(this.$crud.globalActions[name]?this.$crud.globalActions[name]:{})
                }
                aConf = Utility.merge(aConf,this.conf.customActions[name]);
                //console.log('CUSTOM',name,aConf);
                return aConf;
            }
            if (type == 'record') {
                if (this.$crud.recordActions[name]) {
                    return Utility.cloneObj(this.$crud.recordActions[name]);
                } else
                    throw "Azione " + name +  " di tipo record non trovata nelle azioni generali";
            }
            if (type == 'global') {
                if (this.$crud.globalActions[name]) {
                    return Utility.cloneObj(this.$crud.globalActions[name]);
                } else
                    throw "Azione " + name +  " di tipo global non trovata nelle azioni generali";
            }
            throw "tipo azione type " + type +  " con nome " + name + " non trovata!";
        },
        /**
         * prende la configurazione assegnata alla view
         * @param modelName
         * @param type
         */
        getConf : function (modelName,type) {
            var conf = null;
            var defaltConf = this.$crud.conf[type];


            if (this.cConf) {
                if (typeof this.cConf === 'string' || this.cConf instanceof String)
                    conf = window[this.cConf]?window[this.cConf]:(this.$crud.conf[this.cConf]?this.$crud.conf[this.cConf]:null);
                else
                    conf = this.cConf;
            } else {
                if (window['Model'+Utility.upperCaseFirst(modelName)]) {
                    var cm = window['Model'+Utility.upperCaseFirst(modelName)];
                    if (cm[type])
                        conf = cm[type];
                    if (type == 'insert' && cm['edit'])
                        conf = cm['edit'];
                }
            }
            if (!conf && !defaltConf)
                throw "Nessuna configurazione trovata per questa view";

            var finalConf = Utility.confMerge(defaltConf,conf);
            console.log('viewConf',finalConf,defaltConf,conf);
            return finalConf;
        },

        _getRoute : function (values) {
            var that = this;
            var route = null;
            console.log('_getRoute',that.conf);
            if (!that.conf)
                return null;
            if (that.conf.routeName == null)
                return null;
            if (!that.route) {
                if (crud.routes[that.conf.routeName]) {
                    route =  new Route(crud.routes[that.conf.routeName]);
                } else {
                    route = Route.factory(that.conf.routeName);
                }
                route.fillValues(that.conf);
                console.log('ROUTEN ',route.values);
                //route.values = values;
            }
            // if (!that.route)
            //     route = Route.factory(that.conf.routeName);
            // route.values = values;
            return route;
        },
        /**
         * ritorna la configurazione minimale di un render rispettando le priorita' tra le configurazioni
         * @param key
         * @returns {{type: *}}
         * @private
         */
        _defaultRenderConfig : function(key) {
            var that = this;
            var c = {
                type:that.defaultRenderType,
                value : null,
                operator : null,
            };
            if (that.conf.fieldsConfig[key]) {
                // in caso di stringa lo considero come il type del render
                if (typeof that.conf.fieldsConfig[key] === 'string' || that.conf.fieldsConfig[key] instanceof String) {
                    c.type = that.conf.fieldsConfig[key];
                } else {
                    c = Utility.merge(c,that.conf.fieldsConfig[key]);
                }
            }

            if (!c.template)
                c.template = that.conf.renderTemplate;
            c.metadata = Utility.merge( (c.metadata || {}),(that.data.metadata[key] || {}));

            return c;
        },
        getFieldName : function (key) {
            return key;
        }
    },
    template : '<div>view base</div>'
});