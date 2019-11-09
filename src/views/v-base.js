Crud.components.views.vBase = Vue.component('v-base', {
    props : ['cConf'],
    extends : Crud.components.cComponent,
    data : function () {
        return this.defaultData();
    },
    mounted : function() {
        var that =this;
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

            if (this.conf.customActions[name]) {
                var aConf = {}
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
            if (!that.route)
                route = Route.factory(that.conf.routeName);
            route.values = values;
            return route;
        },
    },
    template : '<div>view base</div>'
});