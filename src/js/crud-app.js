const CrudApp = Vue.extend({
    mixins : [core_mixin,dialogs_mixin],
    data : function() {
        var d = {
            templatesFile : '/crud-vue/crud-vue.html',
            el : '#app',
            appConfig : null,
            appComponents : '/crud-vue/crud-vue-components.js',
        }
        return d;
    },
    created : function() {
        var that = this;
        Vue.prototype.$crud = crud;
        that.$crud.instance = that;
        that.$crud.pluginsPath = that.$data.pluginsPath?that.$data.pluginsPath:'/';
        var __loadResources = function () {
            var resources = [];
            resources.push(that.$data.templatesFile);
            for (var k in that.$crud.components.libs) {
                if (that.$crud.components.libs[k].tpl)
                    resources.push(that.$crud.components.libs[k].tpl);
                if (that.$crud.components.libs[k].js)
                    resources.push(that.$crud.components.libs[k].js);
            }
            console.log('resources',resources)
            that.loadResources(resources,function () {
                console.log('monto app');
                that.$mount(that.el);
                console.log('mounted');
            })
        }
        console.log('load framework components.  ' + that.$data.appComponents);
        if (!jQuery.isArray(that.$data.appComponents))
            that.$data.appComponents = [that.$data.appComponents];
        that.loadResources(that.$data.appComponents, function () {
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
