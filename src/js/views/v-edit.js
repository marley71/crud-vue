Vue.component('v-edit', {
    extends : crud.components.views.vRecord,
    //props : ['cModel','cPk'],

    mounted : function() {
        var that = this;
        if (that.cModel)
            that.conf.modelName = that.cModel;
        if (that.cPk)
            that.conf.pk = that.cPk;

        // var route = that._getRoute({
        //     modelName: this.cModel,
        //     pk: this.cPk
        // });
        that.route = that._getRoute();

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
        d.conf = that.getConf(that.cModel,'edit');


        var dEdit = {
            loading : true,
            renders : {},
            actionsClass : [],
            actions : {},
            data : {},
            route : null,
            viewTitle : d.conf.viewTitle,
            defaultRenderType : 'r-input',
        }
        return this.$crud.merge(d,dEdit);

    },
    methods : {
       getFormData : function () {

       }
    },
    template : '#v-edit-template'
});
