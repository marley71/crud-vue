crud.components.views.coreVView = Vue.component('core-v-view', {
    extends : crud.components.views.vRecord,
    props : {
        cType : {
            default : 'view'
        }
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
