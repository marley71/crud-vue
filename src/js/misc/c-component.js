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
    // mounted : function() {
    //     //     //console.log(this.$options.name + ' cref ',this.cRef)
    //     //     if (this.cConf && this.cConf.cRef) {
    //     //         this.$crud.cRefs[this.cConf.cRef] = this;
    //     //     }
    //     // },

    mounted : function() {
        var that = this;
        console.log('c-component.mounted',that.$options.name);
        if (that.cConf && that.cConf.cRef) {
            that.$crud.cRefs[that.cConf.cRef] = this;
        }
        if (that.conf) {
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

            if ( that.conf.mounted ) {
                that.conf.mounted.apply(that);
            }
        }

    },
    // data : function() {
    //     return this._loadConf();
    // },
    methods : {
        jQe : function (selector) {
            var that = this;
            if (selector) {
                return jQuery(that.$el).find(selector).addBack(selector);
            }
            return jQuery(that.$el);
        },
        _loadConf : function() {
            var _c = this.cConf || {};
            var d = {};
            for (var k in _c) {
                if (k == 'methods')
                    continue;
                d[k] = _c[k];
            }
            d.conf = _c;
            return d;
        },
        // defaultData : function () {
        //     var _c = this.cConf || {};
        //     var d = {};
        //     for (var k in _c) {
        //         if (k == 'methods')
        //             continue;
        //         d[k] = _c[k];
        //     }
        //     d.conf = _c;
        //     return d;
        // },
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
    }
});
