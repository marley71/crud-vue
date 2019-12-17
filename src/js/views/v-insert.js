Vue.component('v-insert', {
    extends : Crud.components.views.vRecord,
    props : ['c-conf','c-model'],

    mounted : function() {
        var that = this;
        var route = that._getRoute({
            modelName: this.cModel,
        });

        that.route = route;
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
        var d = this.defaultData();
        d.conf = that.getConf(that.cModel,'insert');

        var dInsert = {
            loading : true,
            renders : {},
            actionsClass : [],
            actions : {},
            data : {},
            conf : that.conf,
            defaultRenderType : 'r-input',
        }
        return Utility.merge(d,dInsert);

    },
    template : '#v-insert-template'

});
