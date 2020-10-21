crud.components.widgets.coreWMapView = Vue.component('core-w-map-view',{
    extends : crud.components.widgets.coreWMap,
    methods : {
        createMarker : function () {
            var that = this;
            //console.log('aaaa')
            var pos = {
                lat : that.lat,
                lng : that.lng
            }
            that.marker = new google.maps.Marker({
                position: pos,
                map: that.map,
            });
        }
    }
});
