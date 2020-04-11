crud.components.renders.rCheckbox = Vue.component('r-checkbox',{
    extends : crud.components.renders.rBase,
    data :  function () {
        var that = this;
        var d = that._loadConf();
        var dV = d.domainValues;
        var dVO = d.domainValuesOrder?d.domainValuesOrder:Object.keys(dV);
        d.value = Array.isArray(d.value)?d.value:[d.value];
        d.domainValues = dV;
        d.domainValuesOrder = dVO;
        return d;
    },
    methods : {
        getFieldName : function () {
            return this.cKey + '[]';
        }
    },
    template: '#r-checkbox-template',
});

