crud.components.misc.coreCWait = Vue.component('core-c-wait', {
    extends : crud.components.cComponent,
    props : ['cMsg','cGlobal'],
    mounted : function () {
        var that = this;
        if (that.global) {
            that.jQe('[c-wait]').css('height', jQuery(document).height());
        }
    },
    data : function () {
        return {
            msg : this.cMsg?this.cMsg:'...',
            global : ('cGlobal' in this)?this.cGlobal:true
        }
    }
});
