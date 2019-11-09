Vue.component('r-input-helped', {
    extends : Crud.components.renders.rBase,
    template: '#r-input-helped-template',
    data : function () {
        var d = this.defaultData();
        d.inputType = 'text';
        if (this.cConf.inputType)
            d.inputType = this.cConf.inputType;
        return d;
    },

    methods : {
        setValue : function (key) {
            this.value = key;//this.conf.metadata.domainValues[key];
            //jQuery(this.$el)
        }
    }

});