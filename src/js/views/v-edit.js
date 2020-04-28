crud.components.views.vEdit = Vue.component('v-edit', {
    extends : crud.components.views.vRecord,
    //props : ['cModel','cPk'],

    mounted : function() {
        var that = this;
        if (that.cModel)
            that.conf.modelName = that.cModel;
        if (that.cPk)
            that.conf.pk = that.cPk;

        that.route = that._getRoute();
        that.setRouteValues(that.route);

        that.fetchData(that.route,function (json) {
            that.fillData(that.route,json);
            that.createActions();
            that.createActionsClass();
            that.createWidgets();
            that.loading = false;
        });
    },

    data :  function () {
        var that = this;
        var d = this._loadConf(that.cModel,'edit');
        //d.conf = that.getConf(that.cModel,'edit');

        var dEdit = {
            loading : true,
            widgets : {},
            actionsClass : [],
            actions : {},
            data : {},
            route : null,
            //viewTitle : d.conf.viewTitle,
            defaultRenderType : 'w-input',
        }
        return that.merge(dEdit,d);

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
