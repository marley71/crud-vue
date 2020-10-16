crud.components.widgets.coreWRadio = Vue.component('core-w-radio',{
    mixins : [choice_mixin],
    extends : crud.components.widgets.wBase,
    mounted : function () {
        var that = this;
        if (that.domainValuesOrder.length == 0 && Object.keys(that.domainValues).length > 0) {
            that.domainValuesOrder = Object.keys(that.domainValues);
        }
    },
});

