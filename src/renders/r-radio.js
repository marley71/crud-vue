Vue.component('r-radio',{
    extends : Crud.components.renders.rBase,
    data :  function () {
        //console.log('c-select',this.cData);
        var dV = this.cConf.metadata.domainValues;
        var dVO = this.cConf.metadata.domainValuesOrder?this.cConf.metadata.domainValuesOrder:Object.keys(dV);
        return {
            name : this.cConf.name,
            value: this.cConf.value,
            domainValues : dV,
            domainValuesOrder : dVO
        }
    },
    template: '#r-radio-template',
});

