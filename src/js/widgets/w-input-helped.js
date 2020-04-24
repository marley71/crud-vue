crud.components.widgets.wInputHelped =  Vue.component('w-input-helped', {
    extends : crud.components.widgets.wBase,
    template: '#w-input-helped-template',
    data : function () {
        var d = {};
        if (!this.cConf.domainValuesOrder)
            d.domainValuesOrder = Object.keys(this.cConf.domainValues || {});
        if (!this.cConf.customValue)
            d.customValue = false;
        return d;
    }
});
