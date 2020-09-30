crud.components.widgets.coreWRadio = Vue.component('core-w-radio',{
    extends : crud.components.widgets.wBase,
    mounted : function () {
        var that = this;
        if (that.domainValuesOrder.length == 0 && Object.keys(that.domainValues).length > 0) {
            that.domainValuesOrder = Object.keys(that.domainValues);
        }
    },

    // data : function() {
    //     var that = this;
    //     var _conf  = that._getConf() || {};
    //     var d = {};
    //     var dV = _conf.domainValues || {};
    //     d.domainValuesOrder = _conf.domainValuesOrder?_conf.domainValuesOrder:Object.keys(dV);
    //     return d;
    // },
});

