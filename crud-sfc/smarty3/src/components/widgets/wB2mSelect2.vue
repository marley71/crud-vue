<template>
    <select c-select2 class="form-control m-select2" :name="getFieldName()" multiple="true"
            :placeholder="translate('app.digita-per-cercare')"
            v-model="value" v-on:change="change">
    </select>
</template>

<script>

import wB2Select2 from './wB2Select2'
import {wB2mSelect2Mixin} from 'crud-vue-core'


export default {
  name: 'w-b2m-select2',
  extends: wB2Select2,
  mixins: [wB2mSelect2Mixin],
  methods: {
    _ready () {
      // trucchetto per aggiungere la label nel posto giusto e overflow in caso di template record
      var container = this.jQe().parent();
      window.jQuery(container).find('.select2-container').addClass('form-control p-1 pl-2 w-100');
      window.jQuery(container).find('.select2-container').css('overflow', 'auto');
    }
  }
}
</script>

<style scoped>

</style>
