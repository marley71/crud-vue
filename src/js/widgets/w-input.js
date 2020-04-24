crud.components.widgets.wInput = Vue.component('w-input', {
    extends : crud.components.widgets.wBase,
    template: '#w-input-template',
    data : function () {
        var d = this._loadConf();
        d.inputType = d.inputType?d.inputType:'text';
        return d;
    }
});
