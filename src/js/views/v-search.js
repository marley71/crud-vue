crud.components.views.vSearch = Vue.component('v-search', {
    extends : crud.components.views.vRecord,
    props : ['cConf','cRouteConf','cTargetRef'],
    mounted : function() {
        var that = this;
        // var route = that._getRoute({
        //     modelName: this.cModel,
        // });
        // that.route = route;

        if (that.cModel)
            that.conf.modelName = that.cModel;
        that.route = that._getRoute();
        that.setRouteValues(that.route);

        this.fetchData(that.route,function (json) {
            that.fillData(that.route,json);
            that.createActions();
            that.createActionsClass();
            that.createWidgets();
            that.loading = false;
        });
    },

    data :  function () {
        var that = this;
        //var d = this.defaultData();
        //d.conf = that.getConf(that.cModel,'search');
        var d = this._loadConf(that.cModel,'search');

        var dSearch = {
            loading : true,
            widgets : {},
            actionsClass : [],
            actions : {},
            data : {},
            route : null,
            //viewTitle : d.conf.viewTitle,
            defaultWidgetType : 'w-input',
            targetRef : that.cTargetRef,
        }
        if (!("langContext" in d)){
            d.langContext = that.cModel;
        }
        d =  this.merge(dSearch,d);
        console.log('conf Search',d)
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
        createWidgets : function() {
            var that = this;
            var keys = (that.conf.fields && that.conf.fields.length > 0)?that.conf.fields:Object.keys(that.data.value);
            var widgets = {};
            for (var k in keys) {
                var key = keys[k];
                widgets[key] = that._defaultRenderConfig(key);
                widgets[key].cRef = that.getRefId(that._uid,'r',key);
                widgets[key].value = null;
                if (! ('label' in widgets[key]) )
                    widgets[key].label = key;
                widgets[key].label = that.$options.filters.translate(widgets[key].label,that.langContext);
                //widgets[key].operator = null;
                if (that.data.value && that.data.value[key])
                    widgets[key].value = that.data.value[key];

                widgets[key].name = that.getFieldName(key);
                if (!widgets[key].operator) {
                    widgets[key].operator = '=';
                }
            }

            console.log('v-searc.widgets',widgets);
            that.widgets = widgets;
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
