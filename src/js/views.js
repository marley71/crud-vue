/**
 * VIEWS
 * componenti base per le views predefinite del framework.
 * Estendere o aggingere questi componenti per aggiungere
 * nuovi comportamenti o proprietà delle views
 */

crud.components.views.vEdit = Vue.component('v-edit', {
    extends : crud.components.views.coreVEdit,
    template : '#v-edit-template'
});

crud.components.views.vHasmany = Vue.component('v-hasmany', {
    extends: crud.components.views.coreVHasmany,
    template: '#v-hasmany-template',
});

crud.components.views.vHasmanyView = Vue.component('v-hasmany-view', {
    extends: crud.components.views.coreVHasmanyView,
    template: '#v-hasmany-template',
});

crud.components.views.vInsert = Vue.component('v-insert', {
    extends: crud.components.views.coreVInsert,
    template: '#v-insert-template',
});

crud.components.views.vList = Vue.component('v-list', {
    extends: crud.components.views.coreVList,
    template: '#v-list-template',
});

crud.components.views.vListEdit = Vue.component('v-list-edit', {
    extends: crud.components.views.coreVListEdit,
    template: '#v-list-edit-template',
});

crud.components.views.vSearch = Vue.component('v-search', {
    extends: crud.components.views.coreVSearch,
    template: '#v-search-template',
});

crud.components.views.vView = Vue.component('v-view', {
    extends: crud.components.views.coreVView,
    template: '#v-view-template',
});
