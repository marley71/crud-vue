crud.components.views.coreVHasone = Vue.component('core-v-hasone', {
    extends : crud.components.views.vRecord,
    props : {
        cType : {
            default : 'insert'
        }
    },
    methods : {
        getFieldName : function (key) {
            var that = this;
            return that.modelName + "-" + key;
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
