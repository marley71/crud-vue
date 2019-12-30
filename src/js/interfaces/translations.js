translations_interface = {
    methods : {
        translate : function (key,plural,params) {
            return translations_interface._translate(key,plural,params);
        },
        translateIfExist : function (key,plural,params) {
            if (!jQuery.langDefs[key])
                return ""
            return this.$Crud.translate(key,plural,params);
        },
    },
    _translate : function (key,plural,params) {
        var tmp = key.split('.');
        var s = this.$LANG[tmp[0]];
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