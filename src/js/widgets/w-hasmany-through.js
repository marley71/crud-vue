crud.components.widgets.coreWHasmanyThrough =Vue.component('core-w-hasmany-through', {
    extends : crud.components.widgets.wBase,
    methods : {
        getHasmanyConf : function (value) {
            var that = this;
            var hmConf = that.hasmanyConf?that.hasmanyConf:{
                fields : [],
                fieldsConfig : {},
                value : {},
                metadata : {},
            };
            if (value && Object.keys(value).length > 0) {
                hmConf.value = value;
                if (!hmConf.fields || !hmConf.fields.length) {
                    hmConf.fields = Object.keys(value);
                }
            } else {
                // ci sono record gia' presenti prendo da li i fields.
                if (this.value && this.value.length > 0) {
                    if (!hmConf.fields || !hmConf.fields.length) {
                        hmConf.fields = Object.keys(this.value[0]);
                        hmConf.value = this.cloneObj(this.value[0]);
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
