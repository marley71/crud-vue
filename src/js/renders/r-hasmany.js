crud.components.rHasmany =Vue.component('r-hasmany', {
    extends : crud.components.renders.rBase,
    template: '#r-hasmany-template',
    data : function () {
        var that = this;
        var d = that.defaultData();
        d.confViews = [];
        for (var i in d.value) {
            var _conf = that.getHasmanyConf(i,d.value[i]);
            d.confViews.push(_conf);
        }
        console.log('CONF VIEWS',d.confViews,d.value)
        return d;
    },
    methods : {

        getHasmanyConf : function (index,value) {
            var that = this;
            var hmConf = that.cConf.hasmanyConf || {};

            hmConf = Utility.confMerge({
                fields : [],
                fieldsConfig : {},
                data :  {
                    value : {},
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
                hmConf.data.value.status = 'new';
            } else {
                hmConf.data.value.status = 'updated';
            }
            // if (!hmConf.data.value.status )
            //     hmConf.data.value.status = 'new';
            console.log('HMS',hmConf)
            return hmConf;


            if (that.confViews.length > index) {
                that.confViews[index] = hmConf;
                that.confViews[index].data.value.status = 'updated';
            } else {
                if (!hmConf.data.value.status) {
                    hmConf.data.value.status = 'new';
                }
                that.confViews.push(hmConf);
                if (that.confViews.length < (index + 1))
                    throw "confView.length" + that.confViews.length + " minore di index " + index;
            }
            // else {
            //     // ci sono record gia' presenti prendo da li i fields.
            //     if (this.value && this.value.length > 0) {
            //         if (!hmConf.fields || !hmConf.fields.length) {
            //             hmConf.fields = Object.keys(this.value[0]);
            //             hmConf.data.value = Utility.cloneObj(this.value[0]);
            //         }
            //     }
            // }
            //console.log('hmConf',hmConf)
            //hmConf.metadata.modelName = that.cKey;
            console.log('HMS',that.confViews[index])
            return that.confViews[index];

        },
        addItem : function () {
            var that = this;
            //var conf = that.getHasmanyConf(null);
            that.value.push({});
            that.confViews.push(that.getHasmanyConf(that.value.length-1,null));

        },
        deleteItem : function (index) {
            console.log('index',index,this.value[index],this.confViews[index]);
            if (this.value[index].status == 'new') {
                this.value.splice(index, 1);
                this.confViews.splice(index,1);
            }
            else {
                console.log('update status deleted ', index)
                this.$set(this.value[index], 'status', 'deleted');
                this.$set(this.confViews[index], 'status' , 'deleted');
                this.$crud.cRefs['hm-'+index].setFieldValue('status','deleted');
            }
        }
    }
});