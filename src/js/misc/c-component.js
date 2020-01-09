crud.components.cComponent = Vue.component('c-component',{
    // props : {
    //     'c-conf' : {
    //         default : function () {
    //             return {
    //                 value : null,
    //                 name : null,
    //             }
    //         }
    //     }
    // },
    props : ['cConf'],
    mounted : function() {
        //console.log(this.$options.name + ' cref ',this.cRef)
        if (this.cConf && this.cConf.cRef) {
            this.$crud.cRefs[this.cConf.cRef] = this;
        }

        // else  {
        //     var _conf = this.conf || {};
        //     if ( _conf.cRef) {
        //         this.$crud.cRefs[_conf.cRef] = this;
        //     }
        // }
    },
    data : function() {
        return this.defaultData();
    },
    methods : {
        jQe : function (selector) {
            var that = this;
            if (selector) {
                return jQuery(that.$el).find(selector).addBack(selector);
            }
            return jQuery(that.$el);
        },
        defaultData : function () {
            var _c = this.cConf || {};
            var d = {};
            for (var k in _c) {
                if (k == 'methods')
                    continue;
                d[k] = _c[k];
            }
            d.conf = _c;
            //console.log('c-component::defaultData',d);
            return d;
        },
    }
});