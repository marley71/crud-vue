<template>
    <div>
        <div v-show="extensions">
            <span crud-label="app.accepted-extensions">{{ 'app.estensioni-accettate' | translate }} </span>
            <span v-show="extensions">{{ extensions.join(',') }}</span>
        </div>
        <div v-show="maxFileSize">
            Dimensione massima: <span crud-label="app.upload-max-filesize">{{ maxFileSize }}</span>
        </div>
        <div>
            <input :name="getFieldName()" c-file class="btn btn-outline-secondary" type="file" v-on:change="validate()">
        </div>
    </div>
</template>

<script>
import wBase from "./wBase";
import crud from "../../crud/confs";

crud.conf['w-upload'] = {
    extensions: '',
    maxFileSize: '',
    error: false,
    errorMessage: '',
    extensions: [],
};

export default {
    name: "w-upload",
    extends: wBase,
    methods: {
        getValue: function () {
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
            console.log('validate', that.getValue());
            that.change();
            if (that._validate()) {
                //that.value =
                that.$emit('success', that);
            } else
                that.$emit('error', that);
        }
    }
}
</script>

<style scoped>

</style>
