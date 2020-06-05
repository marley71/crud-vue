crud.components.cComponent = Vue.component('c-component',{
    props : ['cConf','compRef'],
    mixins : [core_mixin,dialogs_mixin],
    mounted : function() {
        var that = this;
        console.log('COMPONENTE MOUNTED',jQuery(that.$el).html());
        //console.log('c-component.mounted',that.$options.name);
        if (that.conf.cRef) {
            that.$crud.cRefs[that.conf.cRef] = this;
        }
        if (that.compRef) {
            that.$crud.cRefs[that.compRef] = this;
        }

        //if (that.conf) {
            var __call = function (lk) {
                that[lk] = function () {
                    var localk = new String(lk);
                    //var arguments = this.arguments;
                    //console.log(localk,'arguments',arguments);
                    return that.conf.methods[localk].apply(that,arguments);
                }
            }
            for (var k in that.conf.methods) {
                __call(k);
            }

            if ( that.conf.mounted) {
                that.conf.mounted.apply(that);
            }
        //}
        if (that.resources && that.resources.length) {
            that.beforeLoadResources();
            //that.resourcesLoaded = false;
            that.loadResources(that.resources,function () {
                //console.log('resoures loaded callback',that);
                that.resourcesLoaded = true;
                setTimeout(function () {
                    that.afterLoadResources();
                },1000)

            })
        } else {
            that.resourcesLoaded = true;
        }
    },
    data : function() {
        var d =  this._loadConf();
        d.resourcesLoaded = false;
        return d;
    },
    methods : {
        jQe : function (selector) {
            var that = this;
            if (selector) {
                return jQuery(that.$el).find(selector).addBack(selector);
            }
            return jQuery(that.$el);
        },
        _loadConf : function() {
            var _c = this._getConf() || {};
            var d = {};
            for (var k in _c) {
                if (['methods','mounted'].indexOf(k) >= 0)
                    continue;
                d[k] = _c[k];
            }
            d.conf = _c;
            return d;
        },

        _getConf : function() {
            var that = this;
            var conf = {};
            // se e' una stringa controllo prima che non sia una variabile globale
            if (typeof that.cConf === 'string' || that.cConf instanceof String) {
                conf = that.getDescendantProp(window, that.cConf);
                // altrimenti controllo che non sia una configurazione dentro la crud conf
                if (!conf) {
                    conf = that.getDescendantProp(that.$crud.conf, that.cConf);
                }
            }
            else
                conf = that.cConf;
            return conf;
        },
        /**
         * setta la configurazione della route secondo le proprie esigenze.
         * @param route
         * @returns {*}
         */
        // setRouteValues : function(route) {
        //     return route;
        // },
        /**
         * istanzia l'oggetto route definito da routeName nella configurazione altrimenti ritorna null
         * @param routeName : nome della route se null la prende dalla proprieta routeName del componente
         * @return {null}
         * @private
         */
        _getRoute : function (routeName) {
            var that = this;
            if (that.route)
                return that.route;
            var rn = routeName?routeName:that.routeName;
            if (!rn)
                return null;
            if (!that.$crud.routes[rn])
                throw "Impossibile trovare la route " + rn;
            console.log('routeName',rn,that.$crud.routes[rn])
            return new Route(that.$crud.routes[rn]);
        },

        beforeLoadResources : function () {
            console.log('cComponent.beforeLoadResources')
        },
        afterLoadResources : function () {
            console.log('cComponent.afterLoadResources');
        },

    }
});
