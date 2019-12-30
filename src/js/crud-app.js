const CrudApp = Vue.extend({
    created : function() {
        var that = this;

        for (var k in window) {
            //console.log('window key ',k);
            if (k.indexOf('_interface') > 0) {
                console.log('found interface ',k)
                var methods = window[k].methods || {};
                var __call = function (interface,lk) {
                    that.$Crud[lk] = function () {
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



        that.$Crud.instance = that;
        that.$Crud.pluginsPath = this.pluginsPath?this.pluginsPath:'/';
        var resources = [];
        resources.push(this.templatesFile);
        for (var k in this.$Crud.components.libs) {
            if (that.$Crud.components.libs[k].tpl)
                resources.push(that.$Crud.components.libs[k].tpl);
            if (that.$Crud.components.libs[k].js)
                resources.push(that.$Crud.components.libs[k].js);
        }
        that.$Crud.loadResources(resources,function () {
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