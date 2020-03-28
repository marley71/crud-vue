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

// lang = {
//     app : {
//         'add' : "Aggiungi",
//         'conferma-delete' : 'Sicuro di voler cancellare l\'elemento?',
//         'conferma-multidelete' : 'Sei sicuro di voler cancellare (0) elementi selezionati?'
//     },
//     model : {
//         foto : 'foto',
//         attachment : 'allegato'
//     }
// }
const crud = {
    lang : {
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
    },
    application : {
        useRouter : false,
    },
    icons : {
        mimetypes : {
            "default"   : 'fa fa-file-o',
            "application/xls"       : 'fa fa-file-excel-o',
            "xlsx"      : 'fa fa-file-excel-o',
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" : 'fa fa-file-excel-o',
            "zip"       : 'fa fa-file-archive-o',
            "mp3"       : 'fa fa-audio-o',
            "image/jpeg"       : "fa fa-image-o",
            "application/pdf"       : "fa fa-file-pdf-o",
            "txt"       : "fa fa-file-text-o",
        }

    },
    recordActions : {
        'action-edit' : {
            type : 'record',
            title : 'app.modifica',
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
            execute : function () {
                var that = this;
                that.$crud.confirmDialog(that.$crud.lang['app.conferma-cancellazione'] ,{
                    ok : function () {

                        var r = that.$crud.routeFactory('delete');
                        //r.setValues(that.view);
                        r.values = {
                            modelName: that.view.cModel,
                            pk : that.modelData.id
                        };
                        Server.route(r,function (json) {
                            that.view.reload();
                        });
                    }
                });
            }
        },
    },
    collectionActions : {

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
                r.params = this.$crud.getFormData(this.view.jQe('form'));
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
                    var ref = this.$crud.cRefs[this.view.targetRef];

                    // var ref = this.view.$parent.$refs[this.view.targetRef];
                    // if (!ref) {
                    //     console.error(this.view.targetRef +' ref non trovata in ',this.view.$parent.$refs);
                    //     throw "errore";
                    // }
                    var formData = this.view.getFormData();

                    //var form = jQuery(this.view.$el).find('form');
                    //var formData = Utility.getFormData(form);
                    ref.routeConf.params = formData;
                    return ;
                }

                if (this.view.cRouteConf) {
                    var routeConf = this.$crud.cloneObj(this.view.cRouteConf);
                    var form = jQuery(this.view.$el).find('form');
                    var formData = this.$crud.getFormData(form);
                    console.log('formData',formData);
                    this.view.doSearch(formData)
                    //this.view.setCRouteCo .cRouteConf = routeConf;
                } else
                    console.warn('routeConf non definita')
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
                var params = this.$crud.cloneObj(this.view.routeConf.params);
                params.order_field = this.orderField;
                //params.order_direction = (this.view.data.metadata.order.field == this.orderField)?(this.view.data.metadata.order.direction.toLowerCase() == 'asc'?'DESC':'ASC'):'Asc';
                params.order_direction = (!this.orderDirection || this.orderDirection.toLowerCase() == 'desc')?'ASC':'DESC';
                this.view.routeConf.params = params;
            }
        },
        'action-delete-selected' : {
            type : 'collection',
            title : 'app.cancella-selezionati',
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
            primaryKey : 'id',
            routeName : 'view',
            fieldsConfig : {},
            actions : ['action-back'],
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
            url         : '/api/json/{modelName}/uploadfile',
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
        delete : {
            method      : "post",
            url         :'/foorm/{modelName}/{pk}',
            resultType  : 'record',
            protocol    : 'record',
            type : 'delete',
            extraParams : {_method:'DELETE'}
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

dialogs_interface = {
    methods  : {
        messageDialog : function (bodyProps,callbacks) {
            var that = this;
            var props = bodyProps;
            if (typeof bodyProps === 'string' || bodyProps instanceof String) {
                props = {
                    cMessage : bodyProps,
                }
            }
            var d = new crud.components.dMessage({
                propsData : props,
                methods : callbacks,
            });
            var id= 'd' + (new Date().getTime());
            jQuery('body').append('<div id="'+id+'"></div>');
            d.$mount('#'+id);
            return ;
        },
        errorDialog : function (bodyProps,callbacks) {
            var props = bodyProps;
            if (typeof bodyProps === 'string' || bodyProps instanceof String) {
                props = {
                    cMessage : bodyProps,
                }
            }
            var d = new crud.components.dError({
                propsData : props,
                methods : callbacks,
            });
            var id= 'd' + (new Date().getTime());
            jQuery('body').append('<div id="'+id+'"></div>');
            d.$mount('#'+id);
        },

        confirmDialog : function (bodyProps,callbacks) {
            var that = this;
            var props = bodyProps;
            if (typeof bodyProps === 'string' || bodyProps instanceof String) {
                props = {
                    cMessage : bodyProps,
                }
            }
            var d = new crud.components.dConfirm({
                propsData : props,
                methods : callbacks,
            });
            var id= 'd' + (new Date().getTime());
            jQuery('body').append('<div id="'+id+'"></div>');
            d.$mount('#'+id);
        },

        warningDialog : function (bodyProps,callbacks) {
            var that = this;
            var props = bodyProps;
            if (typeof bodyProps === 'string' || bodyProps instanceof String) {
                props = {
                    cMessage : bodyProps,
                }
            }
            var d = new crud.components.dWarning({
                propsData : props,
                methods : callbacks,
            });
            var id= 'd' + (new Date().getTime());
            jQuery('body').append('<div id="'+id+'"></div>');
            d.$mount('#'+id);
        },

        customDialog : function (bodyProps,callbacks) {
            var that = this;
            var props = bodyProps;
            if (!bodyProps || typeof bodyProps === 'string' || bodyProps instanceof String) {
                props = {
                    cContent : bodyProps,
                    cCallbacks : callbacks
                }
            } else
                props.cCallbacks = callbacks;

            var d = new crud.components.dCustom({
                propsData : props,
                //methods : callbacks,
            });
            var id= 'd' + (new Date().getTime());
            jQuery('body').append('<div id="'+id+'"></div>');
            d.$mount('#'+id);
        },


        popover : function (message,classes,time) {
            dialogs_interface._popover(message,classes,time);
        },

        popoverSuccess : function (message,time) {
            dialogs_interface._popover(message,'alert alert-success',time);
        },
        popoverError : function (message,time) {
            dialogs_interface._popover(message,'alert alert-danger',time);
        },
        popoverInfo : function (message,time) {
            dialogs_interface._popover(message,'alert alert-info',time);
        },
        popoverWarning : function (message,time) {
            dialogs_interface._popover(message,'alert alert-warning',time);
        }
// var _progressDialog = null;
// App.progressDialog = function (content,callbacks) {
//     var self = this;
//     if (!_progressDialog) {
//         _progressDialog = new ProgressModal({
//             labels : jQuery.langDefs
//         });
//     }
//     _progressDialog.show(content,callbacks);
//     return _progressDialog;
// }
    },
    _popover : function (message,classes,time) {
        var id= 'pop' + (new Date().getTime());
        _cls = 'alert alert-primary ' + (classes?classes:'');
        var content = crud.translate(message);
        var _t = 2000;
        if( time === 0 ){
            content += '<button type="button" class="close" data-dismiss="alert" aria-label="Close">\n' +
                '    <span aria-hidden="true">&times;</span>\n' +
                '  </button>';
        } else if (time) {
            _t = time;
        }
        var top  = window.pageYOffset || document.documentElement.scrollTop;
        var style = 'position:absolute;z-index:100000;width:50%;left:25%;top:'+top+'px';
        jQuery('body').prepend('<div id="'+id+'" class="' + _cls +'" style="' + style + '">' + content +'</div>');
        if (time !== 0) {
            setTimeout(function() {
                jQuery('#'+id).remove();
            }, _t);
        }
        jQuery('#'+id).popover('show');
    }

};
core_interface = {
    methods : {

        getFormData : function (form) {
            var that = this;

            var _serializeAssoc = function (form) {
                var ss = form.serializeArray();
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
            }




            //var form = that.jQe('form[name="data_form"]');
            if (form && form.length === 0) {
                that.app.log.error('form not found!');
                return {};
            }
            if (typeof tinyMCE !== 'undefined') {
                tinyMCE.triggerSave();
            }
            var formData =  _serializeAssoc(form);//form.serializeAssoc();
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
        // funzioni trasformazioni standard case
        sentenceCase : function (str) {
            if (str == null) {
                return '';
            }

            return String(str)
            // Enables camel case support.
                .replace(core_interface._CAMEL_CASE_REGEXP, '$1 $2')
                // Add a space after any digits.
                .replace(core_interface._TRAILING_DIGIT_REGEXP, '$1 $2')
                // Remove all non-word characters and replace with a single space.
                .replace(core_interface._NON_WORD_REGEXP, ' ')
                // Trim whitespace around the string.
                .replace(/^ | $/g, '')
                // Finally lower case the entire string.
                .toLowerCase();
        },
        camelCase : function (string) {
            return this.$crud.sentenceCase(string)
            // Replace periods between numeric entities with an underscore.
                .replace(/(\d) (?=\d)/g, '$1_')
                // Replace spaces between words with a string upper cased character.
                .replace(/ (\w)/g, function (_, $1) {
                    return $1.toUpperCase();
                });
        },
        costantCase : function (string) {
            return core_interface.snakeCase(string).toUpperCase();
        },
        dotCase : function (string) {
            return core_interface.sentenceCase(string).replace(/ /g, '.');
        },
        isLowerCase : function (string) {
            return core_interface.lowerCase(string) === string;
        },
        isUpperCase : function (string) {
            return core_interface.upperCase(string) === string;
        },
        lowerCase : function (str) {
            var toLower = String.prototype.toLowerCase;
            return str == null ? '' : toLower.call(str);
        },
        paramCase : function (string) {
            return core_interface.sentenceCase(string).replace(/ /g, '-');
        },
        pascalCase : function (string) {
            return this.$crud.upperCaseFirst(this.$crud.camelCase(string));
        },
        pathCase : function (string) {
            return core_interface.sentenceCase(string).replace(/ /g, '/');
        },
        snakeCase : function (string) {
            return core_interface.sentenceCase(string).replace(/ /g, '_');
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
            return core_interface.sentenceCase(string).replace(/^\w| \w/g, core_interface.upperCase);
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

        cloneObj : function (obj) {
            return jQuery.extend(true,{},obj);
        },

        confMerge : function(obj1,obj2) {
            var specialsKey = ['fields','fieldsConfig','customActions'];
            var c1 = this.$crud.cloneObj(obj1);
            var c2 = this.$crud.cloneObj(obj2);

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

        routeFactory : function(routeName) {
            var that = this;
            if (! that.$crud.routes[routeName])
                throw "routeName " + routeName + ' not found';
            var r = new Route(that.$crud.routes[routeName]);
            return r;
        },
        /**
         * ritorna i parametri sotto forma di vettore associativo di un url altrimenti di location.search
         * @param url
         */
        getAllUrlParams : function (url) {
            var params = {};
            var tmp = url?url.split('?'):location.search.split("?");


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
            //console.log('getAllUrlParams',url,params);
            return params;

        },


        /**
         * carica un vettore di risorse, al fine caricamento chiama la callback
         * @param resources
         * @param callback
         */
        loadResources : function(resources, callback) {
            var that = this;
            var _callback = callback?callback:function () {};
            if (!resources || resources.length == 0) {
                _callback();
                return ;
            }

            var _recursive = function (i) {
                that.$crud.loadResource(resources[i],function () {
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
        },
        /**
         * carica una risorsa script o css dinamicamente partendo dalla cartella
         * pluginsPath quando lo script e' stato caricato chiama la callback
         * @param fileName
         * @param callback
         */
        loadResource : function (fileName, callback) {
            var that = this;
            //console.log('App.loadResourece',fileName)
            var _callback = callback?callback:function () {};
            if (!fileName) {
                that.log.warn('App.loadResorce fileName non definito!');
                _callback();
                return ;
            }
            var re = /(?:\.([^.]+))?$/;
            var ext = re.exec(fileName)[1];
            var realPath = fileName;
            if (fileName.indexOf('http') != 0) {
                realPath = ( (fileName.charAt(0) == '/') || (fileName.indexOf('../') === 0) ) ? fileName : that.pluginsPath + fileName;
            }
            if (ext == 'js') {
                core_interface._loadScript(realPath,_callback);
            } else if (ext == 'css') {
                core_interface._loadCss(realPath,_callback);
            } else if (ext == 'html') {
                core_interface._loadHtml(realPath,_callback);
            } else {
                throw 'invalid extension ' + ext + ", filename: " + fileName;
            }
        },
        getRefId : function () {
            var id = "";
            for (var i = 0; i < arguments.length; i++) {
                id += arguments[i];
                if (i < arguments.length-1)
                    id += '-';
            }
            return id;
        }
    },

    _NON_WORD_REGEXP : /[^\u0041-\u005A\u0061-\u007A\u00AA\u00B5\u00BA\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u0527\u0531-\u0556\u0559\u0561-\u0587\u05D0-\u05EA\u05F0-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u08A0\u08A2-\u08AC\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0977\u0979-\u097F\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C33\u0C35-\u0C39\u0C3D\u0C58\u0C59\u0C60\u0C61\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D60\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F4\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1877\u1880-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191C\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19C1-\u19C7\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5\u1CF6\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2183\u2184\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005\u3006\u3031-\u3035\u303B\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FCC\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA697\uA6A0-\uA6E5\uA717-\uA71F\uA722-\uA788\uA78B-\uA78E\uA790-\uA793\uA7A0-\uA7AA\uA7F8-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA80-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uABC0-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC\u0030-\u0039\u00B2\u00B3\u00B9\u00BC-\u00BE\u0660-\u0669\u06F0-\u06F9\u07C0-\u07C9\u0966-\u096F\u09E6-\u09EF\u09F4-\u09F9\u0A66-\u0A6F\u0AE6-\u0AEF\u0B66-\u0B6F\u0B72-\u0B77\u0BE6-\u0BF2\u0C66-\u0C6F\u0C78-\u0C7E\u0CE6-\u0CEF\u0D66-\u0D75\u0E50-\u0E59\u0ED0-\u0ED9\u0F20-\u0F33\u1040-\u1049\u1090-\u1099\u1369-\u137C\u16EE-\u16F0\u17E0-\u17E9\u17F0-\u17F9\u1810-\u1819\u1946-\u194F\u19D0-\u19DA\u1A80-\u1A89\u1A90-\u1A99\u1B50-\u1B59\u1BB0-\u1BB9\u1C40-\u1C49\u1C50-\u1C59\u2070\u2074-\u2079\u2080-\u2089\u2150-\u2182\u2185-\u2189\u2460-\u249B\u24EA-\u24FF\u2776-\u2793\u2CFD\u3007\u3021-\u3029\u3038-\u303A\u3192-\u3195\u3220-\u3229\u3248-\u324F\u3251-\u325F\u3280-\u3289\u32B1-\u32BF\uA620-\uA629\uA6E6-\uA6EF\uA830-\uA835\uA8D0-\uA8D9\uA900-\uA909\uA9D0-\uA9D9\uAA50-\uAA59\uABF0-\uABF9\uFF10-\uFF19]+/g,
    _CAMEL_CASE_REGEXP : /([\u0061-\u007A\u00B5\u00DF-\u00F6\u00F8-\u00FF\u0101\u0103\u0105\u0107\u0109\u010B\u010D\u010F\u0111\u0113\u0115\u0117\u0119\u011B\u011D\u011F\u0121\u0123\u0125\u0127\u0129\u012B\u012D\u012F\u0131\u0133\u0135\u0137\u0138\u013A\u013C\u013E\u0140\u0142\u0144\u0146\u0148\u0149\u014B\u014D\u014F\u0151\u0153\u0155\u0157\u0159\u015B\u015D\u015F\u0161\u0163\u0165\u0167\u0169\u016B\u016D\u016F\u0171\u0173\u0175\u0177\u017A\u017C\u017E-\u0180\u0183\u0185\u0188\u018C\u018D\u0192\u0195\u0199-\u019B\u019E\u01A1\u01A3\u01A5\u01A8\u01AA\u01AB\u01AD\u01B0\u01B4\u01B6\u01B9\u01BA\u01BD-\u01BF\u01C6\u01C9\u01CC\u01CE\u01D0\u01D2\u01D4\u01D6\u01D8\u01DA\u01DC\u01DD\u01DF\u01E1\u01E3\u01E5\u01E7\u01E9\u01EB\u01ED\u01EF\u01F0\u01F3\u01F5\u01F9\u01FB\u01FD\u01FF\u0201\u0203\u0205\u0207\u0209\u020B\u020D\u020F\u0211\u0213\u0215\u0217\u0219\u021B\u021D\u021F\u0221\u0223\u0225\u0227\u0229\u022B\u022D\u022F\u0231\u0233-\u0239\u023C\u023F\u0240\u0242\u0247\u0249\u024B\u024D\u024F-\u0293\u0295-\u02AF\u0371\u0373\u0377\u037B-\u037D\u0390\u03AC-\u03CE\u03D0\u03D1\u03D5-\u03D7\u03D9\u03DB\u03DD\u03DF\u03E1\u03E3\u03E5\u03E7\u03E9\u03EB\u03ED\u03EF-\u03F3\u03F5\u03F8\u03FB\u03FC\u0430-\u045F\u0461\u0463\u0465\u0467\u0469\u046B\u046D\u046F\u0471\u0473\u0475\u0477\u0479\u047B\u047D\u047F\u0481\u048B\u048D\u048F\u0491\u0493\u0495\u0497\u0499\u049B\u049D\u049F\u04A1\u04A3\u04A5\u04A7\u04A9\u04AB\u04AD\u04AF\u04B1\u04B3\u04B5\u04B7\u04B9\u04BB\u04BD\u04BF\u04C2\u04C4\u04C6\u04C8\u04CA\u04CC\u04CE\u04CF\u04D1\u04D3\u04D5\u04D7\u04D9\u04DB\u04DD\u04DF\u04E1\u04E3\u04E5\u04E7\u04E9\u04EB\u04ED\u04EF\u04F1\u04F3\u04F5\u04F7\u04F9\u04FB\u04FD\u04FF\u0501\u0503\u0505\u0507\u0509\u050B\u050D\u050F\u0511\u0513\u0515\u0517\u0519\u051B\u051D\u051F\u0521\u0523\u0525\u0527\u0561-\u0587\u1D00-\u1D2B\u1D6B-\u1D77\u1D79-\u1D9A\u1E01\u1E03\u1E05\u1E07\u1E09\u1E0B\u1E0D\u1E0F\u1E11\u1E13\u1E15\u1E17\u1E19\u1E1B\u1E1D\u1E1F\u1E21\u1E23\u1E25\u1E27\u1E29\u1E2B\u1E2D\u1E2F\u1E31\u1E33\u1E35\u1E37\u1E39\u1E3B\u1E3D\u1E3F\u1E41\u1E43\u1E45\u1E47\u1E49\u1E4B\u1E4D\u1E4F\u1E51\u1E53\u1E55\u1E57\u1E59\u1E5B\u1E5D\u1E5F\u1E61\u1E63\u1E65\u1E67\u1E69\u1E6B\u1E6D\u1E6F\u1E71\u1E73\u1E75\u1E77\u1E79\u1E7B\u1E7D\u1E7F\u1E81\u1E83\u1E85\u1E87\u1E89\u1E8B\u1E8D\u1E8F\u1E91\u1E93\u1E95-\u1E9D\u1E9F\u1EA1\u1EA3\u1EA5\u1EA7\u1EA9\u1EAB\u1EAD\u1EAF\u1EB1\u1EB3\u1EB5\u1EB7\u1EB9\u1EBB\u1EBD\u1EBF\u1EC1\u1EC3\u1EC5\u1EC7\u1EC9\u1ECB\u1ECD\u1ECF\u1ED1\u1ED3\u1ED5\u1ED7\u1ED9\u1EDB\u1EDD\u1EDF\u1EE1\u1EE3\u1EE5\u1EE7\u1EE9\u1EEB\u1EED\u1EEF\u1EF1\u1EF3\u1EF5\u1EF7\u1EF9\u1EFB\u1EFD\u1EFF-\u1F07\u1F10-\u1F15\u1F20-\u1F27\u1F30-\u1F37\u1F40-\u1F45\u1F50-\u1F57\u1F60-\u1F67\u1F70-\u1F7D\u1F80-\u1F87\u1F90-\u1F97\u1FA0-\u1FA7\u1FB0-\u1FB4\u1FB6\u1FB7\u1FBE\u1FC2-\u1FC4\u1FC6\u1FC7\u1FD0-\u1FD3\u1FD6\u1FD7\u1FE0-\u1FE7\u1FF2-\u1FF4\u1FF6\u1FF7\u210A\u210E\u210F\u2113\u212F\u2134\u2139\u213C\u213D\u2146-\u2149\u214E\u2184\u2C30-\u2C5E\u2C61\u2C65\u2C66\u2C68\u2C6A\u2C6C\u2C71\u2C73\u2C74\u2C76-\u2C7B\u2C81\u2C83\u2C85\u2C87\u2C89\u2C8B\u2C8D\u2C8F\u2C91\u2C93\u2C95\u2C97\u2C99\u2C9B\u2C9D\u2C9F\u2CA1\u2CA3\u2CA5\u2CA7\u2CA9\u2CAB\u2CAD\u2CAF\u2CB1\u2CB3\u2CB5\u2CB7\u2CB9\u2CBB\u2CBD\u2CBF\u2CC1\u2CC3\u2CC5\u2CC7\u2CC9\u2CCB\u2CCD\u2CCF\u2CD1\u2CD3\u2CD5\u2CD7\u2CD9\u2CDB\u2CDD\u2CDF\u2CE1\u2CE3\u2CE4\u2CEC\u2CEE\u2CF3\u2D00-\u2D25\u2D27\u2D2D\uA641\uA643\uA645\uA647\uA649\uA64B\uA64D\uA64F\uA651\uA653\uA655\uA657\uA659\uA65B\uA65D\uA65F\uA661\uA663\uA665\uA667\uA669\uA66B\uA66D\uA681\uA683\uA685\uA687\uA689\uA68B\uA68D\uA68F\uA691\uA693\uA695\uA697\uA723\uA725\uA727\uA729\uA72B\uA72D\uA72F-\uA731\uA733\uA735\uA737\uA739\uA73B\uA73D\uA73F\uA741\uA743\uA745\uA747\uA749\uA74B\uA74D\uA74F\uA751\uA753\uA755\uA757\uA759\uA75B\uA75D\uA75F\uA761\uA763\uA765\uA767\uA769\uA76B\uA76D\uA76F\uA771-\uA778\uA77A\uA77C\uA77F\uA781\uA783\uA785\uA787\uA78C\uA78E\uA791\uA793\uA7A1\uA7A3\uA7A5\uA7A7\uA7A9\uA7FA\uFB00-\uFB06\uFB13-\uFB17\uFF41-\uFF5A])([\u0041-\u005A\u00C0-\u00D6\u00D8-\u00DE\u0100\u0102\u0104\u0106\u0108\u010A\u010C\u010E\u0110\u0112\u0114\u0116\u0118\u011A\u011C\u011E\u0120\u0122\u0124\u0126\u0128\u012A\u012C\u012E\u0130\u0132\u0134\u0136\u0139\u013B\u013D\u013F\u0141\u0143\u0145\u0147\u014A\u014C\u014E\u0150\u0152\u0154\u0156\u0158\u015A\u015C\u015E\u0160\u0162\u0164\u0166\u0168\u016A\u016C\u016E\u0170\u0172\u0174\u0176\u0178\u0179\u017B\u017D\u0181\u0182\u0184\u0186\u0187\u0189-\u018B\u018E-\u0191\u0193\u0194\u0196-\u0198\u019C\u019D\u019F\u01A0\u01A2\u01A4\u01A6\u01A7\u01A9\u01AC\u01AE\u01AF\u01B1-\u01B3\u01B5\u01B7\u01B8\u01BC\u01C4\u01C7\u01CA\u01CD\u01CF\u01D1\u01D3\u01D5\u01D7\u01D9\u01DB\u01DE\u01E0\u01E2\u01E4\u01E6\u01E8\u01EA\u01EC\u01EE\u01F1\u01F4\u01F6-\u01F8\u01FA\u01FC\u01FE\u0200\u0202\u0204\u0206\u0208\u020A\u020C\u020E\u0210\u0212\u0214\u0216\u0218\u021A\u021C\u021E\u0220\u0222\u0224\u0226\u0228\u022A\u022C\u022E\u0230\u0232\u023A\u023B\u023D\u023E\u0241\u0243-\u0246\u0248\u024A\u024C\u024E\u0370\u0372\u0376\u0386\u0388-\u038A\u038C\u038E\u038F\u0391-\u03A1\u03A3-\u03AB\u03CF\u03D2-\u03D4\u03D8\u03DA\u03DC\u03DE\u03E0\u03E2\u03E4\u03E6\u03E8\u03EA\u03EC\u03EE\u03F4\u03F7\u03F9\u03FA\u03FD-\u042F\u0460\u0462\u0464\u0466\u0468\u046A\u046C\u046E\u0470\u0472\u0474\u0476\u0478\u047A\u047C\u047E\u0480\u048A\u048C\u048E\u0490\u0492\u0494\u0496\u0498\u049A\u049C\u049E\u04A0\u04A2\u04A4\u04A6\u04A8\u04AA\u04AC\u04AE\u04B0\u04B2\u04B4\u04B6\u04B8\u04BA\u04BC\u04BE\u04C0\u04C1\u04C3\u04C5\u04C7\u04C9\u04CB\u04CD\u04D0\u04D2\u04D4\u04D6\u04D8\u04DA\u04DC\u04DE\u04E0\u04E2\u04E4\u04E6\u04E8\u04EA\u04EC\u04EE\u04F0\u04F2\u04F4\u04F6\u04F8\u04FA\u04FC\u04FE\u0500\u0502\u0504\u0506\u0508\u050A\u050C\u050E\u0510\u0512\u0514\u0516\u0518\u051A\u051C\u051E\u0520\u0522\u0524\u0526\u0531-\u0556\u10A0-\u10C5\u10C7\u10CD\u1E00\u1E02\u1E04\u1E06\u1E08\u1E0A\u1E0C\u1E0E\u1E10\u1E12\u1E14\u1E16\u1E18\u1E1A\u1E1C\u1E1E\u1E20\u1E22\u1E24\u1E26\u1E28\u1E2A\u1E2C\u1E2E\u1E30\u1E32\u1E34\u1E36\u1E38\u1E3A\u1E3C\u1E3E\u1E40\u1E42\u1E44\u1E46\u1E48\u1E4A\u1E4C\u1E4E\u1E50\u1E52\u1E54\u1E56\u1E58\u1E5A\u1E5C\u1E5E\u1E60\u1E62\u1E64\u1E66\u1E68\u1E6A\u1E6C\u1E6E\u1E70\u1E72\u1E74\u1E76\u1E78\u1E7A\u1E7C\u1E7E\u1E80\u1E82\u1E84\u1E86\u1E88\u1E8A\u1E8C\u1E8E\u1E90\u1E92\u1E94\u1E9E\u1EA0\u1EA2\u1EA4\u1EA6\u1EA8\u1EAA\u1EAC\u1EAE\u1EB0\u1EB2\u1EB4\u1EB6\u1EB8\u1EBA\u1EBC\u1EBE\u1EC0\u1EC2\u1EC4\u1EC6\u1EC8\u1ECA\u1ECC\u1ECE\u1ED0\u1ED2\u1ED4\u1ED6\u1ED8\u1EDA\u1EDC\u1EDE\u1EE0\u1EE2\u1EE4\u1EE6\u1EE8\u1EEA\u1EEC\u1EEE\u1EF0\u1EF2\u1EF4\u1EF6\u1EF8\u1EFA\u1EFC\u1EFE\u1F08-\u1F0F\u1F18-\u1F1D\u1F28-\u1F2F\u1F38-\u1F3F\u1F48-\u1F4D\u1F59\u1F5B\u1F5D\u1F5F\u1F68-\u1F6F\u1FB8-\u1FBB\u1FC8-\u1FCB\u1FD8-\u1FDB\u1FE8-\u1FEC\u1FF8-\u1FFB\u2102\u2107\u210B-\u210D\u2110-\u2112\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u2130-\u2133\u213E\u213F\u2145\u2183\u2C00-\u2C2E\u2C60\u2C62-\u2C64\u2C67\u2C69\u2C6B\u2C6D-\u2C70\u2C72\u2C75\u2C7E-\u2C80\u2C82\u2C84\u2C86\u2C88\u2C8A\u2C8C\u2C8E\u2C90\u2C92\u2C94\u2C96\u2C98\u2C9A\u2C9C\u2C9E\u2CA0\u2CA2\u2CA4\u2CA6\u2CA8\u2CAA\u2CAC\u2CAE\u2CB0\u2CB2\u2CB4\u2CB6\u2CB8\u2CBA\u2CBC\u2CBE\u2CC0\u2CC2\u2CC4\u2CC6\u2CC8\u2CCA\u2CCC\u2CCE\u2CD0\u2CD2\u2CD4\u2CD6\u2CD8\u2CDA\u2CDC\u2CDE\u2CE0\u2CE2\u2CEB\u2CED\u2CF2\uA640\uA642\uA644\uA646\uA648\uA64A\uA64C\uA64E\uA650\uA652\uA654\uA656\uA658\uA65A\uA65C\uA65E\uA660\uA662\uA664\uA666\uA668\uA66A\uA66C\uA680\uA682\uA684\uA686\uA688\uA68A\uA68C\uA68E\uA690\uA692\uA694\uA696\uA722\uA724\uA726\uA728\uA72A\uA72C\uA72E\uA732\uA734\uA736\uA738\uA73A\uA73C\uA73E\uA740\uA742\uA744\uA746\uA748\uA74A\uA74C\uA74E\uA750\uA752\uA754\uA756\uA758\uA75A\uA75C\uA75E\uA760\uA762\uA764\uA766\uA768\uA76A\uA76C\uA76E\uA779\uA77B\uA77D\uA77E\uA780\uA782\uA784\uA786\uA78B\uA78D\uA790\uA792\uA7A0\uA7A2\uA7A4\uA7A6\uA7A8\uA7AA\uFF21-\uFF3A\u0030-\u0039\u00B2\u00B3\u00B9\u00BC-\u00BE\u0660-\u0669\u06F0-\u06F9\u07C0-\u07C9\u0966-\u096F\u09E6-\u09EF\u09F4-\u09F9\u0A66-\u0A6F\u0AE6-\u0AEF\u0B66-\u0B6F\u0B72-\u0B77\u0BE6-\u0BF2\u0C66-\u0C6F\u0C78-\u0C7E\u0CE6-\u0CEF\u0D66-\u0D75\u0E50-\u0E59\u0ED0-\u0ED9\u0F20-\u0F33\u1040-\u1049\u1090-\u1099\u1369-\u137C\u16EE-\u16F0\u17E0-\u17E9\u17F0-\u17F9\u1810-\u1819\u1946-\u194F\u19D0-\u19DA\u1A80-\u1A89\u1A90-\u1A99\u1B50-\u1B59\u1BB0-\u1BB9\u1C40-\u1C49\u1C50-\u1C59\u2070\u2074-\u2079\u2080-\u2089\u2150-\u2182\u2185-\u2189\u2460-\u249B\u24EA-\u24FF\u2776-\u2793\u2CFD\u3007\u3021-\u3029\u3038-\u303A\u3192-\u3195\u3220-\u3229\u3248-\u324F\u3251-\u325F\u3280-\u3289\u32B1-\u32BF\uA620-\uA629\uA6E6-\uA6EF\uA830-\uA835\uA8D0-\uA8D9\uA900-\uA909\uA9D0-\uA9D9\uAA50-\uAA59\uABF0-\uABF9\uFF10-\uFF19])/g,
    _TRAILING_DIGIT_REGEXP : /([\u0030-\u0039\u00B2\u00B3\u00B9\u00BC-\u00BE\u0660-\u0669\u06F0-\u06F9\u07C0-\u07C9\u0966-\u096F\u09E6-\u09EF\u09F4-\u09F9\u0A66-\u0A6F\u0AE6-\u0AEF\u0B66-\u0B6F\u0B72-\u0B77\u0BE6-\u0BF2\u0C66-\u0C6F\u0C78-\u0C7E\u0CE6-\u0CEF\u0D66-\u0D75\u0E50-\u0E59\u0ED0-\u0ED9\u0F20-\u0F33\u1040-\u1049\u1090-\u1099\u1369-\u137C\u16EE-\u16F0\u17E0-\u17E9\u17F0-\u17F9\u1810-\u1819\u1946-\u194F\u19D0-\u19DA\u1A80-\u1A89\u1A90-\u1A99\u1B50-\u1B59\u1BB0-\u1BB9\u1C40-\u1C49\u1C50-\u1C59\u2070\u2074-\u2079\u2080-\u2089\u2150-\u2182\u2185-\u2189\u2460-\u249B\u24EA-\u24FF\u2776-\u2793\u2CFD\u3007\u3021-\u3029\u3038-\u303A\u3192-\u3195\u3220-\u3229\u3248-\u324F\u3251-\u325F\u3280-\u3289\u32B1-\u32BF\uA620-\uA629\uA6E6-\uA6EF\uA830-\uA835\uA8D0-\uA8D9\uA900-\uA909\uA9D0-\uA9D9\uAA50-\uAA59\uABF0-\uABF9\uFF10-\uFF19])([^\u0030-\u0039\u00B2\u00B3\u00B9\u00BC-\u00BE\u0660-\u0669\u06F0-\u06F9\u07C0-\u07C9\u0966-\u096F\u09E6-\u09EF\u09F4-\u09F9\u0A66-\u0A6F\u0AE6-\u0AEF\u0B66-\u0B6F\u0B72-\u0B77\u0BE6-\u0BF2\u0C66-\u0C6F\u0C78-\u0C7E\u0CE6-\u0CEF\u0D66-\u0D75\u0E50-\u0E59\u0ED0-\u0ED9\u0F20-\u0F33\u1040-\u1049\u1090-\u1099\u1369-\u137C\u16EE-\u16F0\u17E0-\u17E9\u17F0-\u17F9\u1810-\u1819\u1946-\u194F\u19D0-\u19DA\u1A80-\u1A89\u1A90-\u1A99\u1B50-\u1B59\u1BB0-\u1BB9\u1C40-\u1C49\u1C50-\u1C59\u2070\u2074-\u2079\u2080-\u2089\u2150-\u2182\u2185-\u2189\u2460-\u249B\u24EA-\u24FF\u2776-\u2793\u2CFD\u3007\u3021-\u3029\u3038-\u303A\u3192-\u3195\u3220-\u3229\u3248-\u324F\u3251-\u325F\u3280-\u3289\u32B1-\u32BF\uA620-\uA629\uA6E6-\uA6EF\uA830-\uA835\uA8D0-\uA8D9\uA900-\uA909\uA9D0-\uA9D9\uAA50-\uAA59\uABF0-\uABF9\uFF10-\uFF19])/g,


    _resources : {},
    _resources_loaded : {},

    _loadHtml  : function (fileName,callback) {
        var that = this;
        var _callback = function () {
            //that.log.info('loaded... ' + scriptName);
            core_interface._resources[fileName] = true;
            core_interface._resources_loaded[fileName] = true;
            if (callback) {
                callback();
            };
        }
        if (!core_interface._resources[fileName]) {
            jQuery.get(fileName,function (html) {
                jQuery('body').append(html);
                callback();
            }).fail(function (e) {
                throw 'load ' + fileName + ' failed! ' + e;
            });
        } else {
            return callback();
        }
    },
    _loadScript : function (scriptName, callback) {
        var that = this;
        var _callback = function () {
            //that.log.info('loaded... ' + scriptName)
            core_interface._resources[scriptName] = true;
            core_interface._resources_loaded[scriptName] = true;
            if (callback) {
                callback();
            }
        }
        if (!core_interface._resources[scriptName]) {
            //that.log.info('loading... ' + scriptName);

            var body 		= document.getElementsByTagName('body')[0];
            var script 		= document.createElement('script');
            script.type 	= 'text/javascript';
            script.src 		= scriptName;
            script.onload = _callback;
            script.onerror = function() {
                that.log.error("cannot load script " + scriptName);
            }
            // fire the loading
            body.appendChild(script);
            //return _waitLoad(scriptName,_callback);
            return ;
        }
        callback();
    },

    _loadCss : function (scriptName,callback) {
        var that = this;
        var _callback = function () {
            //that.log.info('loaded... ' + scriptName);
            core_interface._resources[scriptName] = true;
            core_interface._resources_loaded[scriptName] = true;
            if (callback) {
                callback();
            };
        }
        if (!core_interface._resources[scriptName]) {
            //that.log.info('loading... ' + scriptName);
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
};

translations_interface = {
    methods : {
        /**
         * ritorna la traduzione della chiave passata presente nel vettore $lang altrimenti ritorna al chiave stessa
         * @param key
         * @param plural
         * @param params
         * @returns {*}
         */
        translate : function (key,plural,params) {
            return translations_interface._translate2.apply(this,[key,plural,params]);
            //return translations_interface._translate.apply(this,[key,plural,params]);
        },
        /**
         * esegue la traduzione solo se esiste la chiave corrispondente nel vettore $lang
         * @param key
         * @param plural
         * @param params
         * @returns {string|*}
         */
        translateIfExist : function (key,plural,params) {
            var tmp = key.split('.');
            var skey = this.$crud.lang;
            for (var i in tmp) {
                if (! (tmp[i] in skey))
                    return "";
                skey = skey[tmp[i]];
            }
            return this.$crud.translate(key,plural,params);
        },
    },
    _translate : function (key,plural,params) {
        var tmp = key.split('.');
        var s = this.$crud.lang[tmp[0]];
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
    },

    _translate2 : function (key,plural,params) {
        var testo = this.$crud.lang[key];
        if (!testo)
            return key;
        if (params instanceof Array) {
            for (var i = 0; i < params.length; i++) {
                testo= testo.replace("(" + i +")", params[i] );
            }
        }
        return testo;
    }
}
wait_interface = {
    methods: {
        waitStart : function (msg,container) {
            var c = container?container:'body';
            var id = wait_interface._createContainer(c);
            //wait_interface._createWaitComponent();

            var comp = new wait_interface._waitComponent({
                data : function() {
                    console.log('grlobal',(container?true:false));
                    return {
                        msg : msg,
                        global : !container?true:false,
                    }
                },
                mounted : function () {

                }
            })
            console.log('comp created',comp);
            comp.$mount('#'+id);
            wait_interface._istances.push(comp);
            return comp;
        },
        waitEnd : function (component) {
            var that = this;
            if (wait_interface._istances.length == 0)
                return ;
            if (component) {
                for (var i in wait_interface._istances) {
                    var comp = wait_interface._istances[i];
                    if (comp._uid == component._uid) {
                        wait_interface._istances.splice(i,1);
                    }

                }
            } else {
                var comp = wait_interface._istances.pop();
                comp.$destroy();
                comp.$el.parentNode.removeChild(comp.$el);
            }

        }
    },
    _createContainer : function (container) {
        var id= 'd' + (new Date().getTime());
        jQuery(container).append('<div id="'+id+'" ></div>');
        return id;
    },
    _waitComponent : Vue.component('c-wait', {
                template: '<div c-wait :class="{ \'crud-overlay-body\' : global, \'crud-overlay\' : !global}">' +
                    '<span class="crud-wait-msg">' +
                    '{{msg}}' +
                    '</span>' +
                    '</div>',
            }),
    _istances : [],
};
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
    var className = "Protocol" + crud.pascalCase(type);
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
        var fieldsMetadata = json.metadata?(json.metadata.fields || {}):{};
        for (var field in fieldsMetadata) {
            this.metadata[field] = {};
            if (fieldsMetadata[field].options)
                this.metadata[field].domainValues = fieldsMetadata[field].options;
            if (fieldsMetadata[field].options_order)
                this.metadata[field].domainValuesOrder = fieldsMetadata[field].options_order;
            //this.metadata[field].domainValues = json.metadata[field].options?json.metadata[field].options:null;
            //this.metadata[field].domainValuesOrder = json.metadata[field].options_order?json.metadata[field].options_order:null;
        }
        var relationsMetadata = json.metadata?(json.metadata.relations || {}):{};
        for (var field in relationsMetadata) {
            this.metadata[field] = relationsMetadata[field];
            if (relationsMetadata[field].options)
                this.metadata[field].domainValues = relationsMetadata[field].options;
            if (relationsMetadata[field].options_order)
                this.metadata[field].domainValuesOrder = relationsMetadata[field].options_order;
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
        this.metadata = json.metadata || {};
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
     * riempe i valori parametri della route prendendoli dalle proprietà dell'oggetto
     * @param obj
     */
    fillValues : function(obj) {
        var self = this;
        var keys = self.getKeys();
        console.log('fillValues',keys,obj);
        for (var k in keys) {
            var key = keys[k];
            if (obj[key])
                self.values[key] = obj[key]
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
    var className = "Route" + crud.pascalCase(type);
    if (!window[className])
        throw "Impossibile trovare la definizione della route " + className;
    var _a = attrs?attrs:{};
    _a.className = className;
    return new window[className](_a);
}

// var RouteList = Route.extend({
//     method      : 'get',
//     url         : '/api/json/{modelName}',
//     resultType  : 'list',
//     protocol    : 'list'
// });

// var RouteListConstraint = RouteList.extend({
//     url         : '/api/json/{modelName}/{constraintKey}/{constraintValue}',
// });

// var RouteEdit = Route.extend({
//     method      : "get",
//     url         :'/api/json/{modelName}/{pk}/edit',
//     resultType  : 'record',
//     protocol    : 'record'
// });

// var RouteEditConstraint = RouteEdit.extend({
//     url         :'/api/json/{modelName}/{pk}/edit/{constraintKey}/{constraintValue}',
// });

// var RouteSearch = Route.extend({
//     method      : "get",
//     url         :'/api/json/{modelName}/search',
//     resultType  : 'record',
//     protocol    : 'record'
// });

// var RouteSearchConstraint = RouteSearch.extend({
//     url         :'/api/json/{modelName}/search/{constraintKey}/{constraintValue}',
// });


// var RouteInsert = Route.extend({
//     method      : "get",
//     url         :'/api/json/{modelName}/create',
//     resultType  : 'record',
//     protocol    : 'record'
// });

// var RouteInsertConstraint = RouteInsert.extend({
//     url         :'/api/json/{modelName}/create/{constraintKey}/{constraintValue}',
// });


var RouteInsertHasmany = Route.extend({
    method      : "get",
    url         :'/api/json/{modelName}/create_has_many',
    resultType  : 'record',
    protocol    : 'record'
});

var RouteInsertHasmanyConstraint = RouteInsertHasmany.extend({
    url         :'/api/json/{modelName}/create_has_many/{constraintKey}/{constraintValue}',
});

// var RouteSave = Route.extend({
//     method      : "post",
//     url         : '/api/json/{modelName}/create',
//     resultType  : 'record',
//     protocol    : 'record',
//     extraParams : {_method:'POST'}
// });

// var RouteSaveConstraint = RouteSave.extend({
//     url         : '/api/json/{modelName}/create/{constraintKey}/{constraintValue}',
// });

// var RouteUpdate = Route.extend({
//     method      : "post",
//     url         : '/api/json/{modelName}/{pk}',
//     resultType  : 'record',
//     protocol    : 'record',
//     extraParams : {_method:'PUT'}
// });
//
// var RouteUpdateConstraint = RouteUpdate.extend({
//     url         : '/api/json/{modelName}/{pk}/{constraintKey}/{constraintValue}',
// });

// var RouteCreate = Route.extend({
//     method      : "post",
//     url         : '/api/json/{modelName}/create',
//     resultType  : 'record',
//     protocol    : 'record'
// });


// var RouteCreateConstraint = RouteCreate.extend({
//     url         : '/api/json/{modelName}/create/{constraintKey}/{constraintValue}',
// });

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
    url         :  '/api/json/{modelName}/multi-delete',
    resultType  : 'record',
    protocol    : 'record'
});

RouteSet = Route.extend({
    method      : "post",
    url         : '/api/json/set/{modelName}/{field}/{value}',
    resultType  : 'record',
    protocol    : 'record'
});

RouteAutocomplete = Route.extend({
    method      : "get",
    url         : '/api/json/{modelName}/autocomplete',
    resultType  : 'list',
    protocol    : 'list'

})

RouteCalendar = Route.extend({});


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
// jQuery.getFailMessage = function (e) {
//
//     try {
//         if (jQuery.isProduction)
//             return e.status + " " + e.statusText;
//         var msg =  e.status + " " + e.statusText + "<br>";
//         if ( e.responseJSON) {
//             msg += e.responseJSON.error.message + "<br>";
//             msg += "line :" + e.responseJSON.error.line + "<br>";
//             msg += e.responseJSON.error.file ;
//         }
//         return msg;
//     } catch(em) {
//         return ""+em;
//     }
//
// };

Server.getUrl = function (url) {
    return Server.subdomain?Server.subdomain + url:url;
};


Server.post = function (url, params, callback) {
    var realUrl = Server.getUrl(url);
    jQuery.ajax({
        url: realUrl,
        headers: {
            'X-CSRF-TOKEN': jQuery('meta[name="csrf-token"]').attr('content')
        },
        type: 'POST',
        data: params,
        //processData: false,
        //contentType: false                    // Using FormData, no need to process data.
    }).done(function(json) {
        callback(json);
    }).fail(function (data, error, msg) {
        console.log('Errore ajax',data,error,msg);
        callback({error:1,msg:msg});
    });



    // jQuery.post(realUrl, params, function (json) {
    //     callback(json);
    // }).fail(function (e) {
    //     callback({error: 1, msg: Utility.getFailMessage(e)})
    // })
};

Server.get = function (url, params, callback) {
    var realUrl = Server.getUrl(url);
    jQuery.ajax({
        url: realUrl,
        headers: {
            'X-CSRF-TOKEN': jQuery('meta[name="csrf-token"]').attr('content')
        },
        type: 'GET',
        data: params,
        //processData: false,
        //contentType: false                    // Using FormData, no need to process data.
    }).done(function(json) {
        callback(json);
    }).fail(function (data, error, msg) {
        console.log('Errore ajax',data,error,msg);
        callback({error:1,msg:msg});
    });



    // jQuery.get(realUrl, params, function (json) {
    //     callback(json);
    // }).fail(function (e) {
    //     callback({error: 1, msg: Utility.getFailMessage(e)})
    // })
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

crud.components.cComponent = Vue.component('c-component',{
    // props : {
    //     'c-conf' : {
    //         default : function () {
    //             return {
    //                 value : null,
    //                 name : null,
    //             }
    //         }
    //     }
    // },
    props : ['cConf'],
    mounted : function() {
        //console.log(this.$options.name + ' cref ',this.cRef)
        if (this.cConf && this.cConf.cRef) {
            this.$crud.cRefs[this.cConf.cRef] = this;
        }

        // else  {
        //     var _conf = this.conf || {};
        //     if ( _conf.cRef) {
        //         this.$crud.cRefs[_conf.cRef] = this;
        //     }
        // }
    },
    data : function() {
        return this.defaultData();
    },
    methods : {
        jQe : function (selector) {
            var that = this;
            if (selector) {
                return jQuery(that.$el).find(selector).addBack(selector);
            }
            return jQuery(that.$el);
        },
        defaultData : function () {
            var _c = this.cConf || {};
            var d = {};
            for (var k in _c) {
                if (k == 'methods')
                    continue;
                d[k] = _c[k];
            }
            d.conf = _c;
            //console.log('c-component::defaultData',d);
            return d;
        },
    }
});
Vue.component('c-loading',{
    template : '<span>Carico ...</span>'
})
crud.components.cTplBase = Vue.component('c-tpl-base',{
    props : ['cRender'],
    template : '<span>template base</span>'
});


Vue.component('c-tpl-record',{
    extends : crud.components.cTplBase,
    template : '#c-tpl-record-template'
});

Vue.component('c-tpl-record2',{
    extends : crud.components.cTplBase,
    template : '#c-tpl-record2-template'
});


Vue.component('c-tpl-list', {
    extends : crud.components.cTplBase,
    template : '#c-tpl-list-template'
});
Vue.component('c-tpl-no', {
    extends : crud.components.cTplBase,
    template : '#c-tpl-no-template'
});
const actionBase = Vue.component('action-base', {
    props : ['cConf','cKey'],
    extends : crud.components.cComponent,

    mounted : function() {
        var that = this;
        if (that.controlType == 'link') {
            that._execute();
        }
    },
    computed :  {
        _disabled : function () {
            var that = this;
            if (!that.enabled)
                return true;
            if (jQuery.isFunction(that.enabled)) {
                return !that.enabled.apply(that);
            }
            return !that.enabled;
        },
        _visible : function () {
            var that = this;
            if (!that.visible)
                return false;
            if (jQuery.isFunction(that.visible)) {
                return that.visible.apply(that);
            }
            return that.visible;
        }
    },
    methods : {
        defaultData : function () {
            var that = this;
            var adata = {
                type : 'collection',
                visible : true,
                enabled : true,
                title : '',
                css: 'btn btn-outline-secondary',
                icon : 'fa fa-help',
                text : '',
                controlType : 'button',
                href : '',
            };
            for (var c in this.cConf) {
                // if (c ===  'execute') {
                //     var f = this.cConf[c];
                //     adata[c] = function () {
                //         f.apply(that);
                //     }
                // } else
                //if (jQuery.inArray(c,['execute','beforeExecute','afterExecute','enabled','visible']) < 0)
                    adata[c] = this.cConf[c];
            }
            if (!('view' in adata) )
                adata.view = that.$parent;
            // if (! ('langContext' in adata) ){
            //     adata.langContext = adata.view?adata.view.langContext:null;
            // }
            //console.log('action ',adata);
            return adata;
        },
        _beforeExecute : function (callback) {
            var that =this;
            if (!that.beforeExecute || !jQuery.isFunction(that.beforeExecute)) {
                callback();
                return ;
            }
            // controllo se la funzione before execute ha una callback per controlli asincroni.
            if (that.cConf.length > 0) {
                that.cConf.beforeExecute.apply(that,[callback]);;
            }
            if (that.cConf.beforeExecute.apply(that) ) {
                callback();
            }

        },
        _execute : function () {
            var that = this;
            if (!that.execute || !jQuery.isFunction(that.execute)) {
                alert('definire execute');
                return ;
            }
            that._beforeExecute(function () {
                //console.log('call execute')
                that.execute.apply(that);
                that._afterExecute();
            })
        },
        _afterExecute : function () {
            var that =this;
            if (!that.afterExecute || !jQuery.isFunction(that.afterExecute)) {
                return ;
            }
            that.afterExecute.apply(that);
        },

        setEnabled : function (enabled) {
            this.enabled = enabled;
        },

        setVisible : function (visible) {
            this.visible = visible;
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
        if (this.text) {
            var langKey = (this.view && this.view.langContext)?this.view.langContext+'.'+this.text:this.text;
            this.text = this.$crud.translate(langKey)
        }

        //this.icon = (this.cConf.orderDirection === null)?null:(this.cConf.orderDirection.toLowerCase()=='asc'?this.cConf.iconUp:this.cConf.iconDown);
    }
})

Vue.component('action-edit-mode',{
    extends : actionBase
});

Vue.component('action-view-mode',{
    extends : actionBase
});

Vue.component('action-save-row',{
    extends : actionBase
});


Vue.component('action-dialog', {
    extends : actionBase,
    data : function () {
        var d = this.defaultData();
        d.dialog = this.$parent;
        return d;

    }
})
Vue.component('c-paginator',{
    props : ['c-route-conf','c-route','c-pagination'],
    template : '#c-paginator-template',
    data : function () {
        var that = this;
        //PAGINATOR = this;
        console.log('paginator',that.cPagination, that.$parent.pagination )
        var pagination = that.cPagination || that.$parent.data.pagination || {};
        var d = {
            current_page : 0,
            from : 0,
            to : 0,
            last_page : 0,
            per_page : 0,
            total : 0,
            pagination_steps : {}
        }
        return this.$crud.merge(d,pagination);
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

            // var params = JSON.parse(JSON.stringify(that.cRouteConf.params));
            // params['page'] = (parseInt(params['page'])?parseInt(params['page']):1) + 1;
            // that.cRouteConf.params = params;
        },
        setPage : function(page) {
            var that = this;
            var params = JSON.parse(JSON.stringify(that.cRouteConf.params));
            params['page'] = parseInt(page);
            that.$parent.routeConf.params = params;
            //that.cRouteConf.params = params;

        },
        lastPage : function () {
            var that = this;
            if (parseInt(that.current_page) >= parseInt(that.last_page))
                return ;
            that.setPage(that.last_page);
        },
    }
})

crud.components.dBase = Vue.component('d-base',{
    props : ['cMessage'],
    extends : crud.components.cComponent,
    mounted : function () {
        var that = this;
        console.log('message',this.cMessage,this.message)
        that.jQe(that.selector).modal('show');
        that.jQe(that.selector).on('hidden.bs.modal', function (e) {
            that.jQe(that.selector).remove();
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

crud.components.dConfirm = Vue.component('d-confirm', {
    extends : crud.components.dBase,
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

crud.components.dMessage = Vue.component('d-message', {
    extends : crud.components.dBase,
    props : {
        'cTitle': {
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

crud.components.dError = Vue.component('d-error', {
    extends : crud.components.dBase,
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
crud.components.dWarning = Vue.component('d-warning', {
    extends : crud.components.dBase,
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

crud.components.dCustom = Vue.component('d-custom', {
    // mounted : function () {
    //     var that = this;
    //     for (var k in that.cCallbacks) {
    //         console.log('callback',k);
    //         that.methods[k] = function () {
    //             that.cCallbacks[k].apply(that);
    //         }
    //     }
    // },
    extends : crud.components.dBase,
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
crud.components.renders.rBase = Vue.component('r-base', {
    extends : crud.components.cComponent,
    props : ['cMarker'],

    mounted : function() {
        var that = this;
        var _conf = that.cConf || {};
        if (!_conf.operator) {
            jQuery(that.$el).find('[c-operator]').remove();
        }
        var that =this;
        for (var k in _conf.methods) {
            //console.log('r-base implements methods',k);
            that[k] = function () {
                return _conf.methods[k].apply(that,this.arguments);
            }
        }
        if (_conf.resources && _conf.resources.length) {
            that.beforeLoadResources();
            //that.resourcesLoaded = false;
            that.$crud.loadResources(_conf.resources,function () {
                //console.log('resoures loaded callback',that);
                that.resourcesLoaded = true;
                that.afterLoadResources();
            })
        } else {
            that.resourcesLoaded = true;
        }

        if ( _conf.mounted ) {
            _conf.mounted.apply(that);
        }
    },
    data :  function () {
        var d  = this.defaultData();
        if (! ('value' in d))
            d.value = null;
        if (! ('operator' in d))
            d.operator = null;
        d.resourcesLoaded = false;
        return d;
    },
    methods : {
        getFieldName: function () {
            var that = this;
            //console.log('GET FIELD NAME',this.cKey);
            if (that.operator) {
                return that.name + '[]';
            }
            return that.name;
        },
        getOperatorName : function () {
            var that = this;
            return that.name + "_operator";
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
        setValue : function(value) {
            this.value = value;
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

crud.components.renders.rCustom = Vue.component('r-custom', {
    extends : crud.components.renders.rBase,
    mounted : function() {
        this.value = this.getContent();
    },
    template: '#r-custom-template',
});

Vue.component('r-render', {
    extends : crud.components.renders.rBase,
    template: '#r-render-template',
});
Vue.component('r-input', {
    extends : crud.components.renders.rBase,
    template: '#r-input-template',
    data : function () {
        var d = this.defaultData();
        d.inputType = d.inputType?d.inputType:'text';
        return d;
    }
});
Vue.component('r-input-helped', {
    extends : crud.components.renders.rBase,
    template: '#r-input-helped-template',
    // data : function () {
    //     var d = this.defaultData();
    //     return d;
    // },

    // methods : {
    //     setValue : function (key) {
    //         this.value = key;
    //     }
    // }

});
Vue.component('r-hidden', {
    extends : crud.components.renders.rBase,
    template: '#r-hidden-template'
});
Vue.component('r-text',{
    extends : crud.components.renders.rBase,
    template: '#r-text-template'
});
Vue.component('r-image',{
    extends : crud.components.renders.rBase,
    template: '#r-image-template'
});
Vue.component('r-download',{
    extends : crud.components.renders.rBase,
    template: '#r-download-template',
    mounted : function() {
        var that  =this;
        var url = that.value;
        var xhttp = new XMLHttpRequest();
        xhttp.open('HEAD', url);
        xhttp.onreadystatechange = function () {
            if (this.readyState == this.DONE) {
                console.log(this.status);
                console.log(this.getResponseHeader("Content-Type"));
            }
        };
        xhttp.send();
    },
    data : function () {
        var d = this.defaultData();
        d.icon = 'fa fa-file-o';
        return d;
    }
});
Vue.component('r-textarea', {
    extends : crud.components.renders.rBase,
    template: '#r-textarea-template'
});
Vue.component('r-select',{
    extends : crud.components.renders.rBase,
    template: '#r-select-template',
    data :  function () {
        var d = this.defaultData();
        d.domainValues = d.domainValues || {};
        d.domainValuesOrder = d.domainValuesOrder?d.domainValuesOrder:Object.keys(d.domainValues);
        return d;
        // return {
        //     name : this.cConf.name,
        //     value: this.cConf.value,
        //     domainValues : dV,
        //     domainValuesOrder : dVO
        // }
    },
});


Vue.component('r-radio',{
    extends : crud.components.renders.rBase,
    data : function() {
        var d = this.defaultData();
        var dV = d.domainValues || {};
        d.domainValuesOrder = d.domainValuesOrder?d.domainValuesOrder:Object.keys(dV);
        return d;
    },

    // data :  function () {
    //     var dV = this.conf.domainValues || {};
    //     var dVO = this.cConf.domainValuesOrder?metadata.domainValuesOrder:Object.keys(dV);
    //     return {
    //         name : this.cConf.name,
    //         value: this.cConf.value,
    //         domainValues : dV,
    //         domainValuesOrder : dVO
    //     }
    // },
    template: '#r-radio-template',
});


Vue.component('r-checkbox',{
    extends : crud.components.renders.rBase,
    data :  function () {
        var that = this;
        var d = that.defaultData();
        var dV = d.domainValues;
        var dVO = d.domainValuesOrder?d.domainValuesOrder:Object.keys(dV);
        d.value = Array.isArray(d.value)?d.value:[d.value];
        d.domainValues = dV;
        d.domainValuesOrder = dVO;
        return d;
    },
    methods : {
        getFieldName : function () {
            return this.cKey + '[]';
        }
    },
    template: '#r-checkbox-template',
});


Vue.component('r-autocomplete', {
    extends : crud.components.renders.rBase,
    template: '#r-autocomplete-template',
    mounted : function() {
        this._getLabel();
    },
    data : function() {
        var that = this;
        var d = this.defaultData();
        if (!( 'resources' in d.conf) ) {
            d.conf.resources = [
                'https://cdnjs.cloudflare.com/ajax/libs/jquery-autocomplete/1.0.7/jquery.auto-complete.min.css',
                'https://cdnjs.cloudflare.com/ajax/libs/jquery-autocomplete/1.0.7/jquery.auto-complete.min.js'
//                'autocomplete-typeahead-bootstrap/dist/latest/bootstrap-autocomplete.js'
            ];
        }
        d.label = '';
        d.suggestValues = {};
        return d;
    },
    methods : {
        afterLoadResources : function () {
            var that = this;
            jQuery(that.$el).find('[c-autocomplete]').autoComplete({
                source : function(term,suggest) {
                    jQuery.getJSON(that._createUrl(),{term:term},function (json) {
                        var suggestions = [];
                        //that.suggestValues = {};
                        for (var i in json.result) {
                            // var s = "";
                            // for (var k in that.metadata.fields) {
                            //     s += (s?' ':'') + json.result[i][that.metadata.fields[k]];
                            // }
                            var s = that._getSuggestion(json.result[i]);
                            suggestions.push(s);
                            that.suggestValues[s] = json.result[i]['id'];
                        }
                        return suggest(suggestions)
                    })
                },
                onSelect: function(e, term, item){
                    console.log(term,that.suggestValues,'selected',that.suggestValues[term],'item',item);
                    that.value = that.suggestValues[term];
                    that.label = term;
                    that.change();
                }
            });
        },
        _createUrl : function () {
            var that = this;
            var r = Route.factory(that.conf.routeName,{values : {modelName:that.conf.model} });

            //var url = that.url?that.url:"/api/json/autocomplete/" + that.metadata.autocompleteModel + "?";
            var url = that.url?that.url:r.getUrl();
            url+= '?';

            if (that.conf.fields) {
                for(var f in that.conf.fields) {
                    url+="field[]="+that.conf.fields[f]+"&";
                }
            }
            /* @TODO se metto la description diventa difficile cambiare la
             if (that.model_description) {
             for(var f in that.model_description) {
             url+="description[]="+that.model_description[f]+"&";
             }
             }
             */
            url += that.conf.separator ? '&separator=' + that.conf.separator : '';
            url += that.conf.n_items ? '&n_items=' + that.conf.n_items : '';
            url += that.conf.method ? '&method=' + that.conf.method: '';
            return url;
        },

        clear : function () {
            var that = this;
            that.value = '';
            that.label = '';
            that.suggestValues = {};
            jQuery(that.$el).find('[c-autocomplete]').val('');
        },
        _getLabel : function () {

            var that = this;
            var r = new Route(that.$crud.routes.view);
            r.values.modelName = that.conf.model;
            r.values.pk = that.value;
            var lb = '';
            Server.route(r,function (json) {
                if (json.error) {
                    that.label = json.msg;
                    return ;
                }
                that.label = that._getSuggestion(json.result);
            })
        },
        _getSuggestion: function(rowData) {
            var that = this;
            var s = "";
            for (var k in that.conf.fields) {
                s += (s?' ':'') + rowData[that.conf.fields[k]];
            }
            return s
        }
    }

});
Vue.component('r-belongsto', {
    extends : crud.components.renders.rBase,
    template: '#r-belongsto-template',
});
Vue.component('r-date-select', {
    extends : crud.components.renders.rBase,
    template: '#r-date-select-template',
    data : function() {
        var d = this.defaultData();
        if (!( 'resources' in d.conf) ) {
            d.conf.resources = [
                'https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.24.0/moment.min.js'
            ];
        }
        return d;
    },
    computed : {
        cDay : function () {
            var that = this;
            var d = moment(that.value?that.value:that.conf.value);
            var cd = {
                value: d.date(),
                domainValues: {},
                methods: {
                    change: function () {
                        that.changed();
                    }
                }
            };
            for (let i=1;i<=d.daysInMonth();i++) {
                cd.domainValues[i] = i;
            }
            if (d.date() > d.daysInMonth())
                cd.value = 1;
            cd.domainValuesOrder = Object.keys(cd.domainValues);
            return cd;
        },
        cMonth : function () {
            var that = this;
            var d = moment(that.value ? that.value : that.conf.value);
            var cm = {
                value: d.month() + 1,
                domainValues: {},
                methods: {
                    change: function () {
                        that.changed();
                    }
                }
            };
            for (let i=1;i<=12;i++) {
                cm.domainValues[i] = i;
            }
            return cm;
        },
        cYear : function () {
            var that = this;
            var d = moment(that.value ? that.value : that.conf.value);
            var cy = {
                value : d.year(),
                domainValues: {

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
                cy.domainValues[i] = i;
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

            console.log(this.getValue());
        }
    }
});
Vue.component('r-date-picker', {
    extends : crud.components.renders.rBase,
    template: '#r-date-picker-template',
    data : function() {
        var d = this.defaultData();
        if (!( 'resources' in d.conf) ) {
            d.conf.resources = [
                'https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.24.0/moment.min.js',
                'https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datepicker/1.9.0/css/bootstrap-datepicker.min.css',
                'https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datepicker/1.9.0/js/bootstrap-datepicker.js'
            ];
        }
        return d;
    },
    methods : {
        afterLoadResources : function () {
            var that = this;
            var displayFormat = that.displayFormat || "mm/dd/yyyy";
            var dateFormat = that.dateFormat || displayFormat;
            jQuery(that.$el).find('[c-picker]').datepicker({
                format : displayFormat,
            }).on('changeDate', function(ev) {
                that.value =  moment(ev.date.toISOString()).format(dateFormat.toUpperCase()); //ev.date.toISOString();
                that.change();
            });
            console.log('dateformat',dateFormat.toUpperCase())
            jQuery(that.$el).find('[c-picker]').datepicker('update',moment(that.value).format(displayFormat.toUpperCase()));
        }
    }
});
Vue.component('r-texthtml',{
    extends : crud.components.renders.rBase,
    template: '#r-texthtml-template',
    data : function() {
        var d = this.defaultData();
        if (!( 'resources' in d.conf) ) {
            d.conf.resources = [
                //'https://cdnjs.cloudflare.com/ajax/libs/summernote/0.8.12/summernote.css',
                //'https://cdnjs.cloudflare.com/ajax/libs/summernote/0.8.12/summernote.min.js',
                'https://cdn.jsdelivr.net/npm/summernote-bootstrap4@0.0.5/dist/summernote.css',
                'https://cdn.jsdelivr.net/npm/summernote-bootstrap4@0.0.5/dist/summernote.min.js'

            ];
        }
        return d;
    },
    methods : {
        afterLoadResources : function () {
            var that = this;
            var options = that.conf.pluginOptions || {
                content : that.value,
                //airMode : true
            };
            options = this.$crud.cloneObj(options);
            that.jQe('.summernote').summernote(options);
            jQuery('.summernote').on('summernote.change', function() {
                //console.log('Enter/Return key pressed',jQuery('.summernote').summernote('code'));
                that.jQe('[c-sum]').val(jQuery('.summernote').summernote('code'));
                that.jQe('[c-sum]').trigger('change');
                //that.jQe('[c-sum]').val('hh')
            })
            jQuery('.summernote').summernote('focus');
        }
    }
});

crud.components.rHasmany =Vue.component('r-hasmany', {
    extends : crud.components.renders.rBase,
    template: '#r-hasmany-template',
    mounted : function() {
         var that = this;
        for (var i in that.value) {
            var _conf = that.getHasmanyConf(i,that.value[i]);
            that.confViews.push(_conf);
        }
    },
    data : function () {
        var that = this;
        var d = that.defaultData();
        d.confViews = [];
        if (!("limit" in d) )
            d.limit = 1000;

        //console.log('CONF VIEWS',d.confViews,d.value)
        return d;
    },

    methods : {

        getHasmanyConf : function (index,value) {
            var that = this;
            var hmConf = that.cConf.hasmanyConf || {};

            hmConf = this.$crud.confMerge({
                fields : [],
                fieldsConfig : {},
                data :  {
                    value : {
                    },
                    metadata : {

                    }
                },
            },hmConf);
            hmConf.cRef = 'hm-' + index;

            if (value && Object.keys(value).length > 0) {
                hmConf.data.value = value;
                if (!hmConf.fields || !hmConf.fields.length) {
                    hmConf.fields = Object.keys(value);
                }
            }
            if (!value) {
                that.value[index].status = 'new';
                hmConf.data.value.status = 'new';
            } else {
                that.value[index].status = 'updated';
                hmConf.data.value.status = 'updated';
            }
            // if (!hmConf.data.value.status )
            //     hmConf.data.value.status = 'new';
            console.log('HMS',hmConf,that.value)
            return hmConf;


            // if (that.confViews.length > index) {
            //     that.confViews[index] = hmConf;
            //     that.confViews[index].data.value.status = 'updated';
            // } else {
            //     if (!hmConf.data.value.status) {
            //         hmConf.data.value.status = 'new';
            //     }
            //     that.confViews.push(hmConf);
            //     if (that.confViews.length < (index + 1))
            //         throw "confView.length" + that.confViews.length + " minore di index " + index;
            // }
            // // else {
            // //     // ci sono record gia' presenti prendo da li i fields.
            // //     if (this.value && this.value.length > 0) {
            // //         if (!hmConf.fields || !hmConf.fields.length) {
            // //             hmConf.fields = Object.keys(this.value[0]);
            // //             hmConf.data.value = Utility.cloneObj(this.value[0]);
            // //         }
            // //     }
            // // }
            // //console.log('hmConf',hmConf)
            // //hmConf.metadata.modelName = that.cKey;
            // console.log('HMS',that.confViews[index],that.value)
            // return that.confViews[index];

        },
        addItem : function () {
            var that = this;
            //var conf = that.getHasmanyConf(null);
            that.value.push({});
            that.confViews.push(that.getHasmanyConf(that.value.length-1,null));

        },
        deleteItem : function (index) {
            //console.log('index',index,this.value[index].status,this.confViews[index]);
            if (this.value[index].status == 'new') {
                this.value.splice(index, 1);
                this.confViews.splice(index,1);
            }
            else {
                //console.log('update status deleted ', index,this.confViews[index].data.value)
                this.$set(this.value[index], 'status', 'deleted');
                this.$set(this.confViews[index].data.value, 'status' , 'deleted');
                this.$crud.cRefs['hm-'+index].setFieldValue('status','deleted');
            }
            this.$forceUpdate();
        },
        showItem : function (index) {
            //console.log('show item',index,this.confViews[index]);
            if (!this.confViews[index])
                return false;
            return (this.confViews[index].data.value.status != 'deleted'  )
        },
        outOfLimit : function () {
            var that = this;
            var valid = 0;
            for (var i in that.value) {
                if (that.value[i].status != 'deleted')
                    valid++;
            }
            //console.log('outlimit',valid,that.limit);
            return (valid >= that.limit);
        }
    }
});

Vue.component('r-hasmany-view', {
    extends : crud.components.rHasmany,
    template: '#r-hasmany-view-template',
    data : function () {
        console.log('HASMNAYVIEW',this.value);
        var d = this.defaultData();
        d.inputType = 'text';
        if (this.cConf.inputType)
            d.inputType = this.cConf.inputType;
        return d;
    }
});

Vue.component('r-swap', {
    extends : crud.components.renders.rBase,
    template: '#r-swap-template',
    data : function () {
        var that = this;
        //SWAP = that;
        var d = this.defaultData();
        if (!("routeName" in d))
            d.routeName = 'set';
        d.iconClass = 'fa fa-circle';
        d.title = "swap";
        d.swapType = d.swapType?d.swapType:'icon';
        var defaultDomainValues = {
            icon : {
                0 : 'fa fa-circle text-danger',
                1 : 'fa fa-circle text-success'
            },
            text : {
                0 : 'No',
                1 : 'Si'
            }
        }
        var dV = (d.domainValues)? d.domainValues:defaultDomainValues[d.swapType];
        //console.log('dV',dV);
        var keys = Object.keys(dV).map(String);
        if (keys.indexOf(""+d.value) >= 0) {
            d.slot = dV[""+d.value];
        } else {
            d.slot = dV[keys[0]];
        }
        d.domainValues = dV;
        return d;
    },
    methods : {
        getDV : function() {
            var that = this;
            console.log('swaptype',that.swapType,'domainValues',that.domainValues)
            return (that.domainValues)? that.domainValues:that.domainValues[that.swapType];

        },
        swap : function () {
            var that = this;
            var dV = that.getDV();
            var keys = Object.keys(dV);
            var value = that.value?that.value:keys[0];
            var vs = keys.map(String);
            var index = vs.indexOf(""+value);
            index = (index + 1) % vs.length;
            //console.log('INDEX ',index,vs,keys,keys[index],vs[index]);
            that._swap(keys[index]);
        },
        _getRoute : function(key) {
            var that = this;
            var r = Route.factory(that.routeName);
            r.values = {
                modelName: that.conf.model,
                field : that.name, //that.conf.key?that.conf.key:that.cKey,
                value : key
            };
            r.params = {id:that.conf.modelData.id};
            return r;
        },
        _swap : function (key) {
            var that = this;
            var r = that._getRoute(key);
            var dV = that.getDV();
            Server.route(r,function (json) {
                if (json.error) {
                    that.$crud.errorDialog(json.msg);
                    return;
                }
                that.value = key;
                that.slot = dV[key];
                that.change();
            })
        }
    }
});

crud.components.rHasmanyThrough =Vue.component('r-hasmany-through', {
    extends : crud.components.renders.rBase,
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
                        hmConf.data.value = this.$crud.cloneObj(this.value[0]);
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

crud.components.renders.rB2Select2 = Vue.component('r-b2-select2', {
    extends : crud.components.renders.rBase,
    template: '#r-b2-select2-template',
    data : function () {
        var d = this.defaultData();
        if (!( 'resources' in d.conf) ) {
            d.conf.resources = [
                'https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.12/css/select2.min.css',
                'https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.12/js/select2.min.js'

            ];
        }
        d.routeName = d.conf.routeName || 'autocomplete';
        return d;
    },
    methods : {
        afterLoadResources : function () {
            var that = this;
            console.log('b2 afterloadresources')
            // var r = Route.factory('autocomplete',{
            //     values : {
            //         modelName : that.model
            //     }
            // });
            // r.params['field[]'] = 'email'
            var data = [];
            if (that.value) {
                data.push({
                    id : that.value,
                    selected : true,
                    text : that._getLabel(that.modelData)
                });
                // that.value.selected = true;
                // that.value.text = that._getLabel(that.value);
                // data.push(that.value);
            }


            jQuery(that.$el).find('[c-select2]').select2({
                data : data,
                ajax : {
                    url : that._createUrl(),
                    dataType: 'json',
                    delay: 250,
                    data: function(params) {
                        return {
                            term: params.term, // search term
                            page: params.page
                        };
                    },
                    processResults: function (json) {
                        // Tranforms the top-level key of the response object from 'items' to 'results'
                        var items = [];
                        for (var i in json.result) {
                            items.push({
                                id : json.result[i].id,
                                text : that._getLabel(json.result[i])
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
            jQuery(that.$el).find('[c-select2]').on('select2:select', function () {
                console.log('value',that.getValue())
                that.$emit('change');
            });
        },
        _getLabel : function(value) {
            var that  =this;
            var label = "";
            for (var i in that.labelFields) {
                label += value[that.labelFields[i]] + " ";
            }
            return label;
        },
        getValue : function () {
            var that = this;
            var selValue = jQuery(that.$el).find('[c-select2]').select2('data');
            return selValue.length>0?selValue[0]['id']:null;

        },

        _createUrl : function () {
            var that = this;
            var r = Route.factory(that.routeName,{values : {modelName:that.model} });

            //var url = that.url?that.url:"/api/json/autocomplete/" + that.metadata.autocompleteModel + "?";
            var url = that.url?that.url:r.getUrl();
            url+= '?';

            if (that.conf.fields) {
                for(var f in that.conf.fields) {
                    url+="field[]="+that.conf.fields[f]+"&";
                }
            }
            /* @TODO se metto la description diventa difficile cambiare la
             if (that.model_description) {
             for(var f in that.model_description) {
             url+="description[]="+that.model_description[f]+"&";
             }
             }
             */
            url += that.conf.separator ? '&separator=' + that.conf.separator : '';
            url += that.conf.n_items ? '&n_items=' + that.conf.n_items : '';
            url += that.conf.method ? '&method=' + that.conf.method: '';
            return url;
        },
    }

});
Vue.component('r-b2m-select2', {
    extends : crud.components.renders.rB2Select2,
    template: '#r-b2m-select2-template',
    // data : function () {
    //     var d = this.defaultData();
    //     if (!( 'resources' in d.conf) ) {
    //         d.conf.resources = [
    //             'https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.12/css/select2.min.css',
    //             'https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.12/js/select2.min.js'
    //
    //         ];
    //     }
    //     return d;
    // },
    methods : {
        afterLoadResources : function () {
            var that = this;
            console.log('b2 afterloadresources')
            // var r = Route.factory('autocomplete',{
            //     values : {
            //         modelName : that.conf.metadata.autocompleteModel
            //     }
            // });
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
                    url : that._createUrl(),
                    dataType: 'json',
                    delay: 250,
                    data: function(params) {
                        return {
                            term: params.term, // search term
                            page: params.page
                        };
                    },
                    processResults: function (json) {
                        // Tranforms the top-level key of the response object from 'items' to 'results'
                        var items = [];
                        for (var i in json.result) {
                            items.push({
                                id : json.result[i].id,
                                text : that._getLabel(json.result[i])
                            });
                        }
                        return {
                            results: items
                        };
                    },
                },
                placeholder: that.placeholder?that.placeholder:"Seleziona",
            });
            jQuery(that.$el).find('[c-select2]').on('select2:select', function () {
                that._renderHidden();
            });
            jQuery(that.$el).find('[c-select2]').on('select2:unselect', function () {
                that._renderHidden();
            });
            that._renderHidden();

        },
        // _getLabel : function(value) {
        //     var that  =this;
        //     var label = "";
        //     console.log('_getLabel',value,that.conf.labelFields);
        //     for (var i in that.conf.labelFields) {
        //         label += value[that.conf.labelFields[i]] + " ";
        //     }
        //     return label;
        // },
        _renderHidden : function () {
            var that = this;
            var values = that.getValue();
            that.jQe('[c-selected-items]').html(' ');
            for (var f in that.hiddenFields) {
                var field = that.hiddenFields[f];
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
            var selValues = jQuery(that.$el).find('[c-select2]').select2('data');
            var values = [];
            for (var i in selValues) {
                var item = {};
                for (var f in that.hiddenFields) {
                    var field = that.hiddenFields[f];
                    item[field] = selValues[i][field];
                }
                values.push(item);
            }
            return values;
        },
    }

});
crud.components.renders.rUpload = Vue.component('r-upload',{
    extends : crud.components.renders.rBase,
    template : '#r-upload-template',
    data : function () {
        var d = this.defaultData();
        d.conf = this.cConf;
        console.log('r-upload data',d);
        d.extensions = d.conf.extensions?d.conf.extensions:'';
        d.maxFileSize = d.conf.maxFileSize?d.conf.maxFileSize:'';
        d.error = false;
        d.errorMessage = '';
        return d;
    },

    methods : {
        getValue : function () {
            var that = this;
            console.log('filedesc',jQuery(that.$el).find('[c-file]').prop('files'));
            var fileDesc = jQuery(that.$el).find('[c-file]').prop('files');
            if (fileDesc.length) {
                return fileDesc[0];
            }

            return null;
        },
        _validate : function() {
            return true;
        },
        validate : function () {
            var that = this;
            //TODO eseguire validazione
            console.log('validate');
            that.change();
            if (that._validate()) {
                that.value =
                that.$emit('success', that);
            }
            else
                that.$emit('error',that);
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
Vue.component('r-upload-ajax',{
    extends : crud.components.renders.rBase,
    template : '#r-upload-ajax-template',
    data : function () {
        var d = this.defaultData();
        //d.conf = this.cConf || {};
        //var metadata = d.conf.metadata || {};
        d.extensions = d.extensions?d.extensions:[];
        d.maxFileSize = d.maxFileSize?d.maxFileSize:'';
        d.uploadConf = d.conf;
        var value = d.value || {};
        d.previewConf = {
            value : value,
            cRef : this._uid + 'preview'
        }
        d.value = JSON.stringify(value).replace(/\\"/g, '"');
        // d.previewConf = {
        //     value : d.conf.value,
        //     metadata :  {
        //         mimetype : 'image/jpeg'
        //     }
        // };
        d.error = false;
        d.errorMessage = '';
        console.log('r-upload data',d);
        return d;
    },

    methods : {
        getValue : function () {
            var that = this;
            console.log('filedesc',jQuery(that.$el).find('[c-file]').prop('files'));
            var fileDesc = jQuery(that.$el).find('[c-file]').prop('files');
            if (fileDesc.length) {
                return fileDesc[0];
            }

            return null;
        },
        _validate : function() {
            return true;
        },
        validate : function () {
            var that = this;
            //TODO eseguire validazione
            console.log('validate');
            that.change();
            if (that._validate()) {
                that.sendAjax();
            } else
                that.onError();
        },
        sendAjax : function () {
            var that = this;
            // if (!that.$refs.refUpload) {
            //     throw 'riferimento a file upload non valido';
            // }
            RUPLOAD = that;
            var fDesc = that.getValue();
            if (!fDesc)
                throw 'descrittore file upload non valido';

            console.log('fDesc',fDesc);

            var fileName = fDesc.filename;
            //var fileName = 'Schermata 2019-07-31 alle 14.40.20.png';

            //var routeConf =  Utility.cloneObj(that.$crud.routes.uploadfile);
            var route = Route.factory('uploadfile');
            route.fillValues(that);

            that.error = false;
            that.complete = false;

            var realUrl = Server.getUrl(route.getUrl());
            var fdata = new FormData();
            //data.append('file',jQuery(that.$el).find('[c-image-file]').prop('files')[0]);
            fdata.append('file',fDesc)
            console.log('ajaxFields',that.ajaxFields)
            for (var k in that.ajaxFields)
                fdata.append(k,that.ajaxFields[k])

            jQuery.ajax({
                url: realUrl,
                headers: {
                    'X-CSRF-TOKEN': jQuery('meta[name="csrf-token"]').attr('content')
                },
                type: 'POST',
                data: fdata,
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
                            msg += tmp[k]+'\n';
                        }
                    } catch(e) {
                        msg = data.msg;
                    }
                    that.errorMessage = msg;
                    //self._showError(dialog,msg);
                    jQuery(that.$el).find('[crud-button="ok"]').addClass("disabled");
                    return;
                }
                that.$emit('success',that);
                that.complete = true;
                // var pconf = {
                //     value : data.result.url,
                //     metadata :  {
                //         mimetype : data.result.mimetype
                //     }
                // };

                console.log('data.result',data.result);
                //that.$crud.cRefs[that._uid+'preview'].value = data.result;


                //that.$set(that,'previewConf', {value : data.result});
                that.lastUpload = that.$crud.cloneObj(data.result);

                //jQuery(that.$el).find('input[name="' + that.cKey +'"]');
                //jQuery('<input name="' + that.name + '" type="hidden" value=\'' + JSON.stringify(data.result).replace(/\\"/g, '"') + '\'>').appendTo(jQuery(that.$el));
                that.value = JSON.stringify(data.result); //.replace(/\\"/g, '"');

                // for (var k in data.result) {
                //     console.log('update field',k,data.result[k],jQuery(that.$el).find('[c-marker="' + k + '"]').length);
                //     jQuery(that.$el).find('[c-marker="' + k + '"]').val(data.result[k]);
                // }
                var refPreview = that._uid + 'preview';
                //console.log('refPreview',refPreview,that.$crud.cRefs[refPreview])
                that.$crud.cRefs[refPreview].value = data.result;
            }).fail(function(data, error, msg){
                console.log("An error occurred, the files couldn't be sent!");
                that.lastUpload = false;
                that.error = true;
                that.errorMessage = "Upload error " + data + " " + error + " " + msg;
            });
        },
    }
})

Vue.component('r-preview',{
    extends : crud.components.renders.rBase,
    template : '#r-preview-template',
    // mounted : function() {
    //     var that = this;
    //     this._draw();
    // },
    data : function () {
        var that = this;
        var d = that.defaultData();
        if (!d.value)
            d.value = {};
        //d.url = null;
        //d.mimetype = null;
        d.icon = false;
        d.iconClass = '';
        // var value = d.value || {};
        // for (var k in value) {
        //     d[k] = value[k];
        // }
        //d.type = that.getType()
        return d;
    },
    methods : {
        getType : function () {
            var that = this;
            if (!that.value.mimetype)
                return null;


            var docTypes = [
                "application/xls",
                "xlsx",
                "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                "zip",
                "mp3",
                "application/pdf",
                "txt"
            ];
            var imageTypes = [
                "image/jpeg","image/png"
            ];

            if (docTypes.indexOf(that.value.mimetype) >= 0) {
                that.icon=true;
                that.iconClass = that.$crud.icons.mimetypes['default'];
                if (that.$crud.icons.mimetypes[that.value.mimetype])
                    that.iconClass = that.$crud.icons.mimetypes[that.value.mimetype];
                return 'doc';
            }

            if (imageTypes.indexOf(that.value.mimetype) >= 0) {
                return 'image';
            }

            console.warn('mimetype invalid ' + that.value.mimetype)
            return null;





            switch (that.value.mimetype) {
                case 'image/jpeg':
                case 'image/png':
                    return 'image';
                case 'application/pdf':
                    that.icon=true;
                    that.iconClass = that.$crud.icons.mimetypes['default'];
                    if (that.$crud.icons.mimetypes[that.value.mimetype])
                        that.iconClass = that.$crud.icons.mimetypes[that.value.mimetype];
                    return 'doc';
                default:
                    console.warn('mimetype invalid ' + that.value.mimetype)
                    return null;
            }
        }
    }
})

Vue.component('v-action', {
    extends : crud.components.cComponent,
    props : ['cName','cAction'],
    data : function () {
        var that = this;
        //console.log('v-action',this.cKey,this.cAction);
        var aConf =  {
            name: 'action-base',
            conf: {},
        }
        if (this.cAction) {
            //console.log('V-RENDER2 ',this.cRender,this.$parent.renders);
            aConf =  {
                name : this.cName,
                conf : this.cAction
            }
        } else {
            console.warn('configurazione azione non valida', this.cName, this.cAction);
        }
        aConf.conf.view = that.$parent;
        console.log('v-action create',aConf);
        return aConf;
    },
    template : '<component :is="name" :c-conf="conf"></component>'
})

Vue.component('v-render', {
    extends : crud.components.cComponent,
    props : ['cKey','cRender'],
    // When the bound element is inserted into the DOM...
    mounted: function () {
        //console.log('v-render',this.cConf);
    },
    data : function() {
        if (this.cKey) {
            var ckeys = this.cKey.split(',');
            var render = null;
            for (var i in ckeys) {
                render = this.$parent.renders[ckeys[i]];
            }
            //var render = this.$parent.renders[this.cKey];
            console.log('key',ckeys,'V-RENDER ',render,this.$parent.renders);
            return {
                type : render.type,
                conf : render
            }
        }

        if (this.cRender) {
            //console.log('V-RENDER2 ',this.cRender,this.$parent.renders);
            return {
                type : this.cRender.type,
                conf : this.cRender
            }
        }
        console.warn('configurazione non valida',this.cKey,this.cRender);
        return {
            type : 'r-text',
            conf : {},
        }

    },
    template : '<component :is="type" :c-conf="conf"></component>'
})

crud.components.views.vBase = Vue.component('v-base', {
    props : ['cConf','cFields'],
    extends : crud.components.cComponent,
    // created : function() {
    //     var that = this;
    //     var _conf = that.getConf(that.cConf) || {};
    //     for (var k in _conf.methods) {
    //         console.log('v-base implements methods',k);
    //         that[k] = function () {
    //             var arguments = this.arguments;
    //             console.log('arguments');
    //             _conf.methods[k].apply(that,arguments);
    //         }
    //     }
    // },
    data : function () {
        return this.defaultData();
    },
    mounted : function() {
        var that = this;
        //var methods = that.conf?that.conf.methods:{};
        // for (var k in methods) {
        //     console.log('v-base implements methods',k);
        //     that.methods[k] = function () {
        //         methods.apply(that,this.arguments);
        //     }
        // }
        var __call = function (lk) {
            that[lk] = function () {
                var localk = new String(lk);
                //var arguments = this.arguments;
                console.log(localk,'arguments',arguments);
                return that.conf.methods[localk].apply(that,arguments);
            }
        }
        for (var k in that.conf.methods) {
            //console.log('v-base implements methods',k);
            __call(k);
            // that[k] = function () {
            //     var localk = new String(k);
            //     //var arguments = this.arguments;
            //     console.log(localk,'arguments',arguments);
            //     return that.conf.methods[k].apply(that,arguments);
            // }
        }

        if ( that.conf.mounted ) {
            that.conf.mounted.apply(that);
        }
    },
    methods : {
        defaultData : function () {
            var _c = this.cConf || {};
            return {
                viewTitle : '',
                conf : _c,
                langContext : null,
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
                    that.$crud.errorDialog(json.msg);
                    return
                }
                callback(json);
            })
        },
        getActionConfig : function(name,type) {
            //console.log('v-base.getActionConfig',name,type,this.conf);
            if (this.conf.customActions[name]) {
                var aConf = {}
                if (!this.$options.components[name]) {
                    //console.log('estendo azioni ',name);
                    Vue.component(name, {
                        extends : actionBase
                    });
                } else {
                    aConf = this.$crud.recordActions[name]?this.$crud.recordActions[name]:(this.$crud.collectionActions[name]?this.$crud.collectionActions[name]:{})
                }
                aConf = this.$crud.merge(aConf,this.conf.customActions[name]);
                //console.log('CUSTOM',name,aConf);
                return aConf;
            }
            if (type == 'record') {
                if (this.$crud.recordActions[name]) {
                    return this.$crud.cloneObj(this.$crud.recordActions[name]);
                } else
                    throw "Azione " + name +  " di tipo record non trovata nelle azioni generali";
            }
            if (type == 'collection') {
                if (this.$crud.collectionActions[name]) {
                    return this.$crud.cloneObj(this.$crud.collectionActions[name]);
                } else
                    throw "Azione " + name +  " di tipo collection non trovata nelle azioni generali";
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
            var defaltConf = this.$crud.conf[type];


            if (this.cConf) {
                if (typeof this.cConf === 'string' || this.cConf instanceof String)
                    conf = window[this.cConf]?window[this.cConf]:(this.$crud.conf[this.cConf]?this.$crud.conf[this.cConf]:null);
                else
                    conf = this.cConf;
            } else {
                console.log('Check exist default conf '+ 'Model'+this.$crud.pascalCase(modelName));
                if (window['Model'+this.$crud.pascalCase(modelName)]) {
                    var cm = window['Model'+this.$crud.pascalCase(modelName)];
                    if (cm[type])
                        conf = cm[type];
                    else {
                        if (type == 'insert' && cm['edit'])
                            conf = cm['edit'];
                        else {
                            conf = this.$crud.conf[type];
                        }
                    }

                } else {
                    console.log('get default crud conf ',type)
                    conf = this.$crud.conf[type];
                }
            }
            if (!conf)
                throw "Nessuna configurazione trovata per questa view";

            var finalConf = this.$crud.confMerge(defaltConf,conf);
            console.log('getConf',finalConf);
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
            if (!that.route) {
                if (crud.routes[that.conf.routeName]) {
                    route =  new Route(crud.routes[that.conf.routeName]);
                } else {
                    route = Route.factory(that.conf.routeName);
                }
                route.fillValues(that.conf);
                console.log('ROUTEN ',route.values);
                //route.values = values;
            }
            // if (!that.route)
            //     route = Route.factory(that.conf.routeName);
            // route.values = values;
            return route;
        },
        /**
         * ritorna la configurazione minimale di base di un render rispettando le priorita' tra le configurazioni
         * @param key : nome del campo di cui vogliamo la configurazione
         * @param confiName : nome variabile configurazione nell'oggetto conf. opzionale
         * @returns {{type: *}}
         * @private
         */
        _defaultRenderConfig : function(key,configName) {
            var that = this;
            var c = {
                type:that.defaultRenderType,
                value : null,
                operator : null,
            };
            configName = configName?configName:'fieldsConfig';
            var conf = (that.conf[configName] && that.conf[configName][key])?that.conf[configName][key]:null;
            //console.log('CONF',key,conf,configName,that.conf[configName]);
            if (conf) {
                // in caso di stringa lo considero come il type del render
                if (typeof conf === 'string' || conf instanceof String) {
                    c.type = conf;
                } else {
                    c = this.$crud.merge(c,conf);
                }
            }

            if (!c.template)
                c.template = that.conf.renderTemplate;
            //c.metadata = this.$crud.merge( (c.metadata || {}),(that.data.metadata[key] || {}));
            c = this.$crud.merge( c ,(that.data.metadata[key] || {}));
            return c;
        },
        getFieldName : function (key) {
            return key;
        }
    },
    template : '<div>view base</div>'
});

crud.components.views.vRecord = Vue.component('v-record', {
    extends : crud.components.views.vBase,
    props : ['cModel','cPk'],
    methods : {

        setFieldValue : function(key,value) {
            var that = this;
            if (!that.renders[key]) {
                throw 'accesso a render con chiave inesistente ' + key;
            }
            crud.cRefs[that.renders[key].cRef].setValue(value);
        },

        createRenders : function() {
            var that = this;
            var keys = (that.conf.fields && that.conf.fields.length > 0)?that.conf.fields:Object.keys(that.data.value);
            var renders = {};
            for (var k in keys) {
                var key = keys[k];
                renders[key] = that._defaultRenderConfig(key);
                renders[key].cRef = that.$crud.getRefId(that._uid,'r',key);
                renders[key].value = null;
                renders[key].operator = null;
                if (that.data.value && (key in that.data.value) )
                    renders[key].value = that.data.value[key];

                renders[key].name = that.getFieldName(key);
                if (! ('label' in renders[key]) )
                    renders[key].label = key;

                renders[key].label = that.$options.filters.translate(renders[key].label,that.langContext);
            }

            console.log('v-record.renders',renders);
            that.renders = renders;
        },
        createActions : function() {
            var that = this;
            var actions = [];
            for (var i in that.conf.actions) {
                var aName = that.conf.actions[i];
                if (that.$crud.collectionActions[aName])
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
            console.log('confff',that.actions,that);
            for (var i in that.actions) {
                var aName = that.actions[i];
                var aConf = that.getActionConfig(aName,'collection');
                aConf.modelData = this.$crud.cloneObj(that.data.value); //jQuery.extend(true,{},that.data.value);
                aConf.modelName = that.cModel;
                aConf.rootElement = that.$el;
                aConf.cRef = that.$crud.getRefId(that._uid,'a',aName);
                actions[aName] = aConf;
            }
            that.actionsClass = actions;
        },
        fillData : function (route,json) {
            var that = this;
            var data = {value : {}};
            if (!route) {
                console.log('dati manuali',that.conf.data);
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
            that.json = json;
        },
        defaultData : function () {
            return {
                viewTitle : '',
                loading : true,
                renders : {},
                actionsName : [],
                actions : {},
                vueRefs:{},
                conf : this.cConf || {},
                langContext : this.cModel
            }
        },
        getFormData : function () {
            var that = this;
            var data = {};
            if (that.jQe('form').length) {
                data = this.$crud.getFormData(that.jQe('form'));
            }
            return data;
        },
        getRender : function (key) {
            var rConf = this.renders[key];
            console.log('getRenderd',key,rConf);
            return this.$crud.cRefs[rConf.cRef];
        },
        getAction : function (name) {
            var rConf = this.actionsClass[name];
            console.log('getAction',name,rConf);
            return this.$crud.cRefs[rConf.cRef];
        }
    },
    data : function() {
        var d =  this.defaultData();
        if (this.cModel)
            d.conf.modelName = this.cModel;
        if (this.cPk)
            d.conf.pk = this.cPk;
        d.json = {};
        return d;
    },
    template : '<div>view record base</div>'
});

crud.components.views.vCollection = Vue.component('v-collection', {
    extends : crud.components.views.vBase,
    props : ['cModel'],
    methods : {
        setFieldValue : function(row,key,value) {
            var that = this;
            if (!that.renders[row][key]) {
                throw 'accesso a render con chiave inesistente '+ row + "," + key;
            }
            that.renders[row][key].setValue(value);
        },
        defaultData : function () {
            return {
                viewTitle : '',
                loading : true,
                renders : {},
                actionsName : [],
                actions : {},
                conf : this.cConf || {},
            }
        },
        createRenders : function () {
            var that = this;
            //console.log('Vlist-create renders',that.data);
            var renders = [];
            var recordActions = that.recordActions;
            var recordActionsName = that.recordActionsName;
            var data = that.data;
            var keys = that.keys;
            console.log('keys',keys);
            for (var i in data.value) {
                renders.push({});
                recordActions.push({});
                for (var k in that.keys) {
                    var key = keys[k];
                    var dconf = that._defaultRenderConfig(key);
                    dconf.cRef = that.$crud.getRefId(that._uid,'r',i,key);
                    dconf.modelData = data.value[i];
                    if (! ('value' in dconf))
                        dconf.value = null;
                    if (data.value[i][key])
                        dconf.value = data.value[i][key];
                    dconf.name = that.getFieldName(key);

                    renders[i][key] = dconf;

                }
                that.createRecordActions(i);
            }

            that.renders = renders;
            that.recordActionsName = recordActionsName;
        },
        getKeys : function () {
            var that = this;
            var keys = [];
            if (that.conf.fields && that.conf.fields.length > 0)
                keys = that.conf.fields;
            if (that.cFields) {
                keys = that.cFields.split(',');
            }
            if (keys.length == 0 && that.data.value.length)
                keys =Object.keys(that.data.value[0]);
            return keys;
        },
        getRender : function (row,key) {
            return this.renders[row][key];
        },
        createActions : function () {
            var that = this;
            var collectionActionsName = [];
            var recordActionsName = [];

            for (var i in that.conf.actions) {
                var aName = that.conf.actions[i];
                if (that.$crud.recordActions[aName])
                    recordActionsName.push(that.conf.actions[i]);
                else if (that.$crud.collectionActions[aName])
                    collectionActionsName.push(aName);
                else if (that.conf.customActions[aName]) {
                    Vue.component(aName, {
                        extends : actionBase
                    });
                    if (that.conf.customActions[aName].type == 'collection')
                        collectionActionsName.push(aName);
                    else if (that.conf.customActions[aName].type == 'record')
                        recordActionsName.push(aName);
                    else
                        throw  "tipo di action (" + that.conf.customActions[aName].type + ") non definito! valori accettati sono record,collection";
                } else {
                    throw "Impossibile trovare la definizione di " + aName;
                }
            }
            //console.log('data',data,'conf',conf,'keys',keys);
            that.collectionActionsName = collectionActionsName;
            that.recordActionsName = recordActionsName;
            that.collectionActions = {};
            that.recordActions = [];
        },
        createRecordActions : function(row) {
            //console.log('row',row);
            var that = this;
            var recordActionsName = that.recordActionsName;
            var recordActions = that.recordActions;
            var data = that.data;

            for(var k in recordActionsName) {
                var aName = recordActionsName[k];
                var aConf = that.getActionConfig(aName,'record');
                //var a = jQuery.extend(true,{},aConf);
                //a.id = data.value[i].id;
                aConf.modelData = this.$crud.cloneObj(data.value[row]);
                aConf.modelName = that.cModel;
                aConf.index = row;
                aConf.cRef = that.$crud.getRefId(that._uid,'ra',row,aName);
                recordActions[row][aName] = aConf;
            }
        },
        createCollectionActions : function () {
            var that = this;
            var collectionActions = [];
            var collectionActionsName = that.collectionActionsName;
            var data = that.data;

            for (var i in collectionActionsName) {
                var aName = collectionActionsName[i];
                var aConf = that.getActionConfig(aName,'collection');
                //var a = jQuery.extend(true,{},aConf);
                //a.id = data.value[i].id;
                aConf.modelData = jQuery.extend(true,{},data.value);
                aConf.modelName = that.cModel;
                aConf.rootElement = that.$el;
                aConf.cRef = that.$crud.getRefId(that._uid,'ca',aName);
                collectionActions[aName] = aConf;
            }
            that.collectionActions = collectionActions;
        },
    },
    data : function () {
        var d =  this.defaultData();
        if (this.cModel)
           d.conf.modelName = this.cModel;
        return d;
    },
    template : '<div>view collection base</div>'
});


crud.components.views.vList = Vue.component('v-list', {
    extends : crud.components.views.vCollection,
    conf : {},
    // beforeCreate : function() {
    //     this.template = '#v-view-template';
    // },
    mounted : function() {
        var that = this;
        //VLIST = this;
        //console.log('MOUNTED CALLED');
        that.route = that._getRoute(that.routeConf.values);
        this.fetchData(that.route,function (json) {
            that.fillData(that.route,json);
            that.keys = that.getKeys();
            that.draw();
            that.loading = false;
        });
    },
    data :  function () {
        var that = this;
        //console.log('DATA CALLED');
        //console.log('CRUDCONF',that.$Crud);
        var routeConf =  this.$crud.cloneObj(that.$crud.routes.list);
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
            collectionActions : {},
            collectionActionsName : [],
            routeConf : routeConf,
            route : null,
            data : [],
            maxPage : 0,
            conf : conf,
            needSelection : true,
            pagination : {},
            viewTitle : '',
            defaultRenderType : 'r-text',
            langContext : that.cModel,
            json : {},
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
            that.createCollectionActions();
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
            that.json = json;
        },

        getOrderConf : function (key) {
            var that = this;
            var conf = that.getActionConfig('action-order','collection');
            conf.title = that.$crud.translate('app.ordina') + ' ' + key;
            conf.text = key;
            conf.orderField = that.conf.orderFields[key]?that.conf.orderFields[key]:key;
            //if (that.data.order_field)
            var order = that.data.metadata.order || {};
            //console.log('GETORDERCONF CALLED',key,order);
            conf.orderDirection = (order.field == conf.orderField)?order.direction:null;
            return conf;
        },
        reload : function () {
            var that = this;
            //that.route = that._getRoute(that.routeConf.values);
            //var route = Route.factory('list',that.routeConf);
            that.route = new Route(that.routeConf);
            that.loading = true;
            that.fetchData(that.route,function (json) {
                that.fillData(that.route,json);
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
            //console.log('select3ed',sel);
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
    extends : crud.components.views.vList,
    conf : {},
    props : ['cConf','cModel'],

    data :  function () {
        var that = this;

        var routeConf =  this.$crud.cloneObj(that.$crud.routes.list);
        routeConf.values = {
            modelName: this.cModel
        }

        if (this.$route && this.$route.query)
            routeConf.params = that.$route.query;

        var conf = that.getConf(that.cModel,'listEdit');
        // conf.customActions['action-edit'] = {
        //     execute : function () {
        //         var thatA = this;
        //         that.$set(that.editMode,thatA.cIndex, true);
        //     }
        // };
        console.log('v-list-edit conf',conf)

        var d = {
            loading : true,
            renders : {},
            rendersEdit : {},
            keys : [],
            recordActionsName : [],
            recordActions: [],
            collectionActions : {},
            collectionActionsName : [],
            routeConf : routeConf,
            route : null,
            data : [],
            maxPage : 0,
            conf : conf,
            needSelection : true,
            pagination : {},
            viewTitle : '',
            defaultRenderType : 'r-text',
            editMode : [],

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
            that.editMode = new Array(that.data.value.length).fill(false);
            that.createActions();
            that.createRenders();
            that.createRendersEdit();
            that.createCollectionActions();
            console.log('rendersEdit',that.rendersEdit);
            console.log('renders',that.renders,'recordActions',that.recordActions);
            console.log('collectionActions',that.collectionActions);
            console.log('editMode',that.editMode)
        },

        createRendersEdit : function () {
            var that = this;
            //console.log('Vlist-create renders',that.data);
            var rendersEdit = [];
            var data = that.data;
            var keys = that.keys;
            for (var i in data.value) {
                rendersEdit.push({});
                for (var k in that.keys) {
                    var key = keys[k];
                    var dconf = that._defaultRenderConfig(key,'fieldsConfigEditMode');
                    // se non c'e' la configurazione in modalità edit lo forzo ad essere un r-input
                    if (!that.conf.fieldsConfigEditMode || !that.conf.fieldsConfigEditMode[key])
                        dconf.type = 'r-input';
                    dconf.cRef = that.$crud.getRefId(that._uid,'redit',i,key);
                    dconf.modelData = data.value[i];
                    if (! ('value' in dconf))
                        dconf.value = null;
                    if (data.value[i][key])
                        dconf.value = data.value[i][key];
                    dconf.name = that.getFieldName(key);
                    rendersEdit[i][key] = dconf;
                }
            }
            that.rendersEdit = rendersEdit;
        },

        // getOrderConf : function (key) {
        //     var that = this;
        //     var conf = that.getActionConfig('action-order','collection');
        //     conf.title = 'app.ordina ' + key;
        //     conf.text = key;
        //     conf.orderField = that.conf.orderFields[key]?that.conf.orderFields[key]:key;
        //     if (that.data.order_field)
        //         conf.orderDirection = (that.data.metadata.order.order_field == conf.orderField)?that.data.metadata.order.order_direction:null;
        //     return conf;
        // },
        // reload : function () {
        //     var that = this;
        //     var route = Route.factory('list',that.routeConf);
        //     that.loading = true;
        //     that.fetchData(route,function (json) {
        //         that.fillData(route,json);
        //         that.draw();
        //         that.loading = false;
        //     });
        // },
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

            return sel;
        },
        setEditMode : function (index) {
            var that = this;
            that.hideRA(index,'action-delete');
            that.hideRA(index,'action-edit-mode');
            that.hideRA(index,'action-view');


            that.showRA(index,'action-view-mode');
            that.showRA(index,'action-save-row');
            //that.recordActions[index]['action-delete'].setVisible(false);
            that.$set(that.editMode,index, true);
        },
        setViewMode : function (index) {
            var that = this;
            that.$set(that.editMode,index, false);
            that.showRA(index,'action-delete');
            that.showRA(index,'action-edit-mode');
            that.showRA(index,'action-view');

            that.hideRA(index,'action-view-mode');
            that.hideRA(index,'action-save-row');
        },
        hideRA : function (index,name) {
            var that = this;
            var n = that.$crud.getRefId(that._uid,'ra',index,name);
            this.$crud.cRefs[n]? this.$crud.cRefs[n].setVisible(false):null;
        },
        showRA : function (index,name) {
            var that = this;
            var n = that.$crud.getRefId(that._uid,'ra',index,name);
            this.$crud.cRefs[n]? this.$crud.cRefs[n].setVisible(true):null;
        },
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
    extends : crud.components.views.vRecord,
    //props : ['cModel','cPk'],

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
        return this.$crud.merge(d,dEdit);

    },
    methods : {
       getFormData : function () {

       }
    },
    template : '#v-edit-template'
});

Vue.component('v-view', {
    extends : crud.components.views.vRecord,
    //props : ['cModel','cPk'],

    mounted : function() {
        var that = this;
        //console.log('view route param',this.cModel,this.cPk);
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
            that.loading = false;
        });
    },
    data :  function () {
        var that = this;
        var d = this.defaultData();
        d.conf = that.getConf(that.cModel,'view');


        var dView = {
            loading : true,
            renders : {},
            actionsClass : [],
            actions : {},
            data : {},
            route : null,
            viewTitle : d.conf.viewTitle,
            defaultRenderType : 'r-text',
        }
        return this.$crud.merge(d,dView);

    },

    template : '#v-view-template'
});

Vue.component('v-insert', {
    extends : crud.components.views.vRecord,
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
        return this.$crud.merge(d,dInsert);

    },
    template : '#v-insert-template'

});

Vue.component('v-search', {
    extends : crud.components.views.vRecord,
    props : ['cConf','cModel','cRouteConf','cTargetRef'],
    mounted : function() {
        var that = this;
        var route = that._getRoute({
            modelName: this.cModel,
        });
        that.route = route;

        this.fetchData(that.route,function (json) {
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
        d.conf = that.getConf(that.cModel,'search');


        var dSearch = {
            loading : true,
            renders : {},
            actionsClass : [],
            actions : {},
            data : {},
            route : null,
            viewTitle : d.conf.viewTitle,
            defaultRenderType : 'r-input',
            targetRef : that.cTargetRef,
        }
        return this.$crud.merge(d,dSearch);
    },
    methods : {
        doSearch : function (params) {
            var that = this;
            var oldP = this.$crud.cloneObj(this.cRouteConf.params);

            for (var k in params) {
                oldP[k] = params[k];
            }
            this.cRouteConf.params = oldP;
        },
        getFieldName : function (key) {
            return 's_' + key;
        },
        createRenders : function() {
            var that = this;
            var keys = (that.conf.fields && that.conf.fields.length > 0)?that.conf.fields:Object.keys(that.data.value);
            var renders = {};
            for (var k in keys) {
                var key = keys[k];
                renders[key] = that._defaultRenderConfig(key);
                renders[key].cRef = that.$crud.getRefId(that._uid,'r',key);
                renders[key].value = null;
                if (! ('label' in renders[key]) )
                    renders[key].label = key;
                renders[key].label = that.$options.filters.translate(renders[key].label,that.langContext);
                //renders[key].operator = null;
                if (that.data.value && that.data.value[key])
                    renders[key].value = that.data.value[key];

                renders[key].name = that.getFieldName(key);
                if (!renders[key].operator) {
                    renders[key].operator = '=';
                }
            }

            console.log('v-searc.renders',renders);
            that.renders = renders;
        },

        // createRenders : function() {
        //     var that = this;
        //     var keys = (that.conf.fields && that.conf.fields.length > 0)?that.conf.fields:Object.keys(that.data.value);
        //     var renders = {};
        //     for (var k in keys) {
        //         var key = keys[k];
        //         renders[key] = that._defaultRenderConfig(key);
        //         if (that.data.value && that.data.value[key])
        //             renders[key].value = that.data.value[key];
        //         if (!renders[key].operator) {
        //             renders[key].operator = '=';
        //         }
        //     }
        //
        //     console.log('v-search.renders',renders);
        //     that.renders = renders;
        // },
    },
    template : '#v-search-template'
});

Vue.component('v-hasmany', {
    extends : crud.components.views.vRecord,
    props : ['c-conf'],
    data :  function () {
        var that = this;
        var conf = that.getConf(that.cModel,'edit');
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
        // renderKey : function (key) {
        //     var that = this;
        //     return that.cModel + "-" + key + '[]';
        // },
        getFieldName : function (key) {
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
    extends : crud.components.views.vRecord,
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

const CrudApp = Vue.extend({
    created : function() {
        var that = this;
        Vue.prototype.$crud = crud;
        //Vue.prototype.$lang = lang;
        for (var k in window) {
            //console.log('window key ',k);
            if (k.indexOf('_interface') > 0) {
                console.log('found interface ',k)
                var methods = window[k].methods || {};
                var __call = function (interface,lk) {
                    that.$crud[lk] = function () {
                        var localk = new String(lk);
                        var int = new String(interface);
                        //var arguments = this.arguments;
                        //console.log(localk,'arguments',arguments);
                        return window[interface].methods[localk].apply(that,arguments);
                    }
                }
                for (var m in methods) {
                    console.log('....method',m)
                    __call(k,m);
                }
            }
        }



        that.$crud.instance = that;
        that.$crud.pluginsPath = this.pluginsPath?this.pluginsPath:'/';
        var resources = [];
        resources.push(this.templatesFile);
        for (var k in this.$crud.components.libs) {
            if (that.$crud.components.libs[k].tpl)
                resources.push(that.$crud.components.libs[k].tpl);
            if (that.$crud.components.libs[k].js)
                resources.push(that.$crud.components.libs[k].js);
        }
        console.log('resources',resources)
        that.$crud.loadResources(resources,function () {
            console.log('monto app');

            that.$mount(that.el);
            console.log('mounted');
        })

    },
    methods : {
        onChangeViewConf : function (view) {
            
        },

    }
});

Vue.filter('translate', function (value,context) {
    var langKey = context?context+'.'+value:value;
    //console.log('translate global',value,context,langKey);
    return crud.lang[langKey]?crud.lang[langKey]:value;
})