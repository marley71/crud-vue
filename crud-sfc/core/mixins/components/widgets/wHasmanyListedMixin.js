import crud from "../../../crud";

crud.conf['w-hasmany-listed'] = {
    limit: 100,
    value: [],
    bgClass: 'bg-warning-soft',
    viewRef : null,
    hasmanyConf: {},
    // hasmanyConf : {
    //     actions : ['action-insert','action-delete'],
    // }
}

const wHasmanyListedMixin = {
    // mounted: function () {
    //     var that = this;
    //     that.keyCounter = 0; // intero per generare chiave uniche
    //     //console.log('hasmany',that.value);
    //     if (that.value && that.value.length > 0) {
    //         for (var i in that.value) {
    //             that.value[i].status = 'updated';
    //         }
    //     }
    // },

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
            hmConf.metadata = relationConf;
            hmConf.defaultWidgetType = hmConf.defaultWidgetType || 'w-input';
            hmConf.customActions = hmConf.customActions || {};
            hmConf.fields = hmConf.fields || [];
            hmConf.fieldsConfig = hmConf.fieldsConfig || {};
            // aggiungo lo status in automatico
            if (that.value && that.value.length > 0) {
                for (var i in that.value) {
                    that.value[i].status = 'updated';
                }
            }

            // controllo le azioni se non ci sono inserisco le default
            if (!hmConf.actions) {
                hmConf.actions = ['action-insert','action-delete'];
            }
            if (hmConf.fields.indexOf('status') < 0) {
                hmConf.fields.push('status');
            }
            hmConf.fieldsConfig.status = 'w-hidden';
            // hmConf = this.mergeConfView({
            //     defaultWidgetType  : 'w-input',
            //     //fields: [],
            //     //fieldsConfig: {},
            //     // routeName: null,
            //     // value: value,
            //     metadata: relationConf,
            //     // customActions: {
            //     //     'action-insert' : {
            //     //         execute() {
            //     //             this.view.value.push({});
            //     //             this.view.reload();
            //     //         }
            //     //     }
            //     // },
            // }, hmConf);
            // forzo alcune cose che non possono essere definite dall'utente in configurazione
            hmConf.routeName = null;
            hmConf.value = that.value;
            if (!hmConf.modelName)
                hmConf.modelName = that.name;
            if (hmConf.actions.indexOf('action-insert') >= 0) {
                var aiConf = hmConf.customActions['action-insert'] || {};
                aiConf.execute = function () {
                    //this.view.value.push({});
                    that.addItem();
                    this.view.reload();
                }
                hmConf.customActions['action-insert'] = aiConf;
            }
            if (hmConf.actions.indexOf('action-delete') >= 0) {
                var adConf = hmConf.customActions['action-delete'] || {};
                adConf.execute = function () {
                    that.deleteItem(this.index,1);
                    this.view.reload();
                }
                hmConf.customActions['action-delete'] = adConf;
            }
            var methods = hmConf.methods || {};
            methods.getFieldName = function (key) {
                return hmConf.modelName + '-' + key + '[]';
            }
            hmConf.methods = methods;


            that.viewRef = that.getRefId(that._uid, 'hm', 'list');
            hmConf.cRef = that.viewRef;
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
            var istanceView = that.getComponent(that.viewRef);
            var values = istanceView.getViewData();
            // //var conf = that.getHasmanyConf(null);
            // var values = [];
            // for (var i=0;i<istanceView.value.length;i++) {
            //     var v = {};
            //     for (var j in istanceView.keys) {
            //         var k = istanceView.keys[j];
            //         v[k] = istanceView.getWidget(i,k).getValue();
            //     }
            //     values.push(v);
            // }
            //
            // istanceView.value = values;
            var value = {
                status: 'new'
            }
            values.push(value)
            istanceView.value = values;
        },

        deleteItem: function (index) {
            var that = this;
            var that = this;
            var istanceView = that.getComponent(that.viewRef);
            var values = istanceView.getViewData();
            values.splice(index,1);
            istanceView.value = values;
            // console.log('delete', refId, this.$crud.cRefs[refId].value)
            // var newConfViews = {};
            // // per questioni di aggiornamento assegno ad un'altra variabile, altrimenti vue non renderizza come dovuto
            // for (var vId in that.confViews) {
            //     newConfViews[vId] = that.confViews[vId];
            // }
            // // if (this.$crud.cRefs[refId].value.status == 'new') {
            //     delete newConfViews[refId];
            //     this.$crud.cRefs[refId].$destroy();
            //
            // // } else {
            // //     newConfViews[refId].value.status = 'deleted';
            // //     if (that.getComponent(refId)) {
            // //         that.getComponent(refId).getWidget('status').setValue('deleted');
            // //     }
            // // }
            // console.log('newConfView',newConfViews);
            // that.$set(that, 'confViews', newConfViews);
            // this.$forceUpdate();
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
