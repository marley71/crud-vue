crud.components.views.coreVHasmany = Vue.component('core-v-hasmany', {
    extends : crud.components.views.vRecord,
    props : {
        cType : {
            default : 'insert'
        }
    },
    // data :  function () {
    //     var _conf = this._loadConf();
    //     var d =  {}
    //     d.defaultWidgetType = _conf.defaultWidgetType || 'w-input';
    //     //console.log('VHASMANY CONF',_conf);
    //     return d;
    // },

    methods : {
        // fillData : function () {
        //     this.value = this.conf.value;
        // },
        getFieldName : function (key) {
            var that = this;
            return that.cModel + "-" + key + '[]';
        },
        getValue : function () {
            var that = this;
            var value = {};
            for (var k in that.widgets) {
                value[k] = that.getWidget(k).getValue();
            }
            return value;
        }
    }
});
