let crudConfActions =  {
    'action-reset' : {
        confParent : 'crud.conf.action-base',
        type : 'collection',
        title : 'app.reset',
        css: 'btn btn-primary btn-sm btn-group mr-1',
        text : 'app.reset',
        execute : function () {
            if (this.view) {
                console.log('target ref',this.view.targetRef);
                this.view.reset();
                return ;
            }
        }
    },
    'action-search' : {
        confParent : 'crud.conf.action-base',
        type : 'collection',
        title : 'app.cerca',
        css: 'btn btn-primary btn-sm btn-group mr-1',
        icon : 'fa fa-search',
        text : 'app.cerca',
        execute : function () {
            console.log('action-search',this,'view',this.view.targetRef);
            if (this.view && this.view.targetRef) {
                console.log('target ref',this.view.targetRef);
                var targetView = this.$crud.cRefs[this.view.targetRef];
                var formData = this.view.getViewData();
                formData['page'] = 1;
                targetView.route.setParams(formData);
                targetView.reload();
                return ;
            }
        }
    },
    'action-save' : {
        confParent : 'crud.conf.action-base',
        type : 'collection',
        title : 'app.salva',
        css: 'btn btn-primary btn-sm mr-1',
        icon : 'fa fa-save',
        text : 'app.salva',
        json : null,
        setRouteValues : function(route) {
            var that = this;
            var pk = that.view.cPk || that.view.pk || 0;
            if (pk) {
                route.setValues({
                    modelName: that.view.modelName,
                    pk : pk
                });
            } else {
                route.setValues({
                    modelName: that.view.modelName,
                });
            }
            route.setParams(that.view.getViewData());
            return route;
        },
        execute : function (callback) {
            var that = this;
            console.log('action save',this);
            var rName = 'create';
            var pk = that.view.cPk || that.view.pk || 0;
            if (pk)
                rName = 'update';
            var r = that._getRoute(rName);
            that.setRouteValues(r);
            Server.route(r, function (json) {
                if (json.error) {
                    that.errorDialog(json.msg)
                    return ;
                }
                that.json = json;
                var msg = json.msg?json.msg:that.translate('app.salvataggio-ok');
                that.alertSuccess(msg,that.alertTime);
                callback();
            })
        }
    },
    'action-edit' : {
        confParent : 'crud.conf.action-base',
        type : 'record',
        title : 'app.modifica',
        css: 'btn btn-outline-secondary btn-sm',
        text : '',
        icon : 'fa fa-edit',
        execute : function () {
            var url = "/edit/" + this.view.modelName + "/" + this.modelData[this.view.primaryKey];
            document.location.href=url
        }
    },
    'action-view' : {
        confParent : 'crud.conf.action-base',
        type : 'record',
        title : 'app.vista',
        css: 'btn btn-outline-secondary btn-sm ',
        icon : 'fa fa-eye',
        text : '',
        execute : function () {
            var url = "/view/" + this.view.modelName + "/" + this.modelData.id;
            document.location.href=url;
        }
    },
    'action-delete' : {
        confParent : 'crud.conf.action-base',
        type : 'record',
        title : 'app.cancella',
        css: 'btn btn-outline-danger btn-sm ',
        icon : 'fa fa-times',
        text : '',
        setRouteValues : function(route) {
            var that = this;
            route.setValues({
                modelName: that.view.modelName,
                pk : that.modelData[that.view.primaryKey]
            });
            return route;
        },
        execute : function () {
            var that = this;
            that.confirmDialog(that.$crud.lang['app.conferma-cancellazione'] ,{
                ok : function () {
                    var r = that.createRoute('delete');
                    that.setRouteValues(r);
                    Server.route(r,function (json) {
                        if (json.error) {
                            that.errorDialog(json.msg);
                            return ;
                        }
                        var msg = json.msg?json.msg:that.translate('app.cancellazione-successo');
                        that.alertSuccess(msg);
                        that.view.reload();
                    });
                }
            });
        }
    },
    'action-save-row' : {
        confParent : 'crud.conf.action-base',
        type: 'record',
        title: 'app.salva',
        css: 'btn btn-outline-success btn-sm ',
        text: '',
        icon: 'fa fa-save',
        visible: false,
        setRouteValues : function(route) {
            var that = this;
            route.setValues({
                modelName: that.view.modelName,
                pk : that.modelData[that.view.primaryKey]
            });
            return route;
        },
        execute: function () {
            var that = this;
            var values = {};
            for (var k in that.view.widgetsEdit[that.index]) {
                //console.log('edit r',that.view.widgetsEdit[that.index][k])
                var sref = that.view.widgetsEdit[that.index][k].cRef; //  're-' + that.index + '-' +  k;
                if (that.$crud.cRefs[sref])
                    values[k] = that.$crud.cRefs[sref].getValue();
            }
            var id = that.view.value[that.index][that.view.primaryKey];
            var r = that.createRoute('update');
            that.setRouteValues(r);
            r.setParams(values);
            Server.route(r, function (json) {
                if (json.error) {
                    that.errorDialog(json.msg);
                    return;
                }
                var msg = json.msg?json.msg:that.translate('app.salvataggio-ok');
                that.alertSuccess(msg,that.alertTime);
                that.view.reload();
            })
            console.log('values', values);
        }
    },
    'action-edit-mode':  {
        confParent : 'crud.conf.action-base',
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
        confParent : 'crud.conf.action-base',
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
    },
    'action-insert' : {
        confParent : 'crud.conf.action-base',
        type : 'collection',
        visible : true,
        enabled : true,
        title : 'app.nuovo',
        css: 'btn btn-outline-primary btn-sm btn-group mr-1',
        icon : 'fa fa-plus',
        text : 'app.nuovo',
        execute  :function () {
            var url = "/insert/" + this.view.modelName + "/new";
            document.location.href=url;
        }
    },
    'action-back' : {
        confParent : 'crud.conf.action-base',
        type : 'collection',
        title : 'app.indietro',
        css: 'btn btn-secondary btn-sm mr-1',
        icon : 'fa fa-backward',
        text : 'app.indietro',
        execute : function () {
            window.history.back();
        }
    },
    'action-order' : {
        confParent : 'crud.conf.action-base',
        type : 'collection',
        title : 'app.order',
        css: 'btn btn-default btn-sm mr-1',
        iconSortAsc : 'fa fa-sort-asc',
        iconSortDesc : 'fa fa-sort-desc',
        iconSort : 'fa fa-sort',
        icon : null,
        text : '',
        execute : function () {
            console.log('order execute',this);
            var that = this;
            if (that.view.route) {
                var params = that.view.route.getParams();
                params.order_field = that.orderField;
                params.order_direction = (!that.orderDirection || that.orderDirection.toLowerCase() == 'desc')?'ASC':'DESC';
                that.view.route.setParams(params);
                that.view.reload();
            } else {
                var order_direction = (!that.orderDirection || that.orderDirection.toLowerCase() == 'desc')?'ASC':'DESC';
                that.view.staticOrder(that.orderField,order_direction);
            }

        }
    },
    'action-delete-selected' : {
        confParent : 'crud.conf.action-base',
        type : 'collection',
        title : 'app.cancella-selezionati',
        css: 'btn btn-outline-danger btn-sm mr-1',
        icon : 'fa fa-trash',
        text : '',
        needSelection : true,
        setRouteValues : function(route) {
            var that = this;
            route.setValues({
                modelName: that.view.modelName,
            });
            return route;
        },
        execute : function () {
            var that = this;
            var checked = that.view.selectedRows();
            var num = checked.length;
            if (num === 0)
                return ;
            that.confirmDialog(that.translate('app.conferma-multidelete',false,[num]), {
                ok : function () {
                    var r = that.createRoute('multi-delete');
                    that.setRouteValues(r);
                    r.setParams({'ids': checked});
                    that.waitStart();
                    Server.route(r,function (json) {
                        that.waitEnd();
                        if (json.error) {
                            that.errorDialog(json.msg);
                            return ;
                        }
                        that.view.reload();
                        //that.callback(json);
                    })
                }
            });
            console.log('selected',that.view.selectedRows())
        }
    }
}
