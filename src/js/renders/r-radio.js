Vue.component('r-radio',{
    extends : crud.components.renders.rBase,
    data : function() {
        var d = this._loadConf();
        var dV = d.domainValues || {};
        d.domainValuesOrder = d.domainValuesOrder?d.domainValuesOrder:Object.keys(dV);
        return d;
    },

    // data :  function () {
    //     var dV = this.conf.domainValues || {};
    //     var dVO = this.cConf.domainValuesOrder?metadata.domainValuesOrder:Object.keys(dV);
    //     return {
    //         name : this.cConf.name,
    //         value: this.cConf.value,
    //         domainValues : dV,
    //         domainValuesOrder : dVO
    //     }
    // },
    template: '#r-radio-template',
});

