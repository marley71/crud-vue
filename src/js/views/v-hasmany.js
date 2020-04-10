Vue.component('v-hasmany', {
    extends : crud.components.views.vRecord,
    //props : ['c-conf'],
    data :  function () {
        var that = this;
        console.log('v-hasmany');
        var conf = that._loadConf(that.cModel,'edit');
        return {
            loading : true,
            renders : {},
            actionsClass : [],
            actions : {},
            data : {},
            conf : conf,//jQuery.extend(true,{},ModelTest.edit),
            defaultRenderType : 'r-input',
        }

    },
    methods : {
        fillData : function () {
            this.data = this.conf.data;
        },
        // renderKey : function (key) {
        //     var that = this;
        //     return that.cModel + "-" + key + '[]';
        // },
        getFieldName : function (key) {
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
