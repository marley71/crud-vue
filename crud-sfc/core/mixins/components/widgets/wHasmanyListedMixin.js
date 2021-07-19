import crud from "../../../crud";

crud.conf['w-hasmany-listed'] = {
    confViews: {},
    limit: 100,
    value: [],
    bgClass: 'bg-warning-soft',
    hasmanyConf : {
        actions : ['action-insert','action-delete'],
    }
}

const wHasmanyListedMixin = {
    mounted: function () {
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

    methods: {
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
        getHasmanyConf: function () {
            var that = this;
            var hmConf = that.hasmanyConf || {};
            var relationConf = that.relationConf || {};
            hmConf = this.mergeConfView({
                defaultWidgetType  : 'w-input',
                //fields: [],
                //fieldsConfig: {},
                // routeName: null,
                // value: value,
                metadata: relationConf,
                // customActions: {
                //     'action-insert' : {
                //         execute() {
                //             this.view.value.push({});
                //             this.view.reload();
                //         }
                //     }
                // },
            }, hmConf);
            // forzo alcune cose che non possono essere definite dall'utente in configurazione
            hmConf.routeName = null;
            if (hmConf.actions.indexOf('action-insert') >= 0) {
                var aiConf = hmConf.customActions['action-insert'] || {};
                aiConf.execute = function () {
                    //this.view.value.push({});
                    this.view.addItem();
                    this.view.reload();
                }
                hmConf.customActions['action-insert'] = aiConf;
            }
            if (hmConf.actions.indexOf('action-delete') >= 0) {
                var adConf = hmConf.customActions['action-delete'] || {};
                adConf.execute = function () {
                    this.view.value.splice(this.index,1);
                    this.view.reload();
                }
                hmConf.customActions['action-delete'] = adConf;
            }
            hmConf.cRef = that.getRefId(that._uid, 'hm', 'list');
            //alert(hmConf.cRef)
            if (that.value && Object.keys(that.value).length > 0) {
                if (!hmConf.fields || !hmConf.fields.length) {
                    hmConf.fields = Object.keys(that.value);
                }
            }
            return hmConf;

        },
        addItem: function () {
            var that = this;
            //var conf = that.getHasmanyConf(null);
            var values = [];
            for (var i=0;i<that.value.length;i++) {
                var v = {};
                for (var k in that.fields) {
                    v[k] = that.getWidget(i,k).getValue();
                }
                values.push(v);
            }
            that.value = values;
            var value = {
                status: 'new'
            }
            that.value.push(value);
            // var _conf = that.getHasmanyConf(value);
            // that.confViews[_conf.cRef] = _conf;
            // this.$forceUpdate();
        },

        deleteItem: function (refId) {
            var that = this;
            console.log('delete', refId, this.$crud.cRefs[refId].value)
            var newConfViews = {};
            // per questioni di aggiornamento assegno ad un'altra variabile, altrimenti vue non renderizza come dovuto
            for (var vId in that.confViews) {
                newConfViews[vId] = that.confViews[vId];
            }
            // if (this.$crud.cRefs[refId].value.status == 'new') {
                delete newConfViews[refId];
                this.$crud.cRefs[refId].$destroy();

            // } else {
            //     newConfViews[refId].value.status = 'deleted';
            //     if (that.getComponent(refId)) {
            //         that.getComponent(refId).getWidget('status').setValue('deleted');
            //     }
            // }
            console.log('newConfView',newConfViews);
            that.$set(that, 'confViews', newConfViews);
            this.$forceUpdate();
        },
        showItem: function (refId) {
            //console.log('show item',index,this.confViews[index]);
            console.log('showItem', refId, this.confViews[refId])
            if (!this.confViews[refId])
                return false;
            return (this.confViews[refId].value.status != 'deleted')
        },
        outOfLimit: function () {
            var that = this;
            var valid = 0;
            for (var k in that.confViews) {
                if (that.confViews[k].value.status != 'deleted')
                    valid++;
            }
            //console.log('outlimit',valid,that.limit);
            return (valid >= that.limit);
        },

        getValue: function () {
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
export default wHasmanyListedMixin
