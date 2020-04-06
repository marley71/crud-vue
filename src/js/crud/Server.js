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
    Server[route.getMethod()](realUrl,params,function (json) {
        __cb(json);
    })
};

Server.subdomain = null;
