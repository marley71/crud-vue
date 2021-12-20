<template>
  <div>
    <div class="alert alert-info" role="alert">
      <h4 class="alert-heading">Importazione File</h4>
      <p>Importazione modello <strong>{{providerName | translate}}</strong> da file
        {{(confUpload.extensions || []).join(',')}}</p>
      <hr>
      <div class="mb-0">
        <p>L'importazione avverrà in due fasi:</p>
        <ul>
          <li>la lettura del file e check degli errori</li>
          <li>salvataggio del file importato</li>
        </ul>

      </div>
    </div>
    <div v-if="uploadEnabled && status!=='loading'" class="panel panel-default">
      <div>Seleziona file da importare</div>
      <!--            <w-upload-ajax :c-conf="confUpload" v-on:success="uploadsuccess"></w-upload-ajax>-->
      <div class="col-12">
        <v-edit :c-conf="_uploadConf()"></v-edit>
      </div>

    </div>
    <div v-if="progressEnabled">
      <div class="progress h--40 mb-3">
<!--        <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar"-->
<!--             :style="'width:'+progressValue+'%'" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">{{progressValue}}%-->
<!--        </div>-->
        <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar"
             :style="'width:100%'" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">
          <div v-if="status=='loading'">
            Lettura file e check degli errori ...&nbsp;
          </div>
          <div v-if="status=='saving'">
            Salvataggio del file importato ...
          </div>
        </div>
      </div>
      <!--            <div class="shadow w-full bg-grey-light">-->
      <!--                <div class="bg-blue-500 text-xs leading-none py-1 text-center text-white" :style="'width:'+progressValue+'%'">{{progressValue}}%</div>-->
      <!--            </div>-->
      <!--            -->
      <!--            <div class="progress">-->
      <!--                <div class="progress-bar progress-bar-striped" :style="'width:'+progressValue+'%'"></div>-->
      <!--            </div>-->
    </div>
    <div v-if="saveEnabled && status!=='saving'">
      <div>File caricato e controllato</div>
      <v-edit :c-conf="_saveConf()"></v-edit>
      <v-list :c-conf="_listConf()"></v-list>
      <!--            <v-action c-name="action-base" :c-action="saveAction"></v-action>-->
    </div>
  </div>
</template>

<script>
import cComponent from '../misc/cComponent'
import cImportMixin from 'crud-vue-package'

export default {
  name: 'c-import',
  props: ['cProviderName'],
  extends: cComponent,
  mixins: [cImportMixin]
}

</script>

<style scoped>

</style>
