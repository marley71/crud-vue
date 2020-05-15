crud.components.tplBase = Vue.component('tpl-base',{
    props : ['cWidget'],
    template : '<span>template base</span>'
});


Vue.component('tpl-record',{
    extends : crud.components.tplBase,
    template : '#tpl-record-template'
});

Vue.component('tpl-record2',{
    extends : crud.components.tplBase,
    template : '#tpl-record2-template'
});


Vue.component('tpl-list', {
    extends : crud.components.tplBase,
    template : '#tpl-list-template'
});
Vue.component('tpl-no', {
    extends : crud.components.tplBase,
    template : '#tpl-no-template'
});
