<template>
    <span>
        <span v-if="statusType=='text'">{{ slot }}</span>
        <i v-if="statusType=='icon'" v-bind:class="slot"></i>
    </span>
</template>

<script>
import wBase from "./wBase";
import crud from "../../crud/confs";

crud.conf['w-status'] = {
    iconClass: 'fa fa-circle',
    title: "status",
    statusType: 'icon',
    slot : '',
    defaultDomainValues: {
        icon: {
            0: 'fa fa-circle text-red-500',
            1: 'fa fa-circle text-green-500'
        },
        text: {
            0: 'app.no',
            1: 'app.si'
        }
    }
};

export default {
    name: "w-status",
    extends: wBase,

    // data33: function () {
    //     var that = this;
    //     var d = {};
    //     var _conf = that._getConf() || {};
    //     d.iconClass = 'fa fa-circle';
    //     d.title = "status";
    //     d.statusType = _conf.statusType ? _conf.statusType : 'icon';
    //     var defaultDomainValues = {
    //         icon: {
    //             0: 'fa fa-circle text-danger',
    //             1: 'fa fa-circle text-success'
    //         },
    //         text: {
    //             0: that.translate('app.no'),
    //             1: that.translate('app.si')
    //         }
    //     }
    //     var value = _conf.value;
    //     var dV = (_conf.domainValues) ? _conf.domainValues : defaultDomainValues[d.swapType];
    //
    //     var keys = Object.keys(dV).map(String);
    //     if (keys.indexOf("" + value) >= 0) {
    //         d.slot = dV["" + value];
    //     } else {
    //         d.slot = dV[keys[0]];
    //     }
    //     d.domainValues = dV;
    //     return d;
    // },
    methods: {
        dynamicData(conf) {
            var value = conf.value;
            var dV = (conf.domainValues) ? conf.domainValues : conf.defaultDomainValues[conf.statusType];
            console.log('dV',dV,conf);
            var keys = Object.keys(dV).map(String);
            if (keys.indexOf("" + value) >= 0) {
                conf.slot = dV["" + value];
            } else {
                conf.slot = dV[keys[0]];
            }
            conf.domainValues = dV;
            console.log('status domain values',dV);
            return conf;
        },
        getDV: function () {
            var that = this;
            //console.log('swaptype',that.swapType,'domainValues',that.domainValues)
            return (that.domainValues) ? that.domainValues : that.domainValues[that.statusType];

        }
    }
}
</script>

<style scoped>

</style>
