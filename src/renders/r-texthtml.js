Vue.component('r-texthtml',{
    extends : Crud.components.renders.rBase,
    template: '#r-texthtml-template',
    methods : {
        afterLoadResources : function () {
            var that = this;
            var options = that.cConf.pluginOptions || {};
            options = Utility.cloneObj(options);
            that.jQe('[c-summernote]').summernote(options)
        }
    }
});