<template>
    <div class="w-full">
        <div class="flex flex-row">
            <div >
                <div v-show="error" class="text-red-800">{{ errorMessage }}</div>
                <input type="hidden" v-model="value" :name="getFieldName()">
                <div>
                    <div v-show="extensions">
                        <span >Estensioni accettate: </span>
                        <span v-show="extensions">{{ extensions.join(',') }}</span>
                    </div>
                    <div v-show="maxFileSize">
                        Dimensione massima: <span crud-label="app.upload-max-filesize">{{ maxFileSize }}</span>
                    </div>
                    <div class="m-2">
                        <input c-file class="" type="file" v-on:change="validate()"/>
                    </div>
                </div>
            </div>
            <div>
                <w-preview :c-conf="previewConf"></w-preview>
            </div>
        </div>
    </div>
</template>

<script>
import wBase from "./wBase";
import crud from "../../crud/confs";
import Server from "../../crud/Server";

crud.conf['w-upload-ajax'] = {
    //confParent : 'crud.conf.w-base',
    extensions: [],
    maxFileSize: '',
    routeName: 'uploadfile',
    value: {},
    error: false,
    errorMessage: '',
    previewConf: {},
};

export default {
    name: "w-upload-ajax",
    extends: wBase,
    // mounted: function () {
    //
    //     console.log('w-ulpload ajax', this.value);
    // },

    methods: {

        dynamicData(conf) {
            if (conf.value instanceof String)
                conf.value = JSON.stringify(this.value).replace(/\\"/g, '"');
            else if (!this.value)
                conf.value = {};

            conf.previewConf = {
                value: conf.value,
                cRef: this._uid + 'preview'
            }
            return conf;
        },
        getPreviewConf: function () {
            return this.previewConf;
        },

        setRouteValues: function (route) {
            route.setValues({
                modelName: this.modelName
            })
            return route;
        },
        _getFileValue: function () {
            var that = this;
            console.log('filedesc', jQuery(that.$el).find('[c-file]').prop('files'));
            var fileDesc = jQuery(that.$el).find('[c-file]').prop('files');
            if (fileDesc.length) {
                return fileDesc[0];
            }

            return null;
        },
        _validate: function () {
            return true;
        },
        validate: function () {
            var that = this;
            //TODO eseguire validazione
            console.log('validate');
            that.change();
            if (that._validate()) {
                that.sendAjax();
            }

        },
        onSuccess() {

        },
        onError() {

        },
        sendAjax: function () {
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
            console.log('realurl', route.getUrl())
            var fdata = new FormData();
            //data.append('file',jQuery(that.$el).find('[c-image-file]').prop('files')[0]);
            fdata.append('file', fDesc)
            console.log('ajaxFields', that.ajaxFields)
            for (var k in that.ajaxFields)
                fdata.append(k, that.ajaxFields[k])

            jQuery.ajax({
                url: realUrl,
                headers: Server.getHearders(),
                type: 'POST',
                data: fdata,
                processData: false,
                contentType: false                    // Using FormData, no need to process data.
            }).done(function (data) {
                that.error = data.error;
                that.lastUpload = null;
                console.log("Success: Files sent!", data);
                if (data.error) {
                    var msg = null;
                    try {
                        var tmp = JSON.parse(data.msg);
                        msg = "";
                        for (k in tmp) {
                            msg += tmp[k] + '\n';
                        }
                    } catch (e) {
                        msg = data.msg;
                    }
                    that.errorMessage = msg;
                    //self._showError(dialog,msg);
                    jQuery(that.$el).find('[crud-button="ok"]').addClass("disabled");
                    return;
                }
                that.$emit('success', that);
                that.complete = true;

                console.log('data.result', data.result);

                that.lastUpload = that.cloneObj(data.result);

                that.value = JSON.stringify(data.result); //.replace(/\\"/g, '"');
                var refPreview = that._uid + 'preview';
                //console.log('refPreview',refPreview,that.$crud.cRefs[refPreview])
                that.$crud.cRefs[refPreview].value = data.result;
                that.onSuccess();
            }).fail(function (data, error, msg) {
                console.log("An error occurred, the files couldn't be sent!");
                that.lastUpload = false;
                that.error = true;
                that.errorMessage = "Upload error " + data + " " + error + " " + msg;
                that.onError();
            });
        },
    }
}
</script>

<style scoped>

</style>
