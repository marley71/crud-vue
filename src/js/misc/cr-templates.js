crud.components.cTplBase = Vue.component('c-tpl-base',{
    props : ['cRender','cType','cKey','cRef'],
    template : '<span>template base</span>'
});


Vue.component('c-tpl-record',{
    extends : crud.components.cTplBase,
    template : '#c-tpl-record-template'
});

Vue.component('c-tpl-record2',{
    extends : crud.components.cTplBase,
    template : '#c-tpl-record2-template'
});


Vue.component('c-tpl-list', {
    extends : crud.components.cTplBase,
    template : '#c-tpl-list-template'
});
Vue.component('c-tpl-no', {
    extends : crud.components.cTplBase,
    template : '#c-tpl-no-template'
});