crud.components.rHasmany =Vue.component('r-hasmany', {
    extends : crud.components.renders.rBase,
    template: '#r-hasmany-template',
    mounted : function() {
         var that = this;
        for (var i in that.value) {
            var _conf = that.getHasmanyConf(i,that.value[i]);
            that.confViews.push(_conf);
        }
    },
    data : function () {
        var that = this;
        var d = that.defaultData();
        d.confViews = [];
        if (!("limit" in d) )
            d.limit = 1000;

        //console.log('CONF VIEWS',d.confViews,d.value)
        return d;
    },

    methods : {

        getHasmanyConf : function (index,value) {
            var that = this;
            var hmConf = that.cConf.hasmanyConf || {};

            hmConf = this.$crud.confMerge({
                fields : [],
                fieldsConfig : {},
                data :  {
                    value : {
                    },
                    metadata : {

                    }
                },
            },hmConf);
            hmConf.cRef = 'hm-' + index;

            if (value && Object.keys(value).length > 0) {
                hmConf.data.value = value;
                if (!hmConf.fields || !hmConf.fields.length) {
                    hmConf.fields = Object.keys(value);
                }
            }
            if (!value) {
                that.value[index].status = 'new';
                hmConf.data.value.status = 'new';
            } else {
                that.value[index].status = 'updated';
                hmConf.data.value.status = 'updated';
            }
            // if (!hmConf.data.value.status )
            //     hmConf.data.value.status = 'new';
            console.log('HMS',hmConf,that.value)
            return hmConf;


            // if (that.confViews.length > index) {
            //     that.confViews[index] = hmConf;
            //     that.confViews[index].data.value.status = 'updated';
            // } else {
            //     if (!hmConf.data.value.status) {
            //         hmConf.data.value.status = 'new';
            //     }
            //     that.confViews.push(hmConf);
            //     if (that.confViews.length < (index + 1))
            //         throw "confView.length" + that.confViews.length + " minore di index " + index;
            // }
            // // else {
            // //     // ci sono record gia' presenti prendo da li i fields.
            // //     if (this.value && this.value.length > 0) {
            // //         if (!hmConf.fields || !hmConf.fields.length) {
            // //             hmConf.fields = Object.keys(this.value[0]);
            // //             hmConf.data.value = Utility.cloneObj(this.value[0]);
            // //         }
            // //     }
            // // }
            // //console.log('hmConf',hmConf)
            // //hmConf.metadata.modelName = that.cKey;
            // console.log('HMS',that.confViews[index],that.value)
            // return that.confViews[index];

        },
        addItem : function () {
            var that = this;
            //var conf = that.getHasmanyConf(null);
            that.value.push({});
            that.confViews.push(that.getHasmanyConf(that.value.length-1,null));

        },
        deleteItem : function (index) {
            //console.log('index',index,this.value[index].status,this.confViews[index]);
            if (this.value[index].status == 'new') {
                this.value.splice(index, 1);
                this.confViews.splice(index,1);
            }
            else {
                //console.log('update status deleted ', index,this.confViews[index].data.value)
                this.$set(this.value[index], 'status', 'deleted');
                this.$set(this.confViews[index].data.value, 'status' , 'deleted');
                this.$crud.cRefs['hm-'+index].setFieldValue('status','deleted');
            }
            this.$forceUpdate();
        },
        showItem : function (index) {
            //console.log('show item',index,this.confViews[index]);
            if (!this.confViews[index])
                return false;
            return (this.confViews[index].data.value.status != 'deleted'  )
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
