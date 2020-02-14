Vue.component('r-select',{
    extends : crud.components.renders.rBase,
    template: '#r-select-template',
    data :  function () {
        var d = this.defaultData();
        d.domainValues = d.domainValues || {};
        d.domainValuesOrder = d.domainValuesOrder?d.domainValuesOrder:Object.keys(d.domainValues);
        return d;
        // return {
        //     name : this.cConf.name,
        //     value: this.cConf.value,
        //     domainValues : dV,
        //     domainValuesOrder : dVO
        // }
    },
});

