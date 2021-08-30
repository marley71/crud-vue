import Route from '../../../Routes'
import crud from "../../../crud";
import Server from "../../../Server";

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
        that.Server = Server;
        that.Route = Route;
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
                that._ready();
                that.ready();
                //},1000)

            })
        } else {
            that.resourcesLoaded = true;
            that._ready();
            that.ready();
        }
    },
    beforeDestroy () {
        var cr = this.cRef || this.compRef;
        if (cr)
            delete this.$crud.cRefs[cr];
    },
    data : function() {
        var _conf = this._loadConf();
        _conf = this._dynamicData(_conf);
        if (_conf.methods && _conf.methods.dynamicData) {
            _conf = _conf.methods.dynamicData.apply(this,[_conf]);
        }
        return _conf;
        //return this.dynamicData(_conf);
    },
    methods : {
        /**
         * wrapper jQuery che lavoro nel template del componenente
         * @param selector
         * @return {*}
         */
        jQe(selector) {
            var that = this;
            if (selector) {
                return window.jQuery(that.$el).find(selector).addBack(selector);
            }
            return window.jQuery(that.$el);
        },
        /**
         * per configurazioni dinamiche da fare a runtime per oggetti core in modo che non venga sovrascritta
         * da oggetti istanziati
         * @param conf
         * @return {*}
         */
        _dynamicData(conf) {
            return conf;
        },
        /**
         * per configurazioni dinamiche da fare a runtime per oggetti istanziati nell'applicazione
         * @param conf
         * @return {*}
         */
        dynamicData(conf) {
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
            //console.log(that.cConf,'_getConf',conf)
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
            var defaultConf =  that.mergeConf(that.$crud.conf[that.cConfDefaultName]);
            var componentNameConf = that.mergeConf(that.$crud.conf[that.$options.name]);
            var mergedConf = that.merge(defaultConf,componentNameConf);
            //console.log('_getDefaultConf  defaultConf',that.cConfDefaultName,defaultConf);
            //console.log('_getDefaultConf componentNameConf',that.$options.name,componentNameConf)
            //console.log('_getDefaultConf mergedConf',mergedConf)
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
            //console.log('cComponent.beforeLoadResources')
        },
        afterLoadResources : function () {
            //console.log('cComponent.afterLoadResources');
        },

        _ready() {
            // methodo per il ready del core dell'oggetto
        },

        ready() {
            // methodo per il ready del dell'oggetto per codice di customizzazione
        }
    }
}

export default cComponentMixin;
