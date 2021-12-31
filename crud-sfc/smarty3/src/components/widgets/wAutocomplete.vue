<template>
  <div class="input-group mb-3">
    <div v-if="selectedLabel" class="input-group-prepend">
      <span class="input-group-text">{{ label }}</span>
    </div>
    <input type="text" c-autocomplete class="form-control">
    <div v-if="clearButton" class="input-group-append">
      <button type="button" class="btn btn-outline-secondary" v-on:click="clear">
        <i class="fa fa-times"></i>
      </button>
    </div>
    <input v-model="value" :name="getFieldName()" type="hidden" >
  </div>
</template>

<script>
import wBase from './wBase'
import {wAutocompleteMixin} from 'crud-vue-package'

export default {
  name: 'w-autocomplete',
  extends: wBase,
  mixins: [wAutocompleteMixin]
}
</script>

<style scoped>

</style>
