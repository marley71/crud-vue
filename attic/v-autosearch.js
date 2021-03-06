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
            that.createWidgets();
            that.loading = false;
        });
    },

    data :  function () {

        var that = this;
        var d = this.defaultData();
        d.conf = that.getConf(that.cModel,'search');


        var dSearch = {
            loading : true,
            widgets : {},
            actionsClass : [],
            actions : {},
            data : {},
            route : null,
            viewTitle : d.conf.viewTitle,
            defaultWidgetType : 'w-input',
            targetRef : that.cTargetRef,
        }
        return this.merge(d,dSearch);
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
            var keys = (that.conf.fields && that.conf.fields.length > 0)?that.conf.fields:Object.keys(that.value);
            var widgets = {};
            for (var k in keys) {
                var key = keys[k];
                widgets[key] = that._defaultWidgetConfig(key);
                widgets[key].cRef = that.getRefId(that._uid,'r',key);
                widgets[key].value = null;
                if (! ('label' in widgets[key]) )
                    widgets[key].label = key;
                if (that.value && that.value[key])
                    widgets[key].value = that.value[key];

                widgets[key].name = that.getFieldName(key);
            }

            console.log('v-searc.widgets',widgets);
            that.widgets = widgets;
        },
    },
    template : '#v-search-template'
});
