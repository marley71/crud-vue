const CrudApp = Vue.extend({
    created : function() {
        var that = this;
        Vue.prototype.$crud = crud;
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
                    console.log('....method',m)
                    __call(k,m);
                }
            }
        }



        that.$crud.instance = that;
        that.$crud.pluginsPath = this.pluginsPath?this.pluginsPath:'/';
        var resources = [];
        resources.push(this.templatesFile);
        for (var k in this.$crud.components.libs) {
            if (that.$crud.components.libs[k].tpl)
                resources.push(that.$crud.components.libs[k].tpl);
            if (that.$crud.components.libs[k].js)
                resources.push(that.$crud.components.libs[k].js);
        }
        that.$crud.loadResources(resources,function () {
            console.log('monto app');

            that.$mount(that.el);
            console.log('mounted');
        })

    },
    methods : {
        onChangeViewConf : function (view) {
            
        },

    }
});