crud.components.widgets.wHasmanyView = Vue.component('w-hasmany-view', {
    extends : crud.components.rHasmany,
    template: '#w-hasmany-view-template',
    data : function () {
        var d = this._loadConf();
        d.inputType = 'text';
        if (this.cConf.inputType)
            d.inputType = this.cConf.inputType;
        return d;
    }
});
