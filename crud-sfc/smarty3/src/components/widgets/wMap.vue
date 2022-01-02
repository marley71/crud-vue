<template>
  <div>
    <!-- input hidden for form compatibiliy --->
    <input type="hidden" :name="lngName">
    <input type="hidden" :name="latName">
    <div class="row">
      <div v-if="activateSearch" class="mb-2 form-label-group col-6">
        <input :placeholder="label" class="form-control" v-on:change="searchAddress">
        <label>
          {{ label }}
        </label>
      </div>
      <div v-if="activateFind" class="mb-2 form-label-group col-6">
        <button type="button" class="btn btn-sm btn-primary" v-on:click="find()">
          {{'app.trova-indirizzo' | translate}}
        </button>
      </div>
    </div>
    <div c-map></div>
  </div>
</template>

<script>

/* eslint no-undef: "off" */

import wBase from './wBase'
import {wMapMixin} from 'crud-vue-core'

export default {
  name: 'w-map',
  extends: wBase,
  mixins: [wMapMixin]
}

</script>

<style scoped>

</style>
