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
            return translations_interface._translate.apply(this,[key,plural,params]);
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
    }
}