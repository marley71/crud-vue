const wStatusMixin = {
    methods: {
        dynamicData (conf) {
            var value = conf.value
            var dV = (conf.domainValues) ? conf.domainValues : conf.defaultDomainValues[conf.statusType]
            console.log('dV', dV, conf)
            var keys = Object.keys(dV).map(String)
            if (keys.indexOf('' + value) >= 0) {
                conf.slot = dV['' + value]
            } else {
                conf.slot = dV[keys[0]]
            }
            conf.domainValues = dV
            console.log('status domain values', dV)
            return conf
        },
        getDV: function () {
            var that = this
            // console.log('swaptype',that.swapType,'domainValues',that.domainValues)
            return (that.domainValues) ? that.domainValues : that.domainValues[that.statusType]
        }
    }
}
export default wStatusMixin
