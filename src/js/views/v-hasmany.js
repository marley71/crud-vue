crud.components.views.vHasmany = Vue.component('v-hasmany', {
    extends : crud.components.views.vRecord,
    //props : ['c-conf'],
    data :  function () {
        var that = this;
        var d =  {
            defaultWidgetType : 'w-input',
        }
        return d;
    },
    methods : {
        fillData : function () {
            this.value = this.conf.value;
        },
        getFieldName : function (key) {
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
