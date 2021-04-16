<template>
    <span>{{formattedValue}}</span>
</template>

<script>

import wBase from './wBase'
import crud from '../../../../core/crud'
import wDateTextMixin from '../../../../core/mixins/components/widgets/wDateTextMixin'
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
  mixins: [wDateTextMixin]
}
</script>

<style scoped>

</style>
