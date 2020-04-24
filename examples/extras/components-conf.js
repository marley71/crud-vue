
function wInputConf_f() {
    wInputConf = {
        name: 'field1',
        value: 100
    };
}

function wPasswordConf_f() {
    wPasswordConf = {
        value: 'mypassword',
        name: 'field1',
        inputType: 'password',
        methods: {
            change: function () {
                console.log('my change', this.getValue())
            },
        }
    };
}

function wInputHelpedConf_f() {
    wInputHelpedConf = {
        value: 15,
        name: 'field1',
        customValue: true,
        methods: {
            change: function () {
                console.log('change ' + this.getValue())
            }
        },
        domainValues: {
            10: "Dieci",
            20: "Venti",
            30: "Trenta",
        }
    };
}

function wAutocompleteConf_f() {
    wAutocompleteConf = {
        value: 4,
        name: 'field1',
        routeName: 'autocomplete',
        fields: ['email', 'name'],
        modelName: 'user',
        methods: {
            change: function () {
                console.log('my conf change ' + this.getValue())
            }
        },

    };
}

function wBelongstoConf_f() {
    wBelongstoConf = {
        name: 'field1',
        fields: ['testo'],
        value: {
            id: 1,
            testo: 'ciao1'
        }
    };
}

function wRadioConf_f() {
    wRadioConf = {
        value: 1,
        name: 'field1',

        domainValues: {
            0: 'Zero',
            1: 'Uno',
            2: 'Due',
            3: 'Tre'
        },
        domainValuesOrder: [3, 2, 1, 0],
        methods: {
            change: function () {
                console.log('change ' + this.getValue())
            }
        },
    };
}

function wCheckboxConf_f() {
    wCheckboxConf = {
        value: [1, 2],
        name: 'field1',
        domainValues: {
            0: 'Zero',
            1: 'Uno',
            2: 'Due',
            3: 'Tre'
        },
        methods: {
            change: function () {
                console.log('change ' + this.getValue())
            }
        },
    };
}

function wSelectConf_f() {
    wSelectConf = {
        value: 20,
        name: 'field1',
        domainValues: {
            10: "Dieci",
            20: "Venti",
            30: "Trenta",
        },
        methods: {
            change: function () {
                console.log('change ' + this.getValue())
            }
        },
    };
}

function wTextareaConf_f() {
    wTextareaConf = {
        name: 'field1',
        value: "text area edit",
        methods: {
            change: function () {
                console.log('change ' + this.getValue())
            }
        },
    };
}

function wTextConf_f() {
    wTextConf = {
        name: 'field1',
        value: "testo edit",
        methods: {
            change: function () {
                console.log('change ' + this.getValue())
            }
        },
    };
}

function wDateSelectConf_f() {
    wDateSelectConf = {
        name: 'field1',
        value: "2018-02-04",
        methods: {
            change: function () {
                console.log('change ' + this.getValue())
            }
        },
    };
}


function wDatePickerConf_f() {
    wDatePickerConf = {
        name: 'field1',
        value: "2018-02-04",
        methods: {
            change: function () {
                console.log('change ' + this.getValue())
            }
        },
    };
}

function wTexthtmlConf_f() {
    wTexthtmlConf = {
        name: 'field1',
        value: "text area edit<b>bo</b>",
        methods: {
            change: function () {
                console.log('change ' + this.getValue())
            }
        },
    };
}

function wHasmanyConf_f() {
    wHasmanyConf = {
        name: 'field1',
        hasmanyConf: {
            fields: ['nome', 'descrizione', 'resource'],
            fieldsConfig: {
                resource: {
                    type: 'w-upload-ajax',
                    extensions: ['jpg', 'png'],
                    maxFileSize: '2M',
                    ajaxFields: {
                        resource_type: 'foto',
                        field: 'resource'
                    },
                    modelName: 'user'
                }
            }
        },
        value: [],
        limit: 2,
        methods: {
            change: function () {
                console.log('change ' + this.getValue())
            }
        },
    };
}

function wHasmanyViewConf_f() {
    wHasmanyViewConf = {
        name: 'field1',
        hasmanyConf: {
            fields: ['nome', 'descrizione', 'resource'],
            fieldsConfig: {
                resource: {
                    type: 'w-upload-ajax',
                    extensions: ['jpg', 'png'],
                    maxFileSize: '2M',
                    template : 'c-tpl-record'
                }
            }
        },
        value: [
            {
                nome: 'bandiera nazioni',
                descrizione: 'bandiera globale',
                resource: {id: "files/foto/foto_1_1585222338.png", url: "./mock/image.png", mimetype: "image/png"}

            }

        ],
        limit: 2,
        methods: {
            change: function () {
                console.log('change ' + this.getValue())
            }
        },
    };
}

function wSwapConf_f() {
    wSwapConf = {
        value: 5,
        name: 'activated',
        //swapType : 'text',
        modelData: {
            id: 4
        },

        domainValues: {
            5: 'fa fa-times text-danger',
            6: 'fa fa-gear text-success',
            7: 'fa fa-question text-warning'
        },
        model: 'user',

        methods: {
            change: function () {
                console.log('change ' + this.getValue())
            }
        },
    };
}

function wB2Select2Conf_f() {
    wB2Select2Conf = {
        value: null,
        name: 'field1',
        //addNew : true,
        fields: ['email'],
        //routeName : 'autocomplete',
        model: 'user',
        hiddenFields: ['id'],
        labelFields: ['email'],
        methods: {
            change: function () {
                console.log('change ' + this.getValue())
            }
        },
    };
}

function wB2MSelect2Conf_f() {
    wB2MSelect2Conf = {
        value: [],
        name: 'field1',
        //addNew : true,

        model: 'user',
        labelFields: ['email'],
        hiddenFields: ['id'],
        fields: ['email'],
        methods: {
            change: function () {
                console.log('change ' + this.getValue())
            }
        },
    };
}

function wUploadConf_f() {
    wUploadConf = {
        value: null,
        name: 'field1',
        maxFileSize: "2M",
        extensions: ['jpg', 'jpeg', 'png'],
        methods: {
            change: function () {
                console.log('my change', this.getValue())
            },
        }
    };
}

function wUploadAjaxCon_f() {
    wUploadAjaxConf = {
        value: null,
        name: 'field1',
        maxFileSize: "2M",
        extensions: ['jpg', 'jpeg', 'png'],
        // campi da inviare nella richiesta ajax di upload file
        ajaxFields: {
            //upload_type : 'attachment',
            resource_type: 'foto'
        },
        methods: {
            change: function () {
                console.log('my change', this.getValue())
            },
        }
    };
}

function vViewConf_f() {
    vViewConf = {
        //fields:['name'],
        actions: [],
        fieldsConfig: {
            mainrole: {
                type: 'w-belongsto',
                fields: ['name']
            }
            // fotos : {
            //     type : 'w-hasmany',
            //     hasmanyConf : {
            //         fields : ['id','nome','descrizione','resource','status'],
            //         fieldsConfig : {
            //             resource : 'w-upload-ajax',
            //             status : 'w-hidden'
            //         }
            //     }
            // },
            // attachments : {
            //     type : 'w-hasmany',
            //     hasmanyConf : {
            //         fields : ['id','nome','descrizione','resource','status'],
            //         fieldsConfig : {
            //             resource : {
            //                 type : 'w-upload-ajax',
            //                 metadata : {
            //                     ajaxFields: {
            //                         resource_type: 'attachment'
            //                     }
            //                 }
            //
            //             },
            //             status : 'w-hidden',
            //             id : 'w-hidden'
            //         }
            //     }
            //
            // }
        }
    };
}

function vEditConf_f() {
    vEditConf = {
        fieldsConfig: {
            fotos: {
                type: 'w-hasmany',
                hasmanyConf: {
                    fields: ['id', 'nome', 'descrizione', 'resource', 'status'],
                    fieldsConfig: {
                        resource: 'w-upload-ajax',
                        status: 'w-hidden'
                    }
                }
            },
            attachments: {
                type: 'w-hasmany',
                hasmanyConf: {
                    fields: ['id', 'nome', 'descrizione', 'resource', 'status'],
                    fieldsConfig: {
                        resource: {
                            type: 'w-upload-ajax',
                            metadata: {
                                ajaxFields: {
                                    resource_type: 'attachment'
                                }
                            }

                        },
                        status: 'w-hidden',
                        id: 'w-hidden'
                    }
                }

            }
        }
    };
}

function vSearchConf_f() {
    vSearchConf = {
        fieldsConfig: {
            'roles|id' : 'w-select'
        }
    };
}

function vCustomConf_f() {
    vCustomConf = {
        routeName: null,
        fields: ['campo1', 'campo2'],
        data: {
            value: {
                campo1: 'campo1Value',
                campo2: 'campo2Value'
            },
            metadata: {}
        }
    }
}

function vCustomListConf_f() {
    vCustomListConf = {
        routeName: null,
        fields: ['campo1', 'campo2'],
        data: {
            value: [{
                campo1: 'campo1Value',
                campo2: 'campo2Value'
            }, {
                campo1: 'campo1Value1',
                campo2: 'campo2Value2'
            }, {
                campo1: 'campo1Value1',
                campo2: 'campo2Value2'
            },
            ],
            metadata: {}
        }
    }
}
