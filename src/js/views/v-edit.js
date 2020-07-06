crud.components.views.coreVEdit = Vue.component('core-v-edit', {
    extends : crud.components.views.vRecord,
    props : {
        cType : {
            default : 'edit'
        }
    },
    data :  function () {
        var _conf = this._getConf() || {};
        var d = {}
        d.defaultWidgetType  = _conf.defaultWidgetType?_conf.defaultWidgetType:'w-input';
        return d;
    },
    methods : {
        setRouteValues : function (route) {
            var that  = this;
            if (route) {
                route.setValues({
                    modelName : that.modelName,
                    pk :that.pk,
                });
            }
            return route;
        }
    },
});
