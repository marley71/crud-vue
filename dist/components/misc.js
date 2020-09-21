/**
 * MISCELLANEOUS
 * componenti base per template, paginator,ecc predefiniti del framework.
 * Estendere o aggingere questi componenti per aggiungere
 * nuovi comportamenti o proprietà di componenti generici
 */

crud.components.misc.cLoading = Vue.component('c-loading',{
    extends : crud.components.misc.coreCLoading,
    template : '#c-loading-template',
});

crud.components.misc.cPaginator  = Vue.component('c-paginator',{
    extends : crud.components.misc.coreCPaginator,
    template : '#c-paginator-template',
});

crud.components.misc.cWait = Vue.component('c-wait',{
    extends : crud.components.misc.coreCWait,
    template: '#c-wait-template',
});



Vue.component('tpl-record',{
    extends : crud.components.misc.tplBase,
    template : '#tpl-record-template'
});

Vue.component('tpl-record2',{
    extends : crud.components.misc.tplBase,
    template : '#tpl-record2-template'
});

Vue.component('tpl-list', {
    extends : crud.components.misc.tplBase,
    template : '#tpl-list-template'
});

Vue.component('tpl-no', {
    extends : crud.components.misc.tplBase,
    template : '#tpl-no-template'
});


crud.components.misc.dConfirm = Vue.component('d-confirm', {
    extends : crud.components.misc.coreDConfirm,
    template : '#d-confirm-template'
});

crud.components.misc.dMessage = Vue.component('d-message', {
    extends : crud.components.misc.coreDMessage,
    template : '#d-message-template'
});

crud.components.misc.dError = Vue.component('d-error', {
    extends : crud.components.misc.coreDError,
    template : '#d-error-template'
});
crud.components.misc.dWarning = Vue.component('d-warning', {
    extends : crud.components.misc.coreDWarning,
    template : '#d-warning-template'
});

crud.components.misc.dCustom = Vue.component('d-custom', {
    extends : crud.components.misc.coreDCustom,
    template : '#d-custom-template'
});
