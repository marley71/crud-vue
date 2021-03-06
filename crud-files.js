
var crudJsFiles = [

    'src/js/confs/Crud.js',
    'src/js/confs/dialogs_mixin.js',
    'src/js/confs/core_mixin.js',

    'src/js/crud/Protocols.js',
    'src/js/crud/Routes.js',
    'src/js/crud/Server.js',

    'src/js/misc/c-component.js',
    'src/js/misc/c-loading.js',
    'src/js/misc/cr-templates.js',
    'src/js/actions/actions.js',
    'src/js/misc/c-paginator.js',
    'src/js/misc/dialogs.js',
    'src/js/misc/c-wait.js',


    'src/js/widgets/w-base.js',
    'src/js/widgets/w-custom.js',
    'src/js/widgets/w-input.js',
    'src/js/widgets/w-input-helped.js',
    'src/js/widgets/w-hidden.js',
    'src/js/widgets/w-text.js',
    'src/js/widgets/w-image.js',
    'src/js/widgets/w-download.js',

    'src/js/widgets/w-textarea.js',
    'src/js/widgets/w-select.js',
    'src/js/widgets/w-radio.js',
    'src/js/widgets/w-checkbox.js',
    'src/js/widgets/w-autocomplete.js',
    'src/js/widgets/w-belongsto.js',
    'src/js/widgets/w-date-select.js',
    'src/js/widgets/w-date-picker.js',
    'src/js/widgets/w-texthtml.js',

    'src/js/widgets/w-hasmany.js',
    'src/js/widgets/w-hasmany-view.js',

    'src/js/widgets/w-swap.js',
    'src/js/widgets/w-status.js',
    'src/js/widgets/w-hasmany-through.js',
    'src/js/widgets/w-b2-select2.js',
    'src/js/widgets/w-b2m-select2.js',
    'src/js/widgets/w-upload.js',
    'src/js/widgets/w-upload-ajax.js',
    'src/js/widgets/w-preview.js',

    'src/js/views/v-base.js',
    'src/js/views/v-record.js',
    'src/js/views/v-collection.js',
    'src/js/views/v-list.js',
    'src/js/views/v-list-edit.js',
    'src/js/views/v-edit.js',
    'src/js/views/v-view.js',
    'src/js/views/v-insert.js',
    'src/js/views/v-search.js',
    'src/js/views/v-hasmany.js',
    'src/js/views/v-hasmany-view.js',

    'src/js/crud-app.js'

];

var actionsHtmlFiles = [
    'src/templates/misc/actions.html',
];

var miscHtmlFiles = [
    'src/templates/misc/actions.html',
    'src/templates/misc/cr-templates.html',
    'src/templates/misc/c-paginator.html',
    'src/templates/misc/dialogs.html',
    'src/templates/misc/c-loading.html',
    'src/templates/misc/c-wait.html',
];

var widgetsHtmlFiles = [
    'src/templates/widgets/w-custom.html',
    'src/templates/widgets/w-input.html',
    'src/templates/widgets/w-input-helped.html',
    'src/templates/widgets/w-hidden.html',
    'src/templates/widgets/w-text.html',
    'src/templates/widgets/w-image.html',
    'src/templates/widgets/w-download.html',

    'src/templates/widgets/w-textarea.html',
    'src/templates/widgets/w-select.html',
    'src/templates/widgets/w-radio.html',
    'src/templates/widgets/w-checkbox.html',
    'src/templates/widgets/w-autocomplete.html',
    'src/templates/widgets/w-belongsto.html',
    'src/templates/widgets/w-date-select.html',
    'src/templates/widgets/w-date-picker.html',
    'src/templates/widgets/w-texthtml.html',

    'src/templates/widgets/w-hasmany.html',
    'src/templates/widgets/w-hasmany-view.html',

    'src/templates/widgets/w-swap.html',
    'src/templates/widgets/w-status.html',
    'src/templates/widgets/w-hasmany-through.html',
    'src/templates/widgets/w-b2-select2.html',
    'src/templates/widgets/w-b2m-select2.html',
    'src/templates/widgets/w-upload.html',
    'src/templates/widgets/w-upload-ajax.html',
    'src/templates/widgets/w-preview.html',
];

var viewsHtmlFiles = [
    'src/templates/views/v-list.html',
    'src/templates/views/v-list-edit.html',
    'src/templates/views/v-edit.html',
    'src/templates/views/v-view.html',
    'src/templates/views/v-insert.html',
    'src/templates/views/v-search.html',
    'src/templates/views/v-hasmany.html',
    'src/templates/views/v-hasmany-view.html',
];


var crudHtmlFiles = [
    'src/templates/misc/actions.html',
    'src/templates/misc/cr-templates.html',
    'src/templates/misc/c-paginator.html',
    'src/templates/misc/dialogs.html',
    'src/templates/misc/c-loading.html',
    'src/templates/misc/c-wait.html',

    'src/templates/widgets/w-custom.html',
    'src/templates/widgets/w-input.html',
    'src/templates/widgets/w-input-helped.html',
    'src/templates/widgets/w-hidden.html',
    'src/templates/widgets/w-text.html',
    'src/templates/widgets/w-image.html',
    'src/templates/widgets/w-download.html',

    'src/templates/widgets/w-textarea.html',
    'src/templates/widgets/w-select.html',
    'src/templates/widgets/w-radio.html',
    'src/templates/widgets/w-checkbox.html',
    'src/templates/widgets/w-autocomplete.html',
    'src/templates/widgets/w-belongsto.html',
    'src/templates/widgets/w-date-select.html',
    'src/templates/widgets/w-date-picker.html',
    'src/templates/widgets/w-texthtml.html',

    'src/templates/widgets/w-hasmany.html',
    'src/templates/widgets/w-hasmany-view.html',

    'src/templates/widgets/w-swap.html',
    'src/templates/widgets/w-status.html',
    'src/templates/widgets/w-hasmany-through.html',
    'src/templates/widgets/w-b2-select2.html',
    'src/templates/widgets/w-b2m-select2.html',
    'src/templates/widgets/w-upload.html',
    'src/templates/widgets/w-upload-ajax.html',
    'src/templates/widgets/w-preview.html',

    'src/templates/views/v-list.html',
    'src/templates/views/v-list-edit.html',
    'src/templates/views/v-edit.html',
    'src/templates/views/v-view.html',
    'src/templates/views/v-insert.html',
    'src/templates/views/v-search.html',
    'src/templates/views/v-hasmany.html',
    'src/templates/views/v-hasmany-view.html',

];
