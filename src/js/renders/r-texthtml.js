Vue.component('r-texthtml',{
    extends : crud.components.renders.rBase,
    template: '#r-texthtml-template',
    data : function() {
        var d = this.defaultData();
        if (!( 'resources' in d.conf) ) {
            d.conf.resources = [
                'https://cdnjs.cloudflare.com/ajax/libs/summernote/0.8.12/summernote.css',
                'https://cdnjs.cloudflare.com/ajax/libs/summernote/0.8.12/summernote.min.js'
            ];
        }
        return d;
    },
    methods : {
        afterLoadResources : function () {
            var that = this;
            var options = that.cConf.pluginOptions || {};
            options = Utility.cloneObj(options);
            that.jQe('[c-summernote]').summernote(options)
        }
    }
});