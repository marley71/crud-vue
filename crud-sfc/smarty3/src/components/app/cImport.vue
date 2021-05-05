<template>
    <div>
        <div class="alert alert-info" role="alert">
            <h4 class="alert-heading">Importazione csv</h4>
            <p>Importazione modello <strong>{{providerName}}</strong> da file csv.</p>
            <hr>
            <p class="mb-0">L'importazione avverrà in due fasi, la lettura del file csv e check degli errori e salvataggio del csv importato</p>
        </div>
        <div v-if="uploadEnabled" class="panel panel-default" >
            <div>Seleziona file csv da importare</div>
            <!--            <w-upload-ajax :c-conf="confUpload" v-on:success="uploadsuccess"></w-upload-ajax>-->
            <div class="col-12">
              <v-edit :c-conf="_uploadConf()"></v-edit>
            </div>

        </div>
        <div v-if="progressEnabled">
            <div v-if="status=='loading'">Loading</div>
            <div v-if="status=='saving'">Saving</div>
            <div class="shadow w-full bg-grey-light">
                <div class="bg-blue-500 text-xs leading-none py-1 text-center text-white" :style="'width:'+progressValue+'%'">{{progressValue}}%</div>
            </div>
<!--            -->
<!--            <div class="progress">-->
<!--                <div class="progress-bar progress-bar-striped" :style="'width:'+progressValue+'%'"></div>-->
<!--            </div>-->
        </div>
        <div v-if="saveEnabled">
            <div>File csv caricato e controllato</div>
            <v-edit :c-conf="_saveConf()"></v-edit>
            <v-list :c-conf="_listConf()"></v-list>
            <!--            <v-action c-name="action-base" :c-action="saveAction"></v-action>-->
        </div>
    </div>
</template>

<script>
import cComponent from '../misc/cComponent'
// import crud from '../../../../core/crud'
import cImportMixin from '../../../../core/mixins/components/app/cImportMixin'

// // routes
// crud.routes.load_datafile = {
//   method: 'post',
//   url: '/queue/add/datafile/load',
//   resultType: 'record',
//   protocol: 'record',
//   extra_params: {}
// }
//
// crud.routes.status_queue = {
//   method: 'get',
//   url: '/queue/status/{id}',
//   resultType: 'record',
//   protocol: 'record',
//   extra_params: {}
// }
//
// crud.routes.save_datafile = {
//   method: 'post',
//   url: '/queue/add/datafile/save',
//   resultType: 'record',
//   protocol: 'record'
// }
//
// crud.routes.datafile_data = {
//   method: 'get',
//   url: '/foormc/{modelName}/datafile_id/{jobId}',
//   resultType: 'list',
//   protocol: 'list'
// }
//
// // route per eventuali configurazioni dati in ingresso prima dell'upload
// crud.routes.datafile_insert = {
//   method: 'get',
//   url: '/foorm/{modelName}/new',
//   resultType: 'record',
//   protocol: 'record'
// }
//
// // route per eventuali configurazioni dati in ingresso prima del save
// crud.routes.datafile_import = {
//   method: 'get',
//   url: '/foorm/{modelName}/import/{jobId}',
//   resultType: 'record',
//   protocol: 'record'
// }

export default {
  name: 'c-import',
  props: ['cProviderName'],
  extends: cComponent,
  mixins: [cImportMixin]
}

</script>

<style scoped>

</style>
