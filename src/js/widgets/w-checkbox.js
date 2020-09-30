crud.components.widgets.coreWCheckbox = Vue.component('core-w-checkbox',{
    extends : crud.components.widgets.wBase,
    mounted : function () {
        var that = this;
        if (that.domainValuesOrder.length == 0 && Object.keys(that.domainValues).length > 0) {
            that.domainValuesOrder = Object.keys(that.domainValues);
        }
    },

    // data :  function () {
    //     var that = this;
    //     var _conf = that._getConf() || {};
    //     var d = {};
    //     var dV = _conf.domainValues || {};
    //     var dVO = _conf.domainValuesOrder?_conf.domainValuesOrder:Object.keys(dV);
    //     if (_conf.value)
    //         d.value = Array.isArray(_conf.value)?_conf.value:[_conf.value];
    //     else
    //         d.value = [];
    //     d.domainValues = dV;
    //     d.domainValuesOrder = dVO;
    //     return d;
    // },
    methods : {
        getFieldName : function () {
            return this.name + '[]';
        }
    },
});

