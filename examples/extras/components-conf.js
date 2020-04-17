rInputConf = {
    name : 'field1',
    value : 100
};

rPasswordConf = {
    value: 'mypassword',
    name : 'field1',
    inputType : 'password',
    methods : {
        change : function() {
            console.log('my change',this.getValue())
        },
    }
};

rInputHelpedConf = {
    value : 15,
    name : 'field1',
    customValue : true,
    methods : {
        change : function() {
            console.log('change ' +  this.getValue())
        }
    },
    domainValues : {
        10 : "Dieci",
        20 : "Venti",
        30 : "Trenta",
    }
};

rAutocompleteConf = {
    value : 4,
    name : 'field1',
    routeName : 'autocomplete',
    fields : ['email','name'],
    modelName : 'user',
    methods : {
        change : function() {
            console.log('my conf change ' +  this.getValue())
        }
    },

};


rBelongstoConf = {
    name : 'field1',
    fields : ['testo'],
    value : {
        id : 1,
        testo : 'ciao1'
    }
};

rRadioConf = {
    value : 1,
    name : 'field1',

    domainValues :  {
        0 : 'Zero',
        1 : 'Uno',
        2 : 'Due',
        3 : 'Tre'
    },
    domainValuesOrder : [3,2,1,0],
    methods : {
        change : function() {
            console.log('change ' +  this.getValue())
        }
    },
};

rCheckboxConf = {
    value : [1,2],
    name : 'field1',
    domainValues :  {
        0 : 'Zero',
        1 : 'Uno',
        2 : 'Due',
        3 : 'Tre'
    },
    methods : {
        change : function() {
            console.log('change ' +  this.getValue())
        }
    },
};

rSelectConf = {
    value : 20,
    name : 'field1',
    domainValues : {
        10 : "Dieci",
        20 : "Venti",
        30 : "Trenta",
    },
    methods : {
        change : function() {
            console.log('change ' +  this.getValue())
        }
    },
};

rTextareaConf = {
    name : 'field1',
    value : "text area edit",
    methods : {
        change : function() {
            console.log('change ' +  this.getValue())
        }
    },
};

rTextConf = {
    name : 'field1',
    value : "testo edit",
    methods : {
        change : function() {
            console.log('change ' +  this.getValue())
        }
    },
};

rDatePickerConf = {
    name : 'field1',
    value: "2018-02-04",
    methods : {
        change : function() {
            console.log('change ' +  this.getValue())
        }
    },
};

rTexthtmlConf = {
    name : 'field1',
    value : "text area edit<b>bo</b>",
    methods : {
        change : function() {
            console.log('change ' +  this.getValue())
        }
    },
};

rHasmanyConf = {
    name : 'field1',
    hasmanyConf: {
        fields: ['nome', 'descrizione','resource'],
        fieldsConfig : {
            resource : {
                type : 'r-upload-ajax',
                extensions : ['jpg','png'],
                maxFileSize : '2M',
                ajaxFields :  {
                    resource_type : 'foto',
                    field : 'resource'
                },
                modelName : 'user'
            }
        }
    },
    value : [],
    limit : 2,
    methods : {
        change : function() {
            console.log('change ' +  this.getValue())
        }
    },
};

rHasmanyViewConf = {
    name : 'field1',
    hasmanyConf: {
        fields: ['nome', 'descrizione','resource'],
        fieldsConfig : {
            resource : {
                type : 'r-upload-ajax',
                extensions : ['jpg','png'],
                maxFileSize : '2M'
            }
        }
    },
    value : [
        {
            nome: null,
            descrizione: null,
            resource: {id: "files/foto/foto_1_1585222338.png", url: "/viewmediable/foto/1", mimetype: "image/png"}

        }

    ],
    limit : 2,
    methods : {
        change : function() {
            console.log('change ' +  this.getValue())
        }
    },
};


rSwapConf = {
    value : 5,
    name : 'activated',
    //swapType : 'text',
    modelData : {
        id : 4
    },

    domainValues : {
        5 : 'fa fa-times text-danger',
        6 : 'fa fa-gear text-success',
        7 : 'fa fa-question text-warning'
    },
    model : 'user',

    methods : {
        change : function() {
            console.log('change ' +  this.getValue())
        }
    },
};


rB2Select2Conf = {
    value : null,
    name : 'field1',
    //addNew : true,
    fields : ['email'],
    //routeName : 'autocomplete',
    model : 'user',
    hiddenFields : ['id'],
    labelFields : ['email'],
    methods : {
        change : function() {
            console.log('change ' +  this.getValue())
        }
    },
};

rB2MSelect2Conf = {
    value : [],
    name : 'field1',
    //addNew : true,

    model : 'user',
    labelFields : ['email'],
    hiddenFields : ['id'],
    fields : ['email'],
    methods : {
        change : function() {
            console.log('change ' +  this.getValue())
        }
    },
};


rUploadConf = {
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

rUploadAjaxConf = {
    value: null,
    name : 'field1',
    maxFileSize : "2M",
    extensions : ['jpg','jpeg','png'],
    // campi da inviare nella richiesta ajax di upload file
    ajaxFields :  {
        //upload_type : 'attachment',
        resource_type : 'foto'
    },
    methods : {
        change : function() {
            console.log('my change',this.getValue())
        },
    }
};


vViewConf = {
    //fields:['name'],
    actions : [],
    fieldsConfig : {
        mainrole : {
            type : 'r-belongsto',
            fields : ['name']
        }
        // fotos : {
        //     type : 'r-hasmany',
        //     hasmanyConf : {
        //         fields : ['id','nome','descrizione','resource','status'],
        //         fieldsConfig : {
        //             resource : 'r-upload-ajax',
        //             status : 'r-hidden'
        //         }
        //     }
        // },
        // attachments : {
        //     type : 'r-hasmany',
        //     hasmanyConf : {
        //         fields : ['id','nome','descrizione','resource','status'],
        //         fieldsConfig : {
        //             resource : {
        //                 type : 'r-upload-ajax',
        //                 metadata : {
        //                     ajaxFields: {
        //                         resource_type: 'attachment'
        //                     }
        //                 }
        //
        //             },
        //             status : 'r-hidden',
        //             id : 'r-hidden'
        //         }
        //     }
        //
        // }
    }
};

vEditConf = {
    fieldsConfig : {
        fotos : {
            type : 'r-hasmany',
            hasmanyConf : {
                fields : ['id','nome','descrizione','resource','status'],
                fieldsConfig : {
                    resource : 'r-upload-ajax',
                    status : 'r-hidden'
                }
            }
        },
        attachments : {
            type : 'r-hasmany',
            hasmanyConf : {
                fields : ['id','nome','descrizione','resource','status'],
                fieldsConfig : {
                    resource : {
                        type : 'r-upload-ajax',
                        metadata : {
                            ajaxFields: {
                                resource_type: 'attachment'
                            }
                        }

                    },
                    status : 'r-hidden',
                    id : 'r-hidden'
                }
            }

        }
    }
};

vCustomConf = {
    routeName: null,
    fields : ['campo1','campo2'],
    data : {
        value : {
            campo1 : 'campo1Value',
            campo2 : 'campo2Value'
        },
        metadata : {

        }
    }
}


vCustomListConf = {
    routeName: null,
    fields : ['campo1','campo2'],
    data : {
        value : [{
            campo1 : 'campo1Value',
            campo2 : 'campo2Value'
        },{
            campo1 : 'campo1Value1',
            campo2 : 'campo2Value2'
        },{
            campo1 : 'campo1Value1',
            campo2 : 'campo2Value2'
        },
        ],
        metadata : {

        }
    }
}
