<template>
<!--    <div class="flex flex-row" :class="inline?'flex-row':'flex-col'">-->
<!--        <div class="mb-3 p-1" v-for="key in domainValuesOrder" :key="key">-->
<!--            <input class="" v-bind:name="getFieldName()" type="checkbox" :value="key"-->
<!--                   v-model="value"-->
<!--                   v-on:change="change">-->
<!--            <label class=""><span v-html="domainValues[key]"></span></label>-->
<!--        </div>-->
<!--    </div>-->
  <div
    class="col-12 mb-2 form-label-group form-control bw--1 border-solid border-gray-400 p--6 rounded form-check-inline">
    <div class="in-label-group" v-for="key in domainValuesOrder" :key="key">
      <input class="form-check-input" v-bind:name="getFieldName()" type="checkbox" :value="key"
             v-model="value"
             v-on:change="change">
      <label class="form-check-label"><span v-html="domainValues[key]"></span></label>
    </div>
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
