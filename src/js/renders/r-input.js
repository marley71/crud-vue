Vue.component('r-input', {
    extends : crud.components.renders.rBase,
    template: '#r-input-template',
    data : function () {
        var d = this.defaultData();
        d.inputType = d.inputType?d.inputType:'text';
        return d;
    }
});