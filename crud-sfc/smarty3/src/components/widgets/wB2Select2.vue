<template>
    <select c-select2 class="form-control m-select2" :placeholder="translate('app.digita-per-cercare')"
            :name="getFieldName()" v-model="value" v-on:change="change">
    </select>
</template>

<script>

import wBase from './wBase'
import {wB2Select2Mixin} from 'crud-vue-core'

export default {
  name: 'w-b2-select2',
  extends: wBase,
  mixins: [wB2Select2Mixin],
  methods: {
    _ready () {
      // trucchetto per aggiungere la label nel posto giusto e overflow in caso di template record
      var container = this.jQe().parent();
      window.jQuery(container).find('.select2-container').addClass('form-control p-1 pl-2 w-100');
      //window.jQuery('.select2-container').addClass('form-control p-1 pl-2 w-100')
    }
  }
}
</script>

<style scoped>

</style>
