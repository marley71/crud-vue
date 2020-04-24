crud.components.widgets.wCustom = Vue.component('w-custom', {
    extends : crud.components.widgets.wBase,
    mounted : function() {
        this.value = this.getContent();
    },
    template: '#w-custom-template',
});
