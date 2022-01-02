<template>
  <div>
    <c-loading v-show="loading" :error-msg="errorMsg"></c-loading>
    <div v-show="!loading" class="well model-calendar">
      <div crud-hidden_fields></div>
      <div crud-view_elements>
        <div crud-calendar>
        </div>
      </div>
      <div crud-view_action class="hide">
        <div crud-field="data" crud-self>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint no-undef: "off" */

import vList from '../views/vList'
import {cCalendarMixin} from 'crud-vue-core'

// TODO inserire la gestione di avanti e indietro del calendario con il caricamento dei dati

export default {
  name: 'c-calendar',
  extends: vList,
  mixins: [cCalendarMixin]
}
</script>

<style scoped>

</style>
