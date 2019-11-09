Crud.components.rHasmany =Vue.component('r-hasmany', {
    extends : Crud.components.renders.rBase,
    template: '#r-hasmany-template',
    data : function () {
        var d = this.defaultData();
        return d;
    },
    methods : {
        getHasmanyConf : function (value) {
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
            if (value && Object.keys(value).length > 0) {
                hmConf.data.value = value;
                if (!hmConf.fields || !hmConf.fields.length) {
                    hmConf.fields = Object.keys(value);
                }
            } else {
                // ci sono record gia' presenti prendo da li i fields.
                if (this.value && this.value.length > 0) {
                    if (!hmConf.fields || !hmConf.fields.length) {
                        hmConf.fields = Object.keys(this.value[0]);
                        hmConf.data.value = Utility.cloneObj(this.value[0]);
                    }
                }
            }
            return hmConf;

        },
        addItem : function () {
            var that = this;
            //var conf = that.getHasmanyConf(null);
            that.value.push({});

        },
        deleteItem : function (index) {
            console.log('index',index);
            this.value.splice(index,1);
        }
    }
});