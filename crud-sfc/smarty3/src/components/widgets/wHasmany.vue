<template>
    <div class="box-content border-gray-900 p-3">
        <div class="portlet-header border-bottom mb-1 " :class="bgClass">
            <span class="text-dark text-truncate font-weight-medium">{{ label | translate }}</span>&nbsp;
            <div v-if="outOfLimit()" class="text-center">
                <span class="text-red-600 " >
                    <!-- Limite massimo raggiunto -->
                    {{ 'app.limite-raggiunto' | translate }}
                </span>
            </div>
            <div v-else >
                <button v-on:click="addItem" type="button"
                        class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                    <span>{{ 'app.aggiungi' | translate }}</span>&nbsp;
                </button>
            </div>
        </div>
        <div class="portlet-body">
            <input type="hidden" value="1">
            <div class="row">
                <div class="mt-2" v-for="(item,index) in confViews" v-show="showItem(item.cRef)" :key="index">
                    <div class="card p-1 m-0
                     shadow-md shadow-lg-hover transition-all-ease-250 transition-hover-top h-60 border-danger bl-0 br-0 bb-0 bw--2">
                        <!--<div class="card-header" crud-hasmany_title>-->
                        <!--{{cConf.metadata.modelName}}-->
                        <!--</div>-->
                        <div class=" pr-3">
                            <button v-on:click="deleteItem(item.cRef)" class="text-red-600 float-right"
                                    type="button" :title="translate('app.cancella')"><i class="fa fa-trash"></i>
                            </button>
                        </div>
                        <div class="p-1">
                            <v-hasmany v-bind:c-model="name" v-bind:c-conf="item"></v-hasmany>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
import wBase from "./wBase";
import crud from "../../crud/confs";

crud.conf['w-hasmany'] = {
    confViews : {},
    limit : 100,
    value : [],
    bgClass : 'bg-warning-soft'
};

export default {
name: "w-hasmany",
    extends : wBase,
    mounted : function() {
        var that = this;
        that.keyCounter = 0; // intero per generare chiave uniche
        //console.log('hasmany',that.value);
        if (that.value && that.value.length > 0) {
            for (var i in that.value) {
                that.value[i].status = 'updated';
                var _conf = that.getHasmanyConf(that.value[i]);
                that.confViews[_conf.cRef] = _conf;
            }
            this.$forceUpdate();
        }
    },

    methods : {
        /**
         * ritorna la subview associata hai campi dell'hasmany
         * @param index: indice della view richiesta
         * @return {null|*}
         */
        // getView : function(index) {
        //     var that = this;
        //     var vConf = that.confViews[index];
        //     if (!vConf)
        //         return null;
        //     return that.$crud.cRefs[vConf.cRef];
        // },
        getHasmanyConf : function (value) {
            var that = this;
            var hmConf = that.hasmanyConf || {};
            var relationConf = that.relationConf || {};
            hmConf = this.mergeConfView({
                fields : [],
                fieldsConfig : {},
                routeName : null,
                value : value,
                metadata : relationConf
            },hmConf);
            hmConf.cRef = that.getRefId(that._uid,'hm',that.keyCounter++);
            //alert(hmConf.cRef)
            if (value && Object.keys(value).length > 0) {
                if (!hmConf.fields || !hmConf.fields.length) {
                    hmConf.fields = Object.keys(value);
                }
            }
            return hmConf;

        },
        addItem : function () {
            var that = this;
            //var conf = that.getHasmanyConf(null);
            var value = {
                status : 'new'
            }
            that.value.push(value);
            var _conf = that.getHasmanyConf(value);
            that.confViews[_conf.cRef] = _conf;
            this.$forceUpdate();
        },

        deleteItem : function (refId) {
            var that = this;
            console.log('delete',refId,this.$crud.cRefs[refId].value)
            var newConfViews = {};
            // per questioni di aggiornamento assegno ad un'altra variabile, altrimenti vue non renderizza come dovuto
            for (var vId in that.confViews) {
                newConfViews[vId] =  that.confViews[vId];
            }
            if (this.$crud.cRefs[refId].value.status  == 'new') {
                delete newConfViews[refId];
                this.$crud.cRefs[refId].$destroy();

            } else {
                newConfViews[refId].value.status = 'deleted';
                if (that.getComponent(refId)) {
                    that.getComponent(refId).getWidget('status').setValue('deleted');
                }
            }
            that.$set(that,'confViews', newConfViews);
            this.$forceUpdate();
        },
        showItem : function (refId) {
            //console.log('show item',index,this.confViews[index]);
            console.log('showItem',refId,this.confViews[refId])
            if (!this.confViews[refId])
                return false;
            return (this.confViews[refId].value.status != 'deleted'  )
        },
        outOfLimit : function () {
            var that = this;
            var valid = 0;
            for (var k in that.confViews) {
                if (that.confViews[k].value.status != 'deleted')
                    valid++;
            }
            //console.log('outlimit',valid,that.limit);
            return (valid >= that.limit);
        },

        getValue : function () {
            var that = this;
            var value = [];
            for (let k in that.confViews) {
                var vId = this.confViews[k].cRef;
                value.push(this.$crud.cRefs[vId].getValue());
            }
            return value;
        }
    }
}
</script>

<style scoped>

</style>
