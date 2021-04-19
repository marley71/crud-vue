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
import crud from '../../../../core/crud'
import wMapMixin from '../../../../core/mixins/components/widgets/wMapMixin'

crud.conf['w-map'] = {
  map: null,
  marker: null,
  lat: 0,
  lng: 0,
  zoom: 8,
  height: 400,
  width: 'auto',
  lngName: 'lng',
  latName: 'lat',
  darkMode: false,
  mapStyles: [],
  darkStyle: [
    {elementType: 'geometry', stylers: [{color: '#242f3e'}]},
    {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
    {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
    {
      featureType: 'administrative.locality',
      elementType: 'labels.text.fill',
      stylers: [{color: '#d59563'}]
    },
    {
      featureType: 'poi',
      elementType: 'labels.text.fill',
      stylers: [{color: '#d59563'}]
    },
    {
      featureType: 'poi.park',
      elementType: 'geometry',
      stylers: [{color: '#263c3f'}]
    },
    {
      featureType: 'poi.park',
      elementType: 'labels.text.fill',
      stylers: [{color: '#6b9a76'}]
    },
    {
      featureType: 'road',
      elementType: 'geometry',
      stylers: [{color: '#38414e'}]
    },
    {
      featureType: 'road',
      elementType: 'geometry.stroke',
      stylers: [{color: '#212a37'}]
    },
    {
      featureType: 'road',
      elementType: 'labels.text.fill',
      stylers: [{color: '#9ca5b3'}]
    },
    {
      featureType: 'road.highway',
      elementType: 'geometry',
      stylers: [{color: '#746855'}]
    },
    {
      featureType: 'road.highway',
      elementType: 'geometry.stroke',
      stylers: [{color: '#1f2835'}]
    },
    {
      featureType: 'road.highway',
      elementType: 'labels.text.fill',
      stylers: [{color: '#f3d19c'}]
    },
    {
      featureType: 'transit',
      elementType: 'geometry',
      stylers: [{color: '#2f3948'}]
    },
    {
      featureType: 'transit.station',
      elementType: 'labels.text.fill',
      stylers: [{color: '#d59563'}]
    },
    {
      featureType: 'water',
      elementType: 'geometry',
      stylers: [{color: '#17263c'}]
    },
    {
      featureType: 'water',
      elementType: 'labels.text.fill',
      stylers: [{color: '#515c6d'}]
    },
    {
      featureType: 'water',
      elementType: 'labels.text.stroke',
      stylers: [{color: '#17263c'}]
    }
  ]
}

export default {
  name: 'w-map',
  extends: wBase,
  mixins: [wMapMixin]
}

</script>

<style scoped>

</style>
