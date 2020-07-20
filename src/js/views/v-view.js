crud.components.views.coreVView = Vue.component('core-v-view', {
    extends : crud.components.views.vRecord,
    props : {
        cType : {
            default : 'view'
        }
    },
    data :  function () {
        var _conf = this._loadConf() || {};
        var d =  {}
        d.defaultWidgetType = _conf.defaultWidgetType || 'w-text';
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
    }
});
