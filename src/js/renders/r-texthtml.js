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
            var options = that.conf.pluginOptions || {
                content : that.value
            };
            options = Utility.cloneObj(options);
            that.jQe('.summernote').summernote(options);
            jQuery('.summernote').on('summernote.change', function() {
                //console.log('Enter/Return key pressed',jQuery('.summernote').summernote('code'));
                that.jQe('[c-sum]').val(jQuery('.summernote').summernote('code'));
                that.jQe('[c-sum]').trigger('change');
                //that.jQe('[c-sum]').val('hh')
            });
        }
    }
});