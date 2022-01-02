<template>
  <div class="portlet">
    <div class="portlet-body">
      <div class="row">
        <div class="col-12">
          <v-list :c-conf="getHasmanyConf()"></v-list>
        </div>
<!--        <div class="col-12 col-lg-6 col-xl-6 mt-2" v-for="(item,index) in confViews"-->
<!--             v-show="showItem(item.cRef)"-->
<!--             :key="index">-->
<!--          <div class="card p-1 m-0-->
<!--                     shadow-md shadow-lg-hover transition-all-ease-250 transition-hover-top h-60 border-danger bl-0 br-0 bb-0 bw&#45;&#45;2">-->
<!--            &lt;!&ndash;<div class="card-header" crud-hasmany_title>&ndash;&gt;-->
<!--            &lt;!&ndash;{{cConf.metadata.modelName}}&ndash;&gt;-->
<!--            &lt;!&ndash;</div>&ndash;&gt;-->
<!--            <div class="card-header bg-white">-->
<!--              <button v-on:click="deleteItem(item.cRef)" class="btn-danger btn-pill btn-xs float-right"-->
<!--                      type="button" title="Cancella elemento"><i class="fa fa-trash"></i>-->
<!--              </button>-->
<!--            </div>-->
<!--            <div class="card-body p-1">-->

<!--            </div>-->
<!--          </div>-->
<!--        </div>-->
      </div>
    </div>
  </div>
</template>

<script>
import wBase from './wBase'
import {wHasmanyListedMixin} from 'crud-vue-core'

export default {
  name: 'w-hasmany-listed',
  extends: wBase,
  mixins: [wHasmanyListedMixin]
}
</script>

<style scoped>

</style>
