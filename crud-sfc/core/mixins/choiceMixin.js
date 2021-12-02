const choiceMixin = {
    mounted: function () {
        var that = this;
        if (that.domainValuesOrder.length == 0 && Object.keys(that.domainValues).length > 0) {
            that.domainValuesOrder = Object.keys(that.domainValues);
        }
    },
    methods: {
        setDomainValues: function (domainValues, domainValuesOrder) {
            var that = this;
            that.domainValues = domainValues;
            that.domainValuesOrder = domainValuesOrder ? domainValuesOrder : Object.keys(domainValues);
            if (that.domainValuesOrder.indexOf(that.getValue()) < 0) {
                that.value = [that.domainValuesOrder[0]];
            }
        },
        getFieldName: function () {
            return this.name + '[]';
        },
        getText () {
            return this.domainValues[this.getValue()];
        }
    }
}

export default choiceMixin
