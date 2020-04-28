crud.components.cWait = Vue.component('c-wait', {
    extends : crud.components.cComponent,
    template: '#c-wait-template',
    props : ['cMsg','cGlobal'],
    data : function () {
        return {
            msg : this.cMsg?this.cMsg:'...',
            global : ('cGlobal' in this)?this.cGlobal:true
        }
    }
});
