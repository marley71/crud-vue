<template>
<!--    <div>-->
<!--        <div v-show="extensions">-->
<!--            <span crud-label="app.accepted-extensions">{{ 'app.estensioni-accettate' | translate }} </span>-->
<!--            <span v-show="extensions">{{ extensions.join(',') }}</span>-->
<!--        </div>-->
<!--        <div v-show="maxFileSize">-->
<!--            Dimensione massima: <span crud-label="app.upload-max-filesize">{{ maxFileSize }}</span>-->
<!--        </div>-->
<!--        <div>-->
<!--            <input :name="getFieldName()" c-file class="btn btn-outline-secondary" type="file" v-on:change="validate()">-->
<!--        </div>-->
<!--    </div>-->
  <div>
    <div v-show="extensions">
      <span crud-label="app.accepted-extensions">{{ 'app.estensioni-accettate' | translate }} </span>
      <span v-show="extensions">{{ extensions.join(',') }}</span>
    </div>
    <div v-show="maxFileSize">
      Dimensione massima: <span crud-label="app.upload-max-filesize">{{ maxFileSize }}</span>
    </div>
    <div>
      <input :name="getFieldName()" c-file class="btn btn-outline-secondary" type="file" v-on:change="validate()"
             v-bind:c-marker="cMarker">
    </div>
  </div>
</template>

<script>
import wBase from './wBase'
import crud from '../../../../core/crud'
import wUploadMixin from '../../../../core/mixins/components/widgets/wUploadMixin'

crud.conf['w-upload'] = {
  maxFileSize: '',
  error: false,
  errorMessage: '',
  extensions: []
}

export default {
  name: 'w-upload',
  extends: wBase,
  mixins: [wUploadMixin]
}
</script>

<style scoped>

</style>
