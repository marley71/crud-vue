Crud.components.cTplBase = Vue.component('c-tpl-base',{
    props : ['c-render','c-type','c-key','c-ref'],
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
Vue.component('c-tpl-no', {
    extends : Crud.components.cTplBase,
    template : '#c-tpl-no-template'
});