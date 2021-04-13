<template>
    <div>
        <!-- input hidden for form compatibiliy --->
        <input type="hidden" :name="lngName">
        <input type="hidden" :name="latName">
        <div class="mb-2 form-label-group">
            <input :placeholder="translate('app.inserisci-indirizzo-da-cercare')" class="px-3 py-3 placeholder-gray-400 text-gray-700 relative bg-white bg-white rounded text-sm shadow outline-none focus:outline-none focus:shadow-outline w-full" v-on:change="searchAddress">
            <label>
                {{ label }}
            </label>
        </div>
        <div c-map></div>
    </div>
</template>

<script>

/* eslint no-undef: "off" */

import wBase from './wBase'
import crud from '../../../../core/crud'
import jQuery from 'jquery'

crud.conf['w-map'] = {
  apiKey: null,
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
  mounted: function () {
    this.initMap()
  },
  methods: {
    initMap: function () {
      var that = this
      if (!that.apiKey) {
        throw new Error({
          code: 404,
          message: 'nessuna apiKey definita!'
        })
      }
      var random = 10 // Math.floor(Math.random() * 10000);
      window['__initMap' + random] = function () {
        that.jQe('[c-map]').css('height', that.height).css('width', that.width)
        var pos = {
          lat: that.lat,
          lng: that.lng
        }
        var mapConfig = {
          center: pos,
          zoom: that.zoom
        }
        mapConfig.styles = that.mapStyles

        if (that.darkMode) {
          mapConfig.styles = mapConfig.styles.concat(that.darkStyle)
        }
        console.log('mapConfig', mapConfig)
        that.map = new google.maps.Map(that.jQe('[c-map]')[0], mapConfig)
        that.createMarker()
      }

      var scriptName = 'https://maps.googleapis.com/maps/api/js?key=' + that.apiKey + '&callback=__initMap' + random
      if (!that.$crud._resources[scriptName]) {
        that._loadScript(scriptName)
      } else {
        window['__initMap' + random]()
      }
    },

    createMarker: function () {
      var that = this
      var pos = {
        lat: that.lat,
        lng: that.lng
      }
      that.marker = new google.maps.Marker({
        position: pos,
        map: that.map,
        draggable: true
      })
      that.marker.addListener('dragend', function () {
        that._setHiddenValues()
        // console.log('position',that.marker.position);
      })
    },

    searchAddress: function (event) {
      var that = this
      console.log('searchAddress', jQuery(event.target).val())
      var address = jQuery(event.target).val()
      var geocoder = new google.maps.Geocoder()
      geocoder.geocode({'address': address}, function (results, status) {
        if (results) {
          if (results.length > 1) {
            console.warn('multiple values', results)
          }
          console.log('results', results)
          var foundOk = false
          for (var key in results) {
            var item = results[key]
            // console.log('item',item,'status',status);
            if (status === google.maps.GeocoderStatus.OK) {
              var position = new google.maps.LatLng(item.geometry.location.lat(), item.geometry.location.lng())
              that.marker.setPosition(position)
              break
            }
          }
          that.map.setCenter(that.marker.position)
          that._setHiddenValues()
        } else {
          that.errorDialog(status)
        }
      })
    },
    _setHiddenValues: function () {
      var that = this
      that.jQe('input[name="' + that.latName + '"]').val(that.marker.position.lat())
      that.jQe('input[name="' + that.lngName + '"]').val(that.marker.position.lng())
    }
  }
}
</script>

<style scoped>

</style>
