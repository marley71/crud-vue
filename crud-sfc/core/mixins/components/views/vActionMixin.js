const vActionMixin = {
    data: function () {
        var that = this
        var aConf = {}
        if (that.cAction) {
            aConf = {
                name: that.cAction.name,
                conf: that.cAction
            }
        } else {
            console.warn('configurazione azione non valida', this.cAction)
        }
        return aConf
    }
}
export default vActionMixin
