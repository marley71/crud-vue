crud.components.widgets.coreWCheckbox = Vue.component('core-w-checkbox',{
    extends : crud.components.widgets.wBase,
    mixins : [choice_mixin],
    mounted : function () {
        var that = this;
        if (that.domainValuesOrder.length == 0 && Object.keys(that.domainValues).length > 0) {
            that.domainValuesOrder = Object.keys(that.domainValues);
        }
    },
    methods : {
        setDomainValues : function (domainValues,domainValuesOrder) {
            var that = this;
            that.domainValues = domainValues;
            that.domainValuesOrder = domainValuesOrder?domainValuesOrder:Object.keys(domainValues);
            if (that.domainValuesOrder.indexOf(that.getValue()) < 0) {
                that.value = [that.domainValuesOrder[0]];
            }
        },
        getFieldName : function () {
            return this.name + '[]';
        }
    },
});

