crud.components.renders.rUpload = Vue.component('r-upload',{
    extends : crud.components.renders.rBase,
    template : '#r-upload-template',
    data : function () {
        var d = this._loadConf();
        d.conf = this.cConf;
        console.log('r-upload data',d);
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
                that.value =
                that.$emit('success', that);
            }
            else
                that.$emit('error',that);
            /*var extPos = fileupload.lastIndexOf('.');
            var ext = "";
            if (extPos >= 0) {
                ext = fileupload.substr(extPos + 1);
            }
            var cext = ext.toLowerCase();
            switch (cext) {
                case 'xls':
                case 'xlsx':
                case 'csv':
                case 'txt': /!* case 'docx': case 'pdf': case 'wps': case 'rtf':  case 'txt': case 'xps': *!/
                    if (self.iszip) {
                        self.app.waitEnd();
                        self.app.errorDialog("(" + cext + ") Estensione del file non valida");
                        var control = self.uploadForm.find('input[name="file"]');
                        control.val("");
                        return false;
                    }
                    break;
                case 'zip':
                    if (!self.iszip) {
                        self.app.waitEnd();
                        self.app.errorDialog("(" + cext + ") Compressione file non accettata");
                        var control = self.uploadForm.find('input[name="file"]');
                        control.val("");
                        return false;
                    }
                    break;
                default:
                    self.app.waitEnd();
                    self.app.errorDialog("(" + cext + ") Estensione del file non riconosciuta");
                    var control = self.uploadForm.find('input[name="file"]');
                    control.val("");
                    return false;
            }*/
        }
    }
})
