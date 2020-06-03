crud.components.views.vView = Vue.component('v-view', {
    extends : crud.components.views.vRecord,
    props : {
        cType : {
            default : 'view'
        }
    },
    data :  function () {
        var that = this;
        var d = {
            defaultWidgetType : 'w-text',
        }
        return d;

    },

    methods : {
        setRouteValues : function (route) {
            var that  = this;
            if (route) {
                route.setValues({
                    modelName : that.conf.modelName,
                    pk :that.conf.pk,
                });
            }
            return route;
        }
    },
    template : '#v-view-template'
});
