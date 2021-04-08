const choiceMixin = {
    methods: {
        setDomainValues : function (domainValues,domainValuesOrder) {
            var that = this;
            that.domainValues = domainValues;
            that.domainValuesOrder = domainValuesOrder?domainValuesOrder:Object.keys(domainValues);
            if (that.domainValuesOrder.indexOf(that.getValue()) < 0) {
                that.value = that.domainValuesOrder[0];
            }
        },
        reset : function() {
            if (this.defaultValue)
                this.value = this.defaultValue;
            else
                this.value = this.domainValuesOrder[0];
        }
    }
}

export default choiceMixin
