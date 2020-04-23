var ModelUser = {
    search : {
        modelName : 'user',
        //langContext : 'user',
        fields : ['email','name','roles|id'],
        fieldsConfig : {
            'email' : {
                operator : 'like',

            },
            'roles|id' : {
                type: 'r-select'

            }
        }
    },
    view : {
        modelName : 'user',
        //fields : ['name','email','password','password_confirmation','banned','mainrole','fotos','attachments'],
        actions : [],
        fieldsConfig : {
            mainrole : {
                type : 'r-belongsto',
                fields : ['name']
            }
        }
    },
    list : {
        modelName : 'user',
        fields : ['email','name','email_verified_at','banned','mainrole','fotos','attachments'],
        actions : ['action-edit','action-delete','action-insert','action-delete-selected','action-view'],
        orderFields : {
            'email':'email'
        },
        fieldsConfig : {
            email_verified_at : {
                type : 'r-swap',
                model : 'user',
            },
            banned : {
                type : 'r-swap',
                model : 'user',
                domainValues : {
                    1 : 'fa fa-circle text-danger',
                    0 : 'fa fa-circle text-success'
                }
            },
            fotos : {
                type : 'r-hasmany-view',
                hasmanyConf : {
                    fields : ['resource'],
                    fieldsConfig : {
                        resource : {
                            template : 'c-tpl-no',
                            type : 'r-preview'
                        }
                    }
                }
            },
            attachments : {
                type : 'r-hasmany-view',
                hasmanyConf : {
                    fields : ['resource'],
                    fieldsConfig : {
                        resource : {
                            type : 'r-preview',
                            template : 'c-tpl-no',
                        }
                    }
                }
            }
        }
    },
    edit : {
        modelName : 'user',
        actions : ['action-save','action-back','action-test'],
        fields : ['name','email','password','password_confirmation','banned','mainrole','fotos','attachments'],
        methods : {
            fillData : function (route,json) {
                var that = this;
                if (json.metadata.is_auth) {
                    that.conf.fieldsConfig.mainrole = 'r-hidden';
                }
                that.$options.methods.fillData.apply(that,[route,json]);
            }
        },
        fieldsConfig: {
            mainrole : 'r-select',
            banned : 'r-radio',
            password : {
                type:'r-input',
                inputType:'password',
            },
            password_confirmation : {
                type:'r-input',
                inputType:'password',
            },
            //roles : 'r-select',
            attachments : {
                type : 'r-hasmany',
                hasmanyConf : {
                    fields : ['id','nome','descrizione','resource','status'],
                    fieldsConfig : {
                        resource : {
                            type : 'r-upload-ajax',
                            extensions : ['csv','xls'],
                            maxFileSize : '2M',
                            ajaxFields : {
                                field : 'attachments'
                            }
                        },
                        status : 'r-hidden',
                        id : 'r-hidden',
                    },
                },
            },
            fotos : {
                type : 'r-hasmany',
                hasmanyConf : {
                    fields : ['status','id','nome','descrizione','resource'],
                    fieldsConfig : {
                        resource : {
                            type : 'r-upload-ajax',
                            extensions : ['jpg','png'],
                            maxFileSize : '2M',
                            ajaxFields : {
                                field : 'fotos|resource'
                            },
                            modelName : 'user'
                        },
                        status : 'r-hidden',
                        id : 'r-hidden'

                    },
                }
            }
        },
        customActions : {
            'action-test' : {
                visible : function () {
                    return false;
                },
                //enabled : false,
                enabled : function() {
                    return false;
                },
                text : 'test'
            }
        }
    },
    // view : {
    //     //actions: ['action-save', 'action-back', 'action-test'],
    //     fields: ['name','email', 'password', 'password_confirmation', 'banned', 'mainrole', 'fotos', 'attachments'],
    //     fieldsConfig :  {
    //         mainrole :  {
    //             type : 'r-belongsto',
    //             fields : ['name']
    //         }
    //     }
    // },
    'listEdit' : {
        fieldsConfigEditMode : {
            'id' : 'r-text',
            'email' : 'r-text',
            'banned' : 'r-text'
        }
    }
}
