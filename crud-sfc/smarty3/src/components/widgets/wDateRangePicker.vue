<template>
<!--    <div class="mb-3 pt-0">-->
<!--        <input type="hidden" v-model="value" v-bind:name="getFieldName()"-->
<!--               v-on:change="change">-->
<!--        <input class="px-3 py-3 placeholder-gray-400 text-gray-700 relative bg-white bg-white rounded text-sm shadow outline-none focus:outline-none focus:shadow-outline w-full" c-picker>-->
<!--    </div>-->
  <div class="input-group">
    <input type="hidden" v-model="value" v-bind:name="getFieldName()"
           v-on:change="change">
    <input class="form-control" c-picker>
  </div>
</template>

<script>

import crud from '../../../../core/crud'
import wBase from './wBase'

crud.conf['w-date-range-picker'] = {
  resources: [
    'https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.24.0/moment.min.js',
    'https://cdn.jsdelivr.net/npm/daterangepicker/daterangepicker.min.js',
    'https://cdn.jsdelivr.net/npm/daterangepicker/daterangepicker.css'
  ],
  displayFormat: 'dd/mm/yyyy',
  dateFormat: 'yyyy-mm-dd',
  startFieldName: null,
  endFieldName: null
}

export default {
  name: 'w-date-range-picker',
  extends: wBase,
  methods: {
    _ready () {
      this.jQe('[c-picker]').daterangepicker({
        opens: 'left'
      }, function (start, end, label) {
        console.log('A new date selection was made: ' + start.format('YYYY-MM-DD') + ' to ' + end.format('YYYY-MM-DD'))
      })
    }
  }
}
</script>

<style scoped>

</style>
