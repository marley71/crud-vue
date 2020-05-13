crud.components.widgets.wUpload = Vue.component('w-upload',{
    extends : crud.components.widgets.wBase,
    template : '#w-upload-template',
    data : function () {
        var d = this._loadConf();
        d.conf = this.cConf;
        console.log('w-upload data',d);
        d.extensions = d.conf.extensions?d.conf.extensions:'';
        d.maxFileSize = d.conf.maxFileSize?d.conf.maxFileSize:'';
        d.error = false;
        d.errorMessage = '';
        return d;
    },

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
