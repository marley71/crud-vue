
import jQuery from "jquery";

const vListMixin = {
    methods: {

        isOrderField: function (key) {
            var that = this;
            if (that.orderFields[key])
                return true;
            return false;
        },

        getOrderConf: function (key) {
            var that = this;
            var widgetsRow = that.widgets[0];
            var translateKey = that.langContext ? that.langContext + '.' : '';
            translateKey += key + '.label';
            var conf = that.getActionConfig('action-order', 'collection');
            conf.title = that.translate('app.ordina') + ' ' + widgetsRow[key].label; //that.translate(translateKey);
            conf.text = widgetsRow[key].label; //that.translate(translateKey);
            conf.orderField = that.orderFields[key] ? that.orderFields[key] : key;
            //if (that.data.order_field)
            var order = that.metadata.order || {};
            //console.log('GETORDERCONF CALLED',key,order);
            conf.orderDirection = (order.field == conf.orderField) ? order.direction : null;
            conf.view = that;
            return conf;
        },
        selectAllRows: function () {
            var that = this;
            var sel = that.jQe('[c-row-check-all]').prop('checked');
            that.jQe('[c-row-check]').prop('checked', sel);
        },
        selectedRows: function () {
            var that = this;
            var sel = [];
            that.jQe('[c-row-check]').each(function () {
                if (jQuery(this).prop('checked')) {
                    var index = jQuery(this).closest('tr').index();
                    sel.push(that.value[index].id);
                }
            });
            //console.log('select3ed',sel);
            return sel;
        },
        setRouteValues: function (route) {
            var that = this;
            if (route) {
                route.setValues({
                    modelName: that.modelName
                });
                console.log('setRouteValues', that);
                if (that.routeConf) {
                    var _conf = that._loadRouteConf() || {};
                    console.log('routeConf params', _conf);
                    var params = route.getParams();
                    var p2 = _conf.params || {};
                    for (var k in p2) {
                        params[k] = p2[k];
                    }
                    route.setParams(params);
                }
            }
            return route;
        }
    },
    watch: {
        routeConf: {
            deep: true,
            handler() {
                this.reload();

            }
        }
    }
}

export default vListMixin
