<template>
  <div class="input-group form-control">
    <input type="hidden" :name="startFieldName" >
    <input type="hidden" :name="endFieldName" >
    <input class="w-100 border-0" c-picker>
  </div>
</template>

<script>

import {crud} from 'crud-vue-package'
import wBase from './wBase'


/* global moment */
/* eslint no-undef: "error" */
/* eslint-disable no-useless-escape */

/**
 * widget basato tu plugin  https://www.daterangepicker.com/
 * i nomi campi input della form vengono definiti in base a questa regola
 * di default vengono considerati un vettore con nome uguale al name del widget
 * altrimenti mettendo la proprietà separateValue a true, un valore viene preso
 * da this.value l'altro dal modelData[endFieldName]
 */
crud.conf['w-date-range-picker'] = {
  resources: [
    'https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.24.0/moment.min.js',
    'https://cdn.jsdelivr.net/npm/daterangepicker/daterangepicker.min.js',
    'https://cdn.jsdelivr.net/npm/daterangepicker/daterangepicker.css'
  ],
  displayFormat: 'DD/MM/YYYY',
  dateFormat: 'YYYY-MM-DD',
  separateValue: false,
  //startFieldName: null,
  endFieldName: null,
  pluginOptions: {}
}

export default {
  name: 'w-date-range-picker',
  extends: wBase,
  methods: {
    _ready () {
      var that = this
      if (!Array.isArray(that.value) && !that.separateValue) {
        throw new Error('wRangeDatePicker il valore del campo deve essere un array altrimenti settare la proprietà singleValue a true e endFieldName il nome della data di fine')
      }
      if (that.separateValue && ! that.endFieldName) {
        throw new Error('wRangeDatePicker singleValue è a true ma endFieldName non è stato valorizzato')
      }

      var _opt = {
        opens: 'left',
        showDropdowns: true
        // startDate: that.modelData[that.startFieldName] ? moment(that.modelData[that.startFieldName]) : moment(),
        // endDate: that.modelData[that.endFieldName] ? moment(that.modelData[that.endFieldName]) : moment()
      }

      if (that.separateValue) {
        that.startFieldName = that.name
        that.setValue(that.value, that.modelData[that.endFieldName])
        _opt.startDate = moment(that.value).toDate()
        _opt.endDate = moment(that.modelData[that.endFieldName]).toDate()
      } else {
        that.startFieldName = that.name + '[]'
        that.endFieldName = that.name + '[]'
        that.setValue(that.value)
        _opt.startDate = moment(that.value[0]).toDate()
        _opt.endDate = moment(that.value[1]).toDate()
      }

      console.log('usati i nomi degli inputs per startFieldName e endFieldName', that.startFieldName, that.endFieldName)

      // var _opt = {
      //   opens: 'left',
      //   showDropdowns: true,
      //   startDate: that.modelData[that.startFieldName] ? moment(that.modelData[that.startFieldName]) : moment(),
      //   endDate: that.modelData[that.endFieldName] ? moment(that.modelData[that.endFieldName]) : moment()
      // }

      var options = that.merge(_opt, that.pluginOptions)
      if (!options.locale) {
        options.locale = {}
      }
      options.locale.format = that.displayFormat
      console.log('plugin options', options)
      that.jQe('[c-picker]').daterangepicker(options, function (start, end, label) {
        console.log('A new date selection was made: ' + start.format(that.dateFormat) + ' to ' + end.format(that.dateFormat))
        that.setValue(start.format(that.dateFormat), end.format(that.dateFormat))
        // that.jQe('input[name="' + that.startFieldName + '"]').val(start.format(that.dateFormat))
        // that.jQe('input[name="' + that.endFieldName + '"]').val(end.format(that.dateFormat))
      })
    },
    getValue () {
      var that = this
      console.log('getValue di range')
      if (that.separateValue)
        return [that.jQe('input[name="' + that.startFieldName + '"]').val(), that.jQe('input[name="' + that.endFieldName + '"]').val()]
      return [that.jQe(that.jQe('input[name="' + window.jQuery.escapeSelector(that.startFieldName) + '"]').get(0)).val(), that.jQe(that.jQe('input[name="' + window.jQuery.escapeSelector(that.endFieldName) + '"]').get(1)).val()]
    },

    setValue (val1, val2) {
      var that = this
      var v1, v2
      if (Array.isArray(val1)) {
        v1 = val1[0]
        v2 = val1[1]

        // that.jQe('input[name="' + that.startFieldName + '"]').val(val1[0])
        // that.jQe('input[name="' + that.endFieldName + '"]').val(val1[1])
      } else {
        v1 = val1
        v2 = val2
        // that.jQe('input[name="' + that.startFieldName + '"]').val(val1)
        // that.jQe('input[name="' + that.endFieldName + '"]').val(val2)
      }

      if (that.separateValue) {
        that.jQe('input[name="' + window.jQuery.escapeSelector(that.startFieldName) + '"]').val(v1)
        that.jQe('input[name="' + window.jQuery.escapeSelector(that.endFieldName) + '"]').val(v2)
      } else {
        that.jQe(that.jQe('input[name="' + window.jQuery.escapeSelector(that.startFieldName) + '"]').get(0)).val(v1)
        that.jQe(that.jQe('input[name="' + window.jQuery.escapeSelector(that.endFieldName) + '"]').get(1)).val(v2)
      }
    }
  }
}
</script>

<style scoped>

</style>
