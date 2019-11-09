const CrudVue = Vue.extend({
    created : function() {
        var that = this;
        that.crudApp.pluginsPath = this.pluginsPath?this.plugisPath:'/';
        var resources = [];
        resources.push(this.templatesFile);
        for (var k in this.$Crud.components.libs) {
            resources.push(that.$Crud.components.libs[k].tpl);
            resources.push(that.$Crud.components.libs[k].js);
        }
        that.crudApp.loadResources(resources,function () {
            that.$mount('#app');
        })

    },
    data : function () {

    },
    methods : {
        onChangeViewConf : function (view) {
            
        }
    }
});