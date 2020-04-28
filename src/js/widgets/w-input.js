crud.components.widgets.wInput = Vue.component('w-input', {
    extends : crud.components.widgets.wBase,
    template: '#w-input-template',
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
