crud.components.widgets.wRadio = Vue.component('w-radio',{
    extends : crud.components.widgets.wBase,
    template: '#w-radio-template',
    data : function() {
        var that = this;
        var _conf  = that.cConf || {};
        var d = {};
        var dV = _conf.domainValues || {};
        d.domainValuesOrder = _conf.domainValuesOrder?_conf.domainValuesOrder:Object.keys(dV);
        return d;
    },
});

