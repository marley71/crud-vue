Vue.component('r-hasmany-image',{
    extends : crud.components.renders.rBase,
    // data :  function () {
    //     //console.log('r-hasmany-image',this.cData);
    //     //var dV = this.cData.metadata.domainValues;
    //     //var dVO = this.cData.metadata.domainValuesOrder?this.cData.metadata.domainValuesOrder:Object.keys(dV);
    //     return {
    //         //name : this.cData.name,
    //         value: this.cConf.value,
    //         //domainValues : dV,
    //         //domainValuesOrder : dVO
    //     }
    // },
    template: '#r-hasmany-image-template',
});

