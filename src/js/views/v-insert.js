crud.components.views.vInsert = Vue.component('v-insert', {
    extends : crud.components.views.vRecord,
    props : {
        cType : {
            default : 'insert'
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
                    modelName : that.conf.modelName
                });
            }
            return route;
        }
    },
    template : '#v-insert-template'
});
