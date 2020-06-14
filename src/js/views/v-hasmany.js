crud.components.views.coreVHasmany = Vue.component('core-v-hasmany', {
    extends : crud.components.views.vRecord,
    props : {
        cType : {
            default : 'insert'
        }
    },
    data :  function () {
        var _conf = this._getConf();
        var d =  {}
        d.defaultWidgetType = _conf.defaultWidgetType || 'w-input';
        console.log('VHASMANY TYPE',d);
        return d;
    },

    methods : {
        fillData : function () {
            this.value = this.conf.value;
        },
        getFieldName : function (key) {
            var that = this;
            return that.cModel + "-" + key + '[]';
        }
    }
});
