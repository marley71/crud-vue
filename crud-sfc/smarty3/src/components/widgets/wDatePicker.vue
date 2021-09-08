<template>
<!--    <div class="mb-3 pt-0">-->
<!--        <input type="hidden" v-model="value" v-bind:name="getFieldName()"-->
<!--               v-on:change="change">-->
<!--        <input class="px-3 py-3 placeholder-gray-400 text-gray-700 relative bg-white bg-white rounded text-sm shadow outline-none focus:outline-none focus:shadow-outline w-full" c-picker>-->
<!--    </div>-->
  <div class="form-control input-group">
    <input type="hidden" v-model="value" v-bind:name="getFieldName()"
           v-on:change="change">
    <input class="w-100 border-0" c-picker>
  </div>
</template>

<script>

// import jQuery from 'jquery'
import wBase from './wBase'
// import crud from '../../../../core/crud'
import wDatePickerMixin from '../../../../core/mixins/components/widgets/wDatePickerMixin'

/* eslint no-undef: "off" */

export default {
  name: 'w-date-picker',
  extends: wBase,
  mixins: [wDatePickerMixin]
}
</script>

<style scoped>

</style>
