crud.components.crudCWait = Vue.component('crud-c-wait', {
    extends : crud.components.cComponent,
    props : ['cMsg','cGlobal'],
    data : function () {
        return {
            msg : this.cMsg?this.cMsg:'...',
            global : ('cGlobal' in this)?this.cGlobal:true
        }
    }
});
