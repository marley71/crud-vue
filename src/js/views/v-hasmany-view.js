crud.components.views.vHasmanyView = Vue.component('v-hasmany-view', {
    extends : crud.components.views.vRecord,
    props : {
        cType : {
            default : 'view'
        }
    },
    data :  function () {
        var that = this;
        var dHasmany = {
            defaultWidgetType : 'w-text',
        }
        return dHasmany;
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
    // mounted : function () {
    //     var that = this;
    //     this.fetchData(null,function (json) {
    //         that.fillData(null,null);
    //         that.createActions();
    //         that.createActionsClass();
    //         that.createWidgets();
    //         that.loading = false;
    //         console.log('v-hasmany',that.loading);
    //     });
    // },
    template : '#v-hasmany-template'
});
