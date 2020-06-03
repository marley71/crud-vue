crud.components.views.vSearch = Vue.component('v-search', {
    extends : crud.components.views.vRecord,
    props : {
        cRouteConf : {},
        cType : {
            default : 'search'
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
        doSearch : function (params) {
            var that = this;
            var oldP = this.cloneObj(this.cRouteConf.params);

            for (var k in params) {
                oldP[k] = params[k];
            }
            this.cRouteConf.params = oldP;
        },
        getFieldName : function (key) {
            return 's_' + key;
        },
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
    template : '#v-search-template'
});
