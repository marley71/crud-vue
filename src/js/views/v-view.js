Vue.component('v-view', {
    extends : Crud.components.views.vRecord,
    //props : ['cModel','cPk'],

    mounted : function() {
        var that = this;
        //console.log('view route param',this.cModel,this.cPk);
        var route = that._getRoute({
            modelName: this.cModel,
            pk: this.cPk
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
        return Utility.merge(d,dView);

    },

    template : '#v-view-template'
});
