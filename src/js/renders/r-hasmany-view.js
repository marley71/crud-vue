Vue.component('r-hasmany-view', {
    extends : crud.components.rHasmany,
    template: '#r-hasmany-view-template',
    beforeCreated : function() {
        this.$options.template  = '#r-hasmany-view-template1';
    },
    data : function () {
        console.log('HASMNAYVIEW',this.value);
        var d = this.defaultData();
        d.inputType = 'text';
        if (this.cConf.inputType)
            d.inputType = this.cConf.inputType;
        return d;
    }
});