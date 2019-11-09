Vue.component('v-hasmany-view', {
    extends : Crud.components.views.vRecord,
    props : ['c-conf'],
    data :  function () {
        var that = this;
        that.conf = that.getConf(that.cModel,'edit');
        //that.createActions();

        //that.loading = true;

        return {
            loading : true,
            renders : {},
            actionsClass : [],
            actions : {},
            data : {},
            conf : that.conf,//jQuery.extend(true,{},ModelTest.edit),
            defaultRenderType : 'r-text',
        }

    },
    methods : {
        fillData : function () {
            this.data = this.cConf.data;
        },
        renderKey : function (key) {
            var that = this;
            return that.cModel + "-" + key + '[]';
        }
    },
    mounted : function () {
        var that = this;
        this.fetchData(null,function (json) {
            that.fillData(null,null);
            that.createActions();
            that.createActionsClass();
            that.createRenders();
            that.loading = false;
            console.log('v-hasmany',that.loading);
        });
    },
    template : '#v-hasmany-template'
});
