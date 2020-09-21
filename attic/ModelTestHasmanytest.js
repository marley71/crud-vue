var ModelTestHasmanytest = {
    search : {
        modelName : 'test',
        routeName : 'search',
        fields : ['stringa'],
        fieldsConfig : {
            stringa : {
                type : 'r-input',
                operator : 'like'
            }
        },
        customActions : {},
        actions : ['action-search']
    },
    edit : {
        routeName : 'edit',
        fields : ['id','carattere','stringa','intero','fotos','attachments','hasmanytests','captcha','test_hasmanytests'],
        fieldsConfig : {
            fotos : {
                type : 'r-hasmany-image-edit',
                metadata : {
                    modelName : 'test',
                },
                uploadFields : ['ext','random','id','status','original_name','filename','mimetype','modelName','type'],
                fields : ['nome','descrizione'],
                fields_config : {
                    nome : { type : 'input'},
                    descrizione : {type : 'textarea'},
                },
                mainformFields : ['nome','descrizione','original_name','filename','ext','random','id','status','mimetype'],

            },
            attachments : {
                type : 'r-hasmany-attachment-edit',
                metadata : {
                    modelName : 'test',
                },
                uploadFields : ['ext','random','id','status','original_name','filename','mimetype','modelName','type'],
                fields : ['nome','descrizione'],
                fields_config : {
                    nome : { type : 'input'},
                    descrizione : {type : 'textarea'},
                },
                mainformFields : ['nome','descrizione','original_name','filename','ext','random','id','status','mimetype'],

            },
            test_hasmanytests : {
                type : 'r-hasmany',
                metadata : {
                    modelName : 'test_hasmanytest',
                }
            },
            hasmanytests : {
                type : 'r-hasmany-through2',
                templateName : 'top',
                labelFields : ['hasmanytest_id'],
                metadata : {
                    autocompleteModel : 'test_hasmanytest',
                    modelName : 'test_hasmanytest'
                }
            },
            // captcha : {
            //     type : 'upload_image'
            // },
            stringa : {
                type : 'r-textarea'
            },
            carattere : {
                type : 'r-checkbox',
                metadata : {
                    domainValues : {
                        'a' : 'A',
                        'b' : 'B',
                        'c' : 'C'
                    }
                }
            },
        },
        customActions : {},
        actions : ['action-save','action-back']
    },
    view : {
        fields : ['stringa','intero','fotos','attachments'],
        routeName : 'view',
        modelName : 'test',
        fieldsConfig : {
            fotos: {
                type: 'r-hasmany-image',
            },
            attachments: {
                type: 'r-hasmany-attachment',
            },
            test_hasmanytests: {
                type: 'r-hasmany-view',
                metadata: {
                    modelName: 'test_hasmanytest',
                }
            },
        }
    },
    list : {
        //viewTitle : 'Lista elementi in test',
        routeName : 'list',
        actions: ['action-edit','action-view','action-insert','action-delete','action-miar','action-miag','action-delete-selected'],
        fields : ['stringa','choice','start_date','end_date','fotos','attachments','test_hasmanytests'],
        orderFields : {
            'stringa' : 'stringa'
        },
        modelName : 'test',
        fieldsConfig : {
            fotos : {
                type : 'r-hasmany-image',
            },
            attachments : {
                type : 'r-hasmany-attachment',
            },
            test_hasmanytests : {
                type : 'r-hasmany-view',
                metadata : {
                    modelName : 'test_hasmanytest',
                }
            },
            // hasmanytests : {
            //     type : 'hasmany_through',
            //     templateName : 'top',
            //     labelFields : ['hasmanytest_id'],
            //     metadata : {
            //         autocompleteModel : 'hasmanytest'
            //     }
            // },
            choice : {
                type : 'r-swap',
                modelName : 'test',
                metadata : {
                    domainValues : {
                        10 : 10,
                        20 : 20,
                        30 : 30
                    }
                },
                swapType : 'text'
            }
        },
        customActions : {
            'action-miar' : {
                text : 'miar',
                css: 'btn btn-outline-secondary btn-sm',
                type : 'record'
            },
            'action-miag' : {
                text : 'miag',
                title : 'maglob',
                css: 'btn btn-outline-secondary btn-sm',
                type : 'collection'
            }
        }
    }
}