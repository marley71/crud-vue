<template>
  <div>
    <input v-bind:readonly="!customValue"
           class="form-control" type="text" name="getFieldName()" v-model="value"
           v-on:change="change">
    <div>
      <div class="btn-group btn-group-sm" role="group" aria-label="...">
        <button v-for="dVal in domainValuesOrder" type="button" class="btn btn-outline-secondary"
                v-on:click="setValue(dVal)" :key="dVal">{{ domainValues[dVal] }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>

import wBase from './wBase'
import {choiceMixin, wInputHelpedMixin} from 'crud-vue-package'

export default {
  name: 'w-input-helped',
  extends: wBase,
  mixins: [choiceMixin, wInputHelpedMixin]
}
</script>

<style scoped>

</style>
