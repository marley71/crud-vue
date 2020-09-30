crud.components.widgets.coreWTexthtml = Vue.component('core-w-texthtml',{
    extends : crud.components.widgets.wBase,
    // data : function() {
    //     var d = this._loadConf();
    //     if (!( 'resources' in d.conf) ) {
    //         d.conf.resources = [
    //             //'https://cdnjs.cloudflare.com/ajax/libs/summernote/0.8.12/summernote.css',
    //             //'https://cdnjs.cloudflare.com/ajax/libs/summernote/0.8.12/summernote.min.js',
    //             'https://cdn.jsdelivr.net/npm/summernote-bootstrap4@0.0.5/dist/summernote.css',
    //             'https://cdn.jsdelivr.net/npm/summernote-bootstrap4@0.0.5/dist/summernote.min.js'
    //
    //         ];
    //     }
    //     return d;
    // },
    methods : {
        afterLoadResources : function () {
            var that = this;
            var options = that.pluginOptions || {
                content : that.value,
                //airMode : true
            };
            options = this.cloneObj(options);
            that.jQe('.summernote').summernote(options);
            jQuery('.summernote').on('summernote.change', function() {
                //console.log('Enter/Return key pressed',jQuery('.summernote').summernote('code'));
                that.jQe('[c-summernote]').val(jQuery('.summernote').summernote('code'));
                //that.jQe('[c-sum]').trigger('change');
                that.change();
                //that.jQe('[c-sum]').val('hh')
            })
            jQuery('.summernote').summernote('focus');
        },
        getValue : function () {
            var that = this;
            return that.jQe('[c-summernote]').val();
        }
    }
});
