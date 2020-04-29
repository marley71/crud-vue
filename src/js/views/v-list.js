crud.components.views.vList = Vue.component('v-list', {
    extends : crud.components.views.vCollection,

    mounted : function() {
        var that = this;
        if (that.cModel)
            that.conf.modelName = that.cModel;
        that.route = that._getRoute();
        that.setRouteValues(that.route);

        that.fetchData(that.route,function (json) {
            that.fillData(that.route,json);
            that.keys = that.getKeys();
            that.draw();
            that.loading = false;
        });
    },

    data :  function () {
        var that = this;
        var d = this._loadConf(that.cModel,'list');
        // var routeConf =  this.$crud.cloneObj(that.$crud.routes.list);
        // routeConf.values = {
        //     modelName: this.cModel
        // }
        //
        // if (this.$route && this.$route.query)
        //     routeConf.params = that.$route.query;
        //
        // // var route = that._getRoute(routeConf.values);
        // var conf = that.getConf(that.cModel,'list');
        // if (that.cModel)
        //     conf.modelName = that.cModel;
        //
        // console.log('v-list conf',conf);

        var dList = {
            loading : true,
            widgets : {},
            keys : [],
            recordActionsName : [],
            recordActions: [],
            collectionActions : {},
            collectionActionsName : [],
            //routeConf : routeConf,
            route : null,
            data : [],
            maxPage : 0,
            //conf : conf,
            needSelection : true,
            pagination : {},
            viewTitle : '',
            defaultWidgetType : 'w-text',
            langContext : that.cModel,
            json : {},
        };
        if (d.conf.viewTitle) {
            d.viewTitle = d.conf.viewTitle;
        }
        return this.merge(dList,d);
    },

    methods: {

        draw : function() {
            var that = this;
            that.createActions();
            that.createWidgets();
            that.createCollectionActions();
        },

        fillData : function(route, json) {
            var that = this;
            var data = {};
            if (!route) {
                console.log('dati manuali',that.conf.data);
                if (that.conf.data) {
                    data = that.conf.data;
                    that.pagination = that.conf.data.pagination?that.conf.data.pagination:{};
                }
            } else {
                //console.log('protocol',route.getProtocol());
                //var protocol = Protocol.factory(route.getProtocol());
                var protocol = that.createProtocol(route.getProtocol());
                protocol.jsonToData(json);
                var prop = Object.getOwnPropertyNames(protocol);
                //console.log(prop);
                var data = {};

                for (var i in prop) {
                    //console.log(k,k,prop[k]);
                    data[prop[i]] = protocol[prop[i]];
                }
                var data = data;
                //this.maxPage = data.pagination.last_page;
                that.pagination = data.pagination;
            }
            that.data = data;
            that.json = json;
        },

        getOrderConf : function (key) {
            var that = this;
            var conf = that.getActionConfig('action-order','collection');
            conf.title = that.translate('app.ordina') + ' ' + key;
            conf.text = key;
            conf.orderField = that.conf.orderFields[key]?that.conf.orderFields[key]:key;
            //if (that.data.order_field)
            var order = that.data.metadata.order || {};
            //console.log('GETORDERCONF CALLED',key,order);
            conf.orderDirection = (order.field == conf.orderField)?order.direction:null;
            return conf;
        },
        reload : function () {
            var that = this;
            //that.route = that._getRoute(that.routeConf.values);
            //var route = Route.factory('list',that.routeConf);
            //that.route = new Route(that.routeConf);
            that.loading = true;
            that.fetchData(that.route,function (json) {
                that.fillData(that.route,json);
                that.draw();
                that.loading = false;
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
                    sel.push(that.data.value[index].id);
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
    },
    template : '#v-list-template'
});
