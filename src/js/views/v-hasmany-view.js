crud.components.views.coreVHasmanyView = Vue.component('core-v-hasmany-view', {
    extends : crud.components.views.vRecord,
    props : {
        cType : {
            default : 'view'
        }
    },
    data :  function () {
        console.log('VHASMANYVIEW',this._getConf())
        var _conf = this._getConf();
        var d =  {}
        d.defaultWidgetType = _conf.defaultWidgetType || 'w-text';
        return d;
    },
    // methods : {
    //     fillData : function () {
    //         this.data = this.cConf.data;
    //     }
    // },
});
