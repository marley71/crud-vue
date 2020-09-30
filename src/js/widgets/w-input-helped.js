crud.components.widgets.coreWInputHelped =  Vue.component('core-w-input-helped', {
    extends : crud.components.widgets.wBase,
    mounted : function () {
        var that = this;
        if (that.domainValuesOrder.length == 0 && Object.keys(that.domainValues).length > 0) {
            that.domainValuesOrder = Object.keys(that.domainValues);
        }
    }
    // data : function () {
    //     var d = {};
    //     if (!this.cConf.domainValuesOrder)
    //         d.domainValuesOrder = Object.keys(this.cConf.domainValues || {});
    //     if (!this.cConf.customValue)
    //         d.customValue = false;
    //     return d;
    // }
});
