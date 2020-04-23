crud.components.renders.rInputHelped =  Vue.component('r-input-helped', {
    extends : crud.components.renders.rBase,
    template: '#r-input-helped-template',
    data : function () {
        var d = {};
        if (this.cConf.domainValues && !this.cConf.domainValuesOrder)
            d.domainValuesOrder = Object.keys(this.cConf.domainValues);
        return d;
    }
});
