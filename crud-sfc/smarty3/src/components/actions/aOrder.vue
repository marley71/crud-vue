<template>
  <button class="btn btn-default btn-xs mr-1 text-gray-500 font-weight-normal fs--14" type="button" v-show="_visible"
          :title="title | translate" v-on:click="_execute" v-bind:disabled="_disabled">
    <i v-show="icon" :class="icon"></i>
    <span>{{ text | translate }}</span>
  </button>
</template>

<script>
import aBase from './aBase'
import aOrderMixin from '../../../../core/mixins/components/actions/aOrderMixin'
import crud from '../../../../core/crud'

crud.conf['a-order'] = {
  confParent: 'a-base',
  type: 'collection',
  title: 'app.order',
  css: 'btn btn-default btn-sm mr-1',
  iconSortAsc: 'fa fa-sort-up',
  iconSortDesc: 'fa fa-sort-down',
  iconSort: 'fa fa-sort',
  icon: null,
  text: ''
}

export default {
  name: 'a-order',
  extends: aBase,
  mixins: [aOrderMixin]
}

</script>

<style scoped>

</style>
