Vue.component('v-view', {
    extends : Crud.components.views.vRecord,
    props : ['c-conf','c-model','c-pk'],
    mounted : function() {

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
            defaultRenderType : 'r-input',
        }


        var routeName = 'insert';
        if (d.conf.rounteName != null) {
            routeName = that.conf.rounteName;
        }
        that.route = Route.factory('view',{
            values : {
                modelName: this.cModel,
                pk: this.cPk
            }
        })

        this.fetchData(that.route,function (json) {
            that.fillData(that.route,json);
            that.createActions();
            that.createActionsClass();
            that.createRenders();
            that.loading = false;
            console.log(that);
        });

        return {
            loading : true,
            renders : {},
            actionsClass : [],
            actions : {},
            data : {},
            conf : that.conf,
            //route : route,
            defaultRenderType : 'r-text',
        }

    },

    template : '#v-view-template'
});
