crud.components.renders.rInput = Vue.component('r-input', {
    extends : crud.components.renders.rBase,
    template: '#r-input-template',
    data : function () {
        var d = this._loadConf();
        d.inputType = d.inputType?d.inputType:'text';
        return d;
    }
});
