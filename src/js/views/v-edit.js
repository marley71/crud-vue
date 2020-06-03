crud.components.views.vEdit = Vue.component('v-edit', {
    extends : crud.components.views.vRecord,
    props : {
        cType : {
            default : 'edit'
        }
    },
    data :  function () {
        var that = this;
        var d = {
            defaultWidgetType : 'w-input',
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
    template : '#v-edit-template'
});
