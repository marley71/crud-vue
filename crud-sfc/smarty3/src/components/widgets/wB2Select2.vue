<template>
  <div class="form-label-group form-control">
    <select c-select2 class="form-control m-select2" :placeholder="translate('app.digita-per-cercare')"
            :name="getFieldName()" v-model="value" v-on:change="change">
    </select>
  </div>

</template>

<script>

import wBase from './wBase'
import wB2Select2Mixin from '../../../../core/mixins/components/widgets/wB2Select2Mixin'
// import crud from '../../../../core/crud'

export default {
  name: 'w-b2-select2',
  extends: wBase,
  mixins: [wB2Select2Mixin],
  methods: {
    _ready () {
      window.jQuery('.select2-container').addClass('form-control p-1 pl-2 w-100')
    }
  }
}
</script>

<style scoped>

</style>
