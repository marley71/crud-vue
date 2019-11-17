const CrudApp = Vue.extend({
    created : function() {
        var that = this;
        that.crudApp.pluginsPath = this.pluginsPath?this.plugisPath:'/';
        var resources = [];
        resources.push(this.templatesFile);
        for (var k in this.$Crud.components.libs) {
            if (that.$Crud.components.libs[k].tpl)
                resources.push(that.$Crud.components.libs[k].tpl);
            if (that.$Crud.components.libs[k].js)
                resources.push(that.$Crud.components.libs[k].js);
        }
        that.crudApp.loadResources(resources,function () {
            console.log('monto app');
            that.$mount('#app');
            console.log('mounted');
        })

    },
    methods : {
        onChangeViewConf : function (view) {
            
        }
    }
});