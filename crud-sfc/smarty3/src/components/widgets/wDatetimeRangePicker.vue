<script>

import crud from 'crud-vue-package'
import wDateRangePicker from './wDateRangePicker'

/* global moment */
/* eslint no-undef: "error" */

crud.conf['w-datetime-range-picker'] = {
  confParent: 'w-date-range-picker',
  displayFormat: 'DD/MM/YYYY HH:mm:ss',
  dateFormat: 'YYYY-MM-DD HH:mm:ss',
  pluginOptions: {
    timePicker: true,
    timePicker24Hour: true
  }
}

export default {
  name: 'w-datetime-range-picker',
  extends: wDateRangePicker
}
</script>

<style scoped>

</style>
