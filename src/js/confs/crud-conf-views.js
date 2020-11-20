let crudConfViews = {
    //--- configurazione di default delle views
    'v-base' : {
        confParent : 'crud.conf.c-component',
        viewTitle : '',
        langContext : '',
        loading : true,
        //targetRef : null,
        errorMsg : '',
        routeConf : null
    },
    'v-record' : {
        confParent : 'crud.conf.v-base',
        modelName : null,
        pk : 0,
        value : {},
        metadata : {},
        //langContext : '',
        route : null,
        widgets : {},
        actionsConf : [],
        actionsName : {},
        defaultWidgetType : 'w-input',
        fields : [],
        fieldsConfig : {},
    },
    'v-insert' : {
        confParent : 'crud.conf.v-record',
    },
    'v-edit' : {
        confParent : 'crud.conf.v-record',
    },
    'v-view' : {
        confParent : 'crud.conf.v-record',
        defaultWidgetType : 'w-text',
    },
    'v-search' : {
        confParent : 'crud.conf.v-record',
    },
    'v-collection' : {
        confParent : 'crud.conf.v-base',
        modelName : null,
        value : [],
        metadata : {},
        needSelection : false,
        collectionActionsName : [],
        recordActionsName : [],
        collectionActions : {},
        recordActions : [],
    },
    'v-list' : {
        confParent : 'crud.conf.v-collection',
        //loading : true,
        widgets : {},
        keys : [],
        route : null,
        pagination : {},
        defaultWidgetType : 'w-text',
        json : {},
        paginator : true,
    },
    'v-list-edit' : {
        confParent : 'crud.conf.v-list',
        //viewTitle : 'title',
        widgetsEdit : {},
        editMode : []
    },
    'v-hasmany' : {
        confParent : 'crud.conf.v-collection',
        defaultWidgetType : 'w-input',
    },
    'v-hasmany-view' : {
        confParent : 'crud.conf.v-collection',
        defaultWidgetType : 'w-text',
    },
    'v-hasone' : {
        confParent : 'crud.conf.v-record',
        defaultWidgetType : 'w-input',
        loaded : false,
    },
    // --- configurazione di default per tipo view
    view : {
        confParent : 'crud.conf.v-view',
        primaryKey : 'id',
        routeName : 'view',
        fieldsConfig : {},
        //actions : ['action-back'],
        actions : [],
        customActions: {},
        widgetTemplate : 'tpl-record2',
    },
    edit : {
        confParent : 'crud.conf.v-edit',
        primaryKey : 'id',
        routeName : 'edit',
        customActions : {},
        fieldsConfig : {
            id : 'w-hidden'
        },
        fields : [],
        widgetTemplate : 'tpl-record',
        actions : ['action-save','action-back']
    },
    list : {
        confParent : 'crud.conf.v-list',
        primaryKey : 'id',
        routeName : 'list',
        customActions: {},
        fieldsConfig : {},
        orderFields: {},
        widgetTemplate : 'tpl-list',
        actions : ['action-insert','action-delete-selected','action-view','action-edit','action-delete']
    },
    listEdit : {
        confParent : 'crud.conf.v-list',
        routeName : 'list',
        primaryKey : 'id',
        customActions: {},
        fieldsConfig : {},
        orderFields: {},
        widgetTemplate : 'tpl-list',
        actions : [
            'action-insert',
            'action-delete-selected',
            'action-view',
            'action-edit-mode',
            'action-delete',
            'action-save-row',
            'action-view-mode'
        ]
    },
    search : {
        primaryKey : 'id',
        routeName : 'search',
        actions : ['action-search','action-reset'],
        fieldsConfig : {},
        customActions: {},
        widgetTemplate : 'tpl-record',
    },
    insert : {
        primaryKey : 'id',
        routeName : 'insert',
        widgetTemplate : 'tpl-record',
        actions : ['action-save','action-back'],
        fieldsConfig : {
            id : 'w-hidden'
        },
        actions : ['action-save','action-back']
    },
}
