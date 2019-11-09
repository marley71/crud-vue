Vue.component('v-view', {
    extends : Crud.components.views.vRecord,
    props : ['c-conf','c-model','c-pk'],
    data :  function () {
        var that = this;
        that.conf = that.getConf(that.cModel,'view');
        var routeName = 'insert';
        if (that.conf.rounteName != null) {
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
