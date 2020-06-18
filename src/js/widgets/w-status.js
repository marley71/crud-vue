crud.components.widgets.coreWStatus = Vue.component('core-w-status', {
    extends : crud.components.widgets.coreWSwap,
    data : function () {
        var that = this;
        var d = {};
        var _conf = that._getConf() || {};
        d.iconClass = 'fa fa-circle';
        d.title = "status";
        d.statusType = _conf.statusType?_conf.statusType:'icon';
        var defaultDomainValues = {
            icon : {
                0 : 'fa fa-circle text-danger',
                1 : 'fa fa-circle text-success'
            },
            text : {
                0 : that.translate('app.no'),
                1 : that.translate('app.si')
            }
        }
        var value = _conf.value;
        var dV = (_conf.domainValues)? _conf.domainValues:defaultDomainValues[d.swapType];

        var keys = Object.keys(dV).map(String);
        if (keys.indexOf(""+value) >= 0) {
            d.slot = dV[""+value];
        } else {
            d.slot = dV[keys[0]];
        }
        d.domainValues = dV;
        return d;
    },
    methods : {
        getDV : function() {
            var that = this;
            //console.log('swaptype',that.swapType,'domainValues',that.domainValues)
            return (that.domainValues)? that.domainValues:that.domainValues[that.statusType];

        }
    }
});
