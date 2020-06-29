crud.components.widgets.coreWHasmany =Vue.component('core-w-hasmany', {
    extends : crud.components.widgets.wBase,
    mounted : function() {
        var that = this;
        for (var i in that.value) {
            var _conf = that.getHasmanyConf(i,that.value[i]);
            that.confViews.push(_conf);
        }
    },
    data : function () {
        var that = this;
        var _conf = that._getConf() || {}
        var d = {};
        d.confViews = [];
        if (!("limit" in _conf) )
            d.limit = 100;
        d.isHasmany = true;
        return d;
    },

    methods : {

        getHasmanyConf : function (index,value) {
            var that = this;
            var hmConf = that.hasmanyConf || {};

            hmConf = this.confMerge({
                fields : [],
                fieldsConfig : {},
                routeName : null,
                value : {},
                metadata : {}
            },hmConf);
            hmConf.cRef = 'hm-' + index;

            if (value && Object.keys(value).length > 0) {
                hmConf.value = value;
                if (!hmConf.fields || !hmConf.fields.length) {
                    hmConf.fields = Object.keys(value);
                }
            }
            if (!value) {
                that.value[index].status = 'new';
                hmConf.value.status = 'new';
            } else {
                that.value[index].status = 'updated';
                hmConf.value.status = 'updated';
            }
            // if (!hmConf.data.value.status )
            //     hmConf.data.value.status = 'new';
            console.log('HMS',that.hasmanyConf,that.value)
            return hmConf;

        },
        addItem : function () {
            var that = this;
            //var conf = that.getHasmanyConf(null);
            that.value.push({});
            that.confViews.push(that.getHasmanyConf(that.value.length-1,null));

        },
        deleteItem : function (index) {
            console.log('index',index,this.value[index].status,this.confViews[index],'hm-'+index,this.$crud.cRefs['hm-'+index]);
            if (this.value[index].status == 'new') {
                this.value.splice(index, 1);
                this.confViews.splice(index,1);
            }
            else {
                //console.log('update status deleted ', index,this.confViews[index].data.value)
                this.$set(this.value[index], 'status', 'deleted');
                this.$set(this.confViews[index].value, 'status' , 'deleted');
                this.$crud.cRefs['hm-'+index].setWidgetValue('status','deleted');
            }
            this.$forceUpdate();
        },
        showItem : function (index) {
            //console.log('show item',index,this.confViews[index]);
            if (!this.confViews[index])
                return false;
            return (this.confViews[index].value.status != 'deleted'  )
        },
        outOfLimit : function () {
            var that = this;
            var valid = 0;
            for (var i in that.value) {
                if (that.value[i].status != 'deleted')
                    valid++;
            }
            //console.log('outlimit',valid,that.limit);
            return (valid >= that.limit);
        }
    }
});
