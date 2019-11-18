Vue.component('r-upload-ajax',{
    extends : Crud.components.renders.rUpload,
    template : '#r-upload-ajax-template',
    data : function () {
        var d = this.defaultData();
        d.conf = this.cConf;
        console.log('r-upload data',d);
        d.extensions = d.conf.metadata.extensions?d.conf.metadata.extensions:'';
        d.maxFileSize = d.conf.metadata.maxFileSize?d.conf.metadata.maxFileSize:'';
        d.uploadConf = d.conf;
        d.previewConf = {
            metadata : {}
        };
        d.error = false;
        d.errorMessage = '';
        return d;
    },

    methods : {

        onError : function() {

        },
        validate : function () {
            var that = this;
            //TODO eseguire validazione
            console.log('validate');
            that.change();
            if (that._validate()) {
                that.sendAjax();
            } else
                that.onError();
        },
        sendAjax : function () {
            var that = this;
            if (!that.$refs.refUpload) {
                throw 'riferimento a file upload non valido';
            }
            var fDesc = that.$refs.refUpload.getValue();
            if (!fDesc)
                throw 'descrittore file upload non valido';

            console.log('fDesc',fDesc);

            var fileName = fDesc.filename;
            var fileName = 'Schermata 2019-07-31 alle 14.40.20.png';

            var routeConf =  Utility.cloneObj(that.$Crud.routes.uploadfile);
            var route = Route.factory('uploadfile',routeConf);

            that.error = false;
            that.complete = false;

            var realUrl = Server.getUrl(route.getUrl());
            var data = new FormData();
            //data.append('file',jQuery(that.$el).find('[c-image-file]').prop('files')[0]);
            data.append('file',fDesc)
            for (var k in that.conf.metadata.ajaxFields)
                data.append(k,that.conf.metadata.ajaxFields)

            jQuery.ajax({
                url: realUrl,
                headers: {
                    'X-CSRF-TOKEN': jQuery('meta[name="csrf-token"]').attr('content')
                },
                type: 'POST',
                data: data,
                processData: false,
                contentType: false                    // Using FormData, no need to process data.
            }).done(function(data){
                that.error = data.error;
                that.lastUpload = null;
                console.log("Success: Files sent!",data);
                if (data.error) {
                    var msg = null;
                    try {
                        var tmp = JSON.parse(data.msg);
                        msg = "";
                        for(k in tmp) {
                            msg += tmp[k]+'\n';
                        }
                    } catch(e) {
                        msg = data.msg;
                    }
                    that.errorMessage = msg;
                    //self._showError(dialog,msg);
                    jQuery(that.$el).find('[crud-button="ok"]').addClass("disabled");
                    return;
                }
                that.$emit('success',that);
                that.complete = true;
                var pconf = {
                    value : data.result.url,
                    metadata :  {
                        mimetype : data.result.mimetype
                    }
                };
                that.previewConf = pconf;
                that.lastUpload = Utility.cloneObj(data.result);
                for (var k in data.result) {
                    console.log('update field',k,data.result[k],jQuery(that.$el).find('[c-marker="' + k + '"]').length);
                    jQuery(that.$el).find('[c-marker="' + k + '"]').val(data.result[k]);
                }

            }).fail(function(data, error, msg){
                console.log("An error occurred, the files couldn't be sent!");
                that.lastUpload = false;
                that.error = true;
                that.errorMessage = "Upload error " + data + " " + error + " " + msg;
            });
        },
    }
})