crud.components.widgets.wCheckbox = Vue.component('w-checkbox',{
    extends : crud.components.widgets.wBase,
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
    template: '#w-checkbox-template',
});

