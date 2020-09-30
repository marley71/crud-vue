crud.components.widgets.coreWSwap = Vue.component('core-w-swap', {
    extends : crud.components.widgets.wBase,
    mounted : function () {
        var that = this;
        if (Object.keys(that.domainValues).length == 0) {
            that.domainValues = that.defaultDomainValues[that.swapType];
        }

        var keys = Object.keys(that.domainValues).map(String);
        if (keys.indexOf(""+that.value) >= 0) {
            that.slot = that.domainValues[""+that.value];
        } else {
            that.slot = that.domainValues[keys[0]];
        }

        //console.log('domainValues',that.domainValues,that.slot)
    },
    // data : function () {
    //     var that = this;
    //     var d = {};
    //     var _conf = that._getConf() || {};
    //     if (!("routeName" in _conf))
    //         d.routeName = 'set';
    //     d.iconClass = 'fa fa-circle';
    //     d.title = "swap";
    //     d.swapType = _conf.swapType?_conf.swapType:'icon';
    //     var defaultDomainValues = {
    //         icon : {
    //             0 : 'fa fa-circle text-danger',
    //             1 : 'fa fa-circle text-success'
    //         },
    //         text : {
    //             0 : that.translate('app.no'),
    //             1 : that.translate('app.si')
    //         }
    //     }
    //     var value = _conf.value;
    //     var dV = (_conf.domainValues)? _conf.domainValues:defaultDomainValues[d.swapType];
    //
    //     var keys = Object.keys(dV).map(String);
    //     if (keys.indexOf(""+value) >= 0) {
    //         d.slot = dV[""+value];
    //     } else {
    //         d.slot = dV[keys[0]];
    //     }
    //     d.domainValues = dV;
    //     return d;
    // },
    methods : {
        getDV : function() {
            var that = this;
            //console.log('swaptype',that.swapType,'domainValues',that.domainValues)
            return (that.domainValues)? that.domainValues:that.domainValues[that.swapType];

        },
        setRouteValues : function(route) {
            var that = this;
            var dV = that.getDV();
            var keys = Object.keys(dV);
            var value = that.value?that.value:keys[0];
            var vs = keys.map(String);
            var index = vs.indexOf(""+value);
            index = (index + 1) % vs.length;

            route.setValues({
                modelName: that.modelName,
                field : that.name, //that.key?that.conf.key:that.cKey,
                value : keys[index]
            });
            route.setParams({id:that.modelData.id});
            return route;
        },
        swap : function () {
            var that = this;
            var dV = that.getDV();
            var keys = Object.keys(dV);
            var value = that.value?that.value:keys[0];
            var vs = keys.map(String);
            var index = vs.indexOf(""+value);
            index = (index + 1) % vs.length;
            //console.log('INDEX ',index,vs,keys,keys[index],vs[index]);
            that._swap(keys[index]);
        },

        _swap : function (key) {
            var that = this;
            var r = that._getRoute();
            that.setRouteValues(r);
            var dV = that.getDV();
            Server.route(r,function (json) {
                if (json.error) {
                    that.errorDialog(json.msg);
                    return;
                }
                that.value = key;
                that.slot = dV[key];
                that.change();
            })
        }
    }
});
