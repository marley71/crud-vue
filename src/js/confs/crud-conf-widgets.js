let crudConfWidgets = {
    'w-base' : {
        name : null,
        confParent : 'crud.conf.c-component',
        value : null,
        defaultValue : null,
        label : null,
    },
    'w-input' : {
        //confParent : 'crud.conf.w-base',
        inputType : 'text'
    },
    'w-input-helped' : {
        //confParent : 'crud.conf.w-base',
        domainValues : {},
        domainValuesOrder : [],
        customValue : false,
    },
    'w-autocomplete' : {
        //confParent : 'crud.conf.w-base',
        resources : [
            'https://cdnjs.cloudflare.com/ajax/libs/jquery-autocomplete/1.0.7/jquery.auto-complete.min.css',
            'https://cdnjs.cloudflare.com/ajax/libs/jquery-autocomplete/1.0.7/jquery.auto-complete.min.js'
        ],
        routeName : 'autocomplete',
        primaryKey : 'id',  // campo da utilizzare per assegnare il valore selezionato
        //label : '',
        suggestValues : {},
        labelFields : [], // campi da visualizzare nell'autocomplete
        minLength: 3, // caratteri minimi prima che parta la ricerca
    },
    'w-belongsto' : {
        //confParent : 'crud.conf.w-base',
        labelFields : ['text'],
    },
    'w-radio' : {
        //confParent : 'crud.conf.w-base',
        domainValues : {},
        domainValuesOrder : [],
    },
    'w-checkbox' : {
        //confParent : 'crud.conf.w-base',
        domainValues : {},
        domainValuesOrder : [],
        value : [],
    },
    'w-select' : {
        //confParent : 'crud.conf.w-base',
        domainValues : {},
        domainValuesOrder : [],
    },
    'w-textarea' : {
        //confParent : 'crud.conf.w-base',
    },
    'w-text' : {
        //confParent : 'crud.conf.w-base',
    },
    'w-custom' : {
        //confParent : 'crud.conf.w-base',
    },
    'w-date-select' : {
        //confParent : 'crud.conf.w-base',
        resources : [
            'https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.24.0/moment.min.js'
        ],
        minYear : null,
        maxYear : null,
    },
    'w-date-picker' : {
        //confParent : 'crud.conf.w-base',
        resources : [
            'https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.24.0/moment.min.js',
            'https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datepicker/1.9.0/css/bootstrap-datepicker.min.css',
            'https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datepicker/1.9.0/js/bootstrap-datepicker.js'
        ],
        displayFormat : "dd/mm/yyyy",
        dateFormat :  "yyyy-mm-dd",
    },
    'w-date-text' : {
        resources : [
            'https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.24.0/moment.min.js'
        ],
        displayFormat : "dd/mm/yyyy",
        dateFormat :  "yyyy-mm-dd",
        formattedValue : null,
    },
    'w-texthtml' : {
        //confParent : 'crud.conf.w-base',
        resources : [
            //'https://cdnjs.cloudflare.com/ajax/libs/summernote/0.8.12/summernote.css',
            //'https://cdnjs.cloudflare.com/ajax/libs/summernote/0.8.12/summernote.min.js',
            'https://cdn.jsdelivr.net/npm/summernote-bootstrap4@0.0.5/dist/summernote.css',
            'https://cdn.jsdelivr.net/npm/summernote-bootstrap4@0.0.5/dist/summernote.min.js'

        ],
    },
    'w-hasmany' : {
        //confParent : 'crud.conf.w-base',
        confViews : {},
        limit : 100,
        value : [],
    },
    'w-hasmany-view' : {
        confParent : 'crud.conf.w-hasmany',
    },
    'w-swap' : {
        //confParent : 'crud.conf.w-base',
        routeName : 'set',
        iconClass : 'fa fa-circle',
        title : "swap",
        swapType : 'icon',  // possibili valori text,icon
        defaultDomainValues : {
            icon : {
                0 : 'fa fa-circle text-danger',
                1 : 'fa fa-circle text-success'
            },
            text : {
                0 : 'app.no',
                1 : 'app.si'
            }
        },
        domainValues : {},
        slot : '',
    },
    'w-b2-select2': {
        labelFields : [],
        resources : [
            'https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.12/css/select2.min.css',
            'https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.12/js/select2.min.js'
        ],
        routeName : 'autocomplete',
        route : null,
        primaryKey : 'id',
        allowClear : true,
        data : null,  // eventuali dati statici
    },
    'w-b2m-select2': {
        confParent : 'crud.conf.w-b2-select2',
        value : [],
    },
    'w-upload' : {
        //confParent : 'crud.conf.w-base',
        extensions : '',
        maxFileSize : '',
        error : false,
        errorMessage : '',
    },
    'w-upload-ajax' : {
        //confParent : 'crud.conf.w-base',
        extensions : [],
        maxFileSize : '',
        routeName : 'uploadfile',
        value : {},
        error : false,
        errorMessage : '',
        previewConf : {},
    },
    'w-preview' : {
        icon : false,
        iconClass : '',
        value : {},
    },
    'w-map' : {
        apiKey : null,
        map : null,
        marker : null,
        lat : 0,
        lng : 0,
        zoom : 8,
        height : 400,
        width : 'auto',
        lngName : 'lng',
        latName : 'lat'
    },
    'w-map-view' : {
        confParent : 'crud.conf.w-map',
    },
}
