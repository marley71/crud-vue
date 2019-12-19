Crud.components.cComponent = Vue.component('c-component',{
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
    props : ['c-conf'],
    mounted : function() {
        //console.log(this.$options.name + ' cref ',this.cRef)
        if (this.cRef) {
            this.$Crud.cRefs[this.cRef] = this;
        }

        // else  {
        //     var _conf = this.conf || {};
        //     if ( _conf.cRef) {
        //         this.$Crud.cRefs[_conf.cRef] = this;
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
            var d = {}
            for (var k in _c) {
                if (k == 'methods')
                    continue;
                d[k] = _c[k];
            }
            //console.log('c-component::defaultData',d);
            return d;
        },
    }
});