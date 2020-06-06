crud.components.widgets.wSelect = Vue.component('w-select',{
    extends : crud.components.widgets.wBase,
    template: '#w-select-template',
    data :  function () {
        var d = this._loadConf();
        d.domainValues = d.domainValues || {};
        d.domainValuesOrder = d.domainValuesOrder?d.domainValuesOrder:Object.keys(d.domainValues);
        return d;
    },
    methods : {
        reset : function() {
            if (this.defaultValue)
                this.value = this.defaultValue;
            else
                this.value = this.domainValuesOrder[0];
        },
    }
});

