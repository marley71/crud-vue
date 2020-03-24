Vue.component('r-upload-ajax',{
    extends : crud.components.renders.rBase,
    template : '#r-upload-ajax-template',
    data : function () {
        var d = this.defaultData();
        //d.conf = this.cConf || {};
        //var metadata = d.conf.metadata || {};
        d.extensions = d.extensions?d.extensions:[];
        d.maxFileSize = d.maxFileSize?d.maxFileSize:'';
        d.uploadConf = d.conf;
        var value = d.value || {};
        d.previewConf = {
            value : value,
            cRef : this._uid + 'preview'
        }
        d.value = JSON.stringify(value).replace(/\\"/g, '"');
        // d.previewConf = {
        //     value : d.conf.value,
        //     metadata :  {
        //         mimetype : 'image/jpeg'
        //     }
        // };
        d.error = false;
        d.errorMessage = '';
        console.log('r-upload data',d);
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
                that.sendAjax();
            } else
                that.onError();
        },
        sendAjax : function () {
            var that = this;
            // if (!that.$refs.refUpload) {
            //     throw 'riferimento a file upload non valido';
            // }
            RUPLOAD = that;
            var fDesc = that.getValue();
            if (!fDesc)
                throw 'descrittore file upload non valido';

            console.log('fDesc',fDesc);

            var fileName = fDesc.filename;
            //var fileName = 'Schermata 2019-07-31 alle 14.40.20.png';

            //var routeConf =  Utility.cloneObj(that.$crud.routes.uploadfile);
            var route = Route.factory('uploadfile');
            route.fillValues(that);

            that.error = false;
            that.complete = false;

            var realUrl = Server.getUrl(route.getUrl());
            var fdata = new FormData();
            //data.append('file',jQuery(that.$el).find('[c-image-file]').prop('files')[0]);
            fdata.append('file',fDesc)
            console.log('ajaxFields',that.ajaxFields)
            for (var k in that.ajaxFields)
                fdata.append(k,that.ajaxFields[k])

            jQuery.ajax({
                url: realUrl,
                headers: {
                    'X-CSRF-TOKEN': jQuery('meta[name="csrf-token"]').attr('content')
                },
                type: 'POST',
                data: fdata,
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
                // var pconf = {
                //     value : data.result.url,
                //     metadata :  {
                //         mimetype : data.result.mimetype
                //     }
                // };

                console.log('data.result',data.result);
                //that.$crud.cRefs[that._uid+'preview'].value = data.result;


                //that.$set(that,'previewConf', {value : data.result});
                that.lastUpload = that.$crud.cloneObj(data.result);

                //jQuery(that.$el).find('input[name="' + that.cKey +'"]');
                //jQuery('<input name="' + that.name + '" type="hidden" value=\'' + JSON.stringify(data.result).replace(/\\"/g, '"') + '\'>').appendTo(jQuery(that.$el));
                that.value = JSON.stringify(data.result); //.replace(/\\"/g, '"');

                // for (var k in data.result) {
                //     console.log('update field',k,data.result[k],jQuery(that.$el).find('[c-marker="' + k + '"]').length);
                //     jQuery(that.$el).find('[c-marker="' + k + '"]').val(data.result[k]);
                // }
                var refPreview = that._uid + 'preview';
                //console.log('refPreview',refPreview,that.$crud.cRefs[refPreview])
                that.$crud.cRefs[refPreview].value = data.result;
            }).fail(function(data, error, msg){
                console.log("An error occurred, the files couldn't be sent!");
                that.lastUpload = false;
                that.error = true;
                that.errorMessage = "Upload error " + data + " " + error + " " + msg;
            });
        },
    }
})
