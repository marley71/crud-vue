
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