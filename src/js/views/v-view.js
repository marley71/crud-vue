Vue.component('v-view', {
    extends : crud.components.views.vRecord,
    //props : ['cModel','cPk'],

    mounted : function() {
        var that = this;
        //console.log('view route param',this.cModel,this.cPk);
        // var route = that._getRoute({
        //     modelName: this.cModel,
        //     pk: this.cPk
        // });
        // that.route = route;

        if (that.cModel)
            that.conf.modelName = that.cModel;
        if (that.cPk)
            that.conf.pk = that.cPk;
        that.route = that._getRoute();
        that.setRouteValues(that.route);

        this.fetchData(that.route,function (json) {
            that.fillData(that.route,json);
            that.createActions();
            that.createActionsClass();
            that.createRenders();
            that.loading = false;
        });
    },
    data :  function () {
        var that = this;
        var d = this.defaultData();
        d.conf = that.getConf(that.cModel,'view');


        var dView = {
            loading : true,
            renders : {},
            actionsClass : [],
            actions : {},
            data : {},
            route : null,
            viewTitle : d.conf.viewTitle,
            defaultRenderType : 'r-text',
        }
        return this.$crud.merge(d,dView);

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
