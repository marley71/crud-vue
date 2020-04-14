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
    commonParams  : {},  //parametri statici da aggiungere sempre alla chiamata
    values : {}, // vettore associativo dei parametri per la costruzione dell'url
    params :{},

    init : function (attrs) {
        var self = this;
        self.params = {};
        //self.commonParams = {};
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
        return jQuery.extend(self.params,self.commonParams);
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
//     commonParams : {_method:'POST'}
// });

// var RouteSaveConstraint = RouteSave.extend({
//     url         : '/api/json/{modelName}/create/{constraintKey}/{constraintValue}',
// });

// var RouteUpdate = Route.extend({
//     method      : "post",
//     url         : '/api/json/{modelName}/{pk}',
//     resultType  : 'record',
//     protocol    : 'record',
//     commonParams : {_method:'PUT'}
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
    commonParams : {'_method': 'DELETE'}
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
