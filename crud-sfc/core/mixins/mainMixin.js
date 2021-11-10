import Server from '../../core/Server'
import jQuery from 'jquery'
import Vue from 'vue'
import httpVueLoader from 'http-vue-loader'

const mainMixin = {

    methods: {
        loadConfigurations (callback) {
            var that = this;
            that.loadLanguageFile(function () {
                that.loadRoutesFile(function () {
                    that.loadActionsFile( function () {
                        that.loadEnvFile(function () {
                            that.loadEnvMeta();
                            that.loadDynamicSfc(function () {
                                var initFuncion = that.getMetaValue('crud.init');
                                console.log('initFunction',initFuncion);
                                if (typeof window[initFuncion] === 'function') {
                                    //if (initFuncion) {
                                    window[initFuncion].apply(that,[callback]);
                                    //window[initFuncion](callback);
                                }
                                else
                                    return callback();
                            })
                        })
                    })
                })
            })
        },
        getMetaValue (key) {
            return jQuery('meta[name="'+ key + '"]').attr('content');
        },
        loadLanguageFile (callback) {
            var that = this;
            var languageFile = that.getMetaValue('crud.translations');
            if (languageFile) {
                Server.get(languageFile,{},function (json) {
                    console.log('caricato file',languageFile);
                    that.$crud.lang = json;
                    return callback();
                })
            } else
                return callback();
        },
        loadRoutesFile (callback) {
            var that = this;
            var routesFile = that.getMetaValue('crud.routes');
            if (routesFile) {
                Server.get(routesFile,{},function (json) {
                    console.log('caricato file',routesFile);
                    for (var k in json) {
                        that.$crud.routes[k] = json[k];
                        return callback();
                    }

                })
            } else
                return callback();
        },
        loadActionsFile (callback) {
            var that = this;
            var actionsFile = that.getMetaValue('crud.actions');
            if (actionsFile) {
                Server.get(actionsFile,{},function (json) {
                    console.log('caricato file',actionsFile);
                    for (var k in json) {
                        that.$crud.actions[k] = json[k];
                    }
                    return callback();
                })
            }else
                return callback();
        },
        loadEnvMeta () {
            var that = this;
            var nokey = "crud.env.";
            jQuery('meta[name*="crud.env."]').each(function () {
                var name = jQuery(this).attr('name');
                var key = name.substr(nokey.length);
                console.log('filedKey', key);
                that.$crud.env[key] = jQuery(this).attr('content');
            })
        },
        loadEnvFile (callback) {
            var that = this;
            var envFile = that.getMetaValue('crud.env-file');
            if (envFile) {
                Server.get(envFile,{},function (json) {
                    console.log('caricato env file',envFile);
                    that.$crud.env = json;
                    return callback();
                })
            } else
                return callback();
        },
        loadDynamicSfc(callback) {
            var that = this;
            // caricamento asincrono sfc file
            var _rq = that.$crud.env.dynamicRequires || {};
            var _rqKeys = Object.keys(_rq);
            var i = 0;

            var __loadSfc = function () {
                if (i === _rqKeys.length) {
                    // finito
                    return callback();
                    app.$mount('#app')
                    return
                }
                var k = _rqKeys[i]
                var promise = httpVueLoader(_rq[k], k)
                console.log('promise', promise)
                promise().then(function (comp) {
                    console.log('promise then', k, comp)
                    Vue.component(k, comp)
                })
                i++;
                __loadSfc();
            }

            __loadSfc();
        }
    }
}
export default mainMixin
