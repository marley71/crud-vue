Crud.components.views.vBase = Vue.component('v-base', {
    props : ['cConf','cFields'],
    extends : Crud.components.cComponent,
    data : function () {
        return this.defaultData();
    },
    mounted : function() {
        var that = this;
        var methods = that.conf?that.conf.methods:{};
        for (var k in methods) {
            console.log('v-base implements methods',k);
            that.methods[k] = function () {
                methods.apply(that,this.arguments);
            }
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
                    that.crudApp.errorDialog(json.msg);
                    return
                }
                callback(json);
            })
        },
        getActionConfig : function(name,type) {
            //console.log('v-base.getActionConfig',name,type,this.conf);
            if (this.conf.customActions[name]) {
                var aConf = {}
                //console.log('CUSTOM',name);
                if (!this.$options.components[name]) {
                    Vue.component(name, {
                        extends : actionBase
                    });
                } else {
                    aConf = this.$Crud.recordActions[name]?this.$Crud.recordActions[name]:(this.$Crud.globalActions[name]?this.$Crud.globalActions[name]:{})
                }
                return Utility.merge(aConf,this.conf.customActions[name]);
            }
            if (type == 'record') {
                if (this.$Crud.recordActions[name]) {
                    return Utility.cloneObj(this.$Crud.recordActions[name]);
                } else
                    throw "Azione " + name +  " di tipo record non trovata nelle azioni generali";
            }
            if (type == 'global') {
                if (this.$Crud.globalActions[name]) {
                    return Utility.cloneObj(this.$Crud.globalActions[name]);
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
            var defaltConf = this.$Crud.conf[type];


            if (this.cConf) {
                if (typeof this.cConf === 'string' || this.cConf instanceof String)
                    conf = window[this.cConf]?window[this.cConf]:(this.$Crud.conf[this.cConf]?this.$Crud.conf[this.cConf]:null);
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
                if (Crud.routes[that.conf.routeName]) {
                    route =  new Route(Crud.routes[that.conf.routeName]);
                } else {
                    route = Route.factory(that.conf.routeName);
                }
                route.values = values;
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
                type:that.defaultRenderType
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
        }
    },
    template : '<div>view base</div>'
});