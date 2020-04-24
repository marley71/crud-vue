crud.components.views.vView = Vue.component('v-view', {
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
            that.createRenders();
            that.loading = false;
        });
    },
    data :  function () {
        var that = this;
        console.log('v-view');
        var d = this._loadConf(that.cModel,'view');
        //d.conf = that.getConf(that.cModel,'view');

        var dView = {
            loading : true,
            renders : {},
            actionsClass : [],
            actions : {},
            data : {},
            route : null,
            //viewTitle : d.conf.viewTitle,
            defaultRenderType : 'w-text',
        }
        return this.$crud.merge(dView,d);

    },

    methods : {
        setRouteValues : function (route) {
            var that  = this;
            console.log('v-view.setRouteValues',that.conf)
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
