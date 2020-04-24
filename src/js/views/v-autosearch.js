crud.components.views.vAutosearch = Vue.component('v-autosearch', {
    extends : crud.components.views.vRecord,
    props : ['cConf','cModel','cRouteConf','cTargetRef'],
    mounted : function() {
        var that = this;
        var route = that._getRoute({
            modelName: this.cModel,
        });
        that.route = route;

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
        d.conf = that.getConf(that.cModel,'search');


        var dSearch = {
            loading : true,
            renders : {},
            actionsClass : [],
            actions : {},
            data : {},
            route : null,
            viewTitle : d.conf.viewTitle,
            defaultRenderType : 'w-input',
            targetRef : that.cTargetRef,
        }
        return this.$crud.merge(d,dSearch);
    },
    methods : {
        doSearch : function (params) {
            var that = this;
            var oldP = this.$crud.cloneObj(this.cRouteConf.params);

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
                renders[key].cRef = that.$crud.getRefId(that._uid,'r',key);
                renders[key].value = null;
                if (! ('label' in renders[key]) )
                    renders[key].label = key;
                //renders[key].operator = null;
                if (that.data.value && that.data.value[key])
                    renders[key].value = that.data.value[key];

                renders[key].name = that.getFieldName(key);
                if (!renders[key].operator) {
                    renders[key].operator = '=';
                }
            }

            console.log('v-searc.renders',renders);
            that.renders = renders;
        },
    },
    template : '#v-search-template'
});
