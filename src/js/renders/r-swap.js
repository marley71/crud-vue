Vue.component('r-swap', {
    extends : crud.components.renders.rBase,
    template: '#r-swap-template',
    data : function () {
        var that = this;
        SWAP = that;
        var d = this.defaultData();
        d.iconClass = 'fa fa-circle';
        d.title = "swap";
        d.swapType = d.swapType?d.swapType:'icon';
        d.domainValues = {
            icon : {
                0 : 'fa fa-circle text-danger',
                1 : 'fa fa-circle text-success'
            },
            text : {
                0 : 'No',
                1 : 'Si'
            }
        }
        var dV = (d.metadata && d.metadata.domainValues)? d.metadata.domainValues:d.domainValues[d.swapType];
        var keys = Object.keys(dV).map(String);
        if (keys.indexOf(""+d.value) >= 0) {
            d.slot = dV[""+d.value];
        } else {
            d.slot = dV[keys[0]];
        }
        //d.slot = '';
        return d;
    },
    // computed : {
    //     domainValues : function () {
    //
    //     }
    // },
    methods : {
        getDV : function() {
            var that = this;
            console.log('swaptype',that.swapType,'domainValues',that.domainValues)
            return (that.conf.metadata && that.conf.metadata.domainValues)? that.conf.metadata.domainValues:that.domainValues[that.swapType];

        },
        swap : function () {
            var that = this;
            var dV = that.getDV();
            var keys = Object.keys(dV);
            //var labels = Object.values(dV);
            var value = that.value?that.value:keys[0];

            //console.log('dV',dV);
            var vs = keys.map(String);
            var index = vs.indexOf(""+value);
            index = (index + 1) % vs.length;
            //console.log('INDEX ',index,vs,keys,keys[index],vs[index]);

            that._swap(keys[index]);
        },
        _swap : function (key) {
            var that = this;
            var r = Route.factory('set');
            //var viewConf = self._viewConfig[viewKey];
            r.values = {
                modelName: that.conf.metadata.modelName,
                field : that.conf.key?that.conf.key:that.cKey,
                value : that.value
            };

            r.params = {id:that.conf.modelData.id};
            Server.route(r,function (json) {
                if (json.error) {
                    that.$crud.errorDialog(json.msg);
                    return;
                }
                var dV = that.getDV();
                that.value = key;
                that.slot = dV[key];
                that.change();
            })
        },
        getDomainValues : function () {

        }
    }
});