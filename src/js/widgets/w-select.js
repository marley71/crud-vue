crud.components.widgets.coreWSelect = Vue.component('core-w-select',{
    extends : crud.components.widgets.wBase,
    mounted : function () {
        var that = this;
        if (that.domainValuesOrder.length == 0 && Object.keys(that.domainValues).length > 0) {
            that.domainValuesOrder = Object.keys(that.domainValues);
        }
    },
    // data :  function () {
    //     var d = this._loadConf();
    //     d.domainValues = d.domainValues || {};
    //     d.domainValuesOrder = d.domainValuesOrder?d.domainValuesOrder:Object.keys(d.domainValues);
    //     return d;
    // },
    methods : {
        reset : function() {
            if (this.defaultValue)
                this.value = this.defaultValue;
            else
                this.value = this.domainValuesOrder[0];
        },
    }
});

