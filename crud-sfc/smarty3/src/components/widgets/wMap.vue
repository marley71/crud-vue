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

<!--    <div class="mb-2 form-label-group">-->
<!--      <input :placeholder="label" class="form-control" v-on:change="searchAddress">-->
<!--      <label>-->
<!--        {{ label }}-->
<!--      </label>-->
<!--    </div>-->

    <!--        <div class="input-group mb-3">-->
    <!--            <div class="input-group-prepend">-->
    <!--                <span class="input-group-text" id="basic-addon1">{{'app.trova-indirizzo' | translate}}</span>-->
    <!--            </div>-->
    <!--            <input class="form-control" type="text" v-on:change="searchAddress"/>-->
    <!--        </div>-->
    <div c-map></div>
  </div>
</template>

<script>

/* eslint no-undef: "off" */

import wBase from './wBase'
// import crud from '../../../../core/crud'
import wMapMixin from '../../../../core/mixins/components/widgets/wMapMixin'

export default {
  name: 'w-map',
  extends: wBase,
  mixins: [wMapMixin]
}

</script>

<style scoped>

</style>
