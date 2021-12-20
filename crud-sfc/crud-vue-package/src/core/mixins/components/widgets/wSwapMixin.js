import Server from '../../../Server'
import crud from "../../../crud";

crud.conf['w-swap'] = {
    activeIcon: 'fa-check',
    routeName: 'set',
    title: 'swap',
    bgInactive: '#FF0000',
    bgActive: 'bg-red-400',
    domainValues: {
        0: 'app.no',
        1: 'app.si'
    },
    slot: '',
    toggleActive: false,
    switchClass: 'form-switch-success',
    dataSwitched: false,
    json : null, // ultimo json caricato dalla chiamata ajax
}

const wSwapMixin = {
    mounted: function () {
        var that = this;
        var index = that._getIndex();
        that.toggleActive = index?true:false;
        that.slot = that.domainValues[index];
    },
    // computed : {
    //
    //     cssVars() {
    //         return {
    //             '--bg-inactive': this.bgInactive,
    //             '--bg-active': this.bgActive,
    //         }
    //     },
    //     checkedValue: {
    //         get() {
    //             console.log('toggleActive',this.toggleActive)
    //             return this.toggleActive
    //         },
    //         set(newValue) {
    //             this.toggleActive = newValue;
    //         }
    //     }
    // },
    methods: {
        getDV: function () {
            return (this.domainValues || {})
            // var that = this;
            // //console.log('swaptype',that.swapType,'domainValues',that.domainValues)
            // return (that.domainValues) ? that.domainValues : that.domainValues[that.swapType];
        },
        setRouteValues: function (route) {
            var that = this;
            route.setValues({
                modelName: that.modelName,
            });
            route.setParams({
                id: that.modelData.id,
                field: that.name,
                value: that._getNext()
            });
            return route;
        },
        _swap: function (key) {
            var that = this;
            var r = that._getRoute();
            that.setRouteValues(r);
            var dV = that.getDV();
            that.waitStart()
            Server.route(r, function (json) {
                that.waitEnd();
                that.json = json;
                if (json.error) {
                    //vueModal().title("Prova").text("Prova body").error().size('normal').show();
                    that.errorDialog(json.msg);
                    return;
                }
                console.log('key',key,'current',that._getCurrent())
                that.value = that._getCurrent();
                that.slot = dV[ that._getCurrent()];
                that.change();
            })
        },
        swap() {
            var that = this;
            //console.log('INDEX ',index,vs,keys,keys[index],vs[index]);
            that._swap(that._getNext());
        },
        /**
         * restituisce il valore successivo
         * @private
         */
        _getNext() {
            var that = this;
            var keys = Object.keys(that.getDV());
            var beforeIndex = this._getIndex();
            var newIndex = (beforeIndex + 1) % keys.length;
            console.log('_getNext',beforeIndex,newIndex,'key',keys[beforeIndex],keys[newIndex])
            return keys[newIndex];
        },

        _getIndex() {
            var that = this;
            var dV = that.getDV();
            var keys = Object.keys(dV);
            var value = that.value ? that.value : keys[0];
            var vs = keys.map(String);
            var index = vs.indexOf("" + value);
            //console.log('_getIndex','vs',vs,'value',""+value,'index',index);
            return index;
        },
        _getCurrent() {
            var that = this;
            var keys = Object.keys(that.getDV());
            console.log('_getCurrent',keys,that._getIndex(),keys[that._getIndex()])
            return keys[that._getIndex()];
        },
    }
}
export default wSwapMixin
