Vue.component('v-edit', {
    extends : Crud.components.views.vRecord,
    props : ['c-model','c-pk'],

    mounted : function() {
        var that = this;
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
            console.log('BBBBBBB');
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
        return Utility.merge(d,dEdit);

    },
    methods : {
       getFormData : function () {

       }
    },
    template : '#v-edit-template'
});
