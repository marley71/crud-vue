const crud = {};
crud.lang = {
    'app.aggiungi' : 'Aggiungi',
    'app.annulla' : 'Annulla',
    'app.azioni' : 'Azioni',
    'app.cancella' : 'Cancella elemento',
    'app.cancella-selezionati' : 'Cancella elementi selezionati',
    'app.cerca' : 'Cerca',
    'app.conferma-cancellazione' : 'Sicuro di voler cancellare l\'elemento?',
    'app.conferma-multidelete' : 'Sei sicuro di voler cancellare (0) elementi selezionati?',
    'app.estensioni-accettate' : 'Estensioni accettate:',
    'app.indietro' : 'Indietro',
    'app.limite-raggiunto' : 'Non è più possibile aggiungere altri elementi',
    'app.modifica' : 'Modifica',
    'app.nessun-elemento' : 'Nessun elemento trovato',
    'app.nuovo' : 'Nuovo',
    'app.ordina' : 'Ordina',
    'app.salva' : 'Salva',
    'app.salvataggio-ok' : 'Salvataggio avvenuto con successo!',
    'app.vista' : 'Vista',
};

crud.icons = {
    mimetypes: {
        "default": 'fa fa-file-o',
        "application/xls": 'fa fa-file-excel-o',
        "xlsx": 'fa fa-file-excel-o',
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": 'fa fa-file-excel-o',
        "zip": 'fa fa-file-archive-o',
        "mp3": 'fa fa-audio-o',
        "image/jpeg": "fa fa-image-o",
        "application/pdf": "fa fa-file-pdf-o",
        "txt": "fa fa-file-text-o",
    }
};

crud.recordActions = {
    'action-edit' : {
        type : 'record',
        title : 'app.modifica',
        css: 'btn btn-outline-secondary btn-sm ',
        text : '',
        icon : 'fa fa-edit',
        execute : function () {
            var url = "/edit/" + this.modelName + "/" + this.modelData[this.view.primaryKey];
            document.location.href=url
        }
    },
    'action-view' : {
        type : 'record',
        title : 'app.vista',
        css: 'btn btn-outline-secondary btn-sm ',
        icon : 'fa fa-eye',
        text : '',
        execute : function () {
            var url = this.$crud.application.useRouter?'#':'';
            url += "/view/" + this.modelName + "/" + this.modelData.id;
            document.location.href=url;
        }
    },
    'action-delete' : {
        type : 'record',
        title : 'app.cancella',
        css: 'btn btn-outline-danger btn-sm ',
        icon : 'fa fa-times',
        text : '',
        setRouteValues : function(route) {
            var that = this;
            route.setValues({
                modelName: that.view.cModel,
                pk : that.modelData[that.view.conf.primaryKey]
            });
            return route;
        },
        execute : function () {
            var that = this;
            that.$crud.confirmDialog(that.$crud.lang['app.conferma-cancellazione'] ,{
                ok : function () {
                    var r = that.$crud.createRoute('delete');
                    that.setRouteValues(r);
                    Server.route(r,function (json) {
                        that.view.reload();
                    });
                }
            });
        }
    },
    'action-save-row' : {
        type: 'record',
        title: 'app.salva',
        css: 'btn btn-outline-success btn-sm ',
        text: '',
        icon: 'fa fa-save',
        visible: false,
        setRouteValues : function(route) {
            var that = this;
            route.setValues({
                modelName: that.view.cModel,
                pk : that.modelData[that.view.conf.primaryKey]
            });
            return route;
        },
        execute: function () {
            var that = this;
            var values = {};
            for (var k in that.view.rendersEdit[that.index]) {
                //console.log('edit r',that.view.rendersEdit[that.index][k])
                var sref = that.view.rendersEdit[that.index][k].cRef; //  're-' + that.index + '-' +  k;
                if (crud.cRefs[sref])
                    values[k] = crud.cRefs[sref].getValue();
            }
            var id = that.view.data.value[that.index][that.view.conf.primaryKey];
            var r = that.$crud.createRoute('update');
            that.setRouteValues(r);
            r.setParams(values);
            Server.route(r, function (json) {
                if (json.error) {
                    that.$crud.errorDialog(json.msg);
                    return;
                }
                that.$crud.popoverSuccess(that.$crud.translate('app.salvataggio-ok'))
                that.view.reload();
            })
            console.log('values', values);
        }
    },
    'action-edit-mode':  {
        type : 'record',
        title : 'app.modifica',
        css: 'btn btn-outline-secondary btn-sm ',
        text : '',
        icon : 'fa fa-edit',
        execute : function () {
            var that = this;
            that.view.setEditMode(that.index);
        }
    },
    'action-view-mode' : {
        type : 'record',
        title : 'app.annulla',
        css: 'btn btn-outline-secondary btn-sm ',
        //text : 'back',
        icon : 'fa fa-arrow-left',
        visible : false,
        execute : function () {
            var that = this;
            that.view.setViewMode(that.index);
        }
    }
};

crud.collectionActions = {

    'action-insert' : {
        type : 'collection',
        visible : true,
        enabled : true,
        title : 'app.nuovo',
        css: 'btn btn-outline-primary btn-sm btn-group',
        icon : 'fa fa-plus',
        text : 'app.nuovo',
        execute  :function () {
            var url = this.$crud.application.useRouter?'#':'';
            url += "/insert/" + this.modelName + "/new";
            document.location.href=url;
        }
    },
    'action-save' : {
        type : 'collection',
        title : 'app.salva',
        css: 'btn btn-primary btn-sm',
        icon : 'fa fa-save',
        text : 'app.salva',
        setRouteValues : function(route) {
            var that = this;
            if (that.view.cPk) {
                route.setValues({
                    modelName: that.view.cModel,
                    pk : this.view.cPk
                });
            } else {
                route.setValues({
                    modelName: that.view.cModel,
                });
            }
            route.setParams(this.$crud.getFormData(this.view.jQe('form')));
            return route;
        },
        execute : function () {
            var that = this;
            console.log('action save',this);
            var rName = 'create';
            if (that.view.cPk)
                rName = 'update';
            var r = that._getRoute(rName);
            that.setRouteValues(r);

            // var values = {};
            // if (this.view.route.type == 'update') {
            //     rName = 'update';
            //
            //     // var r = Route.factory('update',{
            //         values =  {
            //             modelName : this.modelName,
            //             pk : this.view.cPk
            //         }
            //     // })
            // } else {
            //     rName = 'create'
            //     // var r = Route.factory('save',{
            //         values =  {
            //             modelName : this.modelName,
            //         }
            //     // })
            // }
            // var r = null;
            // if (crud.routes[rName]) {
            //     r =  new Route(crud.routes[rName]);
            // } else {
            //     r = Route.factory(rName);
            // }
            // r.values = values;
            // //r.params = this.$crud.getFormData(jQuery(this.rootElement).find('form'));
            // r.params = this.$crud.getFormData(this.view.jQe('form'));
            Server.route(r, function (json) {
                if (json.error) {
                    that.$crud.errorDialog(json.msg)
                    //alert(json.msg);
                    return ;
                }
                that.$crud.popoverSuccess('app.salvataggio-ok')
            })
        }
    },
    'action-back' : {
        type : 'collection',
        title : 'app.indietro',
        css: 'btn btn-secondary btn-sm',
        icon : 'fa fa-backward',
        text : 'app.indietro',
        execute : function () {
            window.history.back();
        }
    },
    'action-search' : {
        type : 'collection',
        title : 'app.cerca',
        css: 'btn btn-primary btn-sm btn-group',
        icon : 'fa fa-search',
        text : 'app.cerca',
        execute : function () {
            //console.log('action-search',this.view,this.view.targetId);
            if (this.view && this.view.targetRef) {
                console.log('target ref',this.view.targetRef);
                var targetView = this.$crud.cRefs[this.view.targetRef];

                // var ref = this.view.$parent.$refs[this.view.targetRef];
                // if (!ref) {
                //     console.error(this.view.targetRef +' ref non trovata in ',this.view.$parent.$refs);
                //     throw "errore";
                // }
                var formData = this.view.getFormData();

                //var form = jQuery(this.view.$el).find('form');
                //var formData = Utility.getFormData(form);

                targetView.route.setParams(formData);
                targetView.reload();
                return ;
            }
            // TODO in caso di mancanza di una targetView modificare l'url con i parametri di search
            // if (this.view.cRouteConf) {
            //     var routeConf = this.$crud.cloneObj(this.view.cRouteConf);
            //     var form = jQuery(this.view.$el).find('form');
            //     var formData = this.$crud.getFormData(form);
            //     console.log('formData',formData);
            //     this.view.doSearch(formData)
            //     //this.view.setCRouteCo .cRouteConf = routeConf;
            // } else
            //     console.warn('routeConf non definita')
            //console.log('SEARCH',this.view,this.cRouteConf);
        }
    },
    'action-order' : {
        type : 'collection',
        title : 'app.order',
        css: 'btn btn-default btn-sm',
        iconUp : 'fa fa-caret-up',
        iconDown : 'fa fa-caret-down',
        icon : null,
        text : '',
        execute : function () {
            console.log('order execute',this);
            var params = this.view.route.getParams();
            params.order_field = this.orderField;
            params.order_direction = (!this.orderDirection || this.orderDirection.toLowerCase() == 'desc')?'ASC':'DESC';
            this.view.route.setParams(params);
            this.view.reload();

            // var params = this.$crud.cloneObj(this.view.routeConf.params);
            // params.order_field = this.orderField;
            // //params.order_direction = (this.view.data.metadata.order.field == this.orderField)?(this.view.data.metadata.order.direction.toLowerCase() == 'asc'?'DESC':'ASC'):'Asc';
            // params.order_direction = (!this.orderDirection || this.orderDirection.toLowerCase() == 'desc')?'ASC':'DESC';
            // this.view.routeConf.params = params;
        }
    },
    'action-delete-selected' : {
        type : 'collection',
        title : 'app.cancella-selezionati',
        css: 'btn btn-outline-danger btn-sm',
        icon : 'fa fa-trash',
        text : '',
        setRouteValues : function(route) {
            var that = this;
            route.setValues({
                modelName: that.view.cModel,
            });
            return route;
        },
        execute : function () {
            var that = this;
            var checked = that.view.selectedRows();
            var num = checked.length;
            if (num === 0)
                return ;
            that.$crud.confirmDialog(that.$crud.translate('app.conferma-multidelete',false,[num]), {
                ok : function () {
                    var r = that.$crud.createRoute('multi-delete');
                    that.setRouteValues(r);
                    r.setParams({'ids': checked});


                    // var r = Route.factory('multi_delete');
                    // r.values = {
                    //     modelName: that.modelName
                    // };
                    that.$crud.waitStart();
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
};

crud.conf = {
    view : {
        primaryKey : 'id',
        routeName : 'view',
        fieldsConfig : {},
        //actions : ['action-back'],
        actions : [],
        customActions: {},
        renderTemplate : 'c-tpl-record2',
    },
    edit : {
        primaryKey : 'id',
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
        primaryKey : 'id',
        routeName : 'list',
        customActions: {},
        fieldsConfig : {},
        orderFields: {},
        renderTemplate : 'c-tpl-list',
        actions : ['action-insert','action-delete-selected','action-view','action-edit','action-delete']
    },
    listEdit : {
        routeName : 'list',
        primaryKey : 'id',
        customActions: {},
        fieldsConfig : {},
        orderFields: {},
        renderTemplate : 'c-tpl-list',
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
        actions : ['action-search'],
        fieldsConfig : {},
        customActions: {},
        renderTemplate : 'c-tpl-record',
    },
    insert : {
        primaryKey : 'id',
        routeName : 'insert',
        renderTemplate : 'c-tpl-record',
        actions : ['action-save','action-back'],
        fieldsConfig : {
            id : 'r-hidden'
        },
        actions : ['action-save','action-back']
    },
    // uploadFile : {
    //     routeName : null,
    //     fields : ['nome','descrizione','modelName'],
    //     fieldsConfig : {
    //         modelName : {
    //             type : 'r-hidden'
    //         },
    //         descrizione : {
    //             type : 'r-textarea'
    //         }
    //     }
    // }
};

crud.routes =  {
    list : {
        method      : 'get',
        url         : '/foorm/{modelName}',
        resultType  : 'list',
        protocol    : 'list',
        commonParams  : {},  //parametri statici da aggiungere sempre alla chiamata
        values : {}, // vettore associativo dei parametri per la costruzione dell'url
        params :{},
    },
    uploadfile : {
        method      : 'post',
        //url         : '/api/json/{modelName}/uploadfile',
        url         : '/uploadfile',
        resultType  : 'record',
        protocol    : 'record',
        commonParams  : {},  //parametri statici da aggiungere sempre alla chiamata
        values : {}, // vettore associativo dei parametri per la costruzione dell'url
        params :{},
    },
    upload : {
        method      : 'post',
        url         : '/upload',
        resultType  : 'record',
        protocol    : 'record',
        commonParams  : {},  //parametri statici da aggiungere sempre alla chiamata
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
        commonParams : {_method:'PUT'}
    },
    create : {
        method      : "post",
        url         :'/foorm/{modelName}',
        resultType  : 'record',
        protocol    : 'record',
        type : 'create',
        commonParams : {_method:'POST'}
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
        resultType  : 'record',
        protocol    : 'record',
        type : 'read',
    },
    delete : {
        method      : "post",
        url         :'/foorm/{modelName}/{pk}',
        resultType  : 'record',
        protocol    : 'record',
        type : 'delete',
        commonParams : {_method:'DELETE'}
    },
    'multi-delete' : {
        method      : "post",
        url         :'/foorm/{modelName}/multi-delete',
        resultType  : 'record',
        protocol    : 'record',
        type : 'delete'
    },
    autocomplete : {
        method      : "get",
        url         : '/api/json/{modelName}/autocomplete',
        resultType  : 'list',
        protocol    : 'list'

    },
    set : {
        method      : "post",
        url         : '/api/json/set/{modelName}/{field}/{value}',
        resultType  : 'record',
        protocol    : 'record'
    }
};

crud.cRefs = {};

crud.components = {
    renders : {

    },
    views : {

    },
    libs :  {

    }
};

crud.interfaces = {

};

