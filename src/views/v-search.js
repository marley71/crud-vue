Vue.component('v-search', {
    extends : Crud.components.views.vRecord,
    props : ['c-conf','c-model','c-route-conf','c-target-ref'],
    data :  function () {
        var that = this;

        //var targetView = this.parent.$refs[that.cTargetView];
        //var targetView = null;
        //console.log('SEARCH',that.cModel,that.cRouteConf,that.cTargetView,targetView);
        that.conf = that.getConf(that.cModel,'search');
        var routeName = 'search';
        if (that.conf.routeName != null) {
            routeName = that.conf.routeName;
        }
        that.route = Route.factory(routeName,{
            values : {
                modelName: that.cModel,
            }
        })
        //that.createActions();
        this.fetchData(that.route,function (json) {
            that.fillData(that.route,json);
            that.createActions();
            that.createActionsClass();
            that.createRenders();
            that.loading = false;
        });

        return {
            loading : true,
            renders : {},
            actionsClass : [],
            actions : {},
            data : {},
            conf : that.conf,
            //route : route,
            defaultRenderType : 'r-input',
            targetRef : that.cTargetRef,
        }
    },
    methods : {
        doSearch : function (params) {
            var that = this;
            var oldP = Utility.cloneObj(this.cRouteConf.params);

            for (var k in params) {
                oldP[k] = params[k];
            }
            this.cRouteConf.params = oldP;
        }  
    },
    template : '#v-search-template'
});
