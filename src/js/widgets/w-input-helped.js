crud.components.widgets.coreWInputHelped =  Vue.component('core-w-input-helped', {
    extends : crud.components.widgets.wBase,
    data : function () {
        var d = {};
        if (!this.cConf.domainValuesOrder)
            d.domainValuesOrder = Object.keys(this.cConf.domainValues || {});
        if (!this.cConf.customValue)
            d.customValue = false;
        return d;
    }
});
