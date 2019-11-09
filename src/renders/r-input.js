Vue.component('r-input', {
    extends : Crud.components.renders.rBase,
    template: '#r-input-template',
    data : function () {
        var d = this.defaultData();
        d.inputType = 'text';
        var _conf = this.cConf || {};
        if (_conf.inputType)
            d.inputType = _conf.inputType;
        return d;
    }
});