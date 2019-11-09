/*
 *Simple JavaScript Inheritance
 * By John Resig http://ejohn.org/
 * MIT Licensed.
 */
// Inspired by base2 and Prototype
// provina
(function() {
    var initializing = false, fnTest = /xyz/.test(function() {
        xyz;
    }) ? /\b_super\b/ : /.*/;

    // The base Class implementation (does nothing)
    this.Class = function() {
    };

    // Create a new Class that inherits from this class
    Class.extend = function(prop) {
        var _super = this.prototype;

        // Instantiate a base class (but only create the instance,
        // don't run the init constructor)
        initializing = true;
        var prototype = new this();
        initializing = false;

        // Copy the properties over onto the new prototype
        for ( var name in prop) {
            // Check if we're overwriting an existing function
            prototype[name] = typeof prop[name] == "function"
                    && typeof _super[name] == "function"
                    && fnTest.test(prop[name]) ? (function(name, fn) {
                return function() {
                    var tmp = this._super;

                    // Add a new ._super() method that is the same method
                    // but on the super-class
                    this._super = _super[name];

                    // The method only need to be bound temporarily, so we
                    // remove it when we're done executing
                    var ret = fn.apply(this, arguments);
                    this._super = tmp;

                    return ret;
                };
            })(name, prop[name]) : prop[name];
        }

        // The dummy class constructor
        function Class() {
            // All construction is actually done in the init method
            if (!initializing && this.init)
                this.init.apply(this, arguments);
        }

        // Populate our constructed prototype object
        Class.prototype = prototype;

        // Enforce the constructor to be what we expect
        Class.prototype.constructor = Class;

        // And make this class extendable
        Class.extend = arguments.callee;

        return Class;
    };
})();

Vue.prototype.$LANG = {
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
Crud = {
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
                var url = this.$Crud.application.useRouter?'#':'';
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
                var url = this.$Crud.application.useRouter?'#':'';
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
                that.crudApp.confirmDialog(that.$LANG.app['conferma-delete'] ,{
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
                var url = this.$Crud.application.useRouter?'#':'';
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
                if (this.modelData.id) {
                    var r = Route.factory('update',{
                        values :  {
                            modelName : this.modelName,
                            pk : this.modelData.id
                        }
                    })
                } else {
                    var r = Route.factory('save',{
                        values :  {
                            modelName : this.modelName,
                        }
                    })
                }

                //r.params = this.$Crud.getFormData(jQuery(this.rootElement).find('form'));
                r.params = Utility.getFormData(this.view.jQe('form'));
                Server.route(r, function (json) {
                    if (json.error) {
                        that.crudApp.errorDialog(json.msg)
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
                    var form = jQuery(this.view.$el).find('form');
                    var formData = Utility.getFormData(form);
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
                params.order_direction = (this.view.data.metadata.order_field == this.orderField)?(this.view.data.metadata.order_direction.toLowerCase() == 'asc'?'DESC':'ASC'):'Asc';
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
                app.crudApp.confirmDialog(app.crudApp.translate('app.conferma-multidelete',false,[num]), {
                    ok : function () {
                        var r = Route.factory('multi_delete');
                        r.values = {
                            modelName: that.view.modelName
                        };
                        that.crudApp.waitStart();
                        r.params = {'ids': checked};
                        //console.log('MULTIDELETE',checked);
                        Server.route(r,function (json) {
                            that.crudApp.waitEnd();
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
            renderTemplate : 'c-tpl-record',
        },
        edit : {
            routeName : 'edit',
            customActions : {},
            fieldsConfig : {
                id : {type:'r-hidden'}
            },
            actions : [],
            fields : [],
            renderTemplate : 'c-tpl-record',
        },
        list : {
            routeName : 'list',
            customActions: {},
            fieldsConfig : {},
            orderFields: {},
            renderTemplate : 'c-tpl-list',
        },
        search : {
            actions : ['action-search'],
            fieldsConfig : {},
            customActions: {},
            renderTemplate : 'c-tpl-record2',
        },
        insert : {
            routeName : 'insert',
            renderTemplate : 'c-tpl-record',
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
            url         : '/api/json/{modelName}',
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
        }
    },
    components : {
        renders : {

        },
        views : {

        },
        libs :  {
            'r-hasmany-through2' : {
                js : '/vue-app/js/r-hasmany-through2.js',
                tpl : '/vue-app/templates/r-hasmany-through2-template.html'
            },
            'dashboard-csv' : {
                js : '/vue-app/js/dashboard-csv.js',
                tpl : '/vue-app/templates/dashboard-csv-template.html'
            }
        }
    }
}


var Action = Class.extend({
    className : 'Action',
    htmlEvent : 'click',      // evento che fa scattare l'azione
    type : null,
    controlType : 'button',
    text : '',
    icon : '',
    cssClass : '',
    target : '',
    href : '',
    params : [],
    enabled : true,
    visible : true,
    title : '',
    app : null,
    width : 0,                  // opzionale indica la width di cui l'azione ha bisogno
    extraAttributes : {},
    _htmlProperties : ['text','icon','cssClass','target','href','params','title','enabled','visible','onclick','onchange'],

    execute : function () {
        throw "func must be overloaded!";
    },

    _prepareContainer : function(callback) {
        var self = this;
        if (Utility.hasAttr(self.jQe(),'crud-inline')) {
            self.jQe().attr('crud-render_action','');
            return callback();
        } else {
            self._super(callback);
        }
    },

    render : function (callback) {
        var self = this;

        //var tpl = self.getTemplate();
        var data = self._getData();
        jQuery.renderTemplate(self.jQe(),self.jQe(),data);
        if (!data['enabled'])
            self.jQe('[crud-render_action]').prop('disabled','disabled');
        //jQuery.renderTemplate(tpl,self.container,data);
        callback();
    },

    finalize : function (callback) {
        var self = this;
        if (self.jQe('[crud-render_action]').length == 0)
            self.app.log.warn(self.actionName,'crud-render_action not found!',self.jQe().html());
        self.jQe('[crud-render_action]').attr('crud-render_action',self.actionName);
        for (var k in self.extraAttributes) {
            self.jQe('[crud-render_action]').attr(k,self.extraAttributes[k]);
        }
        if (self.controlType == 'button') {
            //console.log('azione obj',self.actionName,self.jQe('[crud-render_action]').length);
            self.jQe('[crud-render_action]')[self.htmlEvent](function (event) {
                event.preventDefault();
                self.execute();
            });

            // self.jQe('[crud-action]').attr('onclick', "EventManager.trigger('" + self.uid + "')");
            // EventManager.on(self.uid,function (evt) {
            //     self.execute();
            // });
        }

        callback();
    },

    _getData : function () {
        var self = this;
        var data = {};
        for (var i in self._htmlProperties) {
            var key = self._htmlProperties[i];
            if (_.isFunction(self[key])) {
                data[key] = self[key]();
            } else {
                var v = self[key];
                if (['text','title'].indexOf(key) >= 0)
                    v = self.app.translate(v);
                data[key] = v;
            }
        }
        if (self.controlType == 'link') {
            data[self.htmlEvent] = null;
            data['href'] = self.execute();
        }
        return data;
    },
    callback : function (json) {

    },
    template : function() {
        return this[this.controlType+"Template"]();
    },
    buttonTemplate : function () {
        return '';
    },
    linkTemplate : function () {
        return '';
    }
});


Action.clone = function (a) {
    var ca = new Action();
    for (var k in a) {
        ca[k] = a[k];
    }
    return ca;
};


var CollectionAction = Action.extend({
    className : 'CollectionAction',
    type : 'collection',
    buttonTemplate : function () {
        return '<button crud-render_action type="button" crud-visible=visible crud-attrs="{\'title\':title,\'crud-params\':params,\'target\':target}" crud-class="cssClass" crud-addclass="enabled?\'\':\'disabled\'">\
                    <i crud-remove="!icon" crud-class="icon"></i>\
                    <span crud-field="text"></span>\
                </button>';
    },
    linkTemplate : function () {
        return '<a crud-render_action crud-href="href" crud-visible="visible" crud-class="cssClass"  crud-attrs="{\'title\':title,\'crud-params\':params,\'target\':target}" target="_blank" crud-addclass="enabled?\'\':\'disabled\'">\
                    <i crud-remove="!icon" crud-class="icon"></i>\
                    <span crud-field="text"></span>\
                </a>';
    }
})

var RecordAction = Action.extend({
    className : 'RecordAction',
    type : 'record',
    cssClass : 'btn btn-default btn-xs btn-group',
    buttonTemplate : function () {
        return '<button crud-render_action type="button" crud-visible=visible crud-class="cssClass"  crud-attrs="{\'title\':title,\'crud-params\':params,\'target\':target}" crud-addclass="enabled?\'\':\'disabled\'">\
                    <i crud-remove="!icon" crud-class="icon"></i>\
                    <span crud-field="text"></span>\
                </button>';
    },
    linkTemplate : function () {
        return '<a crud-render_action crud-href="href" crud-visible="visible" crud-class="cssClass"  crud-attrs="{\'title\':title,\'crud-params\':params,\'target\':target}" target="_blank" crud-addclass="enabled?\'\':\'disabled\'">\
                    <i crud-remove="!icon" crud-class="icon"></i>\
                    <span crud-field="text"></span>\
                </a>';
    }
})


// Action.factory = function(name,attrs) {
//     var className = "Action" + Utility.pascalCase(name);
//     if (!window[className])
//         throw "Impossibile trovare la definizione dell'action  " + className;
//     var _a = attrs?attrs:{};
//     _a.className = className;
//     return new window[className](_a);
// }

var ActionEdit = RecordAction.extend({
    className : 'ActionEdit',
    title : 'Modifica',
    icon : 'fa fa-edit',
    multiText : 'Modifica',
    routeName : 'page_edit',

    execute : function () {
        var self = this;
        var rName = self.routeName;
        if (self.view.constraintKey && self.view.constraintValue) {
            rName += "_constraint";
        }
        var r = Route.factory(rName,{});
        r.setValues(self.view);
        r.values.pk = self.modelData.id;

        document.location.href= r.getUrl();
        return ;
    }
})


var ActionInsert = CollectionAction.extend({
    className : 'ActionInsert',
    title : 'Inserisci',
    icon : 'fa fa-plus text-success',
    cssClass : 'btn btn-default btn-xs text-success',
    text : 'Nuovo',
    multiText : 'Nuovo',
    routeName : 'page_insert',

    execute : function () {
        var self = this;
        if (self.routeName === null)
            return ;
        var rName = self.routeName;
        if (self.view.constraintKey && self.view.constraintValue) {
            rName += "_constraint";
        }
        var r = Route.factory(rName,{});
        r.setValues(self.view);
        document.location.href= r.getUrl();
        return ;
    }
})

var ActionSave = RecordAction.extend({
    className : 'ActionSave',
    title : 'Salva',
    text : 'Salva',
    multiText : 'Salva',
    execute : function () {
        var self = this;
        if (self.routeName === null)
            return ;
        if (!self.view.valid()) {
            self.app.log.debug('actionSave form Data view is not valid!');
            return;
        }
        var r = null;
        var rname = null;
        if (self.view.pk) {
            rname = 'update';
        } else {
            rname = 'save';
        }

        if (self.view.constraintKey && self.view.constraintValue)
            rname += '_constraint';

        r = Route.factory(rname);
        r.setValues(self.view);
        r.params = self.view.getFormData();

        self.app.waitStart();

        Server.route(r,function (json) {
            self.app.waitEnd();
            self.callback(json);
        });
    },
    callback : function (json) {
        if (json.error) {
            app.errorDialog(json.msg);
            return;
        }
        app.renderView(this.view.keyId);
    }
})

var ActionBack = RecordAction.extend({
    className : 'ActionBack',
    title : 'Indietro',
    text : 'Torna indietro',
    execute : function () {
        window.history.back();
    }
})

var ActionView = RecordAction.extend({
    className : 'ActionView',
    title :'Visualizza',
    icon:  'fa fa-list-alt',
    multiText : 'Visualizza',
    routeName : 'page_view',

    execute : function () {
        var self = this;
        var rName = self.routeName;
        if (self.view.constraintKey && self.view.constraintValue) {
            rName += "_constraint";
        }
        var r = Route.factory(rName,{});
        r.setValues(self.view);

        // var rkeys = r.getKeys();
        // r.values = {};
        // for (var i in rkeys)
        //     r.values[rkeys[i]] = self.view[rkeys[i]];
        r.values.pk = self.modelData.id;

        document.location.href= r.getUrl();
        return ;

        // var constraintSuffix = '';
        // if (self.view.constraint) {
        //     constraintSuffix = '/' + self.view.constraintKey + '/' + self.view.constraintValue;
        // }
        // document.location.href=Server.getUrl('/view/' + self.view.modelName + '/' + self.modelData.id + constraintSuffix);
    }
})

var ActionDelete = RecordAction.extend({
    className : 'ActionDelete',
    title : 'Cancella',
    icon:  'fa fa-remove text-danger',
    multiText : 'Cancella',
    execute : function () {
        var self = this;
        var view = self.view;

        self.app.confirmDialog(app.translate('app.conferma-delete') ,{
            ok : function () {
                var r = Route.factory('delete');
                r.setValues(self.view);
                r.values = {
                    modelName: self.view.modelName,
                    pk : self.modelData.id
                };
                self.app.waitStart();
                Server.route(r,function (json) {
                    self.app.waitEnd();
                    self.callback(json);
                });
            }
        });
    },
    callback : function (json) {
        if (json.error) {
            app.errorDialog(json.msg);
            return;
        }
        app.renderView(this.view.keyId);
    }
})


var ActionMultiDelete = CollectionAction.extend({
    className : 'ActionMultiDelete',
    title : 'Cancella selezionati',
    icon:  'fa fa-trash text-danger',
    cssClass : 'btn btn-default btn-xs text-danger',
    text : 'Selezionati',
    needSelection : true,
    multiText : 'Cancella Selezionati',
    execute : function () {
        var self = this;
        var checked = self.view.getChecked();
        var num = checked.length;
        if (num === 0)
            return ;
        app.confirmDialog(app.translate('app.conferma-multidelete',false,[num]), {
            ok : function () {
                var r = Route.factory('multi_delete');
                r.values = {
                    modelName: self.view.modelName
                };
                self.app.waitStart();
                r.params = {'ids': checked};
                //console.log('MULTIDELETE',checked);
                Server.route(r,function (json) {
                    self.app.waitEnd();
                    self.callback(json);
                })
            }
        });
    },
    callback : function (json) {
        if (json.error) {
            app.errorDialog(json.msg);
            return;
        }
        app.renderView(this.view.keyId);
    }
});

var ActionSearch = CollectionAction.extend({
    className : 'ActionSearch',
    title : 'app.search',
    icon:  'fa fa-search',
    cssClass : 'btn btn-xs btn-default text-info',
    text : 'app.search',
    execute : function () {
        var self = this;
        var view = self.view;
        var params = view.getParams();
        params.page = 1;
        window.location.href = window.location.origin + Server.getUrl(window.location.pathname + '?' + jQuery.param(params));
        return ;
    }
});


var ActionReset =  CollectionAction.extend({
    className : 'ActionReset',
    title : 'Annulla filtri ricerca',
    cssClass : 'btn btn-xs btn-default',
    text : 'Annulla filtri',
    execute : function () {
        //console.log(this);
        this.view.resetForm();
        this.callback();
        //var params = {viewKey:viewKey}
        //EventManager.trigger(this.Action,params);
    }
});


var ActionNextPage = CollectionAction.extend({
    className : 'ActionNextPage',
    icon : 'fa fa-angle-right',
    cssClass : 'btn btn-default btn-xs',
    execute : function () {
        var _o = {
            current_page : 1,
            last_page : 1,
        }
        _o = jQuery.extend(_o,this.view.data.pagination);
        var r =  this.view.getRoute();// Route.factory(viewList.config.routeName);
        if (_o.current_page < _o.last_page) {
            r.params['page'] = _o.current_page +1;
            this.view.setRoute(r);
            app.renderView(this.view.keyId);
            this.callback();
        }
    }
});

var ActionPrevPage = CollectionAction.extend({
    className : 'ActionPrevPage',
    icon : 'fa fa-angle-left',
    cssClass : 'btn btn-default btn-xs',
    execute : function () {
        var _o = {
            current_page : 1,
        }
        _o = jQuery.extend(_o,this.view.data.pagination);
        var r =  this.view.getRoute();// Route.factory(viewList.config.routeName);
        if (_o.current_page > 1) {
            r.params['page'] = _o.current_page - 1;
            this.view.setRoute(r);
            app.renderView(this.view.keyId);
            this.callback();
        }

    }
});


var ActionFirstPage = CollectionAction.extend({
    className : 'ActionFirstPage',
    icon : 'fa fa fa-angle-double-left',
    cssClass : 'btn btn-default btn-xs',
    execute : function () {
        var _o = {
            current_page : 1,
        }
        _o = jQuery.extend(_o,this.view.data.pagination);
        var r =  this.view.getRoute();// Route.factory(viewList.config.routeName);
        if (_o.current_page > 1) {
            r.params['page'] = 1;
            this.view.setRoute(r);
            app.renderView(this.view.keyId);
            this.callback();
        }

    }
});

var ActionLastPage = CollectionAction.extend({
    className : 'ActionLastPage',
    icon : 'fa fa fa-angle-double-right',
    cssClass : 'btn btn-default btn-xs',
    execute : function () {
        var _o = {
            current_page : 1,
            last_page : 1,
        }
        _o = jQuery.extend(_o,this.view.data.pagination);
        var r =  this.view.getRoute();// Route.factory(viewList.config.routeName);
        if (_o.current_page < _o.last_page) {
            r.params['page'] = _o.last_page;
            this.view.setRoute(r);
            app.renderView(this.view.keyId);
            this.callback();
        }

    }
});

var ActionPerPage = CollectionAction.extend({
    className : 'ActionPerPage',
    icon : 'fa fa fa-angle-double-right',
    htmlEvent : 'change',
    cssClass : 'btn btn-default btn-xs',
    init : function (params) {
        this._super(params);
        this._htmlProperties.push('pagination');
    },

    execute : function () {
        var self = this;
        var r =  this.view.getRoute();// Route.factory(viewList.config.routeName);
        //console.log('html',self.container,jQuery(self.container).html());
        r.params['page'] = 1;
        r.params['paginateNumber'] = jQuery(self.container).find('select').val();
        this.view.setRoute(r);
        app.renderView(this.view.keyId);
        this.callback();

    },
    _getData : function () {
        var data = this._super();
        var _o = {
            pagination_steps : [],
        }
        _o = jQuery.extend(_o,data.pagination);

        _o.pagination_order = _.sortBy(_.keys(_o.pagination_steps), function (num) {
            return parseInt(num);
        });
        data.pagination = _o;

        // data.pagination.pagination_order = _.sortBy(_.keys(data.pagination.pagination_steps), function (num) {
        //     return parseInt(num);
        // });
        return data;
    },
    template : function () {
        var special_attrs = '"{\'title\':title,\'crud-params\':params}"';
        return '<select crud-render_action crud-field="pagination.per_page" crud-source="pagination.pagination_steps"\
                        crud-sourceorder="pagination.pagination_order"\
                        crud-attrs='+ special_attrs + ' class="pagination-input">\
                </select>';
    },
});

ActionOrder = CollectionAction.extend({
    //controlType : 'link',
    orderDirection : null,
    orderField : null,
    href : '#',
    orderClass : {
        'asc': ['sorting_asc','fa','fa-angle-down'],
        'desc' : ['sorting_desc','fa','fa-angle-up']
    },
    render : function(callback) {
        var self = this;
        if (self.orderDirection) {
            self.icon = self.orderClass[self.orderDirection.toLowerCase()]?self.orderClass[self.orderDirection.toLowerCase()].join(' '):'';

        }
        self._super(function() {
            callback();
        });
    },
    execute : function () {
        var self = this;
        console.log('ActionOrder execute');


        if (self.orderDirection) {
            self.orderDirection = self.orderDirection=='ASC'?'DESC':'ASC';
        } else {
            self.orderDirection = 'ASC';
        }
        var r =  self.view.getRoute();
        // in caso di route null eseguo il sort solo dei dati locali
        if (r == null) {
            var sign = 1;
            if (self.orderDirection == 'DESC')
                sign = -1;
            self.data.value = self.data.value.sort(function (a,b) {
                return a[order_field] < b[order_field]? sign:(a[order_field]>b[order_field]? -sign:0);
                //return a[order_field] < b[order_field];
            })
            self.view.metadata.order_field = self.orderField;
            self.view.metadata.order_direction = self.orderDirection;
        } else {
            r.params['order_field'] = self.orderField;
            r.params['order_direction'] = self.orderDirection;
        }
        self.app.renderView(self.view.keyId);
    },
    template : function () {

        return '<a crud-render_action crud-href="href" crud-visible="visible" crud-class="cssClass"  crud-attrs="{\'title\':title,\'crud-params\':params,\'target\':target}" target="_blank" crud-addclass="enabled?\'\':\'disabled\'">\
                <i crud-remove="!icon" crud-class="icon"></i>\
                <span crud-field="text"></span>\
            </a>';
    }
});
/**
 * definizione protocollo tra json che arriva dal server e le strutture
 * dati interne alla libreria javascript
 * In caso di server con formato di dati diverso aggiungere un protocollo e definire
 * le trasformazioni in caso di record o di lista
 *
 */

var Protocol = Class.extend({
    value : null,
    metadata : {},
    resultParams : {},
    validationRules : {},
    jsonToData : function (json) {
        throw "override jsonToData function ";
    },
    getData : function () {
        var prop = Object.getOwnPropertyNames(this);
        var data = {}
        for (var i in prop) {
            //console.log(k,k,prop[k]);
            data[prop[i]] = this[prop[i]];
        }
        return data;
    }
})

Protocol.factory = function (type) {
    var className = "Protocol" + Utility.pascalCase(type);
    try {
        return new window[className]();
    } catch (e) {
        log.error('failed to create ' + className,e);
    }

}


var ProtocolRecord = Protocol.extend({
    jsonToData : function (json) {
        this.value = json.result;
        this.metadata = json.metadata?json.metadata:{};
        this.resultParams = json.resultParams?json.resultParams:{};
        this.validationRules = json.validationRules?json.validationRules:{};
        this.backParams = json.backParams;
        for (var field in json.metadata) {
            if (json.metadata[field].options)
                this.metadata[field].domainValues = json.metadata[field].options;
            if (json.metadata[field].options_order)
                this.metadata[field].domainValuesOrder = json.metadata[field].options_order;
            //this.metadata[field].domainValues = json.metadata[field].options?json.metadata[field].options:null;
            //this.metadata[field].domainValuesOrder = json.metadata[field].options_order?json.metadata[field].options_order:null;
        }

    }
});

var ProtocolList = Protocol.extend({
    pagination :{},
    has_errors : false,
    backParams : {},
    summary : {},
    jsonToData : function (json) {
        this.value = json.result.data;
        this.metadata = json.metadata;
        this.pagination = {
            current_page : json.result.current_page,
            from : json.result.from,
            last_page : json.result.last_page,
            pagination_steps : json.result.pagination_steps,
            per_page : json.result.per_page,
            to : json.result.to,
            total : json.result.total,

        } //_.omit(json.result, ['data','has_errors']);
        this.resultParams = json.resultParams;
        this.summary = json.summary;
        this.validationRules = json.validationRules;
        this.backParams = json.backParams;
        this.has_errors = (json.result.has_errors == true);
        this.list_header = json.data_header;

        for (var field in json.metadata) {
            if (json.metadata[field].options)
                this.metadata[field].domainValues = json.metadata[field].options;
            if (json.metadata[field].options_order)
                this.metadata[field].domainValuesOrder = json.metadata[field].options_order;

            //json.metadata[field].domainValues = json.metadata[field].options?json.metadata[field].options:null;
            //json.metadata[field].domainValuesOrder = json.metadata[field].options_order?json.metadata[field].options_order:null;

        }
    }
});



var ProtocolDummyRecord = Protocol.extend({
    jsonToData : function () {
        this.value = {};
        this.metadata = {};
        this.resultParams = {};
        this.validationRules = {};
        this.backParams = {};
    }
});

var ProtocolDummyList = Protocol.extend({
    pagination :{},
    has_errors : false,
    backParams : {},
    summary : {},
    translations : {},
    jsonToData : function () {
        this.value = [];
        this.metadata = {};
        this.pagination = {};
        this.resultParams = {};
        this.summary = {};
        this.validationRules = {};
        this.backParams = {};
        this.has_errors = false;
        this.list_header = "";
    }
});
/**
 * VERSIONE LIBRERIA 4
 * Classe per la gestione delle route verso il server.
 */

var Route = Class.extend({
    className         : "Route",
    method       : null,
    url          : null,
    resultType   : null,
    protocol     : null,
    extraParams  : {},  //parametri statici da aggiungere sempre alla chiamata
    values : {}, // vettore associativo dei parametri per la costruzione dell'url
    params :{},

    init : function (attrs) {
        var self = this;
        self.params = {};
        //self.extraParams = {};
        self.values = {};
        if (attrs) {
            for (var k in attrs) {
                self[k] = attrs[k];
            }
        }
    },

    /**
     * setta i valori dei values necessari per le keys che formano l'url della route.
     * @param values
     */
    setValues : function(values) {
        var self = this;
        var opt = values?values:{};
        var keys = self.getKeys();
        for (var i in keys) {
            var key = keys[i];
            self.values[key] = values[key];
        }
    },

    /**
     * ritorna url esatto valorizzando le variabili parametriche tra {} presenti nella
     * stringa url.
     * @param values: valori attuali per valorizzare le variabili se non viene passato prende
     * i valori presenti in this.values
     * @returns string url con variabili valorizzate
     */
    getUrl : function (values) {
        var self = this;
        var finalUrl = self.url;
        var v = values?values:self.values;

        for (var key in v) {
            var find = '\{'+key+'\}';
            var re = new RegExp(find, 'g');
            finalUrl = finalUrl.replace(re,v[key]);
        }
        return finalUrl;
    },
    /**
     * ritorna tutti parametri passati in get o post in base al tipo di metodo della route
     * mergiando i parametri presenti in params e extra_params
     * @returns {*}
     */
    getParams : function() {
        var self = this;
        return jQuery.extend(self.params,self.extraParams);
    },
    /**
     * ritorna le key dei parametri che devono essere valorizzati per ritornare l'url esatto
     * per esempio se url e' fatto come /pippo/{param1}/{param2} ritorna ['param1','param2']
     * return array
     */
    getKeys : function () {
        var self = this;
        var r = /\{\w+\}+/g;
        var keys = [];
        var tmp = false;
        do {
            tmp = r.exec(self.url);
            if (tmp) {
                var removeBrackets = tmp[0].substr(1);
                removeBrackets = removeBrackets.substr(0,removeBrackets.length-1);
                keys.push(removeBrackets);
            }
        } while(tmp)
        return keys;
    }
});

Route.factory = function (type,attrs) {
    var className = "Route" + Utility.pascalCase(type);
    if (!window[className])
        throw "Impossibile trovare la definizione della route " + className;
    var _a = attrs?attrs:{};
    _a.className = className;
    return new window[className](_a);
}

var RouteList = Route.extend({
    method      : 'get',
    url         : '/api/json/{modelName}',
    resultType  : 'list',
    protocol    : 'list'
});

var RouteListConstraint = RouteList.extend({
    url         : '/api/json/{modelName}/{constraintKey}/{constraintValue}',
});

var RouteEdit = Route.extend({
    method      : "get",
    url         :'/api/json/{modelName}/{pk}/edit',
    resultType  : 'record',
    protocol    : 'record'
});

var RouteEditConstraint = RouteEdit.extend({
    url         :'/api/json/{modelName}/{pk}/edit/{constraintKey}/{constraintValue}',
});

var RouteSearch = Route.extend({
    method      : "get",
    url         :'/api/json/{modelName}/search',
    resultType  : 'record',
    protocol    : 'record'
});

var RouteSearchConstraint = RouteSearch.extend({
    url         :'/api/json/{modelName}/search/{constraintKey}/{constraintValue}',
});


var RouteInsert = Route.extend({
    method      : "get",
    url         :'/api/json/{modelName}/create',
    resultType  : 'record',
    protocol    : 'record'
});

var RouteInsertConstraint = RouteInsert.extend({
    url         :'/api/json/{modelName}/create/{constraintKey}/{constraintValue}',
});


var RouteInsertHasmany = Route.extend({
    method      : "get",
    url         :'/api/json/{modelName}/create_has_many',
    resultType  : 'record',
    protocol    : 'record'
});

var RouteInsertHasmanyConstraint = RouteInsertHasmany.extend({
    url         :'/api/json/{modelName}/create_has_many/{constraintKey}/{constraintValue}',
});

var RouteSave = Route.extend({
    method      : "post",
    url         : '/api/json/{modelName}/create',
    resultType  : 'record',
    protocol    : 'record',
    extraParams : {_method:'POST'}
});

var RouteSaveConstraint = RouteSave.extend({
    url         : '/api/json/{modelName}/create/{constraintKey}/{constraintValue}',
});

var RouteUpdate = Route.extend({
    method      : "post",
    url         : '/api/json/{modelName}/{pk}',
    resultType  : 'record',
    protocol    : 'record',
    extraParams : {_method:'PUT'}
});

var RouteUpdateConstraint = RouteUpdate.extend({
    url         : '/api/json/{modelName}/{pk}/{constraintKey}/{constraintValue}',
});

var RouteCreate = Route.extend({
    method      : "post",
    url         : '/api/json/{modelName}/create',
    resultType  : 'record',
    protocol    : 'record'
});


var RouteCreateConstraint = RouteCreate.extend({
    url         : '/api/json/{modelName}/create/{constraintKey}/{constraintValue}',
});

var RouteView = Route.extend({
    method      : "get",
    url         : '/api/json/{modelName}/{pk}',
    resultType  : 'record',
    protocol    : 'record'
});

var RouteViewConstraint = RouteView.extend({
    url         : '/api/json/{modelName}/{pk}/{constraintKey}/{constraintValue}',
});

RouteDelete = Route.extend({
    method      : "post",
    url         : '/api/json/{modelName}/{pk}',
    resultType  : 'record',
    protocol    : 'record',
    extraParams : {'_method': 'DELETE'}
})

RouteMultiDelete = Route.extend({
    method      : "post",
    url         :  '/api/json/{modelName}/deleteall',
    resultType  : 'record',
    protocol    : 'record'
});

RouteSet = Route.extend({
    method      : "post",
    url         : '/api/json/set/{modelName}/{field}/{value}',
    resultType  : 'record',
    protocol    : 'record'
});

RouteAutocomplete = RouteList.extend({
    method      : "get",
    url         : '/api/json/autocomplete/{modelName}',
    resultType  : 'record',
    protocol    : 'record'

})

RouteCalendar = RouteList.extend({});


RouteCaptcha = Route.extend({
    method      : 'get',
    url         : '/captchajs_img',
    resultType  : 'record',
    protocol    : 'record'
})

RouteUploadfile = Route.extend({
    method      : 'post',
    url         : '/uploadfile',
    resultType  : 'record',
    protocol    : 'record'
});

RouteUpload = Route.extend({
    method      : 'post',
    url         : '/upload',
    resultType  : 'record',
    protocol    : 'record'
});

RouteViewimage = Route.extend({
    method      : 'get',
    url         : '/viewimage/{filename}/upload/{template}',
    resultType  : 'record',
    protocol    : 'record'
});

RouteDownload = Route.extend({
    method      : 'get',
    url         : '/download/{filename}',
    resultType  : 'record',
    protocol    : 'record'
});

RoutePageEdit = Route.extend({
    method      : 'get',
    url         : '/edit/{modelName}/{pk}'
});

RoutePageEditConstraint = Route.extend({
    method      : 'get',
    url         : '/edit/{modelName}/{pk}/{constraintKey}/{constraintValue}'
});

RoutePageInsert = Route.extend({
    method      : 'get',
    url         : '/insert/{modelName}'
});

RoutePageInsertConstraint = Route.extend({
    method      : 'get',
    url         : '/insert/{modelName}/{constraintKey}/{constraintValue}'
});

RoutePageView = Route.extend({
    method      : 'get',
    url         : '/view/{modelName}/{pk}'
});

RoutePageViewConstraint = Route.extend({
    method      : 'get',
    url         : '/view/{modelName}/{pk}/{constraintKey}/{constraintValue}'
});

RoutePageList = Route.extend({
    method      : 'get',
    url         : '/list/{modelName}/{pk}'
});

RoutePageListConstraint = Route.extend({
    method      : 'get',
    url         : '/list/{modelName}/{pk}/{constraintKey}/{constraintValue}'
});
/**
 * VERSIONE LIBRERIA 2
 */

jQuery.queryStringToArray = function ( query ) {
      var Params = new Object ();
      if ( ! query ) return Params; // return empty object
      var Pairs = query.split(/[;&]/);
      for ( var i = 0; i < Pairs.length; i++ ) {
        var KeyVal = Pairs[i].split('=');
        if ( ! KeyVal || KeyVal.length != 2 ) continue;
        var key = unescape( KeyVal[0] );
        var val = unescape( KeyVal[1] );
        val = val.replace(/\+/g, ' ');
        Params[key] = val;
      }
      return Params;
}

jQuery.fn.serializeAssoc = function() {
  var ss = this.serializeArray();

  var data = {};

  for (var i in ss) {
    var key = ss[i].name;
    var value = ss[i].value;
    if (key.indexOf('[') >= 0) {
      if (!data[key])
        data[key] = [];
      data[key].push(value);
    } else {
      data[key] = value;
    }
  }
  return data;


  var data = {};
  jQuery.each( this.serializeArray(), function( key, obj ) {
    var a = obj.name.match(/(.*?)\[(.*?)\]/);
    if(a !== null)
    {
      var subName = a[1];
      var subKey = a[2];
      if( !data[subName] ) data[subName] = {};
        if( data[subName][subKey] ) {
          if( jQuery.isArray( data[subName][subKey] ) ) {
            data[subName][subKey].push( obj.value );
          } else {
            data[subName][subKey]= [];
            data[subName][subKey].push( obj.value );
            //data[subName][subKey][key] = obj.value;
          };
        } else {
          data[subName][subKey] = obj.value;
        };
      } else {
        if( data[obj.name] ) {
          if( jQuery.isArray( data[obj.name] ) ) {
            data[obj.name].push( obj.value );
          } else {
            data[obj.name] = [];
            data[obj.name].push( obj.value );
          };
        } else {
          data[obj.name] = obj.value;
        };
      };
    });
    return data;
};


var Utility = {
    _scripts : [],

    hasAttr : function(jQe,attributeName) {
        var attr = jQe.attr(attributeName);
        if (typeof attr !== typeof undefined && attr !== false)
            return true;
        return false;
    },

    getFormData : function (form) {
        var self = this;
        //var form = self.jQe('form[name="data_form"]');
        if (form && form.length === 0) {
            self.app.log.error('form not found!');
            return {};
        }
        if (typeof tinyMCE !== 'undefined') {
            tinyMCE.triggerSave();
        }
        var formData =  form.serializeAssoc();
        var postData = {}
        // trasformo tutti gli [d] in [] questa modifica e' fatta per gestire i radio button negli hasmany
        // altrimenti venivano raggruppati come un unica entita'
        for( var k in formData) {
            if (formData[k].constructor !== Array) {
                postData[k] = formData[k];
                continue;
            }
            var pattern = /(.+)(\[\d+\])(.*)$/g;
            var match = pattern.exec(k);
            if (match && match.length == 4) {
                var newkey = match[1] + '[]' + match[3];
                if (!postData[newkey])
                    postData[newkey] = [];
                postData[newkey].push(formData[k]);
                delete formData[k];
            } else {
                postData[k] = formData[k];
            }
        }
        return postData;
    },

	initDate : function (key, year_start, year_end) {
		var options_init = '<option value="">--</option>';
		var options = "";

		var dateValue = jQuery('input[name="'+key+'"]').val();
		var yearValue = '';
		var monthValue = '';
		var dayValue = '';
		if (dateValue != '') {
			yearValue = dateValue.substring(0, 4);
			monthValue = dateValue.substring(5, 7);
			dayValue = dateValue.substring(8, 10);
		}

		var selected = '';

		var year = jQuery('[crud-year="'+key+'"]');
		var month = jQuery('[crud-month="'+key+'"]');
		var day = jQuery('[crud-day="'+key+'"]');

		for (var i = 1; i < 32; i++) {
			var j = Utility.padDate(i,2);
			if (dayValue == j) {
				selected = ' selected="selected" ';
			}
			options += '<option value="' + j + '"' + selected + '>' + j + '</option>';
			selected = '';
		}
		day.empty();
		//day.append(options_init + options);
		day.append(options);
		selected = '';
		options = "";
		var man_mesi = ["Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno", "Luglio", "Agosto", "Settembre", "Ottobre", "Novembre", "Dicembre"];
		for (i = 1; i < 13; i++) {
			j = Utility.padDate(i,2);
			if (monthValue == j) {
				selected = ' selected="selected" ';
			}
			options += '<option value="' + j + '"' + selected + '>' + man_mesi[i - 1] + '</option>';
			selected = '';
		}
		month.empty();
		//month.append(options_init + options);
		month.append(options);

		options = "";
		selected = '';
		var year_1 = year_start;
		var year_2 = year_end;
		if (!year_1 || isNaN(year_1))
			year_1 = 1901;
		if (isNaN(year_2))
			year_2 = (new Date).getFullYear();

		for (i = year_1; i <= year_2; i++) {
			if (yearValue == i)
				selected = ' selected="selected" ';
			options += '<option value="' + i + '"' + selected + '>' + i + '</option>';
			selected = '';
		}
		year.empty();
		//year.append(options_init + options);
		year.append(options);
		/*
		jQuery("#"+id+"_a,#"+id+"_m,#"+id+"_g").change(
			function() {
				man_date_change_new(id);
			}
		);
		*/
		return;
	},
	changeDate : function (key) {
		//var options = '<option value="">--</option>';
		var options = '';

		var year = jQuery('[crud-year="'+key+'"]');
		var month = jQuery('[crud-month="'+key+'"]');
		var day = jQuery('[crud-day="'+key+'"]');
		var selected = "";

		var maxDay = 28;
		if (month.val() == '04' || month.val() == '06' || month.val() == '09' || month.val() == '11') {
			maxDay = 30;
		} else if (month.val() != '02') {
			maxDay = 31
		} else if (year.val() % 4 == 0 || year.val() % 100 == 0)
			maxDay = 29;


		for (var i = 1; i <= maxDay; i++) {
			var j = Utility.padDate(i,2);
			if (day.val() == j)
				selected = ' selected="selected" ';
			options += '<option value="' + j + '"' + selected + '>' + j + '</option>';
			selected = '';
		}

		var ex_day = day.val();
		day.empty();
		day.append(options);
		if (ex_day <= maxDay)
			day.val(ex_day);
		
		var finalDate = jQuery('input[name="'+key+'"]');
		var d = finalDate.val().split(" "); 
		var t = ""; // tempo in caso di campo datetime
		if (d.length > 1)
			t = d[1];
		var date = '';
		if (year.val() == '' || month.val() == '' || day.val() == '') {
			date = ''//finalDate.val('');
		} else {
			var date =  year.val() + '-' + month.val() + '-' + day.val();//finalDate.val(year.val() + '-' + month.val() + '-' + day.val());
		}
		if (t != "")
			date += ' ' + t;
		finalDate.val(date);
		return;
	},
	padDate : function (str, max, char) {
		str = str.toString();
		if (!char)
			char = "0";
			//console.log(str + ' ' + max + ' ' + char + ' ' + str.length);
		return str.length < max ? Utility.padDate(char + '' + str, max, char) : str;
	},
	// cambia lo stato di una checkbox
	toggleCheck : function (checkbox) {
		checkbox.prop('checked',!checkbox.prop('checked'));
	},
    isInt : function (value) {
      return !isNaN(value) && (function(x) { return (x | 0) === x; })(parseFloat(value))
    },
    dbDate : function (date) {
    	var ds = date.getFullYear();
    	var m = date.getMonth()+1;
	    ds += "-"+ (m>9?m:"0"+m);
	    ds += "-"+ (date.getDate()>9?date.getDate():"0"+date.getDate());
	    ds += " "+ (date.getHours()>9?date.getHours():"0"+date.getHours()); 
	    ds += ":"+ (date.getMinutes()>9?date.getMinutes():"0"+date.getMinutes()); 
	    ds += ":"+ (date.getSeconds()>9?date.getSeconds():"0"+date.getSeconds()); 
	    return ds;
    },
    jsDate : function (dbDate) {
    	var dateParts = dbDate.split("-");
    	console.log(dateParts[0], dateParts[1] - 1, dateParts[2].substr(0,2));
		var jd = new Date(dateParts[0], dateParts[1] - 1, dateParts[2].substr(0,2));
		return jd;
    },

    formatDate : function(dbDate,format) {
        var d = new Date(Date.parse(dbDate));
        if (isNaN(d.getTime()))
            return "";
        return d.toLocaleDateString(jQuery.locale,jQuery.cupparisDateFormat(format));
    },

    // ritorna il valore in get di un parametro della finestra principale
	getURLParameter : function(name) {
		return Utility.getURLParameterFromString(location.search,name);
		//return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search)||[,""])[1].replace(/\+/g, '%20'))||null
	},
	
	// ritorna il valore in get di un parametro di un URL
	getURLParameterFromString : function(location,name) {
		return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location)||[,""])[1].replace(/\+/g, '%20'))||null;
	},
	getURLParameterRegexp : function(reg) {
		return decodeURIComponent((new RegExp('[?|&]' + reg + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search)||[,""])[1].replace(/\+/g, '%20'))||null;
	},
	getAllUrlParams : function () {
		var params = {};
		var tmp = location.search.split("?");
		if (tmp.length != 2)
			return params
		var sparams = tmp[1].split("&");
		for(var i in sparams) {
			var tmp = sparams[i].split("=");
			if (tmp.length != 2)
				continue;
			var name = tmp[0];
			var value = tmp[1];
			if (name.indexOf('[]') >= 0) {
				if (!params[name])
					params[name] = [];
				params[name].push(decodeURIComponent(value) )
			} else {
				params[name] = decodeURIComponent(value);
			}

		}
		return params;

	},
    /**
     * crea un copia di un oggetto complesso utilizzando stringify
     * di JSON
     */

	jsonCloneObj : function (obj) {
		return JSON.parse(JSON.stringify(obj));
	},

    cloneObj : function (obj) {
        return jQuery.extend(true,{},obj);
    },

    confMerge : function(obj1,obj2) {
	    var specialsKey = ['fields','fieldsConfig','customActions'];
	    var c1 = this.cloneObj(obj1);
	    var c2 = this.cloneObj(obj2);

	    c1.fields = c1.fields?c1.fields:[];
        c1.fieldsConfig = c1.fieldsConfig?c1.fieldsConfig:{};
        c1.customActions = c1.customActions?c1.customActions:{};
        c1.actions = c1.actions?c1.actions:[];

	    if (c2.fields)
	        c1.fields = c2.fields;

	    if (c2.fieldsConfig) {
            for (var k in c2.fieldsConfig) {
                c1.fieldsConfig[k] = c2.fieldsConfig[k];
            }
        }
        if (c2.customActions) {
            c1.customActions = c1.customActions || {};
            for (var k in c2.customActions) {
                c1.customActions[k] = c2.customActions[k];
            }
        }

	    for (var k in c2) {
	        if (specialsKey.indexOf(k) >= 0)
	            continue;
	        //console.log('sovrascrivo',k);
	        c1[k] = c2[k];
        }
        return c1;
    },
    merge : function(obj1, obj2) {
	    return jQuery.extend(true,{},obj1,obj2);
    },
	nl2br : function (str) {
		return str.replace(/(?:\r\n|\r|\n)/g, '<br />');
	},

    loadScript : function (scriptName, callback) {
        var self = this;
        if (!self._scripts[scriptName]) {
            self._scripts[scriptName] = true;
            var body 		= document.getElementsByTagName('body')[0];
            var script 		= document.createElement('script');
            script.type 	= 'text/javascript';
            script.src 		= scriptName;

            // then bind the event to the callback function
            // there are several events for cross browser compatibility
            // script.onreadystatechange = callback;
            script.onload = callback;

            // fire the loading
            body.appendChild(script);

        } else if (callback) {
            callback();
        }
    },

    // funzioni trasformazioni standard case

    NON_WORD_REGEXP : /[^\u0041-\u005A\u0061-\u007A\u00AA\u00B5\u00BA\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u0527\u0531-\u0556\u0559\u0561-\u0587\u05D0-\u05EA\u05F0-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u08A0\u08A2-\u08AC\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0977\u0979-\u097F\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C33\u0C35-\u0C39\u0C3D\u0C58\u0C59\u0C60\u0C61\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D60\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F4\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1877\u1880-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191C\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19C1-\u19C7\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5\u1CF6\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2183\u2184\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005\u3006\u3031-\u3035\u303B\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FCC\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA697\uA6A0-\uA6E5\uA717-\uA71F\uA722-\uA788\uA78B-\uA78E\uA790-\uA793\uA7A0-\uA7AA\uA7F8-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA80-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uABC0-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC\u0030-\u0039\u00B2\u00B3\u00B9\u00BC-\u00BE\u0660-\u0669\u06F0-\u06F9\u07C0-\u07C9\u0966-\u096F\u09E6-\u09EF\u09F4-\u09F9\u0A66-\u0A6F\u0AE6-\u0AEF\u0B66-\u0B6F\u0B72-\u0B77\u0BE6-\u0BF2\u0C66-\u0C6F\u0C78-\u0C7E\u0CE6-\u0CEF\u0D66-\u0D75\u0E50-\u0E59\u0ED0-\u0ED9\u0F20-\u0F33\u1040-\u1049\u1090-\u1099\u1369-\u137C\u16EE-\u16F0\u17E0-\u17E9\u17F0-\u17F9\u1810-\u1819\u1946-\u194F\u19D0-\u19DA\u1A80-\u1A89\u1A90-\u1A99\u1B50-\u1B59\u1BB0-\u1BB9\u1C40-\u1C49\u1C50-\u1C59\u2070\u2074-\u2079\u2080-\u2089\u2150-\u2182\u2185-\u2189\u2460-\u249B\u24EA-\u24FF\u2776-\u2793\u2CFD\u3007\u3021-\u3029\u3038-\u303A\u3192-\u3195\u3220-\u3229\u3248-\u324F\u3251-\u325F\u3280-\u3289\u32B1-\u32BF\uA620-\uA629\uA6E6-\uA6EF\uA830-\uA835\uA8D0-\uA8D9\uA900-\uA909\uA9D0-\uA9D9\uAA50-\uAA59\uABF0-\uABF9\uFF10-\uFF19]+/g,
    CAMEL_CASE_REGEXP : /([\u0061-\u007A\u00B5\u00DF-\u00F6\u00F8-\u00FF\u0101\u0103\u0105\u0107\u0109\u010B\u010D\u010F\u0111\u0113\u0115\u0117\u0119\u011B\u011D\u011F\u0121\u0123\u0125\u0127\u0129\u012B\u012D\u012F\u0131\u0133\u0135\u0137\u0138\u013A\u013C\u013E\u0140\u0142\u0144\u0146\u0148\u0149\u014B\u014D\u014F\u0151\u0153\u0155\u0157\u0159\u015B\u015D\u015F\u0161\u0163\u0165\u0167\u0169\u016B\u016D\u016F\u0171\u0173\u0175\u0177\u017A\u017C\u017E-\u0180\u0183\u0185\u0188\u018C\u018D\u0192\u0195\u0199-\u019B\u019E\u01A1\u01A3\u01A5\u01A8\u01AA\u01AB\u01AD\u01B0\u01B4\u01B6\u01B9\u01BA\u01BD-\u01BF\u01C6\u01C9\u01CC\u01CE\u01D0\u01D2\u01D4\u01D6\u01D8\u01DA\u01DC\u01DD\u01DF\u01E1\u01E3\u01E5\u01E7\u01E9\u01EB\u01ED\u01EF\u01F0\u01F3\u01F5\u01F9\u01FB\u01FD\u01FF\u0201\u0203\u0205\u0207\u0209\u020B\u020D\u020F\u0211\u0213\u0215\u0217\u0219\u021B\u021D\u021F\u0221\u0223\u0225\u0227\u0229\u022B\u022D\u022F\u0231\u0233-\u0239\u023C\u023F\u0240\u0242\u0247\u0249\u024B\u024D\u024F-\u0293\u0295-\u02AF\u0371\u0373\u0377\u037B-\u037D\u0390\u03AC-\u03CE\u03D0\u03D1\u03D5-\u03D7\u03D9\u03DB\u03DD\u03DF\u03E1\u03E3\u03E5\u03E7\u03E9\u03EB\u03ED\u03EF-\u03F3\u03F5\u03F8\u03FB\u03FC\u0430-\u045F\u0461\u0463\u0465\u0467\u0469\u046B\u046D\u046F\u0471\u0473\u0475\u0477\u0479\u047B\u047D\u047F\u0481\u048B\u048D\u048F\u0491\u0493\u0495\u0497\u0499\u049B\u049D\u049F\u04A1\u04A3\u04A5\u04A7\u04A9\u04AB\u04AD\u04AF\u04B1\u04B3\u04B5\u04B7\u04B9\u04BB\u04BD\u04BF\u04C2\u04C4\u04C6\u04C8\u04CA\u04CC\u04CE\u04CF\u04D1\u04D3\u04D5\u04D7\u04D9\u04DB\u04DD\u04DF\u04E1\u04E3\u04E5\u04E7\u04E9\u04EB\u04ED\u04EF\u04F1\u04F3\u04F5\u04F7\u04F9\u04FB\u04FD\u04FF\u0501\u0503\u0505\u0507\u0509\u050B\u050D\u050F\u0511\u0513\u0515\u0517\u0519\u051B\u051D\u051F\u0521\u0523\u0525\u0527\u0561-\u0587\u1D00-\u1D2B\u1D6B-\u1D77\u1D79-\u1D9A\u1E01\u1E03\u1E05\u1E07\u1E09\u1E0B\u1E0D\u1E0F\u1E11\u1E13\u1E15\u1E17\u1E19\u1E1B\u1E1D\u1E1F\u1E21\u1E23\u1E25\u1E27\u1E29\u1E2B\u1E2D\u1E2F\u1E31\u1E33\u1E35\u1E37\u1E39\u1E3B\u1E3D\u1E3F\u1E41\u1E43\u1E45\u1E47\u1E49\u1E4B\u1E4D\u1E4F\u1E51\u1E53\u1E55\u1E57\u1E59\u1E5B\u1E5D\u1E5F\u1E61\u1E63\u1E65\u1E67\u1E69\u1E6B\u1E6D\u1E6F\u1E71\u1E73\u1E75\u1E77\u1E79\u1E7B\u1E7D\u1E7F\u1E81\u1E83\u1E85\u1E87\u1E89\u1E8B\u1E8D\u1E8F\u1E91\u1E93\u1E95-\u1E9D\u1E9F\u1EA1\u1EA3\u1EA5\u1EA7\u1EA9\u1EAB\u1EAD\u1EAF\u1EB1\u1EB3\u1EB5\u1EB7\u1EB9\u1EBB\u1EBD\u1EBF\u1EC1\u1EC3\u1EC5\u1EC7\u1EC9\u1ECB\u1ECD\u1ECF\u1ED1\u1ED3\u1ED5\u1ED7\u1ED9\u1EDB\u1EDD\u1EDF\u1EE1\u1EE3\u1EE5\u1EE7\u1EE9\u1EEB\u1EED\u1EEF\u1EF1\u1EF3\u1EF5\u1EF7\u1EF9\u1EFB\u1EFD\u1EFF-\u1F07\u1F10-\u1F15\u1F20-\u1F27\u1F30-\u1F37\u1F40-\u1F45\u1F50-\u1F57\u1F60-\u1F67\u1F70-\u1F7D\u1F80-\u1F87\u1F90-\u1F97\u1FA0-\u1FA7\u1FB0-\u1FB4\u1FB6\u1FB7\u1FBE\u1FC2-\u1FC4\u1FC6\u1FC7\u1FD0-\u1FD3\u1FD6\u1FD7\u1FE0-\u1FE7\u1FF2-\u1FF4\u1FF6\u1FF7\u210A\u210E\u210F\u2113\u212F\u2134\u2139\u213C\u213D\u2146-\u2149\u214E\u2184\u2C30-\u2C5E\u2C61\u2C65\u2C66\u2C68\u2C6A\u2C6C\u2C71\u2C73\u2C74\u2C76-\u2C7B\u2C81\u2C83\u2C85\u2C87\u2C89\u2C8B\u2C8D\u2C8F\u2C91\u2C93\u2C95\u2C97\u2C99\u2C9B\u2C9D\u2C9F\u2CA1\u2CA3\u2CA5\u2CA7\u2CA9\u2CAB\u2CAD\u2CAF\u2CB1\u2CB3\u2CB5\u2CB7\u2CB9\u2CBB\u2CBD\u2CBF\u2CC1\u2CC3\u2CC5\u2CC7\u2CC9\u2CCB\u2CCD\u2CCF\u2CD1\u2CD3\u2CD5\u2CD7\u2CD9\u2CDB\u2CDD\u2CDF\u2CE1\u2CE3\u2CE4\u2CEC\u2CEE\u2CF3\u2D00-\u2D25\u2D27\u2D2D\uA641\uA643\uA645\uA647\uA649\uA64B\uA64D\uA64F\uA651\uA653\uA655\uA657\uA659\uA65B\uA65D\uA65F\uA661\uA663\uA665\uA667\uA669\uA66B\uA66D\uA681\uA683\uA685\uA687\uA689\uA68B\uA68D\uA68F\uA691\uA693\uA695\uA697\uA723\uA725\uA727\uA729\uA72B\uA72D\uA72F-\uA731\uA733\uA735\uA737\uA739\uA73B\uA73D\uA73F\uA741\uA743\uA745\uA747\uA749\uA74B\uA74D\uA74F\uA751\uA753\uA755\uA757\uA759\uA75B\uA75D\uA75F\uA761\uA763\uA765\uA767\uA769\uA76B\uA76D\uA76F\uA771-\uA778\uA77A\uA77C\uA77F\uA781\uA783\uA785\uA787\uA78C\uA78E\uA791\uA793\uA7A1\uA7A3\uA7A5\uA7A7\uA7A9\uA7FA\uFB00-\uFB06\uFB13-\uFB17\uFF41-\uFF5A])([\u0041-\u005A\u00C0-\u00D6\u00D8-\u00DE\u0100\u0102\u0104\u0106\u0108\u010A\u010C\u010E\u0110\u0112\u0114\u0116\u0118\u011A\u011C\u011E\u0120\u0122\u0124\u0126\u0128\u012A\u012C\u012E\u0130\u0132\u0134\u0136\u0139\u013B\u013D\u013F\u0141\u0143\u0145\u0147\u014A\u014C\u014E\u0150\u0152\u0154\u0156\u0158\u015A\u015C\u015E\u0160\u0162\u0164\u0166\u0168\u016A\u016C\u016E\u0170\u0172\u0174\u0176\u0178\u0179\u017B\u017D\u0181\u0182\u0184\u0186\u0187\u0189-\u018B\u018E-\u0191\u0193\u0194\u0196-\u0198\u019C\u019D\u019F\u01A0\u01A2\u01A4\u01A6\u01A7\u01A9\u01AC\u01AE\u01AF\u01B1-\u01B3\u01B5\u01B7\u01B8\u01BC\u01C4\u01C7\u01CA\u01CD\u01CF\u01D1\u01D3\u01D5\u01D7\u01D9\u01DB\u01DE\u01E0\u01E2\u01E4\u01E6\u01E8\u01EA\u01EC\u01EE\u01F1\u01F4\u01F6-\u01F8\u01FA\u01FC\u01FE\u0200\u0202\u0204\u0206\u0208\u020A\u020C\u020E\u0210\u0212\u0214\u0216\u0218\u021A\u021C\u021E\u0220\u0222\u0224\u0226\u0228\u022A\u022C\u022E\u0230\u0232\u023A\u023B\u023D\u023E\u0241\u0243-\u0246\u0248\u024A\u024C\u024E\u0370\u0372\u0376\u0386\u0388-\u038A\u038C\u038E\u038F\u0391-\u03A1\u03A3-\u03AB\u03CF\u03D2-\u03D4\u03D8\u03DA\u03DC\u03DE\u03E0\u03E2\u03E4\u03E6\u03E8\u03EA\u03EC\u03EE\u03F4\u03F7\u03F9\u03FA\u03FD-\u042F\u0460\u0462\u0464\u0466\u0468\u046A\u046C\u046E\u0470\u0472\u0474\u0476\u0478\u047A\u047C\u047E\u0480\u048A\u048C\u048E\u0490\u0492\u0494\u0496\u0498\u049A\u049C\u049E\u04A0\u04A2\u04A4\u04A6\u04A8\u04AA\u04AC\u04AE\u04B0\u04B2\u04B4\u04B6\u04B8\u04BA\u04BC\u04BE\u04C0\u04C1\u04C3\u04C5\u04C7\u04C9\u04CB\u04CD\u04D0\u04D2\u04D4\u04D6\u04D8\u04DA\u04DC\u04DE\u04E0\u04E2\u04E4\u04E6\u04E8\u04EA\u04EC\u04EE\u04F0\u04F2\u04F4\u04F6\u04F8\u04FA\u04FC\u04FE\u0500\u0502\u0504\u0506\u0508\u050A\u050C\u050E\u0510\u0512\u0514\u0516\u0518\u051A\u051C\u051E\u0520\u0522\u0524\u0526\u0531-\u0556\u10A0-\u10C5\u10C7\u10CD\u1E00\u1E02\u1E04\u1E06\u1E08\u1E0A\u1E0C\u1E0E\u1E10\u1E12\u1E14\u1E16\u1E18\u1E1A\u1E1C\u1E1E\u1E20\u1E22\u1E24\u1E26\u1E28\u1E2A\u1E2C\u1E2E\u1E30\u1E32\u1E34\u1E36\u1E38\u1E3A\u1E3C\u1E3E\u1E40\u1E42\u1E44\u1E46\u1E48\u1E4A\u1E4C\u1E4E\u1E50\u1E52\u1E54\u1E56\u1E58\u1E5A\u1E5C\u1E5E\u1E60\u1E62\u1E64\u1E66\u1E68\u1E6A\u1E6C\u1E6E\u1E70\u1E72\u1E74\u1E76\u1E78\u1E7A\u1E7C\u1E7E\u1E80\u1E82\u1E84\u1E86\u1E88\u1E8A\u1E8C\u1E8E\u1E90\u1E92\u1E94\u1E9E\u1EA0\u1EA2\u1EA4\u1EA6\u1EA8\u1EAA\u1EAC\u1EAE\u1EB0\u1EB2\u1EB4\u1EB6\u1EB8\u1EBA\u1EBC\u1EBE\u1EC0\u1EC2\u1EC4\u1EC6\u1EC8\u1ECA\u1ECC\u1ECE\u1ED0\u1ED2\u1ED4\u1ED6\u1ED8\u1EDA\u1EDC\u1EDE\u1EE0\u1EE2\u1EE4\u1EE6\u1EE8\u1EEA\u1EEC\u1EEE\u1EF0\u1EF2\u1EF4\u1EF6\u1EF8\u1EFA\u1EFC\u1EFE\u1F08-\u1F0F\u1F18-\u1F1D\u1F28-\u1F2F\u1F38-\u1F3F\u1F48-\u1F4D\u1F59\u1F5B\u1F5D\u1F5F\u1F68-\u1F6F\u1FB8-\u1FBB\u1FC8-\u1FCB\u1FD8-\u1FDB\u1FE8-\u1FEC\u1FF8-\u1FFB\u2102\u2107\u210B-\u210D\u2110-\u2112\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u2130-\u2133\u213E\u213F\u2145\u2183\u2C00-\u2C2E\u2C60\u2C62-\u2C64\u2C67\u2C69\u2C6B\u2C6D-\u2C70\u2C72\u2C75\u2C7E-\u2C80\u2C82\u2C84\u2C86\u2C88\u2C8A\u2C8C\u2C8E\u2C90\u2C92\u2C94\u2C96\u2C98\u2C9A\u2C9C\u2C9E\u2CA0\u2CA2\u2CA4\u2CA6\u2CA8\u2CAA\u2CAC\u2CAE\u2CB0\u2CB2\u2CB4\u2CB6\u2CB8\u2CBA\u2CBC\u2CBE\u2CC0\u2CC2\u2CC4\u2CC6\u2CC8\u2CCA\u2CCC\u2CCE\u2CD0\u2CD2\u2CD4\u2CD6\u2CD8\u2CDA\u2CDC\u2CDE\u2CE0\u2CE2\u2CEB\u2CED\u2CF2\uA640\uA642\uA644\uA646\uA648\uA64A\uA64C\uA64E\uA650\uA652\uA654\uA656\uA658\uA65A\uA65C\uA65E\uA660\uA662\uA664\uA666\uA668\uA66A\uA66C\uA680\uA682\uA684\uA686\uA688\uA68A\uA68C\uA68E\uA690\uA692\uA694\uA696\uA722\uA724\uA726\uA728\uA72A\uA72C\uA72E\uA732\uA734\uA736\uA738\uA73A\uA73C\uA73E\uA740\uA742\uA744\uA746\uA748\uA74A\uA74C\uA74E\uA750\uA752\uA754\uA756\uA758\uA75A\uA75C\uA75E\uA760\uA762\uA764\uA766\uA768\uA76A\uA76C\uA76E\uA779\uA77B\uA77D\uA77E\uA780\uA782\uA784\uA786\uA78B\uA78D\uA790\uA792\uA7A0\uA7A2\uA7A4\uA7A6\uA7A8\uA7AA\uFF21-\uFF3A\u0030-\u0039\u00B2\u00B3\u00B9\u00BC-\u00BE\u0660-\u0669\u06F0-\u06F9\u07C0-\u07C9\u0966-\u096F\u09E6-\u09EF\u09F4-\u09F9\u0A66-\u0A6F\u0AE6-\u0AEF\u0B66-\u0B6F\u0B72-\u0B77\u0BE6-\u0BF2\u0C66-\u0C6F\u0C78-\u0C7E\u0CE6-\u0CEF\u0D66-\u0D75\u0E50-\u0E59\u0ED0-\u0ED9\u0F20-\u0F33\u1040-\u1049\u1090-\u1099\u1369-\u137C\u16EE-\u16F0\u17E0-\u17E9\u17F0-\u17F9\u1810-\u1819\u1946-\u194F\u19D0-\u19DA\u1A80-\u1A89\u1A90-\u1A99\u1B50-\u1B59\u1BB0-\u1BB9\u1C40-\u1C49\u1C50-\u1C59\u2070\u2074-\u2079\u2080-\u2089\u2150-\u2182\u2185-\u2189\u2460-\u249B\u24EA-\u24FF\u2776-\u2793\u2CFD\u3007\u3021-\u3029\u3038-\u303A\u3192-\u3195\u3220-\u3229\u3248-\u324F\u3251-\u325F\u3280-\u3289\u32B1-\u32BF\uA620-\uA629\uA6E6-\uA6EF\uA830-\uA835\uA8D0-\uA8D9\uA900-\uA909\uA9D0-\uA9D9\uAA50-\uAA59\uABF0-\uABF9\uFF10-\uFF19])/g,
    TRAILING_DIGIT_REGEXP : /([\u0030-\u0039\u00B2\u00B3\u00B9\u00BC-\u00BE\u0660-\u0669\u06F0-\u06F9\u07C0-\u07C9\u0966-\u096F\u09E6-\u09EF\u09F4-\u09F9\u0A66-\u0A6F\u0AE6-\u0AEF\u0B66-\u0B6F\u0B72-\u0B77\u0BE6-\u0BF2\u0C66-\u0C6F\u0C78-\u0C7E\u0CE6-\u0CEF\u0D66-\u0D75\u0E50-\u0E59\u0ED0-\u0ED9\u0F20-\u0F33\u1040-\u1049\u1090-\u1099\u1369-\u137C\u16EE-\u16F0\u17E0-\u17E9\u17F0-\u17F9\u1810-\u1819\u1946-\u194F\u19D0-\u19DA\u1A80-\u1A89\u1A90-\u1A99\u1B50-\u1B59\u1BB0-\u1BB9\u1C40-\u1C49\u1C50-\u1C59\u2070\u2074-\u2079\u2080-\u2089\u2150-\u2182\u2185-\u2189\u2460-\u249B\u24EA-\u24FF\u2776-\u2793\u2CFD\u3007\u3021-\u3029\u3038-\u303A\u3192-\u3195\u3220-\u3229\u3248-\u324F\u3251-\u325F\u3280-\u3289\u32B1-\u32BF\uA620-\uA629\uA6E6-\uA6EF\uA830-\uA835\uA8D0-\uA8D9\uA900-\uA909\uA9D0-\uA9D9\uAA50-\uAA59\uABF0-\uABF9\uFF10-\uFF19])([^\u0030-\u0039\u00B2\u00B3\u00B9\u00BC-\u00BE\u0660-\u0669\u06F0-\u06F9\u07C0-\u07C9\u0966-\u096F\u09E6-\u09EF\u09F4-\u09F9\u0A66-\u0A6F\u0AE6-\u0AEF\u0B66-\u0B6F\u0B72-\u0B77\u0BE6-\u0BF2\u0C66-\u0C6F\u0C78-\u0C7E\u0CE6-\u0CEF\u0D66-\u0D75\u0E50-\u0E59\u0ED0-\u0ED9\u0F20-\u0F33\u1040-\u1049\u1090-\u1099\u1369-\u137C\u16EE-\u16F0\u17E0-\u17E9\u17F0-\u17F9\u1810-\u1819\u1946-\u194F\u19D0-\u19DA\u1A80-\u1A89\u1A90-\u1A99\u1B50-\u1B59\u1BB0-\u1BB9\u1C40-\u1C49\u1C50-\u1C59\u2070\u2074-\u2079\u2080-\u2089\u2150-\u2182\u2185-\u2189\u2460-\u249B\u24EA-\u24FF\u2776-\u2793\u2CFD\u3007\u3021-\u3029\u3038-\u303A\u3192-\u3195\u3220-\u3229\u3248-\u324F\u3251-\u325F\u3280-\u3289\u32B1-\u32BF\uA620-\uA629\uA6E6-\uA6EF\uA830-\uA835\uA8D0-\uA8D9\uA900-\uA909\uA9D0-\uA9D9\uAA50-\uAA59\uABF0-\uABF9\uFF10-\uFF19])/g,
    sentenceCase : function (str) {
        if (str == null) {
            return '';
        }

        return String(str)
            // Enables camel case support.
            .replace(Utility.CAMEL_CASE_REGEXP, '$1 $2')
            // Add a space after any digits.
            .replace(Utility.TRAILING_DIGIT_REGEXP, '$1 $2')
            // Remove all non-word characters and replace with a single space.
            .replace(Utility.NON_WORD_REGEXP, ' ')
            // Trim whitespace around the string.
            .replace(/^ | $/g, '')
            // Finally lower case the entire string.
            .toLowerCase();
    },
    camelCase : function (string) {
        return Utility.sentenceCase(string)
        // Replace periods between numeric entities with an underscore.
        .replace(/(\d) (?=\d)/g, '$1_')
        // Replace spaces between words with a string upper cased character.
        .replace(/ (\w)/g, function (_, $1) {
          return $1.toUpperCase();
        });
    },
    costantCase : function (string) {
      return Utility.snakeCase(string).toUpperCase();
    },
    dotCase : function (string) {
      return Utility.sentenceCase(string).replace(/ /g, '.');
    },
    isLowerCase : function (string) {
        return Utility.lowerCase(string) === string;
    },
    isUpperCase : function (string) {
        return Utility.upperCase(string) === string;
    },
    lowerCase : function (str) {
        var toLower = String.prototype.toLowerCase;
        return str == null ? '' : toLower.call(str);
    },
    paramCase : function (string) {
        return Utility.sentenceCase(string).replace(/ /g, '-');
    },
    pascalCase : function (string) {
        return Utility.upperCaseFirst(Utility.camelCase(string));
    },
    pathCase : function (string) {
      return Utility.sentenceCase(string).replace(/ /g, '/');
    },
    snakeCase : function (string) {
        return Utility.sentenceCase(string).replace(/ /g, '_');
    },
    swapCase : function (str) {
        if (str == null) {
            return '';
        }
        var result = '';
        for (var i = 0; i < str.length; i++) {
            var c = str[i];
            var u = c.toUpperCase();
            result += u === c ? c.toLowerCase() : u;
        }
        return result;
    },
    titleCase : function (string) {
        return Utility.sentenceCase(string).replace(/^\w| \w/g, Utility.upperCase);
    },
    upperCase : function (str) {
        var upperCase = String.prototype.toUpperCase;
        return str == null ? '' : upperCase.call(str);
    },
    upperCaseFirst : function (str) {
        if (str == null) {
            return '';
        }

        str = String(str);

        return str.charAt(0).toUpperCase() + str.substr(1);
    },
    getMimetypeIcon : function (filename) {
        var icons = {
            default   : 'fa fa-3x fa-file-o',
            xls       : 'fa fa-3x fa-file-excel-o',
            zip       : 'fa fa-3x fa-file-archive-o',
            mp3       : 'fa fa-3x fa-audio-o',
            jpg       : "fa fa-3x fa-image-o",
            //png       : "fa fa-3x fa-image-o",
            pdf       : "fa fa-3x fa-file-pdf-o"
        };
        if (!filename)
            return icons.default;
        var ext =  filename.split('.').pop();
        if (icons[ext])
            return icons[ext];
        else
            return icons.default;
    },
    test : function() {
        // sostituire bfyChangeCase con Utility

        log.info(Utility.camelCase('test') === 'test');
        log.info(Utility.camelCase('TEST') === 'test');

        log.info(Utility.camelCase('test string')=== 'testString');
        log.info(Utility.camelCase('Test String')==='testString');

        log.info(Utility.camelCase('dot.case')==='dotCase');
        log.info(Utility.camelCase('path/case')==='pathCase');
  
        log.info(Utility.camelCase('version 1.2.10')==='version1_2_10');
        log.info(Utility.camelCase('version 1.21.0')==='version1_21_0');

        log.info(Utility.camelCase('TestString')==='testString');

        log.info(Utility.constantCase('test')==='TEST');
        log.info(Utility.constantCase('TEST')==='TEST');

        log.info(Utility.constantCase('test string')==='TEST_STRING');
        log.info(Utility.constantCase('Test String')==='TEST_STRING');
      
        log.info(Utility.constantCase('dot.case')==='DOT_CASE');
        log.info(Utility.constantCase('path/case')==='PATH_CASE');
      
        log.info(Utility.constantCase('TestString')==='TEST_STRING');
        /* 
        it('should dot case a single word', function () {
    assert.equal(dotCase('test'), 'test');
    assert.equal(dotCase('TEST'), 'test');
  });

  it('should dot case regular sentence cased strings', function () {
    assert.equal(dotCase('test string'), 'test.string');
    assert.equal(dotCase('Test String'), 'test.string');
  });

  it('should dot case non-alphanumeric separators', function () {
    assert.equal(dotCase('dot.case'), 'dot.case');
    assert.equal(dotCase('path/case'), 'path.case');
  });

  it('should dot case dot cased strings', function () {
    assert.equal(dotCase('TestString'), 'test.string');
    assert.equal(dotCase('TestString1_2_3'), 'test.string.1.2.3');
  });
*/
    }
};
/**
 * Created by pier on 20/12/17.
 */

var Server = {};


/**
 * ritorna l'url reale nel dominio in cui si lavora
 * in caso di subdomain aggiunge il subdomain all'url passato
 * @param url, url a cui aggiungere il prefisso subdomain
 * @returns {*}
 *
 * **/
jQuery.getFailMessage = function (e) {

    try {
        if (jQuery.isProduction)
            return e.status + " " + e.statusText;
        var msg =  e.status + " " + e.statusText + "<br>";
        if ( e.responseJSON) {
            msg += e.responseJSON.error.message + "<br>";
            msg += "line :" + e.responseJSON.error.line + "<br>";
            msg += e.responseJSON.error.file ;
        }
        return msg;
    } catch(em) {
        return ""+em;
    }

};

Server.getUrl = function (url) {
    return Server.subdomain?Server.subdomain + url:url;
};


Server.post = function (url, params, callback) {
    var realUrl = Server.getUrl(url);
    jQuery.post(realUrl, params, function (json) {
        callback(json);
    }).fail(function (e) {
        callback({error: 1, msg: jQuery.getFailMessage(e)})
    })
};

Server.get = function (url, params, callback) {
    var realUrl = Server.getUrl(url);
    jQuery.get(realUrl, params, function (json) {
        callback(json);
    }).fail(function (e) {
        callback({error: 1, msg: jQuery.getFailMessage(e)})
    })
};

Server.route = function(route,callback) {
    var __cb = callback?callback:function (json) {log.debug(route.className,json)};
    var realUrl = Server.getUrl(route.getUrl());
    var params = route.getParams();
    Server[route.method](realUrl,params,function (json) {
        __cb(json);
    })
};

Server.subdomain = null;

/**
 * Created by pier on 28/03/17.
 */



function App() {
    //var _confs = null;
    var _locale = 'it';
    var _resources = {};        // vettore di risorse registrate al caricamento della pagina
    var _resources_loaded = {}; // vettore di risorse gia' caricate
    //var _supportedViewTypes = ['list', 'search', 'edit', 'view', 'calendar', 'csv','record','insert'];
    var _viewCounter = 0;       // counter per la generazione automatica id view
    var _views = {};            // vettore contenente le views generate
    var _viewsId = {};          // vettore di views che hanno un id html per poterle riferire
    var _dashCounter = 0;       // counter delle dashboards istanziate
    var _dashsId = {};          // vettore di dashboards che hanno un id html per poterle riferire
    var _dashs = {};            // vettore dashboards istanziate
    var _log = null;
    var _autoparse = false;

    // var _defaultConfs = {
    //         'list': ConfList,
    //         'edit': ConfEdit,
    //         'search': ConfSearch,
    //         'calendar': ConfCalendar,
    //         //'csv': CsvConfs
    // };

    // opzioni
    App.resources = [];     // vettore di risorse iniziali da caricare
    App.pluginsPath = '/crud/plugins/';
    App.log = null;
    App.show_log = false;
    App.mobile = false;


    App.getResources = function () {
        return _resources;
    }

    App.init = function(options,callback) {
        var self = this;

        var _o = options?options:{};

        for(var k in _o) {
            self[k] = _o[k];
        }

        _log = new Log(this.showLog,this.mobile);
        if (this.showLog)
            _log.enable();
        if (this.locale)
            _locale = this.locale;
        _autoparse = _o.autoparse;

        this.log = _log;
        // Component.prototype.app = this;
        // Route.prototype.app = this;
        // Render.prototype.app = this;
        // View.prototype.app = this;
        // Dashboard.prototype.app = this;
        // Action.prototype.app = this;
        // Template.prototype.app = this;
        // Modal.prototype.app = this;
        // jQuery.app = this;
        // Utility.app = this;

        if (_autoparse) {
            jQuery("body").bind("DOMNodeInserted", function(event) {
                //EVENT_TARGET=event;
                //
                //console.log('body change2',event.currentTarget);
                if ( !event.target.hasAttribute || ! event.target.hasAttribute('crud-parse') )
                    return ;

                event.target.removeAttribute('crud-parse');
                self.parse(jQuery(event.target));
                //console.log('PARSE');
            });
            window.onload = function () {
                console.log('body on load');
                jQuery('body').find('[crud-parse]').each(function () {
                    jQuery(this).removeAttr('crud-parse');
                    self.parse(jQuery(this));
                });
            };
        }



        EventManager.on("loadResource",function (event) {
            event.preventDefault();
            //self.log.info('on loadResource fired',event.params.resource);
            self.loadResource(event.params.resource,event.callback);
        })
        EventManager.on("loadResources",function (event) {
            event.preventDefault();
            //self.log.info('on loadResources fired',event.params.resources);
            self.loadResources(event.params.resources,event.callback);
        })
        _extraHtml();
        var _cb = callback?callback:function () {};
        App.loadResources(App.resources,_cb);
    }
    /**
     * carica una risorsa script o css dinamicamente partendo dalla cartella
     * pluginsPath quando lo script e' stato caricato chiama la callback
     * @param fileName
     * @param callback
     */
    App.loadResource = function (fileName, callback) {
        var self = this;
        //console.log('App.loadResourece',fileName)
        var _callback = callback?callback:function () {};
        if (!fileName) {
            self.log.warn('App.loadResorce fileName non definito!');
            _callback();
            return ;
        }
        var re = /(?:\.([^.]+))?$/;
        var ext = re.exec(fileName)[1];
        var realPath = fileName;
        if (fileName.indexOf('http') != 0) {
            realPath = fileName.charAt(0) == '/' ? fileName : self.pluginsPath + fileName;
        }
        if (ext == 'js') {
            _loadScript(realPath,_callback);
        } else if (ext == 'css') {
            _loadCss(realPath,_callback);
        } else if (ext == 'html') {
            _loadHtml(realPath,_callback);
        } else {
            throw 'invalid extension ' + ext + ", filename: " + fileName;
        }
    }
    /**
     * carica un vettore di risorse, al fine caricamento chiama la callback
     * @param resources
     * @param callback
     */
    App.loadResources = function(resources, callback) {
        var self = this;
        //console.log('App.loadResoureces',resources)
        var _callback = callback?callback:function () {};
        if (!resources || resources.length == 0) {
            _callback();
            return ;
        }

        var _recursive = function (i) {
            self.loadResource(resources[i],function () {
                //log.info('_recursive', resources[i]);
                if (i < resources.length-1) {
                    _recursive(i+1);
                } else {
                    _callback();
                    return ;
                }
            });
        }

        _recursive(0);
    };

    App.addDashboard = function(options) {
        var self = this;
        var dashName = options.dashboardClass?options.dashboardClass:'Dashboard';
        var dash = new window[dashName](options);
        var dashKey = 'd'+_dashCounter;
        dash.setId(dashKey);
        if (options['id'])
            _dashsId[options['id']] = dashKey;
        self.log.debug('add dashboard',dashName,options,dashKey);
        _dashs[dashKey] = dash;
        _dashCounter++;
        dash.draw();
        return dash;
    };

    App.getDashboard = function(key) {
        return _dashs[key];
    };

    App.getDashboardById = function(htmlId) {
        return this.getDashboard(_dashsId[htmlId]);
    };

    /**
     * aggiunge una view
     * @param options : configurazione view
     * @returns {string}
     */
    App.addView = function (options) {
        var self = this;

        self.log.debug('App.addView', options);
        //if (!options.modelName)
        //    throw 'Invalid model Name';
        if (!window[options.viewClass])
            throw 'View Class name ' + options.viewClass + ' not definited!';
        //console.log(options);

        var view = View.factory(options.viewClass,options);
        self.log.debug('App.addView type', view.type);
        //var view = new window[options.viewClass](options);

        //view.config = params.config?params.config: new self._defaultConfs[view.type]();
        var viewKey = 'v' + _viewCounter;
        view.setId(viewKey);
        //view.setActionListener();
        self.log.debug("constraint ", options.constraint);
        _views[viewKey] = view;
        if (options['id'])
            _viewsId[options['id']] = viewKey;
        self.log.debug('addView ' + viewKey, _views[viewKey]);
        _viewCounter++;
        if (options.autorender)
            self.renderView(viewKey);
        return viewKey;
    };

    App.renderViews = function () {
        var self = this;
        for (var key in _views) {
            self.renderView(key);
        }
    };

    App.renderView = function (key, callback) {
        var _cb = callback?callback:function() {};
        _views[key].draw(_cb);
    };

    App.getView = function (key) {
        return _views[key];
    };

    App.getViews = function () {
        return _views;
    };

    App.getKeyFromId = function (htmlId) {
        return _viewsId[htmlId];
    };

    App.removeViewById = function (htmlId) {
        return this.removeView(this.getKeyFromId(htmlId));
    };

    App.removeAllViews = function () {
        var self = this;
        for (var k in _views) {
            self.removeView(k);
        }
        //delete _views;
        _views = {};
        _viewCounter = 0;
    };

    App.removeView = function(key) {
        // constrollo che non esiste la key negli id html, altrimenti rimuovo anche da li'.
        var self = this;
        for (var k in _viewsId) {
            if (key == _viewsId[k]) {
                delete _viewsId[k];
                break;
            }
        }
        var v = _views[key];
        if (!v) {
            self.log.warn('App.removeView con key ' + key + ' non trovata!');
            return ;
        }
        jQuery(v.container).html("");
        v.delete();
        //delete v;
        delete _views[key];
        //this.controller.removeView(key);
    };

    App.renderViewById = function (htmlId,callback) {
        this.renderView(this.getKeyFromId(htmlId),callback);
    };

    App.getViewById = function(htmlId) {
        return this.getView(this.getKeyFromId(htmlId));
    }

    App.getHtmlConf = function (jQe) {
        var self = this;
        var type = jQe.attr('crud-view');
        //var viewClass = jQe.attr('view_class')?jQe.attr('view_class'):Utility.pascalCase('view_'+ type);

        //var params = jQe.attr();
        var params = {};
        $.each(jQe[0].attributes, function() {
            if(this.specified) {
                params[Utility.camelCase(this.name)] = this.value;
            }
        });
        if (Utility.lowerCase(params.autorender)  === 'false') {
            params.autorender = false;
        } else {
            params.autorender = true;
        }

        params.container =  jQe;
        // if (Utility.hasAttr(jQe,'crud-inline')) {
        //     params.template = jQe[0].outerHTML;
        // }
        self.log.debug('Htlm param',params);
        return params;
    }

    /**
     * esegue il parse di un container html e istanzia tutte le views trovate
     * @param container
     * @returns {Array}
     */
    App.parse = function (container) {
        var self = this;
        var realContainer = container?container:'body';
        self.log.debug("App.parse " + realContainer,jQuery(realContainer).length);
        var new_keys = [];
        var founds = [];
        var viewKeys = [];
        TraitTranslate.app = self;
        TraitTranslate.TraitTranslate(jQuery(realContainer));
        jQuery.each(jQuery(realContainer).find('[crud-view]').addBack('[crud-view]'),function () {
            var htmlConf = self.getHtmlConf(jQuery(this));
            htmlConf.viewClass = jQuery(this).attr('crud-view');
            if (htmlConf.conf) {
                if (!window[htmlConf.conf])
                    throw "impossibile trovare la definizione della configurazione " + htmlConf.conf;
                htmlConf = Conf.extend(window[htmlConf.conf],htmlConf);
            } else {
                if (htmlConf.modelName) {
                    var type = window[htmlConf.viewClass].prototype.type;
                    self.log.debug('Check conf Model_'+htmlConf.modelName+"."+type);
                    var _conf = self.getConf(htmlConf.modelName,type);
                    if (!_conf)
                        _conf = self.getDefaultConf(type);
                    htmlConf = Conf.extend(_conf,htmlConf);
                }
            }
            self.log.debug('Created view options ',htmlConf);

            var vkey = self.addView(htmlConf);
            viewKeys.push(vkey);
            founds.push(jQuery(this).attr('crud-view') + " " + jQuery(this).attr('model_name'));
        });
        self.log.debug('founds ',founds);
        jQuery.each(jQuery(realContainer).find('[crud-dashboard]').addBack('[crud-dashboard]'),function () {
            var dashName = jQuery(this).attr('crud-dashboard');
            self.log.debug('found dashboard',dashName);
            var htmlConf = self.getHtmlConf(jQuery(this));
            jQuery(this).removeAttr('crud-dashboard'); // lo rimuovo per la ricorsione perche' dentro riviene rifatto il parse
            htmlConf.container = jQuery(this);
            htmlConf.dashboardClass = dashName;
            self.addDashboard(htmlConf);

            //var d = new window[dashName](htmlConf);
            //d.draw();
        });
        return viewKeys;
    };


    App.viewModal = function (title,ViewConf,callback) { //(model,type,title,attrs,callback) {
        var self = this;
        var _cb = callback?callback:function(){};
        var d = self.customDialog(null);

        ViewConf.autorender = true;
        ViewConf.container = jQuery(d.id).find('.modal-body');
        d.setTitle(title);
        var vkey = app.addView(ViewConf);

        jQuery(d.id).on('hidden.bs.modal', function () {
            app.removeView(vkey);
            _cb();
        })
        return vkey;
    };

    App.closeViewModal = function () {
        var self = this;
        _customDialog.hide();
    };

    App.dashboardModal = function (title,dash,callback) {
        var self = this;
        var _cb = callback?callback:function(){};
        var d = self.customDialog(null);
        d.setTitle(title);


        dash.container = jQuery(d.id).find('.modal-body');
        dash.draw();
        jQuery(d.id).on('hidden.bs.modal', function () {
            _cb();
        });
        return;
    };

    App.getConf = function (model,action,role) {

        var self = this;
        var className = "Model_"+Utility.pascalCase(model);

        if (role && ! _existConfRole(model,action,role)) {
            throw "Model_"+Utility.pascalCase(model) + Utility.pascalCase(role) + " Class not found!" ;
        }

        if (self.role && _existConfRole(model,action,self.role)) {
            className += self.role?Utility.pascalCase(self.role):"";
        }

        //self.log.debug('checking configuration action ' + action +  ' for  ' + model + " className " + className);
        if (window[className] && window[className][action]) {
            self.log.debug('create configuration class ' + className + '.' + action);
            return Conf.extend(window[className][action],{});
        }
        // il caso speciale action insert se non c'e' e' uguale all'edit
        if (action == 'insert') {
            if (window[className] && window[className]['edit']) {
                self.log.debug('create configuration class ' + className + '.edit for action ' + action);
                return Conf.extend(window[className]['edit'],{
                    routeName : 'insert'
                });
            }
        }
        return null;

        // className = 'Conf'+Utility.upperCaseFirst(action);
        // self.log.debug('create configuration Default ConfClass Conf' + className);
        // return Conf.extend(window[className],{});
        //return Conf.factory(action);
    };

    App.getDefaultConf = function(type) {
        var self = this;
        var className = 'Conf'+Utility.upperCaseFirst(type);
        self.log.debug('create configuration Default ConfClass' + className);
        return Conf.extend(window[className]);
    };

    App.translate = function (key,plural,params) {
        return _translate(key,plural,params);
    };

    App.translateIfExist = function (key,plural,params) {
        if (!jQuery.langDefs[key])
            return ""
        return this.translate(key,plural,params);
    };

    App.getLocale = function () {
        return _locale;
    };

    App.setLocale = function (locale) {
        _locale = locale;
    };
    var _cW = null;
    App.waitStart = function (msg,container) {
        var that = this;
        _cW = new Crud.components.cWait();
        var id= 'd' + (new Date().getTime());
        jQuery('body').append('<div id="'+id+'"></div>');
        _cW.$mount('#'+id);
        _cW.msg = msg;
        _cW.start();
    };

    App.waitEnd = function (container) {
        if (container) {
            jQuery(container).fadeTo(250,1).css('cursor','auto').css('pointer-events','auto');
            return ;
        }
        _cW.end();
    }

    App.messageDialog = function (bodyProps,callbacks) {
        var that = this;
        var props = bodyProps;
        if (typeof bodyProps === 'string' || bodyProps instanceof String) {
            props = {
                cMessage : bodyProps,
            }
        }
        var d = new Crud.components.dMessage({
            propsData : props,
            methods : callbacks,
        });
        var id= 'd' + (new Date().getTime());
        jQuery('body').append('<div id="'+id+'"></div>');
        d.$mount('#'+id);
        return ;
    }

    App.errorDialog = function (bodyProps,callbacks) {
        var props = bodyProps;
        if (typeof bodyProps === 'string' || bodyProps instanceof String) {
            props = {
                cMessage : bodyProps,
            }
        }
        var d = new Crud.components.dError({
            propsData : props,
            methods : callbacks,
        });
        var id= 'd' + (new Date().getTime());
        jQuery('body').append('<div id="'+id+'"></div>');
        d.$mount('#'+id);
    }

    App.confirmDialog = function (bodyProps,callbacks) {
        var that = this;
        var props = bodyProps;
        if (typeof bodyProps === 'string' || bodyProps instanceof String) {
            props = {
                cMessage : bodyProps,
            }
        }
        var d = new Crud.components.dConfirm({
            propsData : props,
            methods : callbacks,
        });
        var id= 'd' + (new Date().getTime());
        jQuery('body').append('<div id="'+id+'"></div>');
        d.$mount('#'+id);
    }

    App.warningDialog = function (bodyProps,callbacks) {
        var that = this;
        var props = bodyProps;
        if (typeof bodyProps === 'string' || bodyProps instanceof String) {
            props = {
                cMessage : bodyProps,
            }
        }
        var d = new Crud.components.dWarning({
            propsData : props,
            methods : callbacks,
        });
        var id= 'd' + (new Date().getTime());
        jQuery('body').append('<div id="'+id+'"></div>');
        d.$mount('#'+id);
    };

    App.customDialog = function (bodyProps,callbacks) {
        var that = this;
        var props = bodyProps;
        if (!bodyProps || typeof bodyProps === 'string' || bodyProps instanceof String) {
            props = {
                cContent : bodyProps,
                cCallbacks : callbacks
            }
        } else
            props.cCallbacks = callbacks;

        var d = new Crud.components.dCustom({
            propsData : props,
            //methods : callbacks,
        });
        var id= 'd' + (new Date().getTime());
        jQuery('body').append('<div id="'+id+'"></div>');
        d.$mount('#'+id);
    }

    var _progressDialog = null;
    App.progressDialog = function (content,callbacks) {
        var self = this;
        if (!_progressDialog) {
            _progressDialog = new ProgressModal({
                labels : jQuery.langDefs
            });
        }
        _progressDialog.show(content,callbacks);
        return _progressDialog;
    }



    var _existConfRole = function (model,action,role) {

        var className = "Model_"+Utility.pascalCase(model) + Utility.pascalCase(role);
        if (window[className] && window[className][action]) {
            return true;
        }
        if (action == 'insert') {
            if (window[className] && window[className]['edit']) {
                return true;
            }
        }
        return false;
    }

    var _loadScript = function (scriptName, callback) {
        var self = App;
        var _callback = function () {
            //self.log.info('loaded... ' + scriptName)
            _resources[scriptName] = true;
            _resources_loaded[scriptName] = true;
            if (callback) {
                callback();
            }
        }
        if (!_resources[scriptName]) {
            //self.log.info('loading... ' + scriptName);

            var body 		= document.getElementsByTagName('body')[0];
            var script 		= document.createElement('script');
            script.type 	= 'text/javascript';
            script.src 		= scriptName;
            script.onload = _callback;
            script.onerror = function() {
                self.log.error("cannot load script " + scriptName);
            }
            // fire the loading
            body.appendChild(script);
            //return _waitLoad(scriptName,_callback);
            return ;
        }
        callback();
    }

    var _loadCss  = function (scriptName,callback) {
        var self = App;
        var _callback = function () {
            //self.log.info('loaded... ' + scriptName);
            _resources[scriptName] = true;
            _resources_loaded[scriptName] = true;
            if (callback) {
                callback();
            };
        }
        if (!_resources[scriptName]) {
            //self.log.info('loading... ' + scriptName);
            var body 		= document.getElementsByTagName('body')[0];
            var script 		= document.createElement('link');
            script.type 	= 'text/css';
            script.rel      = 'stylesheet';
            script.href 	= scriptName;
            script.onload = _callback;
            // fire the loading
            body.appendChild(script);
            return ;
        } else {
            return callback();
        }
    }

    var _loadHtml  = function (fileName,callback) {
        var self = App;
        var _callback = function () {
            //self.log.info('loaded... ' + scriptName);
            _resources[fileName] = true;
            _resources_loaded[fileName] = true;
            if (callback) {
                callback();
            };
        }
        if (!_resources[fileName]) {
            jQuery.get(fileName,function (html) {
                jQuery('body').append(html);
                callback();
            }).fail(function (e) {
                throw 'load ' + fileName + ' failed! ' + e;
            });
        } else {
            return callback();
        }
    }

    var _translate = function (key,plural,params) {
        var tmp = key.split('.');
        var s = app.$LANG[tmp[0]];
        for (var i=1;i<tmp.length;i++) {
            s = s[tmp[i]];
        }
        //var s = app.$LANG[key];
        if (!s)
            return key;
        var testo = s;
        if (testo.indexOf('|') >= 0) {
            if (plural > 0) {
                var tmp = testo.split("|");
                testo = tmp.length>plural?tmp[plural]:tmp[0];
            } else
                testo = testo.substr(0, testo.indexOf('|'));
        }
        if (params instanceof Array) {
            for (var i = 0; i < params.length; i++) {
                testo= testo.replace("(" + i +")", params[i] );
            }
        }
        return testo;
    };


    var _extraHtml = function () {
        jQuery('body').append('<div id="wait" class="overlay hide">' +
            '<span crud-msg style="position:absolute;width:100%;top:50%;text-align:center;color:white"></span>' +
            '</div>');
    }
    return App;
}

Vue.prototype.crudApp = new App();
Crud.components.cComponent = Vue.component('c-component',{
    methods : {
        jQe : function (selector) {
            var that = this;
            if (selector) {
                return jQuery(that.$el).find(selector).addBack(selector);
            }
            return jQuery(that.$el);
        }
    }
});
Vue.component('c-loading',{
    template : '<span>Carico ...</span>'
})
Crud.components.cTplBase = Vue.component('c-tpl-base',{
    props : ['c-render','c-type','c-key'],
    data : function () {
        console.log('DAta',this.cKey,this.cType,this.cRender)
        return {

        };
        // return {
        //     render : this.cRender,
        //     type : this.cType,
        //     key : this.cKey,
        // }
    },
    template : '<span>template base</span>'
});


Vue.component('c-tpl-record',{
    extends : Crud.components.cTplBase,
    template : '#c-tpl-record-template'
});

Vue.component('c-tpl-record2',{
    extends : Crud.components.cTplBase,
    template : '#c-tpl-record2-template'
});


Vue.component('c-tpl-list', {
    extends : Crud.components.cTplBase,
    template : '#c-tpl-list-template'
});
const actionBase = Vue.component('action-base', {
    props : ['c-conf','c-key'],
    methods : {
        defaultData : function () {
            var that = this;
            var adata = {
                type : 'global',
                visible : true,
                enabled : true,
                title : '???',
                css: 'btn btn-outline-secondary',
                icon : 'fa fa-help',
                text : '???',
                view : that.$parent,
                execute : function () {
                    alert('definire execute')
                }
            };
            for (var c in this.cConf) {
                if (c == 'execute') {
                    var f = this.cConf[c];
                    adata[c] = function () {
                        f.apply(that);
                    }
                } else
                    adata[c] = this.cConf[c];
            }
            return adata;
        }
    },
    data :  function () {
        return this.defaultData();
    },
    template: '#action-template'
});

Vue.component('action-edit', {
    extends : actionBase
});

Vue.component('action-view', {
    extends : actionBase
});

Vue.component('action-save', {
    extends : actionBase
});

Vue.component('action-insert', {
    extends : actionBase
});

Vue.component('action-back', {
    extends : actionBase
});

Vue.component('action-search', {
    extends : actionBase
});

Vue.component('action-delete', {
    extends : actionBase
});

Vue.component('action-delete-selected', {
    extends : actionBase
});

Vue.component('action-order', {
    extends : actionBase,
    mounted : function () {
        var direction = this.cConf.orderDirection?this.cConf.orderDirection.toLowerCase():null;
        if (direction == 'desc')
            this.icon = this.cConf.iconDown;
        else if (direction == 'asc')
            this.icon = this.cConf.iconUp
        else
            this.icon = null;
        //this.icon = (this.cConf.orderDirection === null)?null:(this.cConf.orderDirection.toLowerCase()=='asc'?this.cConf.iconUp:this.cConf.iconDown);
    }
})

Vue.component('action-dialog', {
    extends : actionBase,
    data : function () {
        var d = this.defaultData();
        d.dialog = this.$parent;
        return d;

    }
})
// Vue.component('action-edit', {
//     props : ['c-data','c-key'],
//     data :  function () {
//         var that = this;
//         var adata = {};
//         for (var c in this.cData) {
//             if (c == 'execute') {
//                 var f = this.cData[c];
//                 adata[c] = function () {
//                     console.log('execute before',f);
//                     f.apply(that);
//                     //this.cData[c].apply(this,[])
//                 }
//             } else
//                 adata[c] = this.cData[c];
//         }
//         return adata;
//     },
//     template: '#action-record'
// });
//
// Vue.component('action-view', {
//     props : ['c-data','c-key'],
//     data :  function () {
//         var that = this;
//         var adata = {};
//         for (var c in this.cData) {
//             if (c == 'execute') {
//                 var f = this.cData[c];
//                 adata[c] = function () {
//                     f.apply(that);
//                 }
//             } else
//                 adata[c] = this.cData[c];
//         }
//         return adata;
//     },
//     template: '#action-record'
// });
//
//
// Vue.component('action-save', {
//     props : ['c-data','c-key'],
//     data :  function () {
//         var that = this;
//         var adata = {};
//         for (var c in this.cData) {
//             if (c == 'execute') {
//                 var f = this.cData[c];
//                 adata[c] = function () {
//                     f.apply(that);
//                 }
//             } else
//                 adata[c] = this.cData[c];
//         }
//         return adata;
//     },
//     template: '#action-record'
// });
//
// Vue.component('action-insert', {
//     props : ['c-data','c-key'],
//     data :  function () {
//         var that = this;
//         var adata = {};
//         for (var c in this.cData) {
//             if (c == 'execute') {
//                 var f = this.cData[c];
//                 adata[c] = function () {
//                     f.apply(that);
//                 }
//             } else
//                 adata[c] = this.cData[c];
//         }
//         return adata;
//     },
//     template: '#action-record'
// });

// Vue.component('action-back', {
//     props : ['c-data','c-key'],
//     data :  function () {
//         var that = this;
//         var adata = {};
//         for (var c in this.cData) {
//             if (c == 'execute') {
//                 var f = this.cData[c];
//                 adata[c] = function () {
//                     f.apply(that);
//                 }
//             } else
//                 adata[c] = this.cData[c];
//         }
//         return adata;
//     },
//     template: '#action-record'
// });
Vue.component('paginator',{
    props : ['c-route-conf','c-route','c-pagination'],
    template : '#paginator-template',
    data : function () {
        var that = this;
        var pagination = that.cPagination || {};
        var d = {
            current_page : 0,
            from : 0,
            to : 0,
            last_page : 0,
            per_page : 0,
            pagination_steps : {}
        }
        return Utility.merge(d,pagination);
    },
    methods : {
        firstPage : function () {
            var that = this;
            if (parseInt(that.current_page) == 1)
                return ;
            that.setPage(1);
        },
        prevPage : function () {
            var that = this;
            if (parseInt(that.current_page) <= 1)
                return ;
            that.setPage(parseInt(that.current_page) - 1);
        },
        nextPage : function () {
            var that = this;
            if (parseInt(that.current_page) >= parseInt(that.last_page))
                return ;
            that.setPage(parseInt(that.current_page) + 1);
            // that.cRoute.params.page = (parseInt(that.cRoute.params.page)?parseInt(that.cRoute.params.page):1) + 1;
            // console.log('ROUTER',that.cRoute.getUrl(),new Object(that.cRoute.getParams()));
            // router.push({
            //     path : that.cRoute.getUrl(),
            //     query : that.cRoute.getParams()
            // })
            // router.go();
            // return ;

            var params = JSON.parse(JSON.stringify(that.cRouteConf.params));
            params['page'] = (parseInt(params['page'])?parseInt(params['page']):1) + 1;
            that.cRouteConf.params = params;
        },
        setPage : function(page) {
            var that = this;
            var params = JSON.parse(JSON.stringify(that.cRouteConf.params));
            params['page'] = parseInt(page);
            that.cRouteConf.params = params;

        },
        lastPage : function () {
            var that = this;
            if (parseInt(that.current_page) >= parseInt(that.last_page))
                return ;
            that.setPage(that.last_page);
        },
    }
})
Crud.components.dBase = Vue.component('d-base',{
    props : ['c-message'],
    extends : Crud.components.cComponent,
    mounted : function () {
        var that = this;
        console.log('message',this.cMessage,this.message)
        that.jQe(that.selector).modal('show');
        that.jQe(that.selector).on('hidden.bs.modal', function (e) {
            jQuery(that.selector).remove();
            that.$destroy();
        })
    },
    methods : {
        defaultData : function () {
            return {
                message : this.cMessage,
                title : this.cTitle,
            }
        },
        ok : function () {
            console.log('default ok')
        },
        cancel : function () {
            console.log('default cancel');
        },
        hide : function () {
            var that = this;
            that.jQe(that.selector).modal('hide');
        }
    },
    data :function () {
        return this.defaultData();
    }
});

Crud.components.dConfirm = Vue.component('d-confirm', {
    extends : Crud.components.dBase,
    props : {
        'c-title': {
            default : 'Richiesta di Conferma'
        }
    },
    data : function() {
        var d = this.defaultData();
        d.selector = '[c-confirm-dialog]';
        return d;
    },
    template : '#d-confirm-template'
});

Crud.components.dMessage = Vue.component('d-message', {
    extends : Crud.components.dBase,
    props : {
        'c-title': {
            default : 'Informazione'
        }
    },
    data : function() {
        var d = this.defaultData();
        d.selector = '[c-message-dialog]';
        return d;
    },
    template : '#d-message-template'
});

Crud.components.dError = Vue.component('d-error', {
    extends : Crud.components.dBase,
    props : {
        'c-title': {
            default : 'Errore'
        }
    },
    data : function() {
        var d = this.defaultData();
        d.selector = '[c-error-dialog]';
        return d;
    },
    template : '#d-error-template'
});
Crud.components.dWarning = Vue.component('d-warning', {
    extends : Crud.components.dBase,
    props : {
        'c-title': {
            default : 'Attenzione'
        }
    },
    data : function() {
        var d = this.defaultData();
        d.selector = '[c-warning-dialog]';
        return d;
    },
    template : '#d-warning-template'
});

Crud.components.dCustom = Vue.component('d-custom', {
    // mounted : function () {
    //     var that = this;
    //     for (var k in that.cCallbacks) {
    //         console.log('callback',k);
    //         that.methods[k] = function () {
    //             that.cCallbacks[k].apply(that);
    //         }
    //     }
    // },
    extends : Crud.components.dBase,
    // methods : {
    //     cbCall : function (key) {
    //         var that = this;
    //         that.cCallbacks[key].execute(that);
    //     }
    // },
    props : {
        'c-title': {
            default : ''
        },
        'c-content' : {
            default : ''
        },
        'c-callbacks' : {
            default : function () {
                return {}
            }
        }
    },
    data : function() {
        var d = this.defaultData();
        d.selector = '[c-custom-dialog]';
        d.content = this.cContent;
        return d;
    },
    template : '#d-custom-template'
});
Crud.components.cWait = Vue.component('c-wait',{
    extends : Crud.components.cComponent,
    data : function () {
        return {
            msg : ''
        }
    },
    methods : {
        start : function () {
            this.jQe().removeClass('hide');
            this.jQe().css('cursor','wait');
        },
        end : function () {
            var that = this;
            that.jQe().remove();
            that.$destroy();
        }
    },
    template : '#c-wait-template'
})
Crud.components.renders.rBase = Vue.component('r-base', {
    extends : Crud.components.cComponent,
    props : ['c-conf','c-key','c-marker'],

    mounted : function() {
        var that = this;
        var _conf = that.cConf || {};
        if (!_conf.operator) {
            jQuery(that.$el).find('[c-operator]').remove();
        }
        var that =this;
        for (var k in _conf.methods) {
            console.log('r-base implements methods',k);
            that[k] = function () {
                console.log('call methods ', k );
                _conf.methods[k].apply(that,this.arguments);
            }
        }



        if (_conf.resources && _conf.resources.length) {
            that.beforeLoadResources();
            that.resourcesLoaded = false;
            that.crudApp.loadResources(_conf.resources,function () {
                console.log('resoures loaded callback',that);
                that.resourcesLoaded = true;
                that.afterLoadResources();
            })
        }

    },
    data :  function () {
        return this.defaultData();
    },
    methods : {
        getFieldName: function () {
            var that = this;
            //console.log('GET FIELD NAME',this.cKey);
            if (that.conf.operator) {
                return 's_' + this.cKey + '[]';
            }
            return this.cKey;
        },
        getOperatorName : function () {
            var that = this;
            return 's_' + this.cKey + "_operator";
        },
        defaultData : function () {
            var _c = this.cConf || {};
            var d = {
                //fieldName : this.getFieldName(),
                value: _c.value,
                operator : _c.operator,
                //operatorName : this.getOperatorName(),
                resourcesLoaded : true,
                conf : _c,
            }
            console.log('r-base::defaultData',d);
            return d;
        },
        beforeLoadResources : function () {
            console.log('rBase.beforeLoadResources')
        },
        afterLoadResources : function () {
            console.log('rBase.afterLoadResources');
        },
        getValue : function() {
            return this.value;
        },
        //events
        change : function () {
            var that = this;
            var methods = that.conf.methods || {};
            if (methods.change) {
                methods.change.apply(that);
            }
        },
        updateConf : function (conf) {
            console.log('update conf old',this.conf,'new',conf);
            this.conf = conf;
        },

    },
    // watch : {
    //     resourcesLoaded : {
    //         deep : true,
    //         handler() {
    //             var that = this;
    //             console.log('resouces Loaded',that.resourcesLoaded)
    //             if (that.resourcesLoaded) {
    //                 jQuery(that.$el).find('[c-autocomplete]').mdbAutocomplete({
    //                     data: that.cConf.metadata.domainValues
    //                 });
    //             }
    //         }
    //     }
    // },
    template: '<div>render base</div>'
});


// Vue.component('r-input', {
//     extends : rBase,
//     template: '<input v-model="value" v-bind:name="cKey">'
// });
//
// Vue.component('r-textarea', {
//     props : ['c-data','c-key'],
//     data :  function () {
//         //console.log('c-input',this.cData,this.cKey)
//         return {
//             value: this.cData.value
//         }
//     },
//     template: '<textarea v-model="value" v-bind:name="cKey"></textarea>'
// });
//
// Vue.component('r-text',{
//     props : ['c-data','c-key'],
//     data :  function () {
//         //console.log('c-text',this.cData)
//         return {
//             value: this.cData.value
//         }
//     },
//     template: '<div v-html="value"></div>'
// });
//
// Vue.component('r-select',{
//     props : ['c-data','c-key'],
//     data :  function () {
//         //console.log('c-select',this.cData);
//         var dV = this.cData.metadata.domainValues;
//         var dVO = this.cData.metadata.domainValuesOrder?this.cData.metadata.domainValuesOrder:Object.keys(dV);
//         return {
//             name : this.cData.name,
//             value: this.cData.value,
//             domainValues : dV,
//             domainValuesOrder : dVO
//         }
//     },
//     template: '<select v-bind:name="cKey" v-model="value">\n' +
//         '    <option v-for="key in domainValuesOrder" :value="key" :selected="value == key ? \'selected\' : \'\'">{{domainValues[key]}}</option>\n' +
//         '</select>',
//     // function () {
//     //     return '<div v-html="fieldValue"></div>'
//     // }
// });

// Vue.component('r-checkbox',{
//     props : ['data'],
//     data :  function () {
//         return {
//             fieldValue: this.data
//         }
//     },
//     template: '<select name="label_id" id="label_id" v-model="fieldValue">\n' +
//         '    <option v-for="(name, id) in " :value="id" :selected="label_selected == id ? \'selected\' : \'\'">@{{name}}</option>\n' +
//         '</select>',
//     // function () {
//     //     return '<div v-html="fieldValue"></div>'
//     // }
// });
Vue.component('r-input', {
    extends : Crud.components.renders.rBase,
    template: '#r-input-template',
    data : function () {
        var d = this.defaultData();
        d.inputType = 'text';
        var _conf = this.cConf || {};
        if (_conf.inputType)
            d.inputType = _conf.inputType;
        return d;
    }
});
Vue.component('r-input-helped', {
    extends : Crud.components.renders.rBase,
    template: '#r-input-helped-template',
    data : function () {
        var d = this.defaultData();
        d.inputType = 'text';
        if (this.cConf.inputType)
            d.inputType = this.cConf.inputType;
        return d;
    },

    methods : {
        setValue : function (key) {
            this.value = key;//this.conf.metadata.domainValues[key];
            //jQuery(this.$el)
        }
    }

});
Vue.component('r-hidden', {
    extends : Crud.components.renders.rBase,
    template: '#r-hidden-template'
});
Vue.component('r-text',{
    extends : Crud.components.renders.rBase,
    template: '#r-text-template'
});
Vue.component('r-textarea', {
    extends : Crud.components.renders.rBase,
    template: '#r-textarea-template'
});
Vue.component('r-select',{
    extends : Crud.components.renders.rBase,
    template: '#r-select-template',
});


Vue.component('r-radio',{
    extends : Crud.components.renders.rBase,
    data :  function () {
        //console.log('c-select',this.cData);
        var dV = this.cConf.metadata.domainValues;
        var dVO = this.cConf.metadata.domainValuesOrder?this.cConf.metadata.domainValuesOrder:Object.keys(dV);
        return {
            name : this.cConf.name,
            value: this.cConf.value,
            domainValues : dV,
            domainValuesOrder : dVO
        }
    },
    template: '#r-radio-template',
});


Vue.component('r-checkbox',{
    extends : Crud.components.renders.rBase,
    data :  function () {
        //console.log('c-select',this.cData);
        var d = this.defaultData();

        var dV = d.conf.metadata.domainValues;
        var dVO = d.conf.metadata.domainValuesOrder?d.conf.metadata.domainValuesOrder:Object.keys(dV);
        return {
            value: Array.isArray(d.conf.value)?Array.isArray(d.conf.value):[d.conf.value],
            domainValues : dV,
            domainValuesOrder : dVO
        }
    },
    methods : {
        // inArray : function (v) {
        //     if (!this.value || !Array.isArray(this.value))
        //         return false;
        //     console.log('inArray ', v,(this.value.map(String).indexOf(""+v)));
        //     return (this.value.map(String).indexOf(""+v) >= 0)
        //
        // },
        getFieldName : function () {
            return this.cKey + '[]';
        }
    },
    template: '#r-checkbox-template',
});


Vue.component('r-autocomplete', {
    extends : Crud.components.renders.rBase,
    template: '#r-autocomplete-template',
    mounted() {
        var that = this;

    },
    data : function () {
        var d = this.defaultData();
        return d;
    },
    methods : {
        afterLoadResources : function () {
            var that = this;
            jQuery(that.$el).find('[c-autocomplete]').autoComplete({
                //data: that.conf.metadata.domainValues
                resolverSettings: {
                    url: that._createUrl()
                }
            });
        },
        _createUrl : function () {
            var that = this;
            var r = Route.factory(that.conf.routeName,{values : {modelName:that.conf.metadata.autocompleteModel} });

            //var url = that.url?that.url:"/api/json/autocomplete/" + that.metadata.autocompleteModel + "?";
            var url = that.url?that.url:r.getUrl();
            url+= '?';

            if (that.conf.metadata.fields) {
                for(var f in that.conf.metadata.fields) {
                    url+="field[]="+that.conf.metadata.fields[f]+"&";
                }
            }
            /* @TODO se metto la description diventa difficile cambiare la
             if (that.model_description) {
             for(var f in that.model_description) {
             url+="description[]="+that.model_description[f]+"&";
             }
             }
             */
            url += that.conf.metadata.separator ? '&separator=' + that.conf.metadata.separator : '';
            url += that.conf.metadata.n_items ? '&n_items=' + that.conf.metadata.n_items : '';
            url += that.conf.metadata.method ? '&method=' + that.conf.metadata.method: '';
            return url;
        },

    }

});
Vue.component('r-belongsto', {
    extends : Crud.components.renders.rBase,
    template: '#r-belongsto-template',
    // data : function () {
    //     var d = this.defaultData();
    //     d.inputType = 'text';
    //     if (this.cData.inputType)
    //         d.inputType = this.cData.inputType;
    //     return d;
    // }
});
Vue.component('r-date-select', {
    extends : Crud.components.renders.rBase,
    template: '#r-date-select-template',

    computed : {
        cDay : function () {
            var that = this;
            var d = moment(that.value?that.value:that.conf.value);
            var cd = {
                value: d.date(),
                metadata: {
                    domainValues: {}
                },
                methods: {
                    change: function () {
                        that.changed();
                    }
                }
            };
            for (let i=1;i<=d.daysInMonth();i++) {
                cd.metadata.domainValues[i] = i;
            }
            if (d.date() > d.daysInMonth())
                cd.value = 1;
            cd.metadata.domainValuesOrder = Object.keys(cd.metadata.domainValues);
            return cd;
        },
        cMonth : function () {
            var that = this;
            var d = moment(that.value ? that.value : that.conf.value);
            var cm = {
                value: d.month() + 1,
                metadata: {
                    domainValues: {}
                },
                methods: {
                    change: function () {
                        that.changed();
                    }
                }
            };
            for (let i=1;i<=12;i++) {
                cm.metadata.domainValues[i] = i;
            }
            return cm;
        },
        cYear : function () {
            var that = this;
            var d = moment(that.value ? that.value : that.conf.value);
            var cy = {
                value : d.year(),
                metadata : {
                    domainValues: {

                    }
                },
                methods: {
                    change : function () {
                        that.changed();
                    }
                }
            };
            var minY = that.cConf.minYear?that.cConf.minYear:d.year()-5;
            var maxY = that.cConf.maxYear?that.cConf.maxYear:d.year()+5;
            for (let i=minY;i<=maxY;i++) {
                cy.metadata.domainValues[i] = i;
            }
            return cy;
        }
    },
    methods : {
        changed : function() {
            var that = this;
            var s = jQuery(that.$el).find('[c-marker="year"]').val() +  "-" + jQuery(that.$el).find('[c-marker="month"]').val().padStart(2,'0')  + "-" + jQuery(that.$el).find('[c-marker="day"]').val().padStart(2,'0') ;
            var dds = moment(s);
            if (dds.isValid()) {
                that.value = s;
            }

            //var sR = that.selectRanges();
            //that.cDay = sR.cDay;
            //console.log('changed',sR);
            this.$refs.day.updateConf(that.cDay);
            this.$refs.month.updateConf(that.cMonth);
            this.$refs.year.updateConf(that.cYear);

            console.log(this);
        }
    }
});
Vue.component('r-date-picker', {
    extends : Crud.components.renders.rBase,
    template: '#r-date-picker-template',
    methods : {
        changed : function() {
            var that = this;
            //var s = jQuery(that.$el).find('[c-marker="year"]').val() +  "-" + jQuery(that.$el).find('[c-marker="month"]').val().padStart(2,'0')  + "-" + jQuery(that.$el).find('[c-marker="day"]').val().padStart(2,'0') ;
            // var dds = moment(s);
            // if (dds.isValid()) {
            //     that.value = s;
            // }
            //
            // //var sR = that.selectRanges();
            // //that.cDay = sR.cDay;
            // //console.log('changed',sR);
            // this.$refs.day.updateConf(that.cDay);
            // this.$refs.month.updateConf(that.cMonth);
            // this.$refs.year.updateConf(that.cYear);
            //
            // console.log(this);
        },
        afterLoadResources : function () {
            var that = this;
            console.log('resources loaded',that.value);
            jQuery(that.$el).find('[c-picker]').datepicker({
                format : 'yyyy-mm-dd',
                startDate : moment(that.value).toDate(),
            }).on('changeDate', function(ev) {
                that.value =  moment(ev.date.toISOString()).format('Y-M-D'); //ev.date.toISOString();
                moment(ev.date.valueOf);
                console.log('date ' ,ev.date.toISOString());
                // if (ev.date.valueOf() < startDate.valueOf()){
                //
                // }
            });
        }
    }
});
Vue.component('r-texthtml',{
    extends : Crud.components.renders.rBase,
    template: '#r-texthtml-template',
    methods : {
        afterLoadResources : function () {
            var that = this;
            var options = that.cConf.pluginOptions || {};
            options = Utility.cloneObj(options);
            that.jQe('[c-summernote]').summernote(options)
        }
    }
});
Crud.components.rHasmany =Vue.component('r-hasmany', {
    extends : Crud.components.renders.rBase,
    template: '#r-hasmany-template',
    data : function () {
        var d = this.defaultData();
        return d;
    },
    methods : {
        getHasmanyConf : function (value) {
            var that = this;
            var hmConf = that.cConf.hasmanyConf || {};

            hmConf = Utility.confMerge({
                fields : [],
                fieldsConfig : {},
                data :  {
                    value : {},
                    metadata : {

                    }
                },
            },hmConf);
            if (value && Object.keys(value).length > 0) {
                hmConf.data.value = value;
                if (!hmConf.fields || !hmConf.fields.length) {
                    hmConf.fields = Object.keys(value);
                }
            } else {
                // ci sono record gia' presenti prendo da li i fields.
                if (this.value && this.value.length > 0) {
                    if (!hmConf.fields || !hmConf.fields.length) {
                        hmConf.fields = Object.keys(this.value[0]);
                        hmConf.data.value = Utility.cloneObj(this.value[0]);
                    }
                }
            }
            return hmConf;

        },
        addItem : function () {
            var that = this;
            //var conf = that.getHasmanyConf(null);
            that.value.push({});

        },
        deleteItem : function (index) {
            console.log('index',index);
            this.value.splice(index,1);
        }
    }
});
Vue.component('r-hasmany-view', {
    extends : Crud.components.rHasmany,
    template: '#r-hasmany-view-template',
    beforeCreated : function() {
        this.$options.template  = '#r-hasmany-view-template1';
    },
    data : function () {
        var d = this.defaultData();
        d.inputType = 'text';
        if (this.cConf.inputType)
            d.inputType = this.cConf.inputType;
        return d;
    }
});
Vue.component('r-hasmany-image',{
    extends : Crud.components.renders.rBase,
    // data :  function () {
    //     //console.log('r-hasmany-image',this.cData);
    //     //var dV = this.cData.metadata.domainValues;
    //     //var dVO = this.cData.metadata.domainValuesOrder?this.cData.metadata.domainValuesOrder:Object.keys(dV);
    //     return {
    //         //name : this.cData.name,
    //         value: this.cConf.value,
    //         //domainValues : dV,
    //         //domainValuesOrder : dVO
    //     }
    // },
    template: '#r-hasmany-image-template',
});


Crud.components.renders.rHasmanyImageEdit = Vue.component('r-hasmany-image-edit',{
    extends : Crud.components.renders.rBase,

    data :  function () {
        var that = this;
        var routeConf =  Utility.cloneObj(that.$Crud.routes.uploadfile);
        var route = Route.factory('uploadfile',routeConf);
        var types = {
            ext : 'r-hidden',
            filename : 'r-hidden',
            original_name : 'r-hidden',
            random : 'r-hidden',
            nome : 'r-input',
            descrizione : 'r-textarea'
        };
        var d = this.defaultData();
        var myd =  {
            //name : this.cConf.name,
            //value: values,
            uploadRoute : route.getUrl(),
            error : false,
            errorMessage : '',
            complete:false,
            modelName : 'foto',
            renders : [],
            uploadRenders : {},
            preview : null,
            lastUpload : null,
            types : types,
            uploadFields : ['ext','random','id','status','original_name','filename','mimetype','modelName','type'],
            fields : ['nome','descrizione'],
            fieldsConfig : {
                nome : { type : 'r-input'},
                descrizione : {type : 'r-textarea'},
            },
            mainformFields : ['nome','descrizione','original_name','filename','ext','random','id','status','mimetype'],
        }
        return Utility.merge(d,myd);
    },
    methods : {
        add : function () {
            console.log('add')
            jQuery('#d-image-ulpload').modal('show');
            return ;

            var d = new uploadDialog().$mount('#dialog-mount');
            jQuery('#d-image-ulpload').
            jQuery('#d-image-ulpload').modal('show');
        },
        addItem : function () {
            var that = this;
            jQuery.each(jQuery(that.$el).find('[c-marker]'),function () {
                that.lastUpload[jQuery(this).attr('c-marker')] = jQuery(this).val();
            })
            that.createItem(that.lastUpload,'new');
            //that.lastUpload['nome'] = jQuery(that.$el).find('form[name="formupload"]').find('input[name="nome"]').val();
            //that.lastUpload['descrizione'] = jQuery(that.$el).find('form[name="formupload"]').find('textarea[name="descrizione"]').val();
            // var newItem = {};
            // for (var k in that.renders) {
            //     newItem[that.cKey + '-' + k + '[]'] = {
            //         value : that.lastUpload[k],
            //         type : that.types[k]?that.types[k]:'r-input'
            //     }
            // }
            // that.value.push(newItem);
            // console.log('VALUE',that.value);
            // console.log(that);
        },
        deleteItem : function (index) {
            this.renders.splice(index,1);
        },
        uploadImage : function () {
            var that = this;
            var routeConf =  Utility.cloneObj(that.$Crud.routes.uploadfile);
            var route = Route.factory('uploadfile',routeConf);
            //route.params.file = document.getElementById("image-file").files[0]; // jQuery(that.$el).find('input[name="file"]').val();
            //route.params.file = jQuery(that.$el).find('input[name="file"]').prop('files')[0];
            //route.params.modelName = 'test';
            //route.params.type = 'fotos';

            that.error = false;
            that.complete = false;

            var realUrl = Server.getUrl(route.getUrl());
            var data = new FormData();
            data.append('file',jQuery(that.$el).find('[c-image-file]').prop('files')[0]);
            data.append('modelName','test');
            data.append('type','fotos');

            jQuery.ajax({
                url: realUrl,
                type: 'POST',
                data: data,
                processData: false,
                contentType: false                    // Using FormData, no need to process data.
            }).done(function(data){
                that.error = data.error;
                that.lastUpload = null;
                console.log("Success: Files sent!",data);
                if (data.error) {
                    var msg = null;
                    try {
                        var tmp = JSON.parse(data.msg);
                        msg = "";
                        for(k in tmp) {
                            msg += '<div>'+tmp[k]+'</div>';
                        }
                    } catch(e) {
                        msg = data.msg;
                    }
                    that.errorMessage = msg;
                    //self._showError(dialog,msg);
                    jQuery(that.$el).find('[crud-button="ok"]').addClass("disabled");
                    return;
                }
                that.complete = true;
                that.preview = Server.getUrl('/imagecache/small/' + data.result.filename);
                that.lastUpload = Utility.cloneObj(data.result);
                for (var k in data.result) {
                    console.log('update field',k,data.result[k],jQuery(that.$el).find('[c-marker="' + k + '"]').length);
                    jQuery(that.$el).find('[c-marker="' + k + '"]').val(data.result[k]);
                }

            }).fail(function(data, error, msg){
                console.log("An error occurred, the files couldn't be sent!");
                that.error = true;
                that.errorMessage = "Upload error " + data + " " + error + " " + msg;
            });

            // Server.route(route, function (json) {
            //     that.error = json.error;
            //     that.errorMessage = json.msg;
            //
            // })
        },
        createItem : function (values,status) {
            var that = this;
            values.status=status;
            values.type = that.conf.metadata.relationName;
            values['random_id'] = values.id?values.id:new Date().getTime();
            //values['langs'] = self.langs;
            values['label'] = 'filename'//values[self.labelField]?values[self.labelField]:"";
            console.log('create Form item ' + status,values);
            var renders = {};
            for (var i in that.uploadFields) {
                var field = that.uploadFields[i];
                if ( that.mainformFields.indexOf(field) < 0)
                    continue;
                renders[that.cKey + "-" + field + "[]"] = {
                    type : 'r-hidden',
                    value : values[field]
                }

            }
            for (var i in that.fields) {
                var field = that.fields[i];
                if (that.mainformFields.indexOf(field) < 0)
                    continue;
                var type = 'r-hidden';
                if (that.fieldsConfig[field])
                    type = that.fieldsConfig[field].type || 'r-hidden';
                renders[that.cKey + "-" + field + "[]"] = {
                    type : type,
                    value : values[field]
                }
            }
            renders.preview = status=='new'?values['filename']:values['full_filename'];
            that.renders.push(renders);
        }

    },
    template: '#r-hasmany-image-edit-template',
    mounted : function () {
        var that = this;
        // jQuery(that.$el).find('[c-image-file]').autoUpload(function () {
        //     //console.log('autoupload',jQuery(that.$el).find('form[name="formupload"]').length);
        //     that.uploadImage();
        //     //jQuery(that.$el).find('form[name="formupload"]').submit();
        // });

        jQuery(that.$el).find('[c-image-file]').change(function () {
            //console.log('autoupload',jQuery(that.$el).find('form[name="formupload"]').length);
            that.uploadImage();
            //jQuery(that.$el).find('form[name="formupload"]').submit();
        });


        for (var i in that.conf.value) {
            that.createItem(that.conf.value[i], 'updated');
        }

        var uploadRenders = {};
        for (var i in that.uploadFields) {
            var field = that.uploadFields[i];
            uploadRenders[field] = {
                type : 'r-hidden',
                value : ''
            }

        }
        for (var i in that.fields) {
            var field = that.fields[i];
            var type = 'r-hidden';
            if (that.fieldsConfig[field])
                type = that.fieldsConfig[field].type || 'r-hidden';
            uploadRenders[field] = {
                type : type,
                value : ''
            }
        }

        that.uploadRenders = uploadRenders;

    },
});

const uploadDialog = Vue.extend({
    props : [

    ],
    template : '#d-image-upload-template'
})


Vue.component('r-hasmany-attachment',{
    extends : Crud.components.renders.rBase,
    data :  function () {
        //console.log('r-hasmany-image',this.cData);
        //var dV = this.cData.metadata.domainValues;
        //var dVO = this.cData.metadata.domainValuesOrder?this.cData.metadata.domainValuesOrder:Object.keys(dV);
        return {
            //name : this.cData.name,
            value: this.cConf.value,
            //domainValues : dV,
            //domainValuesOrder : dVO
        }
    },
    methods : {
        mimeTypeIcon : function (index) {
            var that = this;
            var icon = that.$Crud.icons.mimetypes['default'];
            if (that.value && that.value[index]) {
                if (that.$Crud.icons.mimetypes[that.value[index].ext])
                    icon = that.$Crud.icons.mimetypes[that.value[index].ext];
            }
            return icon;
        }
    },
    template: '#r-hasmany-attachment-template',
});


Vue.component('r-hasmany-attachment-edit',{
    extends : Crud.components.renders.rBase,

    data :  function () {
        var that = this;
        var routeConf =  Utility.cloneObj(that.$Crud.routes.uploadfile);
        var route = Route.factory('uploadfile',routeConf);
        var types = {
            ext : 'r-hidden',
            filename : 'r-hidden',
            original_name : 'r-hidden',
            random : 'r-hidden',
            nome : 'r-input',
            descrizione : 'r-textarea'
        };
        var d = this.defaultData();
        var myd =  {
            //name : this.cConf.name,
            //value: values,
            uploadRoute : route.getUrl(),
            error : false,
            errorMessage : '',
            complete:false,
            modelName : 'foto',
            renders : [],
            uploadRenders : {},
            preview : null,
            lastUpload : null,
            types : types,
            uploadFields : ['ext','random','id','status','original_name','filename','mimetype','modelName','type'],
            fields : ['nome','descrizione'],
            fieldsConfig : {
                nome : { type : 'r-input'},
                descrizione : {type : 'r-textarea'},
            },
            mainformFields : ['nome','descrizione','original_name','filename','ext','random','id','status','mimetype'],

            iconType : 'default'

        }
        return Utility.merge(d,myd);
    },
    methods : {
        itemTitle : function(index) {
            var that = this;
            var title = "";
            var r = that.renders[index];
            console.log('renders',r);
            if (r){
                title = r.nome?r.nome: (r.full_filename?r.full_filename:'');
            }
            return (title.length > 12?title.substr(0,12)+'...':title);
        },
        add : function () {
            console.log('add')
            jQuery('#d-attachment-ulpload').modal('show');
            return ;

            var d = new uploadDialog().$mount('#dialog-mount');
            jQuery('#d-image-ulpload').
            jQuery('#d-image-ulpload').modal('show');
        },
        addItem : function () {
            var that = this;
            jQuery.each(jQuery(that.$el).find('[c-marker]'),function () {
                that.lastUpload[jQuery(this).attr('c-marker')] = jQuery(this).val();
            })
            that.createItem(that.lastUpload,'new');
            //that.lastUpload['nome'] = jQuery(that.$el).find('form[name="formupload"]').find('input[name="nome"]').val();
            //that.lastUpload['descrizione'] = jQuery(that.$el).find('form[name="formupload"]').find('textarea[name="descrizione"]').val();
            // var newItem = {};
            // for (var k in that.renders) {
            //     newItem[that.cKey + '-' + k + '[]'] = {
            //         value : that.lastUpload[k],
            //         type : that.types[k]?that.types[k]:'r-input'
            //     }
            // }
            // that.value.push(newItem);
            // console.log('VALUE',that.value);
            // console.log(that);
        },
        deleteItem : function (index) {
            this.renders.splice(index,1);
        },
        uploadImage : function () {
            var that = this;
            var routeConf =  Utility.cloneObj(that.$Crud.routes.uploadfile);
            var route = Route.factory('uploadfile',routeConf);
            //route.params.file = document.getElementById("image-file").files[0]; // jQuery(that.$el).find('input[name="file"]').val();
            //route.params.file = jQuery(that.$el).find('input[name="file"]').prop('files')[0];
            //route.params.modelName = 'test';
            //route.params.type = 'fotos';

            that.error = false;
            that.complete = false;

            var realUrl = Server.getUrl(route.getUrl());
            var data = new FormData();
            data.append('file',jQuery(that.$el).find('[c-attachment-file]').prop('files')[0]);
            data.append('modelName','test');
            data.append('type','attachments');

            jQuery.ajax({
                url: realUrl,
                type: 'POST',
                data: data,
                processData: false,
                contentType: false                    // Using FormData, no need to process data.
            }).done(function(data){
                that.error = data.error;
                that.lastUpload = null;
                console.log("Success: Files sent!",data);
                if (data.error) {
                    var msg = null;
                    try {
                        var tmp = JSON.parse(data.msg);
                        msg = "";
                        for(k in tmp) {
                            msg += '<div>'+tmp[k]+'</div>';
                        }
                    } catch(e) {
                        msg = data.msg;
                    }
                    that.errorMessage = msg;
                    //self._showError(dialog,msg);
                    jQuery(that.$el).find('[crud-button="ok"]').addClass("disabled");
                    return;
                }
                that.complete = true;
                that.preview = that.$Crud.icons.mimetypes[data.result.ext]?that.$Crud.icons.mimetypes[data.result.ext]:that.$Crud.icons.mimetypes[that.iconType] //Server.getUrl('/imagecache/small/' + data.result.filename);
                that.lastUpload = Utility.cloneObj(data.result);
                for (var k in data.result) {
                    console.log('update field',k,data.result[k],jQuery(that.$el).find('[c-marker="' + k + '"]').length);
                    jQuery(that.$el).find('[c-marker="' + k + '"]').val(data.result[k]);
                }

            }).fail(function(data, error, msg){
                console.log("An error occurred, the files couldn't be sent!");
                that.error = true;
                that.errorMessage = "Upload error " + data + " " + error + " " + msg;
            });

            // Server.route(route, function (json) {
            //     that.error = json.error;
            //     that.errorMessage = json.msg;
            //
            // })
        },
        createItem : function (values,status) {
            var that = this;
            values.status=status;
            values.type = that.conf.metadata.relationName;
            values['random_id'] = values.id?values.id:new Date().getTime();
            //values['langs'] = self.langs;
            values['label'] = 'filename'//values[self.labelField]?values[self.labelField]:"";
            console.log('create Form item ' + status,values);
            var renders = {};
            for (var i in that.uploadFields) {
                var field = that.uploadFields[i];
                if ( that.mainformFields.indexOf(field) < 0)
                    continue;
                renders[that.cKey + "-" + field + "[]"] = {
                    type : 'r-hidden',
                    value : values[field]
                }

            }
            for (var i in that.fields) {
                var field = that.fields[i];
                if (that.mainformFields.indexOf(field) < 0)
                    continue;
                var type = 'r-hidden';
                if (that.fieldsConfig[field])
                    type = that.fieldsConfig[field].type || 'r-hidden';
                renders[that.cKey + "-" + field + "[]"] = {
                    type : type,
                    value : values[field]
                }
            }
            renders.preview = that.$Crud.icons.mimetypes[values.ext]?that.$Crud.icons.mimetypes[values.ext]:that.$Crud.icons.mimetypes[that.iconType];
            that.renders.push(renders);
        }

    },
    template: '#r-hasmany-attachment-edit-template',
    mounted : function () {
        var that = this;
        // jQuery(that.$el).find('[c-image-file]').autoUpload(function () {
        //     //console.log('autoupload',jQuery(that.$el).find('form[name="formupload"]').length);
        //     that.uploadImage();
        //     //jQuery(that.$el).find('form[name="formupload"]').submit();
        // });

        jQuery(that.$el).find('[c-attachment-file]').change(function () {
            //console.log('autoupload',jQuery(that.$el).find('form[name="formupload"]').length);
            that.uploadImage();
            //jQuery(that.$el).find('form[name="formupload"]').submit();
        });


        for (var i in that.conf.value) {
            that.createItem(that.conf.value[i], 'updated');
        }

        var uploadRenders = {};
        for (var i in that.uploadFields) {
            var field = that.uploadFields[i];
            uploadRenders[field] = {
                type : 'r-hidden',
                value : ''
            }

        }
        for (var i in that.fields) {
            var field = that.fields[i];
            var type = 'r-hidden';
            if (that.fieldsConfig[field])
                type = that.fieldsConfig[field].type || 'r-hidden';
            uploadRenders[field] = {
                type : type,
                value : ''
            }
        }

        that.uploadRenders = uploadRenders;

    },
});



Vue.component('r-upload-image',{
    extends : Crud.components.renders.rBase, //Crud.components.renders.rHasmanyImageEdit,

    data :  function () {
        var that = this;
        console.log('image edit',that);
        var routeConf =  Utility.cloneObj(that.$Crud.routes.upload);
        var route = Route.factory('upload',routeConf);
        var types = {
            ext : 'r-hidden',
            filename : 'r-hidden',
            original_name : 'r-hidden',
            random : 'r-hidden',
            nome : 'r-input',
            descrizione : 'r-textarea'
        };
        var renders = {
            id : {
                 type : 'r-hidden'
            },
            status : {
                type : 'r-hidden',
                value : 'new'
            },
            nome: {
                type : 'r-input',
            },
            descrizione: {
                type: 'r-textarea'
            },
        };
        var uploadRenders = {
            modelName: {
                type: 'r-hidden',
                //value: that.cConf.metadata.modelName
            },
            type : {
                type : 'r-hidden',
                value : that.cKey,
            },
            nome: {
                type : 'r-input',
            },
            descrizione: {
                type: 'r-textarea'
            },
        }
        var values = [];
        // for (var i in that.cConf.value) {
        //     var newItem = {};
        //     for (var k in renders) {
        //         console.log(i,'key',k,'value',that.cConf.value[i][k])
        //         newItem[that.cKey + '-' + k + '[]'] = {
        //             value : that.cConf.value[i][k]?that.cConf.value[i][k]:'',
        //             type : types[k]?types[k]:'r-input'
        //         }
        //     }
        //     ///imagecache/small/foto_2_1547553970.jpg
        //     newItem.preview = that.cConf.value[i]['full_filename'];
        //     values.push(newItem);
        // }
        //
        // console.log('values',values);
        return {
            //name : this.cConf.name,
            value: values,
            uploadRoute : route.getUrl(),
            error : false,
            errorMessage : '',
            complete:false,
            modelName : 'foto',
            renders : renders,
            uploadRenders : [],
            preview : null,
            lastUpload : null,
            types : types,

            uploadFields : ['ext','random','id','status','original_name','filename','mimetype','modelName','type'],
            fields : ['nome','descrizione'],
            fieldsConfig : {
                nome : { type : 'r-input'},
                descrizione : {type : 'r-textarea'},
            },
            mainformFields : ['nome','descrizione','original_name','filename','ext','random','id','status','mimetype'],




            //domainValues : dV,
            //domainValuesOrder : dVO
        }
    },
    methods : {
        add : function () {
            console.log('add')
            jQuery('#d-image-ulpload').modal('show');
            return ;

            var d = new uploadDialog().$mount('#dialog-mount');
            jQuery('#d-image-ulpload').
            jQuery('#d-image-ulpload').modal('show');
        },
        addItem : function () {
            var that = this;
            jQuery.each(jQuery(that.$el).find('[c-marker]'),function () {
                that.lastUpload[jQuery(this).attr('c-marker')] = jQuery(this).val();
            })
            that.createItem(that.lastUpload,'new');
            //that.lastUpload['nome'] = jQuery(that.$el).find('form[name="formupload"]').find('input[name="nome"]').val();
            //that.lastUpload['descrizione'] = jQuery(that.$el).find('form[name="formupload"]').find('textarea[name="descrizione"]').val();
            // var newItem = {};
            // for (var k in that.renders) {
            //     newItem[that.cKey + '-' + k + '[]'] = {
            //         value : that.lastUpload[k],
            //         type : that.types[k]?that.types[k]:'r-input'
            //     }
            // }
            // that.value.push(newItem);
            // console.log('VALUE',that.value);
            // console.log(that);
        },
        deleteItem : function (index) {
            this.value.splice(index,1);
        },
        uploadImage : function () {
            var that = this;
            var routeConf =  Utility.cloneObj(that.$Crud.routes.uploadfile);
            var route = Route.factory('uploadfile',routeConf);
            //route.params.file = document.getElementById("image-file").files[0]; // jQuery(that.$el).find('input[name="file"]').val();
            //route.params.file = jQuery(that.$el).find('input[name="file"]').prop('files')[0];
            //route.params.modelName = 'test';
            //route.params.type = 'fotos';

            that.error = false;
            that.complete = false;

            var realUrl = Server.getUrl(route.getUrl());
            var data = new FormData();
            data.append('file',jQuery(that.$el).find('[c-image-file]').prop('files')[0]);
            data.append('modelName','test');
            data.append('type','fotos');

            jQuery.ajax({
                url: realUrl,
                type: 'POST',
                data: data,
                processData: false,
                contentType: false                    // Using FormData, no need to process data.
            }).done(function(data){
                that.error = data.error;
                that.lastUpload = null;
                console.log("Success: Files sent!",data);
                if (data.error) {
                    var msg = null;
                    try {
                        var tmp = JSON.parse(data.msg);
                        msg = "";
                        for(k in tmp) {
                            msg += '<div>'+tmp[k]+'</div>';
                        }
                    } catch(e) {
                        msg = data.msg;
                    }
                    that.errorMessage = msg;
                    //self._showError(dialog,msg);
                    jQuery(that.$el).find('[crud-button="ok"]').addClass("disabled");
                    return;
                }
                that.complete = true;
                that.preview = Server.getUrl('/imagecache/small/' + data.result.filename);
                that.lastUpload = Utility.cloneObj(data.result);

            }).fail(function(data, error, msg){
                console.log("An error occurred, the files couldn't be sent!");
                that.error = true;
                that.errorMessage = "Upload error " + data + " " + error + " " + msg;
            });

            // Server.route(route, function (json) {
            //     that.error = json.error;
            //     that.errorMessage = json.msg;
            //
            // })
        },
        createItem : function (values,status) {
            var that = this;
            values.status=status;
            values.type = that.cConf.metadata.relationName;
            values['random_id'] = values.id?values.id:new Date().getTime();
            //values['langs'] = self.langs;
            values['label'] = 'filename'//values[self.labelField]?values[self.labelField]:"";
            console.log('create Form item ' + status,values);
            var renders = {};
            for (var i in that.uploadFields) {
                var field = that.uploadFields[i];
                if (_.indexOf(that.mainformFields,field) < 0)
                    continue;
                renders[that.cKey + "-" + field + "[]"] = {
                    type : 'r-hidden',
                    value : values[field]
                }

            }
            for (var i in that.fields) {
                var field = that.fields[i];
                if (_.indexOf(that.mainformFields,field) < 0)
                    continue;
                var type = 'r-hidden';
                if (that.fieldsConfig[field])
                    type = that.fieldsConfig[field].type || 'r-hidden';
                renders[that.cKey + "-" + field + "[]"] = {
                    type : type,
                    value : values[field]
                }
            }
            renders.preview = status=='new'?values['filename']:values['full_filename'];
            that.value.push(renders);
        }

    },
    template: '#r-hasmany-image-edit-template',
    mounted : function () {
        var that = this;
        jQuery(that.$el).find('[c-image-file]').change(function () {
            //console.log('autoupload',jQuery(that.$el).find('form[name="formupload"]').length);
            that.uploadImage();
            //jQuery(that.$el).find('form[name="formupload"]').submit();
        });


        // for (var i in that.cConf.value) {
        //     that.createItem(that.cConf.value[i], 'updated');
        // }

        var uploadRenders = {};
        // for (var i in that.uploadFields) {
        //     var field = that.uploadFields[i];
        //     uploadRenders[field] = {
        //         type : 'r-hidden',
        //         value : ''
        //     }
        //
        // }
        // for (var i in that.fields) {
        //     var field = that.fields[i];
        //     var type = 'r-hidden';
        //     if (that.fieldsConfig[field])
        //         type = that.fieldsConfig[field].type || 'r-hidden';
        //     uploadRenders[field] = {
        //         type : type,
        //         value : ''
        //     }
        // }
        //
        // that.uploadRenders = uploadRenders;


        // jQuery(this.$el).find('form[name="formupload"]').ajaxForm({
        //     beforeSubmit: function (a, f, o) {
        //         console.log('before submit',a,f,o);
        //         o.dataType = 'json';
        //         that.error = false;
        //         that.complete = false;
        //     },
        //     error: function (data, error, msg) {
        //         console.log('error',data,error,msg);
        //         that.error = true;
        //         that.errorMessage = "Upload error " + data + " " + error + " " + msg;
        //     },
        //     success: function (data) {
        //         //self.app.waitEnd();
        //         console.log('success',data);
        //         that.error = data.error;
        //         that.lastUpload = null;
        //         if (data.error) {
        //             var msg = null;
        //             try {
        //                 var tmp = JSON.parse(data.msg);
        //                 msg = "";
        //                 for(k in tmp) {
        //                     msg += '<div>'+tmp[k]+'</div>';
        //                 }
        //             } catch(e) {
        //                 msg = data.msg;
        //             }
        //             that.errorMessage = msg;
        //             //self._showError(dialog,msg);
        //             jQuery(that.$el).find('[crud-button="ok"]').addClass("disabled");
        //             return;
        //         }
        //         that.complete = true;
        //         that.preview = Server.getUrl('/imagecache/small/' + data.result.filename);
        //         that.lastUpload = Utility.cloneObj(data.result);
        //
        //         // // aggiorno i campi di contorno di uploadfoto
        //         // for (var k in data.result) {
        //         //     jQuery(that.$el).find('form[name="formupload"]').find('input[name="' + k + '"]').attr('value', data.result[k]);
        //         // }
        //         //
        //         // jQuery(that.$el).find('[crud-button="ok"]').removeClass("disabled");
        //         // //self.afterUpload(data);
        //     }
        // });
    },
});



Vue.component('r-swap', {
    extends : Crud.components.renders.rBase,
    template: '#r-swap-template',
    data : function () {
        var that = this;
        SWAP = that;
        var d = this.defaultData();
        d.iconClass = 'fa fa-circle';
        d.title = "swap";
        d.swapType = d.conf.swapType?d.conf.swapType:'icon';
        d.domainValues = {
            icon : {
                0 : 'fa fa-circle text-danger',
                1 : 'fa fa-circle text-success'
            },
            text : {
                0 : 'No',
                1 : 'Si'
            }
        }
        var dV = (d.conf.metadata && d.conf.metadata.domainValues)? d.conf.metadata.domainValues:d.domainValues[d.swapType];
        var keys = Object.keys(dV).map(String);
        if (keys.indexOf(""+d.value) >= 0) {
            d.slot = dV[""+d.value];
        } else {
            d.slot = dV[keys[0]];
        }
        //d.slot = '';
        return d;
    },
    // computed : {
    //     domainValues : function () {
    //
    //     }
    // },
    methods : {
        getDV : function() {
            var that = this;
            console.log('swaptype',that.swapType,'domainValues',that.domainValues)
            return (that.conf.metadata && that.conf.metadata.domainValues)? that.conf.metadata.domainValues:that.domainValues[that.swapType];

        },
        swap : function () {
            var that = this;
            var dV = that.getDV();
            var keys = Object.keys(dV);
            //var labels = Object.values(dV);
            var value = that.value?that.value:keys[0];

            //console.log('dV',dV);
            var vs = keys.map(String);
            var index = vs.indexOf(""+value);
            index = (index + 1) % vs.length;
            //console.log('INDEX ',index,vs,keys,keys[index],vs[index]);

            that._swap(keys[index]);
        },
        _swap : function (key) {
            var that = this;
            var r = Route.factory('set');
            //var viewConf = self._viewConfig[viewKey];
            r.values = {
                modelName: that.conf.metadata.modelName,
                field : that.conf.key?that.conf.key:that.cKey,
                value : that.value
            };

            r.params = {id:that.conf.modelData.id};
            Server.route(r,function (json) {
                if (json.error) {
                    that.crudApp.errorDialog(json.msg);
                    return;
                }
                var dV = that.getDV();
                that.value = key;
                that.slot = dV[key];
                that.change();
                // if (that.view)
                //     that.crudApp.renderView(self.view.keyId);

            })
        },
        getDomainValues : function () {

        }
    }
});
Crud.components.rHasmanyThrough =Vue.component('r-hasmany-through', {
    extends : Crud.components.renders.rBase,
    template: '#r-hasmany-through-template',
    data : function () {
        var d = this.defaultData();
        d.inputType = 'text';
        if (this.cConf.inputType)
            d.inputType = this.cConf.inputType;
        return d;
    },
    methods : {
        getHasmanyConf : function (value) {
            var that = this;
            var hmConf = that.cConf.hasmanyConf?that.cConf.hasmanyConf:{
                fields : [],
                fieldsConfig : {},
                data :  {
                    value : {},
                    metadata : {

                    }
                },
            };
            if (value && Object.keys(value).length > 0) {
                hmConf.data.value = value;
                if (!hmConf.fields || !hmConf.fields.length) {
                    hmConf.fields = Object.keys(value);
                }
            } else {
                // ci sono record gia' presenti prendo da li i fields.
                if (this.value && this.value.length > 0) {
                    if (!hmConf.fields || !hmConf.fields.length) {
                        hmConf.fields = Object.keys(this.value[0]);
                        hmConf.data.value = Utility.cloneObj(this.value[0]);
                    }
                }
            }
            return hmConf;

        },
        addItem : function () {
            var that = this;
            //var conf = that.getHasmanyConf(null);
            that.value.push({});

        }
    }
});
Vue.component('r-b2-select2', {
    extends : Crud.components.renders.rBase,
    template: '#r-b2-select2-template',
    data : function () {
        var d = this.defaultData();
        //d.conf = this.cConf;
        console.log('conf ',d.conf);
        return d;
    },
    methods : {
        afterLoadResources : function () {
            var that = this;
            console.log('b2 afterloadresources')
            var r = Route.factory('autocomplete',{
                values : {
                    modelName : that.conf.metadata.autocompleteModel
                }
            });
            var data = [];
            if (that.value) {
                data.push({
                    id : that.value,
                    selected : true,
                    text : that._getLabel(that.conf.metadata.modelData)
                });
                // that.value.selected = true;
                // that.value.text = that._getLabel(that.value);
                // data.push(that.value);
            }


            jQuery(that.$el).find('[c-select2]').select2({
                data : data,
                ajax : {
                    url : r.getUrl(),
                    dataType: 'json',
                    delay: 250,
                    data: function(params) {
                        return {
                            term: params.term, // search term
                            page: params.page
                        };
                    },
                    processResults: function (data) {
                        // Tranforms the top-level key of the response object from 'items' to 'results'
                        var items = [];
                        for (var i in data.result) {
                            items.push({
                                id : data.result[i].id,
                                text : that._getLabel(data.result[i])
                            });
                        }
                        return {
                            results: items
                        };
                    },
                },
                allowClear : that.allowClear,
                placeholder: that.placeholder?that.placeholder:"Seleziona",
            });
        },
        _getLabel : function(value) {
            var that  =this;
            var label = "";
            for (var i in that.conf.labelFields) {
                label += value[that.conf.labelFields[i]] + " ";
            }
            return label;
        },
        getValue : function () {
            var that = this;
            return jQuery(that.$el).find('[c-select2]').select2('data');
        },
    }

});
Vue.component('r-b2m-select2', {
    extends : Crud.components.renders.rBase,
    template: '#r-b2m-select2-template',
    data : function () {
        var d = this.defaultData();
        //d.conf = this.cConf;
        console.log('conf ',d.conf);
        return d;
    },
    methods : {
        afterLoadResources : function () {
            var that = this;
            console.log('b2 afterloadresources')
            var r = Route.factory('autocomplete',{
                values : {
                    modelName : that.conf.metadata.autocompleteModel
                }
            });
            var selected = [];
            for (var i in that.value) {
                selected.push({
                    id : that.value[i].id,
                    text : that._getLabel(that.value[i]),
                    selected : true,
                });
            }


            jQuery(that.$el).find('[c-select2]').select2({
                data : selected,
                ajax : {
                    url : r.getUrl(),
                    dataType: 'json',
                    delay: 250,
                    data: function(params) {
                        return {
                            term: params.term, // search term
                            page: params.page
                        };
                    },
                    processResults: function (data) {
                        // Tranforms the top-level key of the response object from 'items' to 'results'
                        var items = [];
                        for (var i in data.result) {
                            items.push({
                                id : data.result[i].id,
                                text : that._getLabel(data.result[i])
                            });
                        }
                        return {
                            results: items
                        };
                    },
                },
                placeholder: that.placeholder?self.placeholder:"Seleziona",
            });
            jQuery(that.$el).find('[c-select2]').on('select2:select', function () {
                that._renderHidden();
            });
            jQuery(that.$el).find('[c-select2]').on('select2:unselect', function () {
                that._renderHidden();
            });
            that._renderHidden();

        },
        _getLabel : function(value) {
            var that  =this;
            var label = "";
            for (var i in that.conf.labelFields) {
                label += value[that.conf.labelFields[i]] + " ";
            }
            return label;
        },
        _renderHidden : function () {
            var that = this;
            var values = that.getValue();
            that.jQe('[c-selected-items]').html(' ');
            for (var f in that.conf.hiddenFields) {
                var field = that.conf.hiddenFields[f];
                for (var i in values) {
                    jQuery('<input type="hidden">').attr({
                        'name': that.getFieldName() + '-' + field + '[]',
                        'value':values[i][field]
                    }).appendTo(that.jQe('[c-selected-items]'));
                }
            }

        },
        getValue : function () {
            var that = this;
            return jQuery(that.$el).find('[c-select2]').select2('data');
        },
    }

});
Vue.component('r-upload',{
    extends : Crud.components.renders.rBase,
    template : '#r-upload-template',
    data : function () {
        var d = this.defaultData();
        d.conf = this.cConf;
        console.log('r-upload data',d);
        d.extensions = d.conf.metadata.extensions?d.conf.metadata.extensions:'';
        d.maxFileSize = d.conf.metadata.maxFileSize?d.conf.metadata.maxFileSize:'';
        return d;
    },
    mounted : function () {
        var that = this;
        console.log('r-upload ',that);

        // jQuery(that.$el).find('[c-file]').change(function () {
        //     that.validate();
        // });
    },
    methods : {
        getValue : function () {
            var that = this;
            console.log('filedesc',jQuery(that.$el).find('[c-file]').prop('files'));
            var fileDesc = jQuery(that.$el).find('[c-file]').prop('files');
            if (fileDesc.length) {
                return fileDesc[0].name;
            }

            return null;
        },
        onSuccess : function () {

        },
        onError : function () {

        },
        validate : function () {
            var that = this;
            console.log('validate');
            that.change();
            that.onSuccess();
            /*var extPos = fileupload.lastIndexOf('.');
            var ext = "";
            if (extPos >= 0) {
                ext = fileupload.substr(extPos + 1);
            }
            var cext = ext.toLowerCase();
            switch (cext) {
                case 'xls':
                case 'xlsx':
                case 'csv':
                case 'txt': /!* case 'docx': case 'pdf': case 'wps': case 'rtf':  case 'txt': case 'xps': *!/
                    if (self.iszip) {
                        self.app.waitEnd();
                        self.app.errorDialog("(" + cext + ") Estensione del file non valida");
                        var control = self.uploadForm.find('input[name="file"]');
                        control.val("");
                        return false;
                    }
                    break;
                case 'zip':
                    if (!self.iszip) {
                        self.app.waitEnd();
                        self.app.errorDialog("(" + cext + ") Compressione file non accettata");
                        var control = self.uploadForm.find('input[name="file"]');
                        control.val("");
                        return false;
                    }
                    break;
                default:
                    self.app.waitEnd();
                    self.app.errorDialog("(" + cext + ") Estensione del file non riconosciuta");
                    var control = self.uploadForm.find('input[name="file"]');
                    control.val("");
                    return false;
            }*/
        }
    }
})
Crud.components.views.vBase = Vue.component('v-base', {
    props : ['cConf'],
    extends : Crud.components.cComponent,
    data : function () {
        return this.defaultData();
    },
    mounted : function() {
        var that =this;
        var methods = that.conf?that.conf.methods:{};
        for (var k in methods) {
            console.log('v-base implements methods',k);
            that.methods[k] = function () {
                methods.apply(that,this.arguments);
            }
        }
    },
    methods : {
        defaultData : function () {
            var _c = this.cConf || {};
            return {
                viewTitle : '',
                conf : _c,
            }
        },

        fetchData: function (route,callback) {
            var that = this;
            console.log('fetchData',route);
            if (!route) {
                callback({});
                return;
            }
            Server.route(route,function (json) {
                if (json.error) {
                    that.crudApp.errorDialog(json.msg);
                    return
                }
                callback(json);
            })
        },
        getActionConfig : function(name,type) {

            if (this.conf.customActions[name]) {
                var aConf = {}
                if (!this.$options.components[name]) {
                    Vue.component(name, {
                        extends : actionBase
                    });
                } else {

                    aConf = this.$Crud.recordActions[name]?this.$Crud.recordActions[name]:(this.$Crud.globalActions[name]?this.$Crud.globalActions[name]:{})

                }
                return Utility.merge(aConf,this.conf.customActions[name]);
            }
            if (type == 'record') {
                if (this.$Crud.recordActions[name]) {
                    return Utility.cloneObj(this.$Crud.recordActions[name]);
                } else
                    throw "Azione " + name +  " di tipo record non trovata nelle azioni generali";
            }
            if (type == 'global') {
                if (this.$Crud.globalActions[name]) {
                    return Utility.cloneObj(this.$Crud.globalActions[name]);
                } else
                    throw "Azione " + name +  " di tipo global non trovata nelle azioni generali";
            }
            throw "tipo azione type " + type +  " con nome " + name + " non trovata!";
        },
        /**
         * prende la configurazione assegnata alla view
         * @param modelName
         * @param type
         */
        getConf : function (modelName,type) {
            var conf = null;
            var defaltConf = this.$Crud.conf[type];


            if (this.cConf) {
                if (typeof this.cConf === 'string' || this.cConf instanceof String)
                    conf = window[this.cConf]?window[this.cConf]:(this.$Crud.conf[this.cConf]?this.$Crud.conf[this.cConf]:null);
                else
                    conf = this.cConf;
            } else {
                if (window['Model'+Utility.upperCaseFirst(modelName)]) {
                    var cm = window['Model'+Utility.upperCaseFirst(modelName)];
                    if (cm[type])
                        conf = cm[type];
                    if (type == 'insert' && cm['edit'])
                        conf = cm['edit'];
                }
            }
            if (!conf && !defaltConf)
                throw "Nessuna configurazione trovata per questa view";

            var finalConf = Utility.confMerge(defaltConf,conf);
            console.log('viewConf',finalConf,defaltConf,conf);
            return finalConf;
        },

        _getRoute : function (values) {
            var that = this;
            var route = null;
            console.log('_getRoute',that.conf);
            if (!that.conf)
                return null;
            if (that.conf.routeName == null)
                return null;
            if (!that.route)
                route = Route.factory(that.conf.routeName);
            route.values = values;
            return route;
        },
    },
    template : '<div>view base</div>'
});
Crud.components.views.vRecord = Vue.component('v-record', {
    extends : Crud.components.views.vBase,
    props : ['c-conf','c-model'],
    methods : {
        createRenders : function() {
            var that = this;
            var keys = (that.conf.fields && that.conf.fields.length > 0)?that.conf.fields:Object.keys(that.data.value);
            var renders = {};
            for (var k in keys) {
                var key = keys[k];
                var c = that.conf.fieldsConfig[key]?that.conf.fieldsConfig[key]:{type:that.defaultRenderType};
                if (!c.type)
                    c.type = that.defaultRenderType;
                if (that.data.value && that.data.value[key])
                    c.value = that.data.value[key];
                if (!c.template)
                    c.template = that.conf.renderTemplate;
                renders[key] = c;
            }

            console.log('v-record.renders',renders);
            that.renders = renders;
        },
        createActions : function() {
            var that = this;
            var actions = [];
            for (var i in that.conf.actions) {
                var aName = that.conf.actions[i];
                if (that.$Crud.globalActions[aName])
                    actions.push(aName);
                else if (that.conf.customActions[aName])
                    actions.push(aName);
                else
                    throw "Impossibile trovare la definizione di " + aName;
            }
            that.actions = actions;
        },
        createActionsClass : function () {
            var that = this;
            var actions = {};
            console.log('confff',that.conf);
            for (var i in that.actions) {
                var aName = that.actions[i];
                var aConf = that.getActionConfig(aName,'global');
                aConf.modelData = Utility.cloneObj(that.data.value); //jQuery.extend(true,{},that.data.value);
                aConf.modelName = that.cModel;
                aConf.rootElement = that.$el;
                actions[aName] = aConf;
            }
            that.actionsClass = actions;
        },
        fillData : function (route,json) {
            var that = this;
            var data = {value : {}};
            if (!route) {
                if (that.conf.data) {
                    data = that.conf.data;
                }
            } else {
                var protocol = Protocol.factory(route.protocol);
                protocol.jsonToData(json);
                var prop = Object.getOwnPropertyNames(protocol);
                //console.log(prop);


                for (var i in prop) {
                    //console.log(k,k,prop[k]);
                    data[prop[i]] = protocol[prop[i]];
                }
            }

            that.data = data;
        },
        defaultData : function () {
            return {
                viewTitle : '',
                loading : true,
                renders : {},
                actionsName : [],
                actions : {},
            }
        },
        getFormData : function () {
            var that = this;
            var data = {};
            if (that.jQe('form').length) {
                FORM = that.jQe('form');
                console.log('view form data found',that.jQe('form'))
                data = Utility.getFormData(that.jQe('form'));
            }
            console.log('formdata',data);
            return data;
        }
    },
    data : function() {
        return this.defaultData();
    },
    template : '<div>view record base</div>'
});
Crud.components.views.vCollection = Vue.component('v-collection', {
    extends : Crud.components.views.vBase,
    methods : {
        defaultData : function () {
            return {
                viewTitle : '',
                loading : true,
                renders : {},
                actionsName : [],
                actions : {},
            }
        },
        createRenders : function () {
            var that = this;
            //console.log('Vlist-create renders',that.data);
            var renders = [];
            var recordActions = that.recordActions;
            var recordActionsName = that.recordActionsName;
            var data = that.data;
            var conf = that.conf;
            var keys = that.keys;

            for (var i in data.value) {
                renders.push({});
                recordActions.push({});
                for (var k in that.keys) {
                    var key = keys[k];
                    var c = conf.fieldsConfig[key]?Utility.cloneObj(conf.fieldsConfig[key]):{type:'r-text'};
                    if (data.value[i][key])
                        c.value = data.value[i][key];
                    c.modelData = data.value[i];
                    if (!c.template)
                        c.template = that.conf.renderTemplate;
                    renders[i][key] = c;
                }
                that.createRecordActions(i);
            }
            that.renders = renders;
            that.recordActionsName = recordActionsName;
            //that.recordActions = recordActions;
        },
    },
    data : function () {
        return this.defaultData();
    },
    template : '<div>view collection base</div>'
});

Vue.component('v-list', {
    extends : Crud.components.views.vCollection,
    conf : {},
    props : ['c-conf','c-model'],
    // beforeCreate : function() {
    //     this.template = '#v-view-template';
    // },
    mounted : function() {
        var that = this;
        VLIST = this;
        console.log('MOUNTED CALLED');
        that.route = that._getRoute(that.routeConf.values);
        this.fetchData(that.route,function (json) {
            that.fillData(that.route,json);
            if (that.conf.fields && that.conf.fields.length > 0)
                that.keys = that.conf.fields;
            else
                that.keys =Object.keys(that.data.value[0]);
            that.draw();
            that.loading = false;
        });
    },
    data :  function () {
        var that = this;
        console.log('DATA CALLED');
        //console.log('CRUDCONF',that.$Crud);
        var routeConf =  Utility.cloneObj(that.$Crud.routes.list);
        routeConf.values = {
            modelName: this.cModel
        }

        if (this.$route && this.$route.query)
            routeConf.params = that.$route.query;

        // var route = that._getRoute(routeConf.values);
        var conf = that.getConf(that.cModel,'list');
        console.log('v-list conf',conf);

        //var route = Route.factory('list',routeConf);
        //that.route = route;
        //that.conf = ModelTest.list;

        //this.loading = true;

        var d = {
            loading : true,
            renders : {},
            keys : [],
            recordActionsName : [],
            recordActions: [],
            globalActions : {},
            globalActionsName : [],
            routeConf : routeConf,
            route : null,
            data : [],
            maxPage : 0,
            conf : conf,
            needSelection : true,
            pagination : {},
            viewTitle : '',
        };
        if (d.conf.viewTitle) {
            d.viewTitle = d.conf.viewTitle;
        }
        return d;
    },
    _existsActions : function(name) {
        alert(name)
    },
    methods: {

        draw : function() {
            var that = this;
            that.createActions();
            that.createRenders();
            that.createGlobalActions();
            console.log('renders',that.renders,'recordActions',that.recordActions);
            console.log('globalActions',that.globalActions);
        },

        fillData : function(route, json) {
            var that = this;
            var data = {};
            if (!route) {
                console.log('dati manuali',that.conf.data);
                if (that.conf.data) {
                    data = that.conf.data;
                    that.pagination = that.conf.data.pagination?that.conf.data.pagination:{};
                }
            } else {

                var protocol = Protocol.factory(route.protocol);
                protocol.jsonToData(json);
                var prop = Object.getOwnPropertyNames(protocol);
                //console.log(prop);
                var data = {};

                for (var i in prop) {
                    //console.log(k,k,prop[k]);
                    data[prop[i]] = protocol[prop[i]];
                }
                var data = data;
                //this.maxPage = data.pagination.last_page;
                that.pagination = data.pagination;
            }
            that.data = data;
            console.log('MAX PAGE',this.maxPage,data.pagination)
        },

        createActions : function () {
            var that = this;
            var globalActionsName = [];
            var recordActionsName = [];

            for (var i in that.conf.actions) {
                var aName = that.conf.actions[i];
                if (that.$Crud.recordActions[aName])
                    recordActionsName.push(that.conf.actions[i]);
                else if (that.$Crud.globalActions[aName])
                    globalActionsName.push(aName);
                else if (that.conf.customActions[aName]) {
                    Vue.component(aName, {
                        extends : actionBase
                    });
                    if (that.conf.customActions[aName].type == 'global')
                        globalActionsName.push(aName);
                    else if (that.conf.customActions[aName].type == 'record')
                        recordActionsName.push(aName);
                    else
                        throw  "tipo di action (" + that.conf.customActions[aName].type + ") non definito! valori accettati sono record,global";
                } else {
                    throw "Impossibile trovare la definizione di " + aName;
                }
            }
            //console.log('data',data,'conf',conf,'keys',keys);
            that.globalActionsName = globalActionsName;
            that.recordActionsName = recordActionsName;
            that.globalActions = {};
            that.recordActions = [];
        },
        createRecordActions : function(row) {
            console.log('row',row);
            var that = this;
            var recordActionsName = that.recordActionsName;
            var recordActions = that.recordActions;
            var data = that.data;

            for(var k in recordActionsName) {
                var aName = recordActionsName[k];
                var aConf = that.getActionConfig(aName,'record');
                //var a = jQuery.extend(true,{},aConf);
                //a.id = data.value[i].id;
                aConf.modelData = Utility.cloneObj(data.value[row]);
                aConf.modelName = that.cModel;
                recordActions[row][aName] = aConf;
            }
        },
        createGlobalActions : function () {
            var that = this;
            var globalActions = [];
            var globalActionsName = that.globalActionsName;
            var data = that.data;

            for (var i in globalActionsName) {
                var aName = globalActionsName[i];
                var aConf = that.getActionConfig(aName,'global');
                //var a = jQuery.extend(true,{},aConf);
                //a.id = data.value[i].id;
                aConf.modelData = jQuery.extend(true,{},data.value);
                aConf.modelName = that.cModel;
                aConf.rootElement = that.$el;
                globalActions[aName] = aConf;
            }
            that.globalActions = globalActions;
        },
        getOrderConf : function (key) {
            var that = this;
            console.log('GETORDERCONF CALLED');
            var conf = that.getActionConfig('action-order','global');
            conf.title = 'Order by ' + key;
            conf.text = key;
            conf.orderField = that.conf.orderFields[key];
            if (that.data.order_field)
                conf.orderDirection = (that.data.metadata.order_field == conf.orderField)?that.data.metadata.order_direction:null;
            return conf;
        },
        reload : function () {
            var that = this;
            var route = Route.factory('list',that.routeConf);
            that.loading = true;
            that.fetchData(route,function (json) {
                that.fillData(route,json);
                that.draw();
                that.loading = false;
            });
        },
        selectAllRows : function () {
            var that = this;
            var sel = that.jQe('[c-row-check-all]').prop('checked');
            that.jQe('[c-row-check]').prop('checked',sel);
        },
        selectedRows : function () {
            var that = this;
            var sel = [];
            that.jQe('[c-row-check]').each(function () {
                if (jQuery(this).prop('checked')) {
                    var index = jQuery(this).closest('tr').index();
                    sel.push(that.data.value[index].id);
                }
            });
            console.log('select3ed',sel);
            return sel;
        }
    },
    watch : {
        routeConf : {
            deep : true,
            handler() {
                this.reload();

            }
        }
    },
    template : '#v-list-template'
});




Vue.component('v-list-edit', {
    extends : Crud.components.views.vCollection,
    conf : {},
    props : ['c-conf','c-model'],
    // beforeCreate : function() {
    //     this.template = '#v-view-template';
    // },
    data :  function () {
        VLIST = this;
        var that = this;
        //console.log('CRUDCONF',that.$Crud);
        var routeConf =  Utility.cloneObj(that.$Crud.routes.list);
        routeConf.values = {
            modelName: this.cModel
        }

        if (this.$route && this.$route.query)
           routeConf.params = that.$route.query;

        var route = Route.factory('list',routeConf);
        that.route = route;
        //that.conf = ModelTest.list;

        this.loading = true;
        this.fetchData(route,function (json) {
            that.fillData(route,json);
            that.keys = that.conf.fields?that.conf.fields:Object.keys(that.data.value[0]);
            that.draw();
            that.loading = false;
        });
        var d = {
            loading : true,
            renders : {},
            keys : [],
            recordActionsName : [],
            recordActions: [],
            globalActions : {},
            globalActionsName : [],
            routeConf : routeConf,
            route : route,
            data : [],
            maxPage : 0,
            conf : that.getConf(that.cModel,'list'),
            needSelection : true,
            pagination : {},
            viewTitle : '',
        };
        if (d.conf.viewTitle) {
            d.viewTitle = d.conf.viewTitle;
        }
        return d;
    },
    _existsActions : function(name) {
        alert(name)
    },
    methods: {

        draw : function() {
            var that = this;
            that.createActions();
            that.createRenders();
            that.createGlobalActions();
            console.log('renders',that.renders,'recordActions',that.recordActions);
            console.log('globalActions',that.globalActions);
        },

        fillData : function(route, json) {
            var protocol = Protocol.factory(route.protocol);
            protocol.jsonToData(json);
            var prop = Object.getOwnPropertyNames(protocol);
            //console.log(prop);
            var data = {};

            for (var i in prop) {
                //console.log(k,k,prop[k]);
                data[prop[i]] = protocol[prop[i]];
            }
            this.data = data;
            this.maxPage = data.pagination.last_page;
            this.pagination = data.pagination;
            console.log('MAX PAGE',this.maxPage,data.pagination)
        },
        // createRenders : function () {
        //     var that = this;
        //     //console.log('Vlist-create renders',that.data);
        //     var renders = [];
        //     var recordActions = that.recordActions;
        //     var recordActionsName = that.recordActionsName;
        //     var data = that.data;
        //     var conf = that.conf;
        //     var keys = that.keys;
        //
        //     for (var i in data.value) {
        //         renders.push({});
        //         recordActions.push({});
        //         for (var k in that.keys) {
        //             var key = keys[k];
        //             var c = conf.fieldsConfig[key]?Utility.cloneObj(conf.fieldsConfig[key]):{type:'r-text'};
        //             if (data.value[i][key])
        //                 c.value = data.value[i][key];
        //             c.modelData = data.value[i];
        //             renders[i][key] = c;
        //         }
        //         that.createRecordActions(i);
        //     }
        //     that.renders = renders;
        //     that.recordActionsName = recordActionsName;
        //     //that.recordActions = recordActions;
        // },
        createActions : function () {
            var that = this;
            var globalActionsName = [];
            var recordActionsName = [];

            for (var i in that.conf.actions) {
                var aName = that.conf.actions[i];
                if (that.$Crud.recordActions[aName])
                    recordActionsName.push(that.conf.actions[i]);
                else if (that.$Crud.globalActions[aName])
                    globalActionsName.push(aName);
                else if (that.conf.customActions[aName]) {
                    Vue.component(aName, {
                        extends : actionBase
                    });
                    if (that.conf.customActions[aName].type == 'global')
                        globalActionsName.push(aName);
                    else if (that.conf.customActions[aName].type == 'record')
                        recordActionsName.push(aName);
                    else
                        throw  "tipo di action (" + that.conf.customActions[aName].type + ") non definito! valori accettati sono record,global";
                } else {
                    throw "Impossibile trovare la definizione di " + aName;
                }
            }
            //console.log('data',data,'conf',conf,'keys',keys);
            that.globalActionsName = globalActionsName;
            that.recordActionsName = recordActionsName;
            that.globalActions = {};
            that.recordActions = [];
        },
        createRecordActions : function(row) {
            console.log('row',row);
            var that = this;
            var recordActionsName = that.recordActionsName;
            var recordActions = that.recordActions;
            var data = that.data;

            for(var k in recordActionsName) {
                var aName = recordActionsName[k];
                var aConf = that.getActionConfig(aName,'record');
                //var a = jQuery.extend(true,{},aConf);
                //a.id = data.value[i].id;
                aConf.modelData = Utility.cloneObj(data.value[row]);
                aConf.modelName = that.cModel;
                recordActions[row][aName] = aConf;
            }
        },
        createGlobalActions : function () {
            var that = this;
            var globalActions = [];
            var globalActionsName = that.globalActionsName;
            var data = that.data;

            for (var i in globalActionsName) {
                var aName = globalActionsName[i];
                var aConf = that.getActionConfig(aName,'global');
                //var a = jQuery.extend(true,{},aConf);
                //a.id = data.value[i].id;
                aConf.modelData = jQuery.extend(true,{},data.value);
                aConf.modelName = that.cModel;
                aConf.rootElement = that.$el;
                globalActions[aName] = aConf;
            }
            that.globalActions = globalActions;
        },
        getOrderConf : function (key) {
            var that = this;
            var conf = that.getActionConfig('action-order','global');
            conf.title = 'Order by ' + key;
            conf.text = key;
            conf.orderField = that.conf.orderFields[key];
            conf.orderDirection = (that.data.metadata.order_field == conf.orderField)?that.data.metadata.order_direction:null;
            return conf;
        },
        reload : function () {
            var that = this;
            var route = Route.factory('list',that.routeConf);
            that.loading = true;
            that.fetchData(route,function (json) {
                that.fillData(route,json);
                that.draw();
                that.loading = false;
            });
        },
        selectAllRows : function () {
            var that = this;
            var sel = that.jQe('[c-row-check-all]').prop('checked');
            that.jQe('[c-row-check]').prop('checked',sel);
        },
        selectedRows : function () {
            var that = this;
            var sel = [];
            that.jQe('[c-row-check]').each(function () {
                if (jQuery(this).prop('checked')) {
                    var index = jQuery(this).closest('tr').index();
                    sel.push(that.data.value[index].id);
                }
            });
            console.log('select3ed',sel);
            return sel;
        }
    },
    watch : {
        routeConf : {
            deep : true,
            handler() {
                this.reload();

            }
        }
    },
    template : '#v-list-edit-template'
});

Vue.component('v-edit', {
    extends : Crud.components.views.vRecord,
    props : ['c-model','c-pk'],

    mounted : function() {
        var that = this;
        var route = that._getRoute({
            modelName: this.cModel,
            pk: this.cPk
        });
        that.route = route;

        this.fetchData(that.route,function (json) {
            that.fillData(that.route,json);
            that.createActions();
            that.createActionsClass();
            that.createRenders();
            console.log('BBBBBBB');
            that.loading = false;
        });
    },
    data :  function () {
        var that = this;
        var d = this.defaultData();
        d.conf = that.getConf(that.cModel,'edit');


        var dEdit = {
            loading : true,
            renders : {},
            actionsClass : [],
            actions : {},
            data : {},
            route : null,
            viewTitle : d.conf.viewTitle,
            defaultRenderType : 'r-input',
        }
        return Utility.merge(d,dEdit);

    },
    methods : {
       getFormData : function () {

       }
    },
    template : '#v-edit-template'
});

Vue.component('v-view', {
    extends : Crud.components.views.vRecord,
    props : ['c-conf','c-model','c-pk'],
    data :  function () {
        var that = this;
        that.conf = that.getConf(that.cModel,'view');
        var routeName = 'insert';
        if (that.conf.rounteName != null) {
            routeName = that.conf.rounteName;
        }
        that.route = Route.factory('view',{
            values : {
                modelName: this.cModel,
                pk: this.cPk
            }
        })

        this.fetchData(that.route,function (json) {
            that.fillData(that.route,json);
            that.createActions();
            that.createActionsClass();
            that.createRenders();
            that.loading = false;
            console.log(that);
        });
        return {
            loading : true,
            renders : {},
            actionsClass : [],
            actions : {},
            data : {},
            conf : that.conf,
            //route : route,
            defaultRenderType : 'r-text',
        }

    },

    template : '#v-view-template'
});

Vue.component('v-insert', {
    extends : Crud.components.views.vRecord,
    props : ['c-conf','c-model'],

    mounted : function() {
        var that = this;
        var route = that._getRoute({
            modelName: this.cModel,
        });

        that.route = route;
        that.fetchData(that.route,function (json) {
            that.fillData(that.route,json);
            that.createActions();
            that.createActionsClass();
            that.createRenders();
            that.loading = false;
        });
    },

    data :  function () {
        var that = this;
        var d = this.defaultData();
        d.conf = that.getConf(that.cModel,'insert');

        var dInsert = {
            loading : true,
            renders : {},
            actionsClass : [],
            actions : {},
            data : {},
            conf : that.conf,
            defaultRenderType : 'r-input',
        }
        return Utility.merge(d,dInsert);

    },
    template : '#v-insert-template'

});

Vue.component('v-search', {
    extends : Crud.components.views.vRecord,
    props : ['c-conf','c-model','c-route-conf','c-target-ref'],
    data :  function () {
        var that = this;

        //var targetView = this.parent.$refs[that.cTargetView];
        //var targetView = null;
        //console.log('SEARCH',that.cModel,that.cRouteConf,that.cTargetView,targetView);
        that.conf = that.getConf(that.cModel,'search');
        var routeName = 'search';
        if (that.conf.routeName != null) {
            routeName = that.conf.routeName;
        }
        that.route = Route.factory(routeName,{
            values : {
                modelName: that.cModel,
            }
        })
        //that.createActions();
        this.fetchData(that.route,function (json) {
            that.fillData(that.route,json);
            that.createActions();
            that.createActionsClass();
            that.createRenders();
            that.loading = false;
        });

        return {
            loading : true,
            renders : {},
            actionsClass : [],
            actions : {},
            data : {},
            conf : that.conf,
            //route : route,
            defaultRenderType : 'r-input',
            targetRef : that.cTargetRef,
        }
    },
    methods : {
        doSearch : function (params) {
            var that = this;
            var oldP = Utility.cloneObj(this.cRouteConf.params);

            for (var k in params) {
                oldP[k] = params[k];
            }
            this.cRouteConf.params = oldP;
        }  
    },
    template : '#v-search-template'
});

Vue.component('v-hasmany', {
    extends : Crud.components.views.vRecord,
    props : ['c-conf'],
    data :  function () {
        var that = this;
        var conf = that.getConf(that.cModel,'edit');
        //that.createActions();

        //that.loading = true;

        return {
            loading : true,
            renders : {},
            actionsClass : [],
            actions : {},
            data : {},
            conf : conf,//jQuery.extend(true,{},ModelTest.edit),
            defaultRenderType : 'r-input',
        }

    },
    methods : {
        fillData : function () {
            this.data = this.conf.data;
        },
        renderKey : function (key) {
            var that = this;
            return that.cModel + "-" + key + '[]';
        }
    },
    mounted : function () {
        var that = this;
        this.fetchData(null,function (json) {
            that.fillData(null,null);
            that.createActions();
            that.createActionsClass();
            that.createRenders();
            that.loading = false;
            console.log('v-hasmany',that.loading);
        });
    },
    template : '#v-hasmany-template'
});

Vue.component('v-hasmany-view', {
    extends : Crud.components.views.vRecord,
    props : ['c-conf'],
    data :  function () {
        var that = this;
        that.conf = that.getConf(that.cModel,'edit');
        //that.createActions();

        //that.loading = true;

        return {
            loading : true,
            renders : {},
            actionsClass : [],
            actions : {},
            data : {},
            conf : that.conf,//jQuery.extend(true,{},ModelTest.edit),
            defaultRenderType : 'r-text',
        }

    },
    methods : {
        fillData : function () {
            this.data = this.cConf.data;
        },
        renderKey : function (key) {
            var that = this;
            return that.cModel + "-" + key + '[]';
        }
    },
    mounted : function () {
        var that = this;
        this.fetchData(null,function (json) {
            that.fillData(null,null);
            that.createActions();
            that.createActionsClass();
            that.createRenders();
            that.loading = false;
            console.log('v-hasmany',that.loading);
        });
    },
    template : '#v-hasmany-template'
});

const CrudVue = Vue.extend({
    created : function() {
        var that = this;
        that.crudApp.pluginsPath = this.pluginsPath?this.plugisPath:'/';
        var resources = [];
        resources.push(this.templatesFile);
        for (var k in this.$Crud.components.libs) {
            resources.push(that.$Crud.components.libs[k].tpl);
            resources.push(that.$Crud.components.libs[k].js);
        }
        that.crudApp.loadResources(resources,function () {
            that.$mount('#app');
        })

    },
    data : function () {

    },
    methods : {
        onChangeViewConf : function (view) {
            
        }
    }
});