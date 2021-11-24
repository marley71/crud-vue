<template>
<!--    <div class="relative flex w-full flex-wrap items-stretch mb-3">-->
<!--        <select type="text" c-select2 :placeholder="translate('app.digita-per-cercare')"-->
<!--               class="px-3 py-3 placeholder-gray-400 text-gray-700-->
<!--               relative bg-white bg-white rounded text-sm shadow outline-none focus:outline-none focus:shadow-outline w-full pr-10"-->
<!--                :name="getFieldName()" v-model="value" v-on:change="change"-->
<!--        />-->
<!--    </div>-->
  <select c-select2 class="form-control m-select2" :placeholder="translate('app.digita-per-cercare')"
          v-bind:name="getFieldName()" v-model="value" v-on:change="change">
  </select>
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
