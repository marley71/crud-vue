/**
 * VERSIONE LIBRERIA 4
 * Classe per la gestione delle route verso il server.
 */

function Route(conf) {

    const defaultConf =  {
        method : 'get',
        url : '',
        params : {},          //  parametri da inviare alla route
        commonParams : {},    //  parametri statici da aggiungere sempre alla chiamata
        values : {},          //  vettore associativo per sostituire i parametri per la costruzione dell'url racchiusi da {}
        protocol : null,      // tipo di protocollo da usare
        resultType : null,      // tipo di risultato, 'record' o 'list'
    };

    var _c = crud.instance.cloneObj(conf || {});
    var routeConf = crud.instance.cloneObj(defaultConf);

    for (var k in _c) {
        routeConf[k] = _c[k];
    }

    /**
     * ritorna il metodo utilizzato per la richiesta al server, get o post
     * @return string
     */
    this.getMethod = function() {
        return routeConf.method;
    };
    this.setMethod = function(m) {
        routeConf.method = m;
    };
    /**
     * ritorna il metodo utilizzato per la richiesta al server, get o post
     * @return string
     */
    this.getProtocol = function() {
        return routeConf.protocol;
    };
    /**
     * ritorna url esatto valorizzando le variabili parametriche tra {} presenti nella
     * stringa url.
     * @param values: valori attuali per valorizzare le variabili se non viene passato prende
     * i valori presenti in this.values
     * @returns string url con variabili valorizzate
     */
    this.getUrl = function (values) {
        var that = this;
        var finalUrl = routeConf.url;
        var v = values?values:routeConf.values;

        for (var key in v) {
            var find = '\{'+key+'\}';
            var re = new RegExp(find, 'g');
            finalUrl = finalUrl.replace(re,v[key]);
        }
        for (var key in v) {
            var find = '\{'+key+'\\?'+'\}';
            //console.log(finalUrl,' find' + find)
            var re = new RegExp(find, 'g');
            finalUrl = finalUrl.replace(re,v[key]);
        }
        // tolgo eventuali parametri opzionali
        var re = new RegExp('\/{\\w+'+'\\?'+'\}', 'g');
        finalUrl = finalUrl.replace(re,'');
        return finalUrl;
    };

    this.setUrl = function (url) {
        routeConf.url = url;
    }
    /**
     * ritorna tutti parametri passati in get o post in base al tipo di metodo della route
     * mergiando i parametri presenti in params e commonParams
     * @returns {*}
     */
    this.getParams = function() {
        var that = this;
        return jQuery.extend(routeConf.params,routeConf.commonParams);
    };

    this.getParam = function (key) {
        return routeConf.params[key];
    }

    this.getCommonParam = function (key) {
        return routeConf.commonParams[key];
    }

    /**
     * setta  parametri passati in get o post in base al tipo di metodo della route
     * @params : vettore associativo di parametri da passare
     * @returns {*}
     */
    this.setParams = function(params) {
        routeConf.params = {};
        for (var k in params) {
            routeConf.params[k] = params[k];
        }
    };

    this.setParam = function (key,value) {
        routeConf.params[key] = value;
    }

    this.setCommonParam = function (key,value) {
        routeConf.commonParams[key] = value;
    }

    this.getValues  = function() {
        return routeConf.values;
    }

    this.setValues = function(values) {
        for (var k in values) {
            routeConf.values[k] = values[k];
        }
    }
    /**
     * ritorna le key dei parametri che devono essere valorizzati per ritornare l'url esatto
     * per esempio se url e' fatto come /pippo/{param1}/{param2} ritorna ['param1','param2']
     * return array
     */
    this.getKeys = function () {
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

    this.getConf = function () {
        return routeConf;
    }
}
