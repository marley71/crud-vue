Vue.component('r-input-helped', {
    extends : crud.components.renders.rBase,
    template: '#r-input-helped-template',
    data : function () {
        var d = this.defaultData();
        return d;
    },

    methods : {
        setValue : function (key) {
            this.value = key;//this.conf.metadata.domainValues[key];
            //jQuery(this.$el)
        }
    }

});