crud.components.views.vHasmany = Vue.component('v-hasmany', {
    extends : crud.components.views.vRecord,
    //props : ['c-conf'],
    data :  function () {
        var that = this;
        //var d = that._loadConf(that.cModel,'edit');
        var dHasmany =  {
            loading : true,
            widgets : {},
            actionsClass : [],
            actions : {},
            //data : {},
            //conf : conf,//jQuery.extend(true,{},ModelTest.edit),
            defaultWidgetType : 'w-input',
        }
        return dHasmany;
    },
    methods : {
        fillData : function () {
            //console.log('filldata',this.data);
            this.value = this.conf.value;
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
            that.createWidgets();
            that.loading = false;
            console.log('v-hasmany',that.loading);
        });
    },
    template : '#v-hasmany-template'
});
