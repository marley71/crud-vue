crud.components.widgets.coreWUpload = Vue.component('core-w-upload',{
    extends : crud.components.widgets.wBase,
    // data : function () {
    //     var that = this;
    //     var _conf = that._getConf() || {};
    //     var d = {};
    //     d.extensions = _conf.extensions?_conf.extensions:'';
    //     d.maxFileSize = _conf.maxFileSize?_conf.maxFileSize:'';
    //     d.error = false;
    //     d.errorMessage = '';
    //     return d;
    // },

    methods : {
        getValue : function () {
            var that = this;
            console.log('filedesc',jQuery(that.$el).find('[c-file]').prop('files'));
            var fileDesc = jQuery(that.$el).find('[c-file]').prop('files');
            if (fileDesc.length) {
                return fileDesc[0];
            }

            return null;
        },
        _validate : function() {
            return true;
        },
        validate : function () {
            var that = this;
            //TODO eseguire validazione
            console.log('validate');
            that.change();
            if (that._validate()) {
                //that.value =
                that.$emit('success', that);
            }
            else
                that.$emit('error',that);
        }
    }
})
