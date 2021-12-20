<template>
  <div>
    <div class="row">
      <div class="col-8">
        <div v-show="error" class="alert alert-danger">{{ errorMessage }}</div>
        <input type="hidden" v-model="value" :name="getFieldName()">
        <div>
          <div v-show="extensions">
            <span crud-label="app.accepted-extensions">Estensioni accettate: </span>
            <span v-show="extensions">{{ extensions.join(',') }}</span>
          </div>
          <div v-show="maxFileSize">
            Dimensione massima: <span crud-label="app.upload-max-filesize">{{ maxFileSize }}</span>
          </div>
          <div>
            <input c-file class="" type="file" v-on:change="validate()">
          </div>
        </div>
      </div>
      <div class="col-4 pt--10">
        <w-preview :c-conf="previewConf"></w-preview>
      </div>
    </div>
  </div>
</template>

<script>
import wBase from './wBase'
import wUploadAjaxMixin from 'crud-vue-package'

export default {
  name: 'w-upload-ajax',
  extends: wBase,
  mixins: [wUploadAjaxMixin]
}
</script>

<style scoped>

</style>
