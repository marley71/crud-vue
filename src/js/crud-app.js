const CrudApp = Vue.extend({
    mixins : [core_mixin,dialogs_mixin],
    data : function() {
        var d = {
            templatesFile : '/crud-vue/crud-vue.html',
            el : '#app',
            appConfig : null,
        }
        return d;
    },
    created : function() {
        var that = this;
        Vue.prototype.$crud = crud;
        //Vue.prototype.$lang = lang;
        //console.log('CrudApp',this.$data._NON_WORD_REGEXP);
        for (var k in window) {
            //console.log('window key ',k);
            if (k.indexOf('_interface') > 0) {
                console.log('found interface ',k)
                var methods = window[k].methods || {};
                var __call = function (interface,lk) {
                    that.$crud[lk] = function () {
                        var localk = new String(lk);
                        var int = new String(interface);
                        //var arguments = this.arguments;
                        //console.log(localk,'arguments',arguments);
                        return window[interface].methods[localk].apply(that,arguments);
                    }
                }
                for (var m in methods) {
                    //console.log('....method',m)
                    __call(k,m);
                }
            }
        }



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

        console.log('appConfig',that.$data.appConfig);
        if (that.$data.appConfig) {
            that.loadResource(that.$data.appConfig, function () {
                __loadResources();
            })
        } else
            __loadResources();
    }
});

Vue.filter('translate', function (value,context) {
    var langKey = context?context+'.'+value:value;
    //console.log('translate global',value,context,langKey);
    return crud.lang[langKey]?crud.lang[langKey]:value;
})
