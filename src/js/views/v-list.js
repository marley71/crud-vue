crud.components.views.coreVList = Vue.component('core-v-list', {
    extends : crud.components.views.vCollection,
    data :  function () {
        var that = this;
        var _c = that._getConf() || {};
        var dList = {
            loading : true,
            widgets : {},
            keys : [],
            recordActionsName : [],
            recordActions: [],
            collectionActions : {},
            collectionActionsName : [],
            route : null,
            maxPage : 0,
            pagination : {},
            viewTitle : '',
            defaultWidgetType : 'w-text',
            langContext : that.cModel,
            json : {},
        };
        if (_c.viewTitle) {
            dList.viewTitle = _c.viewTitle;
        }
        return dList;
    },

    methods: {



        fillData : function(route, json) {
            var that = this;
            //var value = {};
            if (!route) {
                console.log('dati manuali',that.conf.data);
                if (that.conf.value) {
                    that.value = that.conf.value;
                    that.pagination = that.conf.pagination || {};
                }
            } else {
                //console.log('protocol',route.getProtocol());
                //var protocol = Protocol.factory(route.getProtocol());
                var protocol = that.createProtocol(route.getProtocol());
                protocol.jsonToData(json);
                var prop = Object.getOwnPropertyNames(protocol);
                //console.log(prop);


                for (var i in prop) {
                    //console.log(k,k,prop[k]);
                    that[prop[i]] = protocol[prop[i]];
                }
                //var data = data;
                //this.maxPage = data.pagination.last_page;
                //that.pagination = data.pagination;
            }
            //that.value = data;
            that.json = json;
        },

        isOrderField : function(key) {
            var that = this;
            if (that.orderFields[key])
                return true;
            return false;
        },
        getOrderConf : function (key) {
            var that = this;
            var conf = that.getActionConfig('action-order','collection');
            conf.title = that.translate('app.ordina') + ' ' + key;
            conf.text = key;
            conf.orderField = that.conf.orderFields[key]?that.conf.orderFields[key]:key;
            //if (that.data.order_field)
            var order = that.metadata.order || {};
            //console.log('GETORDERCONF CALLED',key,order);
            conf.orderDirection = (order.field == conf.orderField)?order.direction:null;
            return conf;
        },
        reload : function () {
            var that = this;
            that.loading = true;
            that.fetchData(that.route,function (json) {
                that.fillData(that.route,json);
                that.draw();
                //that.loading = false;
            });
        },
        selectAllRows : function () {
            var that = this;
            var sel = that.jQe('[c-row-check-all]').prop('checked');
            that.jQe('[c-row-check]').prop('checked',sel);
        },
        selectedRows : function () {
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
        setRouteValues : function (route) {
            var that  = this;
            if (route) {
                route.setValues({
                    modelName : that.conf.modelName
                });
            }
            return route;
        }
    },
    watch : {
        routeConf : {
            deep : true,
            handler() {
                this.reload();

            }
        }
    }
});
