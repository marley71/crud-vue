crud.components.renders.rCustom = Vue.component('r-custom', {
    extends : crud.components.renders.rBase,
    mounted : function() {
        this.value = this.getContent();
    },
    template: '#r-custom-template',
});
