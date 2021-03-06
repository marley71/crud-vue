crud.components.widgets.coreWUploadAjax = Vue.component('core-w-upload-ajax',{
    extends : crud.components.widgets.wBase,
    data : function () {
        var that = this;
        var _conf = that._getConf() || {};
        var d = {};
        d.extensions = _conf.extensions?_conf.extensions:[];
        d.maxFileSize = _conf.maxFileSize?_conf.maxFileSize:'';
        //d.uploadConf = d.conf;
        if (! ("routeName" in _conf) )
            d.routeName = 'uploadfile';

        var value = _conf.value || {};
        d.previewConf = {
            value : value,
            cRef : this._uid + 'preview'
        }
        d.value = JSON.stringify(value).replace(/\\"/g, '"');
        d.error = false;
        d.errorMessage = '';
        return d;
    },

    methods : {

        setRouteValues: function(route) {
            route.setValues({
                modelName : this.modelName
            })
            return route;
        },
        _getFileValue : function () {
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
            var fDesc = that._getFileValue();
            if (!fDesc)
                throw 'descrittore file upload non valido';
            var fileName = fDesc.filename;
            var route = that._getRoute();
            that.setRouteValues(route);
            that.error = false;
            that.complete = false;

            var realUrl = Server.getUrl(route.getUrl());
            console.log('realurl',route.getUrl())
            var fdata = new FormData();
            //data.append('file',jQuery(that.$el).find('[c-image-file]').prop('files')[0]);
            fdata.append('file',fDesc)
            console.log('ajaxFields',that.ajaxFields)
            for (var k in that.ajaxFields)
                fdata.append(k,that.ajaxFields[k])

            jQuery.ajax({
                url: realUrl,
                headers: Server.getHearders(),
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

                console.log('data.result',data.result);

                that.lastUpload = that.cloneObj(data.result);

                that.value = JSON.stringify(data.result); //.replace(/\\"/g, '"');
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
