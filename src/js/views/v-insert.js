crud.components.views.coreVInsert = Vue.component('core-v-insert', {
    extends : crud.components.views.vRecord,
    props : {
        cType : {
            default : 'insert'
        }
    },
    data :  function () {
        var _conf = this._getConf() || {};
        var d =  {}
        d.defaultWidgetType = _conf.defaultWidgetType || 'w-input';
        return d;

    },
    methods : {
        setRouteValues : function (route) {
            var that  = this;
            if (route) {
                route.setValues({
                    modelName : that.modelName
                });
            }
            return route;
        }
    }
});
