Vue.component('r-hasmany-view', {
    extends : crud.components.rHasmany,
    template: '#r-hasmany-view-template',
    data : function () {
        var d = this._loadConf();
        d.inputType = 'text';
        if (this.cConf.inputType)
            d.inputType = this.cConf.inputType;
        return d;
    }
});
