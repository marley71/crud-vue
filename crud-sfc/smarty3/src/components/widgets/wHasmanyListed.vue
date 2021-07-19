<template>
  <div class="portlet">
<!--    <div class="portlet-header border-bottom mb-1 " :class="bgClass">-->
<!--      <span class="float-left text-dark text-truncate font-weight-medium">{{ label | translate }}</span>&nbsp;-->
<!--      <div class="float-right">-->
<!--                <span class="d-block text-danger text-truncate font-weight-medium" v-if="outOfLimit()">-->
<!--                    &lt;!&ndash; Limite massimo raggiunto &ndash;&gt;-->
<!--                    {{ 'app.limite-raggiunto' | translate }}-->
<!--                </span>-->
<!--        <button v-else v-on:click="addItem" type="button"-->
<!--                class="btn-sm btn-pill px-2 py-1 fs&#45;&#45;15 btn-warning">-->
<!--          <span>{{ 'app.aggiungi' | translate }}</span>&nbsp;-->
<!--        </button>-->
<!--      </div>-->
<!--    </div>-->
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
// import crud from '../../../../core/crud'
import wHasmanyListedMixin from '../../../../core/mixins/components/widgets/wHasmanyListedMixin'

export default {
  name: 'w-hasmany-listed',
  extends: wBase,
  mixins: [wHasmanyListedMixin]
}
</script>

<style scoped>

</style>
