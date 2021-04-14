import Server from '../../../Server'

const wSwapMixin = {
    mounted: function () {
        var that = this;
        var index = that._getIndex();
        that.toggleActive = index?true:false;
        that.slot = that.domainValues[index];
    },
    computed : {

        cssVars() {
            return {
                '--bg-inactive': this.bgInactive,
                '--bg-active': this.bgActive,
            }
        },
        checkedValue: {
            get() {
                console.log('toggleActive',this.toggleActive)
                return this.toggleActive
            },
            set(newValue) {
                this.toggleActive = newValue;
            }
        }
    },
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
                if (json.error) {
                    //vueModal().title("Prova").text("Prova body").error().size('normal').show();
                    that.errorDialog(json.msg);
                    return;
                }
                that.value = key;
                that.slot = dV[key];
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
            var index = this._getIndex();
            index = (index + 1) % keys.length;
            return keys[index];
        },

        _getIndex() {
            var that = this;
            var dV = that.getDV();
            var keys = Object.keys(dV);
            var value = that.value ? that.value : keys[0];
            var vs = keys.map(String);
            var index = vs.indexOf("" + value);
            return index;
        },
        _getCurrent() {
            var keys = Object.keys(that.getDV());
            return keys[this._getIndex()];
        },
    }
}
export default wSwapMixin
