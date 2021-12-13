/**
 * Created by pier on 20/12/17.
 */

import jQuery from "jquery";

const Server = {};


/**
 * ritorna l'url reale nel dominio in cui si lavora
 * in caso di subdomain aggiunge il subdomain all'url passato
 * @param url, url a cui aggiungere il prefisso subdomain
 * @returns {*}
 *
 * **/
Server.getUrl = function (url) {
    return Server.subdomain?Server.subdomain + url:url;
};

Server.getHearders = function() {
    return {
        'X-CSRF-TOKEN': jQuery('meta[name="csrf-token"]').attr('content')
    }
}

Server.post = function (url, params, callback) {
    var realUrl = Server.getUrl(url);
    var contentType = 'application/x-www-form-urlencoded; charset=UTF-8';
    var processData = true;
    if (params instanceof FormData) {
        contentType = false;
        processData = false;
    }
    console.log('serverPost',(params instanceof FormData),contentType,processData);
    jQuery.ajax({
        url: realUrl,
        headers: Server.getHearders(),
        type: 'POST',
        data: params,
        contentType: contentType,
        processData: processData,
    }).done(function(json) {
        callback(json);
    }).fail(function (data, error, msg) {
        callback({error:1,msg:msg});
    });
};

Server.get = function (url, params, callback) {
    var realUrl = Server.getUrl(url);
    var contentType = 'application/x-www-form-urlencoded; charset=UTF-8';
    var processData = true;
    var _data = {};
    if (params instanceof FormData) {
        contentType = false;
        processData = false;
        console.log('is FormData')
        for (var key of params.keys()) {
            var values = params.getAll(key);
            console.log('key',key,'values',values);
            if (! (key in _data) ) {
                if (values.length == 1) {
                    _data[key] = values[0];
                } else {
                    _data[key] = [];
                    for (var vi in values) {
                        _data[key].push(values[vi]);
                    }
                }
            }

        }

        // for (var key of params.keys()) {
        //     var values = params.getAll(key);
        //     if (values.length == 1) {
        //         _data[key] = values[0];
        //     } else {
        //         var keyName = key+'[]';
        //         for (var vi in values) {
        //             _data[keyName] = values[vi];
        //         }
        //     }
        // }
    } else {
        _data = params;
    }
    console.log('Server.get _data',_data,contentType,processData);
    //console.log('serverGet',(params instanceof FormData),contentType,processData,params);
    jQuery.ajax({
        url: realUrl,
        headers: Server.getHearders(),
        type: 'GET',
        data: _data,
        contentType: contentType,
        processData: processData,
    }).done(function(json) {
        callback(json);
    }).fail(function (data, error, msg) {
        callback({error:1,msg:msg});
    });
};

Server.route = function(route,callback) {
    var __cb = callback?callback:function (json) {console.debug(route.className,json)};
    var realUrl = Server.getUrl(route.getUrl());
    var params = route.getParams();
    Server[route.getMethod()](realUrl,params,function (json) {
        __cb(json);
    })
};

Server.subdomain = null;

export default Server;
