Vue.component('r-hasmany-view', {
    extends : Crud.components.rHasmany,
    template: '#r-hasmany-view-template',
    beforeCreated : function() {
        this.$options.template  = '#r-hasmany-view-template1';
    },
    data : function () {
        var d = this.defaultData();
        d.inputType = 'text';
        if (this.cConf.inputType)
            d.inputType = this.cConf.inputType;
        return d;
    }
});