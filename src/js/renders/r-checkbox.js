Vue.component('r-checkbox',{
    extends : Crud.components.renders.rBase,
    data :  function () {
        //console.log('c-select',this.cData);
        var d = this.defaultData();

        var dV = d.conf.metadata.domainValues;
        var dVO = d.conf.metadata.domainValuesOrder?d.conf.metadata.domainValuesOrder:Object.keys(dV);
        d.value = Array.isArray(d.conf.value)?Array.isArray(d.conf.value):[d.conf.value];
        d.domainValues = dV;
        d.domainValuesOrder = dVO;
        return d;
    },
    methods : {
        // inArray : function (v) {
        //     if (!this.value || !Array.isArray(this.value))
        //         return false;
        //     console.log('inArray ', v,(this.value.map(String).indexOf(""+v)));
        //     return (this.value.map(String).indexOf(""+v) >= 0)
        //
        // },
        getFieldName : function () {
            return this.cKey + '[]';
        }
    },
    template: '#r-checkbox-template',
});

