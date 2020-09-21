crud.components.widgets.coreWInput = Vue.component('core-w-input', {
    extends : crud.components.widgets.wBase,
    data : function () {
        var that = this;
        var _conf = that._getConf() || {};
        var d = {
            inputType : 'text'
        };
        if (_conf.inputType)
            d.inputType = _conf.inputType;
        return d;
    }
});
