crud.components.views.vHasmanyView = Vue.component('v-hasmany-view', {
    extends : crud.components.views.vRecord,
    props : ['c-conf'],
    data :  function () {
        var that = this;
        var d  = that._loadConf(that.cModel,'view');
        //that.createActions();

        //that.loading = true;

        var dHasmany = {
            loading : true,
            widgets : {},
            actionsClass : [],
            actions : {},
            data : {},
            //conf : that.conf,//jQuery.extend(true,{},ModelTest.edit),
            defaultRenderType : 'w-text',
        }
        return this.$crud.merge(dHasmany,d);
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
            that.createWidgets();
            that.loading = false;
            console.log('v-hasmany',that.loading);
        });
    },
    template : '#v-hasmany-template'
});
