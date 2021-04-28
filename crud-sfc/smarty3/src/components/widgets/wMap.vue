<template>
<!--    <div>-->
<!--        &lt;!&ndash; input hidden for form compatibiliy -&ndash;&gt;-->
<!--        <input type="hidden" :name="lngName">-->
<!--        <input type="hidden" :name="latName">-->
<!--        <div class="mb-2 form-label-group">-->
<!--            <input :placeholder="translate('app.inserisci-indirizzo-da-cercare')" class="px-3 py-3 placeholder-gray-400 text-gray-700 relative bg-white bg-white rounded text-sm shadow outline-none focus:outline-none focus:shadow-outline w-full" v-on:change="searchAddress">-->
<!--            <label>-->
<!--                {{ label }}-->
<!--            </label>-->
<!--        </div>-->
<!--        <div c-map></div>-->
<!--    </div>-->
  <div>
    <!-- input hidden for form compatibiliy --->
    <input type="hidden" :name="lngName">
    <input type="hidden" :name="latName">
    <div class="mb-2 form-label-group">
      <input :placeholder="label" class="form-control" v-on:change="searchAddress">
      <label>
        {{ label }}
      </label>
    </div>

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
