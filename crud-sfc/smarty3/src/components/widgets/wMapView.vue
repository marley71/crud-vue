<template>
    <div c-map></div>
</template>

<script>
import wMap from "./wMap";
import crud from "../../crud/confs";

crud.conf['w-map-view'] = {
    confParent : 'w-map',
};

export default {
    name: "w-map-view",
    extends: wMap,
    methods: {
        createMarker: function () {
            var that = this;
            //console.log('aaaa')
            var pos = {
                lat: that.lat,
                lng: that.lng
            }
            that.marker = new google.maps.Marker({
                position: pos,
                map: that.map,
            });
        }
    }
}
</script>

<style scoped>

</style>
