/**
 * WIDGETS
 * componenti base per i widgets predefiniti del framework.
 * Estendere o aggingere questi componenti per aggiungere
 * nuovi comportamenti o proprietà dei vari widgets
 */

crud.components.widgets.wAutocomplete = Vue.component('w-autocomplete', {
    extends : crud.components.widgets.coreWAutocomplete ,
    template: "#w-autocomplete-template",
});

crud.components.widgets.wB2Select2 = Vue.component('w-b2-select2', {
    extends : crud.components.widgets.coreWB2Select2 ,
    template: '#w-b2-select2-template',
});

crud.components.widgets.wB2mSelect2 = Vue.component('w-b2m-select2', {
    extends : crud.components.widgets.coreWB2mSelect2 ,
    template: '#w-b2m-select2-template',
});

crud.components.widgets.wBelongsto = Vue.component('w-belongsto', {
    extends : crud.components.widgets.coreWBelongsto,
    template: '#w-belongsto-template',
});

crud.components.widgets.wCheckbox = Vue.component('w-checkbox',{
    extends : crud.components.widgets.coreWCheckbox,
    template: '#w-checkbox-template',
});

crud.components.widgets.wCustom = Vue.component('w-custom', {
    extends : crud.components.widgets.coreWCustom,
    template: '#w-custom-template',
});

crud.components.widgets.wDatePicker = Vue.component('w-date-picker', {
    extends: crud.components.widgets.coreWDatePicker,
    template: '#w-date-picker-template',
});

crud.components.widgets.wDateSelect = Vue.component('w-date-select', {
    extends: crud.components.widgets.coreWDateSelect,
    template: '#w-date-select-template',
});

crud.components.widgets.wDownload = Vue.component('w-download', {
    extends: crud.components.widgets.coreWDownload,
    template: '#w-download-template',
});

crud.components.widgets.wHasmany =Vue.component('w-hasmany', {
    extends: crud.components.widgets.coreWHasmany,
    template: '#w-hasmany-template',
});

crud.components.widgets.wHasmanyThrough =Vue.component('w-hasmany-through', {
    extends: crud.components.widgets.coreWHasmanyThrough,
    template: '#w-hasmany-through-template',
});

crud.components.widgets.wHasmanyView = Vue.component('w-hasmany-view', {
    extends : crud.components.widgets.coreWHasmanyView,
    template: '#w-hasmany-view-template',
});

crud.components.widgets.wHidden = Vue.component('w-hidden', {
    extends : crud.components.widgets.coreWHidden,
    template: '#w-hidden-template'
});

crud.components.widgets.wImage = Vue.component('w-image',{
    extends : crud.components.widgets.coreWImage,
    template: '#w-image-template'
});

crud.components.widgets.wInput = Vue.component('w-input', {
    extends : crud.components.widgets.coreWInput,
    template: '#w-input-template',
});

crud.components.widgets.wInputHelped =  Vue.component('w-input-helped', {
    extends: crud.components.widgets.coreWInputHelped,
    template: '#w-input-helped-template',
});

crud.components.widgets.wPreview = Vue.component('w-preview', {
    extends: crud.components.widgets.coreWPreview,
    template: '#w-preview-template',
});

crud.components.widgets.wRadio = Vue.component('w-radio', {
    extends: crud.components.widgets.coreWRadio,
    template: '#w-radio-template',
});

crud.components.widgets.wSelect = Vue.component('w-select', {
    extends: crud.components.widgets.coreWSelect,
    template: '#w-select-template',
});

crud.components.widgets.wSwap = Vue.component('w-swap', {
    extends: crud.components.widgets.coreWSwap,
    template: '#w-swap-template',
});

crud.components.widgets.wStatus = Vue.component('w-status', {
    extends: crud.components.widgets.coreWStatus,
    template: '#w-status-template',
});

crud.components.widgets.wText = Vue.component('w-text',{
    extends : crud.components.widgets.coreWText,
    template: '#w-text-template'
});

crud.components.widgets.wTextarea = Vue.component('w-textarea', {
    extends : crud.components.widgets.coreWTextarea,
    template: '#w-textarea-template'
});

crud.components.widgets.wTexthtml = Vue.component('w-texthtml', {
    extends: crud.components.widgets.coreWTexthtml,
    template: '#w-texthtml-template',
});

crud.components.widgets.wUpload = Vue.component('w-upload', {
    extends: crud.components.widgets.coreWUpload,
    template: '#w-upload-template',
});

crud.components.widgets.wUploadAjax = Vue.component('w-upload-ajax', {
    extends: crud.components.widgets.coreWUploadAjax,
    template: '#w-upload-ajax-template',
});
