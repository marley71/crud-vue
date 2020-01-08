lang = {
    app : {
        'add' : "Aggiungi",
        'conferma-delete' : 'Sicuro di voler cancellare l\'elemento?',
        'conferma-multidelete' : 'Sei sicuro di voler cancellare (0) elementi selezionati?'
    },
    model : {
        foto : 'foto',
        attachment : 'allegato'
    }
}
crud = {
    application : {
        useRouter : false,
    },
    icons : {
        mimetypes : {
            "default"   : 'fa fa-file-o',
            "xls"       : 'fa fa-file-excel-o',
            "xlsx"      : 'fa fa-file-excel-o',
            "zip"       : 'fa fa-file-archive-o',
            "mp3"       : 'fa fa-audio-o',
            "jpg"       : "fa fa-image-o",
            "pdf"       : "fa fa-file-pdf-o",
            "txt"       : "fa fa-file-text-o",
        }

    },
    recordActions : {
        'action-edit' : {
            type : 'record',
            title : 'edit',
            css: 'btn btn-outline-secondary btn-sm ',
            text : '',
            icon : 'fa fa-edit',
            execute : function () {
                var url = this.$crud.application.useRouter?'#':'';
                url += "/edit/" + this.modelName + "/" + this.modelData.id;
                document.location.href=url
            }
        },
        'action-view' : {
            type : 'record',
            title : 'view',
            css: 'btn btn-outline-secondary btn-sm ',
            icon : 'fa fa-list',
            text : '',
            execute : function () {
                var url = this.$crud.application.useRouter?'#':'';
                url += "/view/" + this.modelName + "/" + this.modelData.id;
                document.location.href=url;
            }
        },
        'action-delete' : {
            type : 'record',
            title : 'delete record',
            css: 'btn btn-outline-danger btn-sm ',
            icon : 'fa fa-times',
            text : '',
            execute : function () {
                var that = this;
                that.$crud.confirmDialog(that.$LANG.app['conferma-delete'] ,{
                    ok : function () {

                        var r = Route.factory('delete');
                        //r.setValues(that.view);
                        r.values = {
                            modelName: that.view.cModel,
                            pk : that.modelData.id
                        };
                        //self.app.waitStart();
                        Server.route(r,function (json) {
                            that.view.reload();
                            //self.app.waitEnd();
                            //self.callback(json);
                        });
                    }
                });
            }
        },
    },
    globalActions : {

        'action-insert' : {
            type : 'global',
            visible : true,
            enabled : true,
            title : 'New',
            css: 'btn btn-outline-primary btn-sm btn-group',
            icon : 'fa fa-plus',
            text : 'New',
            execute  :function () {
                var url = this.$crud.application.useRouter?'#':'';
                url += "/insert/" + this.modelName + "/new";
                document.location.href=url;
            }
        },
        'action-save' : {
            type : 'global',
            title : 'save',
            css: 'btn btn-primary btn-sm',
            icon : 'fa fa-save',
            text : 'Save',
            execute : function () {
                var that = this;
                console.log('action save',this);
                var rName = 'create';
                var values = {};
                if (this.view.route.type == 'update') {
                    rName = 'update';

                    // var r = Route.factory('update',{
                        values =  {
                            modelName : this.modelName,
                            pk : this.view.cPk
                        }
                    // })
                } else {
                    rName = 'create'
                    // var r = Route.factory('save',{
                        values =  {
                            modelName : this.modelName,
                        }
                    // })
                }
                var r = null;
                if (crud.routes[rName]) {
                    r =  new Route(crud.routes[rName]);
                } else {
                    r = Route.factory(rName);
                }
                r.values = values;
                //r.params = this.$crud.getFormData(jQuery(this.rootElement).find('form'));
                r.params = Utility.getFormData(this.view.jQe('form'));
                Server.route(r, function (json) {
                    if (json.error) {
                        that.$crud.errorDialog(json.msg)
                        //alert(json.msg);
                        return ;
                    }

                })

            }
        },
        'action-back' : {
            type : 'global',
            title : 'Back',
            css: 'btn btn-secondary btn-sm',
            icon : 'fa fa-backward',
            text : 'Back',
            execute : function () {
                window.history.back();
            }
        },
        'action-search' : {
            type : 'global',
            title : 'Search',
            css: 'btn btn-primary btn-sm btn-group',
            icon : 'fa fa-search',
            text : 'Search',
            execute : function () {
                //console.log('action-search',this.view,this.view.targetId);
                if (this.view && this.view.targetRef) {
                    var ref = this.view.$parent.$refs[this.view.targetRef];
                    if (!ref) {
                        console.error(this.view.targetRef +' ref non trovata in ',this.view.$parent.$refs);
                        throw "errore";
                    }
                    var formData = this.view.getFormData();

                    //var form = jQuery(this.view.$el).find('form');
                    //var formData = Utility.getFormData(form);
                    ref.routeConf.params = formData;
                    return ;
                }

                if (this.view.cRouteConf) {
                    var routeConf = Utility.cloneObj(this.view.cRouteConf);
                    var form = jQuery(this.view.$el).find('form');
                    var formData = Utility.getFormData(form);
                    console.log('formData',formData);
                    this.view.doSearch(formData)
                    //this.view.setCRouteCo .cRouteConf = routeConf;
                } else
                    console.warn('routeConf non definita')
                console.log('SEARCH',this.view,this.cRouteConf);
            }
        },
        'action-order' : {
            type : 'global',
            title : 'Order',
            css: 'btn btn-default btn-sm',
            iconUp : 'fa fa-caret-up',
            iconDown : 'fa fa-caret-down',
            icon : null,
            text : '',
            execute : function () {
                console.log('order execute',this.view);
                var params = Utility.cloneObj(this.view.routeConf.params);
                params.order_field = this.orderField;
                params.order_direction = (this.view.data.metadata.order.order_field == this.orderField)?(this.view.data.metadata.order.order_direction.toLowerCase() == 'asc'?'DESC':'ASC'):'Asc';
                this.view.routeConf.params = params;
            }
        },
        'action-delete-selected' : {
            type : 'global',
            title : 'Cancella selezionati',
            css: 'btn btn-outline-danger btn-sm',
            icon : 'fa fa-trash',
            text : '',
            execute : function () {
                var that = this;
                var checked = that.view.selectedRows();
                var num = checked.length;
                if (num === 0)
                    return ;
                that.$crud.confirmDialog(that.$crud.translate('app.conferma-multidelete',false,[num]), {
                    ok : function () {
                        console.log('VIEW',that.view);
                        var r = Route.factory('multi_delete');
                        r.values = {
                            modelName: that.modelName
                        };
                        that.$crud.waitStart();
                        r.params = {'ids': checked};
                        //console.log('MULTIDELETE',checked);
                        Server.route(r,function (json) {
                            that.$crud.waitEnd();
                            that.view.reload();
                            //that.callback(json);
                        })
                    }
                });
                console.log('selected',that.view.selectedRows())
            }
        }
    },
    conf : {
        view : {
            routeName : 'view',
            fieldsConfig : {},
            actions : ['action-back'],
            customActions: {},
            renderTemplate : 'c-tpl-record2',
        },
        edit : {
            routeName : 'edit',
            customActions : {},
            fieldsConfig : {
                id : 'r-hidden'
            },
            fields : [],
            renderTemplate : 'c-tpl-record',
            actions : ['action-save','action-back']
        },
        list : {
            routeName : 'list',
            customActions: {},
            fieldsConfig : {},
            orderFields: {},
            renderTemplate : 'c-tpl-list',
            actions : ['action-insert','action-delete-selected','action-view','action-edit','action-delete']
        },
        search : {
            routeName : 'search',
            actions : ['action-search'],
            fieldsConfig : {},
            customActions: {},
            renderTemplate : 'c-tpl-record2',
        },
        insert : {
            routeName : 'insert',
            renderTemplate : 'c-tpl-record',
            actions : ['action-save','action-back'],
            fieldsConfig : {
                id : 'r-hidden'
            },
            actions : ['action-save','action-back']
        },
        uploadFile : {
            routeName : null,
            fields : ['nome','descrizione','modelName'],
            fieldsConfig : {
                modelName : {
                    type : 'r-hidden'
                },
                descrizione : {
                    type : 'r-textarea'
                }
            }
        }
    },
    routes : {
        list : {
            method      : 'get',
            url         : '/foorm/{modelName}',
            resultType  : 'list',
            protocol    : 'list',
            extraParams  : {},  //parametri statici da aggiungere sempre alla chiamata
            values : {}, // vettore associativo dei parametri per la costruzione dell'url
            params :{},
        },
        uploadfile : {
            method      : 'post',
            url         : '/uploadfile',
            resultType  : 'record',
            protocol    : 'record',
            extraParams  : {},  //parametri statici da aggiungere sempre alla chiamata
            values : {}, // vettore associativo dei parametri per la costruzione dell'url
            params :{},
        },
        upload : {
            method      : 'post',
            url         : '/upload',
            resultType  : 'record',
            protocol    : 'record',
            extraParams  : {},  //parametri statici da aggiungere sempre alla chiamata
            values : {}, // vettore associativo dei parametri per la costruzione dell'url
            params :{},
        },
        insert : {
            method      : "get",
            url         :'/foorm/{modelName}/new',
            resultType  : 'record',
            protocol    : 'record',
            type : 'create',
        },
        update : {
            method      : "post",
            url         :'/foorm/{modelName}/{pk}',
            resultType  : 'record',
            protocol    : 'record',
            type : 'update',
            extraParams : {_method:'PUT'}
        },
        create : {
            method      : "post",
            url         :'/foorm/{modelName}',
            resultType  : 'record',
            protocol    : 'record',
            type : 'create',
            extraParams : {_method:'POST'}
        },
        edit : {
            method      : "get",
            url         :'/foorm/{modelName}/{pk}/edit',
            //url         :'/foorm/{modelName}/{pk}/edit',
            resultType  : 'record',
            protocol    : 'record',
            type : 'update',
        },
        search : {
            method      : "get",
            url         :'/foorm/{modelName}/search',
            //url         :'/foorm/{modelName}/{pk}/edit',
            resultType  : 'record',
            protocol    : 'record'
        },
        view : {
            method      : "get",
            url         :'/foorm/{modelName}/{pk}/view',
            //url         :'/foorm/{modelName}/{pk}/edit',
            resultType  : 'record',
            protocol    : 'record',
            type : 'read',
        },
    },
    cRefs : {},
    components : {
        renders : {

        },
        views : {

        },
        libs :  {
            // 'r-hasmany-through2' : {
            //     js : '/vue-app/js/r-hasmany-through2.js',
            //     tpl : '/vue-app/templates/r-hasmany-through2-template.html'
            // },
            // 'dashboard-csv' : {
            //     js : '/vue-app/js/dashboard-csv.js',
            //     tpl : '/vue-app/templates/dashboard-csv-template.html'
            // }
        }
    },
    interfaces : {
        //js : 'vue-app/js/'
    }
}
