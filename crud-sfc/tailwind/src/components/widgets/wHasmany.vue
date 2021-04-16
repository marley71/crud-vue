<template>
    <div class="box-content border-gray-900 p-3">
        <div class="portlet-header border-bottom mb-1 " :class="bgClass">
            <span class="text-dark text-truncate font-weight-medium">{{ label | translate }}</span>&nbsp;
            <div v-if="outOfLimit()" class="text-center">
                <span class="text-red-600 " >
                    <!-- Limite massimo raggiunto -->
                    {{ 'app.limite-raggiunto' | translate }}
                </span>
            </div>
            <div v-else >
                <button v-on:click="addItem" type="button"
                        class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                    <span>{{ 'app.aggiungi' | translate }}</span>&nbsp;
                </button>
            </div>
        </div>
        <div class="portlet-body">
            <input type="hidden" value="1">
            <div class="row">
                <div class="mt-2" v-for="(item,index) in confViews" v-show="showItem(item.cRef)" :key="index">
                    <div class="card p-1 m-0
                     shadow-md shadow-lg-hover transition-all-ease-250 transition-hover-top h-60 border-danger bl-0 br-0 bb-0 bw--2">
                        <!--<div class="card-header" crud-hasmany_title>-->
                        <!--{{cConf.metadata.modelName}}-->
                        <!--</div>-->
                        <div class=" pr-3">
                            <button v-on:click="deleteItem(item.cRef)" class="text-red-600 float-right"
                                    type="button" :title="translate('app.cancella')"><i class="fa fa-trash"></i>
                            </button>
                        </div>
                        <div class="p-1">
                            <v-hasmany v-bind:c-model="name" v-bind:c-conf="item"></v-hasmany>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
import wBase from './wBase'
import crud from '../../../../core/crud'
import wHasmanyMixin from '../../../../core/mixins/components/widgets/wHasmanyMixin'

crud.conf['w-hasmany'] = {
  confViews: {},
  limit: 100,
  value: [],
  bgClass: 'bg-warning-soft'
}

export default {
  name: 'w-hasmany',
  extends: wBase,
  mixins: [wHasmanyMixin]
}
</script>

<style scoped>

</style>
