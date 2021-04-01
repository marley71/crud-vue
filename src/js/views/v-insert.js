crud.components.views.coreVInsert = Vue.component('core-v-insert', {
    extends : crud.components.views.vRecord,
    props : {
        cType : {
            default : 'insert'
        }
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
