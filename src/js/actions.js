/**
 * componenti base delle action predefinite del framework.
 * Estendere o aggingere questi componenti per aggiungere
 * nuovi comportamenti o proprietà delle azioni
 */

crud.components.actions.actionBase = Vue.component('action-base', {
    extends : crud.components.actions.coreActionBase,
    template: '#action-template'
});

Vue.component('action-edit', {
    extends : crud.components.actions.actionBase
});

Vue.component('action-view', {
    extends : crud.components.actions.actionBase
});

Vue.component('action-save', {
    extends : crud.components.actions.actionBase
});

Vue.component('action-insert', {
    extends : crud.components.actions.actionBase
});

Vue.component('action-back', {
    extends : crud.components.actions.actionBase
});

Vue.component('action-search', {
    extends : crud.components.actions.actionBase
});

Vue.component('action-reset', {
    extends : crud.components.actions.actionBase
});

Vue.component('action-delete', {
    extends : crud.components.actions.actionBase
});

Vue.component('action-delete-selected', {
    extends : crud.components.actions.actionBase
});

Vue.component('action-edit-mode',{
    extends : crud.components.actions.actionBase
});

Vue.component('action-view-mode',{
    extends : crud.components.actions.actionBase
});

Vue.component('action-save-row',{
    extends : crud.components.actions.actionBase
});

crud.components.actions.actionOrder = Vue.component('action-order',{
    extends : crud.components.actions.coreActionOrder,
    template: '#action-order-template'
});
