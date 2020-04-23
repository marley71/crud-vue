Vue.component('c-test',{
    props : ['cComponent','cModel','cPk','cProviderName','cConf'],
    extends : crud.components.cComponent,

    data : function () {
        var that = this;
        var d = {
            componentName : that.cComponent?that.cComponent:null,
            conf : that.getConf(),
            pk : that.cPk ? that.cPk:null,
            model : that.cModel?that.cModel:null,
            providerName : that.cProviderName?that.cProviderName:null,
        }
        console.log('data');
        return d;
    },
    methods : {
        getConf : function () {
            var that = this;
            var confName = that.cConf || that.$crud.camelCase(this.cComponent+'-conf');
            console.log('c-test confName',confName);
            if(window[confName+"_f"]) {
                eval(confName+"_f()");
            }

            var confObj = (window[confName]?window[confName]:null) || {};
            confObj.cRef = 'test-component';
            console.log('c-test confObj',confObj);
            //var code = that.getCode(confName);
            //console.log('code',code);
            jQuery('body').trigger('set-code',[confName]);
            //jQuery('#conf-code').html(code);
            //that.editor.setValue(code);
            return confObj;
        },
        getModel : function () {
            return this.model;
        },

        getPk : function () {
            return this.pk
        },

        getProviderName : function () {
            return this.providerName;
        },

        // getCode : function (confName) {
        //     return window[confName+'_f']?window[confName+'_f'].toString():"{}";
        // }

    },
    template : '#c-test-template'
})
