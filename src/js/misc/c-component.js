Crud.components.cComponent = Vue.component('c-component',{
    props : ['c-ref','c-conf'],
    mounted : function() {
        //console.log(this.$options.name + ' cref ',this.cRef)
        if (this.cRef) {
            this.$Crud.cRefs[this.cRef] = this;
        } else  {
            var _conf = this.conf || {};
            if ( _conf.cRef) {
                this.$Crud.cRefs[_conf.cRef] = this;
            }
        }
    },
    methods : {
        jQe : function (selector) {
            var that = this;
            if (selector) {
                return jQuery(that.$el).find(selector).addBack(selector);
            }
            return jQuery(that.$el);
        }
    }
});