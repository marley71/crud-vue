import Server from '../../core/Server'
import jQuery from 'jquery'

const mainMixin = {
    created () {
        var that = this;
        that.loadLanguageFile();
        that.loadRoutesFile();
        that.loadActionsFile();
        that.loadEnvFile();
    },

    methods: {
        getMetaValue (key) {
            return jQuery('meta[name="'+ key + '"]').attr('content');
        },
        loadLanguageFile () {
            var that = this;
            var languageFile = that.getMetaValue('crud.translations');
            if (languageFile) {
                Server.get(languageFile,{},function (json) {
                    console.log('caricato file',languageFile);
                    that.$crud.lang = json;
                })
            }
        },
        loadRoutesFile () {
            var that = this;
            var routesFile = that.getMetaValue('crud.routes');
            if (routesFile) {
                Server.get(routesFile,{},function (json) {
                    console.log('caricato file',routesFile);
                    for (var k in json) {
                        that.$crud.routes[k] = json[k];
                    }

                })
            }
        },
        loadActionsFile () {
            var that = this;
            var actionsFile = that.getMetaValue('crud.actions');
            if (actionsFile) {
                Server.get(actionsFile,{},function (json) {
                    console.log('caricato file',actionsFile);
                    for (var k in json) {
                        that.$crud.actions[k] = json[k];
                    }

                })
            }
        },
        loadEnvFile () {
            var that = this;
            var nokey = "crud.env.";
            jQuery('meta[name*="crud.env."]').each(function () {
                var name = jQuery(this).attr('name');
                var key = name.substr(nokey.length);
                console.log('filedKey', key);
                that.$crud.env[key] = jQuery(this).attr('content');
            })
        }
    }
}
export default mainMixin