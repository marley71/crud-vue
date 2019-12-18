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



    // opzioni
    App.resources = [];     // vettore di risorse iniziali da caricare
    App.pluginsPath = '/crud/plugins/';
    App.log = null;
    App.show_log = false;
    App.mobile = false;

    App.getRefId = function () {
        var id = "";
        for (var i = 0; i < arguments.length; i++) {
            id += arguments[i];
            if (i < arguments.length-1)
                id += '-';
        }
        return id;
    };

    App.getResources = function () {
        return _resources;
    }

    App.init = function(options,callback) {
        var self = this;

        var _o = options?options:{};

        for(var k in _o) {
            self[k] = _o[k];
        }

        _log = console; //new Log(this.showLog,this.mobile);
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
        if (_cW) {
            _cW.msg = msg;
            return;
        }
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