import Route from '../../../Routes'
import crud from "../../../crud";

crud.conf['c-component'] = {
    resourcesLoaded: false
}

const cComponentMixin = {
    props : {
        'cConf' : {
            default : null
        },
        'cCompRef' : {
            default : null
        },
        'cConfDefaultName' : {
            default : 'c-component'
        }
    },
    //mixins : [core_mixin,dialogs_mixin],

    created () {
        var that = this;
        //console.log('CREATEDDDD',that.$crud,that.$options.name,that.cConf);
        // controllo che nella configurazione dinamica non ci siano definiti dei metodi. in caso ci siano
        // estendo il componente con questi metodi aggiuntivi
        var __call = function (lk) {
            that[lk] = function () {
                var localk = new String(lk);
                return that.methods[localk].apply(that, arguments);
            }
        }
        for (var k in that.methods) {
            __call(k);
        }
    },

    mounted() {
        var that = this;
        if (that.cRef) {
            that.$crud.cRefs[that.cRef] = this;
        }
        if (that.cCompRef) {
            that.$crud.cRefs[that.cCompRef] = this;
        }


        // var __call = function (lk) {
        //     that[lk] = function () {
        //         var localk = new String(lk);
        //         return that.methods[localk].apply(that,arguments);
        //     }
        // }
        // for (var k in that.methods) {
        //     __call(k);
        // }

        if ( that.mounted) {
            that.mounted.apply(that);
        }

        if (that.resources && that.resources.length) {
            that.beforeLoadResources();
            //that.resourcesLoaded = false;
            that.loadResources(that.resources,function () {
                //console.log('resoures loaded callback',that);
                that.resourcesLoaded = true;
                //setTimeout(function () {
                that.afterLoadResources();
                //},1000)

            })
        } else {
            that.resourcesLoaded = true;
        }
    },
    beforeDestroy () {
        var cr = this.cRef || this.compRef;
        if (cr)
            delete this.$crud.cRefs[cr];
    },
    data : function() {
        return this.dynamicData(this._loadConf());
    },
    methods : {
        jQe(selector) {
            var that = this;
            if (selector) {
                return window.jQuery(that.$el).find(selector).addBack(selector);
            }
            return window.jQuery(that.$el);
        },
        dynamicData(conf) {
            //console.log('default dynamicdata',conf);
            return conf;
        },
        /**
         * carica la configurazione del componente, data dalla configurazione di default mergiata con
         * la configurazione passata a runtime.
         * @return {*}
         * @private
         */
        _loadConf() {
            var that = this;
            //console.log('this name',_compName,defaultConf);
            var defaultConf = that._getDefaultConf();
            var currentConf = that._getConf();
            var mergedConf = that.merge(defaultConf,currentConf);
            //console.log('finalConf',mergedConf);
            return mergedConf;

        },
        /**
         * esegue il binding con la configurazione passata a run time
         * @return {*}
         * @private
         */

        _getConf() {
            var that = this;
            var conf = {};
            // se e' una stringa controllo prima che non sia una variabile globale
            if (typeof that.cConf === 'string' || that.cConf instanceof String) {
                conf = that.getDescendantProp(window, that.cConf);
            }
            else
                conf = that.cConf;
            return conf;
        },
        /**
         * esegue il binding con la configurazione di default, data dal merge della cDefaultConfName e il nome del
         * widget
         * @return {*}
         * @private
         */
        _getDefaultConf() {
            var that = this;
            //console.log('_getDefaultConf',that.cConfDefaultName,that.$options.name,that.$crud.conf)
            var defaultConf =  that.mergeConf(that.$crud.conf[that.cConfDefaultName]);
            var componentNameConf = that.mergeConf(that.$crud.conf[that.$options.name]);
            var mergedConf = that.merge(defaultConf,componentNameConf);
            return mergedConf;
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
            //console.log('routeName',rn,that.$crud.routes[rn])
            return new Route(that.$crud.routes[rn]);
        },

        beforeLoadResources : function () {
            console.log('cComponent.beforeLoadResources')
        },
        afterLoadResources : function () {
            console.log('cComponent.afterLoadResources');
        },

    }
}

export default cComponentMixin;
