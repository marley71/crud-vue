crud.components.renders.rSelect = Vue.component('r-select',{
    extends : crud.components.renders.rBase,
    template: '#r-select-template',
    data :  function () {
        var d = this._loadConf();
        d.domainValues = d.domainValues || {};
        d.domainValuesOrder = d.domainValuesOrder?d.domainValuesOrder:Object.keys(d.domainValues);
        return d;
    },
});

