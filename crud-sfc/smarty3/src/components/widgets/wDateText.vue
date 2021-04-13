<template>
    <span>{{formattedValue}}</span>
</template>

<script>

import wBase from './wBase'
import crud from '../../../../core/crud'

/* eslint no-undef: "off" */

crud.conf['w-date-text'] = {
  resources: [
    'https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.24.0/moment.min.js'
  ],
  displayFormat: 'dd/mm/yyyy',
  dateFormat: 'yyyy-mm-dd',
  formattedValue: null
}

export default {
  name: 'w-date-text',
  extends: wBase,
  methods: {
    afterLoadResources () {
      var that = this
      that.formattedValue = moment(that.value).format(that.displayFormat.toUpperCase())
    }
  }
}
</script>

<style scoped>

</style>
