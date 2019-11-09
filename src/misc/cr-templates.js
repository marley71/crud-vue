Crud.components.cTplBase = Vue.component('c-tpl-base',{
    props : ['c-render','c-type','c-key'],
    data : function () {
        console.log('DAta',this.cKey,this.cType,this.cRender)
        return {

        };
        // return {
        //     render : this.cRender,
        //     type : this.cType,
        //     key : this.cKey,
        // }
    },
    template : '<span>template base</span>'
});


Vue.component('c-tpl-record',{
    extends : Crud.components.cTplBase,
    template : '#c-tpl-record-template'
});

Vue.component('c-tpl-record2',{
    extends : Crud.components.cTplBase,
    template : '#c-tpl-record2-template'
});


Vue.component('c-tpl-list', {
    extends : Crud.components.cTplBase,
    template : '#c-tpl-list-template'
});