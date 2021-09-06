<template>
<!--    <div class="mb-3 pt-0">-->
<!--        <input type="hidden" v-model="value" v-bind:name="getFieldName()"-->
<!--               v-on:change="change">-->
<!--        <input class="px-3 py-3 placeholder-gray-400 text-gray-700 relative bg-white bg-white rounded text-sm shadow outline-none focus:outline-none focus:shadow-outline w-full" c-picker>-->
<!--    </div>-->
  <div class="input-group form-control">
    <input type="hidden" :name="startFieldName" v-on:change="change">
    <input type="hidden" :name="endFieldName" v-on:change="change">
    <input class="w-100 border-0" c-picker>
  </div>
</template>

<script>

import crud from '../../../../core/crud'
import wBase from './wBase'

/* global moment */
/* eslint no-undef: "error" */

/**
 * widget basato tu plugin  https://www.daterangepicker.com/
 *
 */
crud.conf['w-date-range-picker'] = {
  resources: [
    'https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.24.0/moment.min.js',
    'https://cdn.jsdelivr.net/npm/daterangepicker/daterangepicker.min.js',
    'https://cdn.jsdelivr.net/npm/daterangepicker/daterangepicker.css'
  ],
  displayFormat: 'DD/MM/YYYY',
  dateFormat: 'YYYY-MM-DD',
  startFieldName: null,
  endFieldName: null,
  pluginOptions: {}
}

export default {
  name: 'w-date-range-picker',
  extends: wBase,
  methods: {
    _ready () {
      var that = this
      if (!that.startFieldName) {
        throw new Error('wRangeDatePicker startFieldName non definito')
      }

      that.jQe('input[name="' + that.startFieldName + '"]').val(that.modelData[that.startFieldName])
      that.jQe('input[name="' + that.endFieldName + '"]').val(that.modelData[that.endFieldName])
      var _opt = {
        opens: 'left',
        showDropdowns: true,
        startDate: that.modelData[that.startFieldName] ? moment(that.modelData[that.startFieldName]) : moment(),
        endDate: that.modelData[that.endFieldName] ? moment(that.modelData[that.endFieldName]) : moment()
      }
      var options = that.merge(_opt, that.pluginOptions)
      if (!options.locale) {
        options.locale = {}
      }
      options.locale.format = that.displayFormat
      this.jQe('[c-picker]').daterangepicker(options, function (start, end, label) {
        console.log('A new date selection was made: ' + start.format('YYYY-MM-DD') + ' to ' + end.format('YYYY-MM-DD'))
        that.jQe('input[name="' + that.startFieldName + '"]').val(start.format(that.dateFormat))
        that.jQe('input[name="' + that.endFieldName + '"]').val(end.format(that.dateFormat))
      })
    }
  }
}
</script>

<style scoped>

</style>
