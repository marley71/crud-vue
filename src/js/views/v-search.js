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
        },
        getFieldName : function (key) {
            return 's_' + key;
        },
        createRenders : function() {
            var that = this;
            var keys = (that.conf.fields && that.conf.fields.length > 0)?that.conf.fields:Object.keys(that.data.value);
            var renders = {};
            for (var k in keys) {
                var key = keys[k];
                renders[key] = that._defaultRenderConfig(key);
                if (that.data.value && that.data.value[key])
                    renders[key].value = that.data.value[key];
                if (!renders[key].operator) {
                    renders[key].operator = '=';
                }

                // var c = that.conf.fieldsConfig[key]?that.conf.fieldsConfig[key]:{type:that.defaultRenderType};
                // if (!c.type)
                //     c.type = that.defaultRenderType;
                // if (that.data.value && that.data.value[key])
                //     c.value = that.data.value[key];
                // if (!c.template)
                //     c.template = that.conf.renderTemplate;
                // renders[key] = c;
                //
                // var metadata = renders[key].metadata || {};
                // renders[key].metadata = Utility.merge( metadata,(that.data.metadata[key] || {}));
            }

            console.log('v-search.renders',renders);
            that.renders = renders;
        },
    },
    template : '#v-search-template'
});
