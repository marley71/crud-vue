Crud.components.cComponent = Vue.component('c-component',{
    props : ['c-ref'],
    mounted : function() {
        if (this.cRef) {
            //console.log('cref ',this.cRef)
            Crud.cRefs[this.cRef] = this;
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