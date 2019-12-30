Vue.component('r-select',{
    extends : Crud.components.renders.rBase,
    template: '#r-select-template',
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
});

