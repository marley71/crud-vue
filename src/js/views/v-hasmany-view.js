crud.components.views.coreVHasmanyView = Vue.component('core-v-hasmany-view', {
    extends : crud.components.views.vRecord,
    props : {
        cType : {
            default : 'view'
        }
    },
});
