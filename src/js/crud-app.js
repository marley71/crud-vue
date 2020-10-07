const CrudApp = Vue.extend({
    mixins : [core_mixin,dialogs_mixin],
    data : function() {
        var d = {
            //templatesFile : '/crud-vue/crud-vue.html',
            templatesFiles : [
                '/crud-vue/components/actions.html',
                '/crud-vue/components/misc.html',
                '/crud-vue/components/widgets.html',
                '/crud-vue/components/views.html',
            ],
            el : '#app',
            appConfig : null,
            componentsFiles : [
                '/crud-vue/components/actions.js',
                '/crud-vue/components/misc.js',
                '/crud-vue/components/widgets.js',
                '/crud-vue/components/views.js',
            ]
            //appComponents : '/crud-vue/crud-vue-components.js',
        }
        return d;
    },
    created : function() {
        var that = this;
        Vue.prototype.$crud = crud;
        that.$crud.instance = that;
        that.$crud.pluginsPath = that.$data.pluginsPath?that.$data.pluginsPath:'/';
        that.$crud.EventBus = new Vue();
        var __loadResources = function () {
            var resources = [];
            // carico i template del core
            if (!Array.isArray(that.$data.templatesFiles))
                that.$data.templatesFiles = [that.$data.templatesFiles];
            for (var k in that.$data.templatesFiles) {
                resources.push(that.$data.templatesFiles[k]);
            }
            //resources.push(that.$data.templatesFiles);
            // carico eventuali componenti applicativi esterni
            for (var k in that.$crud.components.libs) {
                if (that.$crud.components.libs[k].tpl)
                    resources.push(that.$crud.components.libs[k].tpl);
                if (that.$crud.components.libs[k].js)
                    resources.push(that.$crud.components.libs[k].js);
            }
            console.log('resources',resources)
            that.loadResources(resources,function () {
                that.$mount(that.el);
                // lancio l'evento che e' tutto caricato
                window.dispatchEvent(new Event('crud-app-loaded'))
            })
        }
        console.log('load framework components.  ' + that.$data.componentsFiles);
        if (!jQuery.isArray(that.$data.componentsFiles))
            that.$data.componentsFiles = [that.$data.componentsFiles];
        that.loadResources(that.$data.componentsFiles, function () {
            console.log('appConfig',that.$data.appConfig);
            if (that.$data.appConfig) {
                if (!jQuery.isArray(that.$data.appConfig))
                    that.$data.appConfig = [that.$data.appConfig];

                that.loadResources(that.$data.appConfig, function () {
                    __loadResources();
                })
            } else
                __loadResources();
        });
    }
});

Vue.filter('translate', function (value,context,plural,params) {
    var langKey = context?context+'.'+value:value;
    if (crud.instance.hasTranslation(langKey))
        return crud.instance.translate(langKey,plural,params);
    return value;
})
