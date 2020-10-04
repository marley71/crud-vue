crud.components.widgets.coreWHasmany =Vue.component('core-w-hasmany', {
    extends : crud.components.widgets.wBase,
    mounted : function() {
        var that = this;
        that.keyCounter = 0; // intero per generare chiave uniche
        for (var i in that.value) {
            var _conf = that.getHasmanyConf(i,that.value[i]);
            that.confViews[_conf.cRef] = _conf;
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
            if (!value) {
                value.status = 'new';
            } else {
                value.status = 'update';
            }
            // if (!value) {
            //     that.value[index].status = 'new';
            //     hmConf.value.status = 'new';
            // } else {
            //     that.value[index].status = 'updated';
            //     hmConf.value.status = 'updated';
            // }
            // if (!hmConf.data.value.status )
            //     hmConf.data.value.status = 'new';
            //console.log('HMS',that.hasmanyConf,that.value)
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
            //var refId = that.getRefId(that._uid,'hm',index);
            //console.log('index',index,this.value[index].status,this.confViews[index],refId,this.$crud.cRefs[refId]);
            console.log('deleteItem',refId,this.$crud.cRefs[refId])
            if (this.$crud.cRefs[refId].value.status  == 'new') {
                delete this.confViews[refId];
                this.$crud.cRefs[refId].$destroy();
            } else {
                this.$crud.cRefs[refId].value.status = 'deleted';
            }
            console.log('confView',that.confViews);

            // if (this.value[index].status == 'new') {
            //     this.value.splice(index, 1);
            //     this.confViews.splice(index,1);
            //     this.$crud.cRefs[refId].$destroy();
            // }
            // else {
            //     //console.log('update status deleted ', index,this.confViews[index].data.value)
            //     this.$set(this.value[index], 'status', 'deleted');
            //     this.$set(this.confViews[index].value, 'status' , 'deleted');
            //     this.$crud.cRefs[refId].setWidgetValue('status','deleted');
            // }
            this.$forceUpdate();
        },
        showItem : function (refId) {
            //console.log('show item',index,this.confViews[index]);
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
        }
    }
});
