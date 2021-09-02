<template>

  <div
    class="col-12 mb-2 form-label-group form-control bw--1 border-solid border-gray-400 p--6 rounded h-100">
      <label v-for="key in domainValuesOrder" :key="key" class="form-selector">
        <input class="" v-bind:name="getFieldName()" type="checkbox" :value="key"
               v-model="value"
               v-on:change="change">
        <span v-html="domainValues[key]"></span>
      </label>
  </div>
</template>

<script>
import wBase from './wBase'
import choiceMixin from '../../../../core/mixins/choiceMixin'
import wCheckboxMixin from '../../../../core/mixins/components/widgets/wCheckboxMixin'
// import crud from '../../../../core/crud'

export default {
  name: 'w-checkbox',
  extends: wBase,
  mixins: [choiceMixin, wCheckboxMixin]
}
</script>

<style scoped>

</style>
