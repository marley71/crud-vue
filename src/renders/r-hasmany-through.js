Crud.components.rHasmanyThrough =Vue.component('r-hasmany-through', {
    extends : Crud.components.renders.rBase,
    template: '#r-hasmany-through-template',
    data : function () {
        var d = this.defaultData();
        d.inputType = 'text';
        if (this.cConf.inputType)
            d.inputType = this.cConf.inputType;
        return d;
    },
    methods : {
        getHasmanyConf : function (value) {
            var that = this;
            var hmConf = that.cConf.hasmanyConf?that.cConf.hasmanyConf:{
                fields : [],
                fieldsConfig : {},
                data :  {
                    value : {},
                    metadata : {

                    }
                },
            };
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

        }
    }
});