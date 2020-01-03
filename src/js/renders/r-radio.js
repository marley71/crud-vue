Vue.component('r-radio',{
    extends : crud.components.renders.rBase,
    data :  function () {
        var metadata = this.cConf.metadata || {};
        var dV = metadata.domainValues || {};
        var dVO = metadata.domainValuesOrder?metadata.domainValuesOrder:Object.keys(dV);
        return {
            name : this.cConf.name,
            value: this.cConf.value,
            domainValues : dV,
            domainValuesOrder : dVO
        }
    },
    template: '#r-radio-template',
});

