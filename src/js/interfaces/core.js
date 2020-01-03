core_interface = {
    methods : {
        /**
         * carica un vettore di risorse, al fine caricamento chiama la callback
         * @param resources
         * @param callback
         */
        loadResources : function(resources, callback) {
            var self = this;
            var _callback = callback?callback:function () {};
            if (!resources || resources.length == 0) {
                _callback();
                return ;
            }

            var _recursive = function (i) {
                self.$crud.loadResource(resources[i],function () {
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

    _resources : {},
    _resources_loaded : {},

    _loadHtml  : function (fileName,callback) {
        var self = this;
        var _callback = function () {
            //self.log.info('loaded... ' + scriptName);
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
        var self = this;
        var _callback = function () {
            //self.log.info('loaded... ' + scriptName)
            core_interface._resources[scriptName] = true;
            core_interface._resources_loaded[scriptName] = true;
            if (callback) {
                callback();
            }
        }
        if (!core_interface._resources[scriptName]) {
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
    },

    _loadCss : function (scriptName,callback) {
        var self = this;
        var _callback = function () {
            //self.log.info('loaded... ' + scriptName);
            core_interface._resources[scriptName] = true;
            core_interface._resources_loaded[scriptName] = true;
            if (callback) {
                callback();
            };
        }
        if (!core_interface._resources[scriptName]) {
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
};