crud.components.views.vInsert = Vue.component('v-insert', {
    extends : crud.components.views.vRecord,
    //props : ['c-conf','c-model'],

    mounted : function() {
        var that = this;
        if (that.cModel)
            that.conf.modelName = that.cModel;

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
        var d = this._loadConf(that.cModel,'insert');
        //d.conf = that.getConf(that.cModel,'insert');

        var dInsert = {
            loading : true,
            widgets : {},
            actionsClass : [],
            actions : {},
            data : {},
            //conf : that.conf,
            defaultWidgetType : 'w-input',
        }
        return this.merge(dInsert,d);

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
