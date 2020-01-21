
crud.components.views.vList = Vue.component('v-list', {
    extends : crud.components.views.vCollection,
    conf : {},
    // beforeCreate : function() {
    //     this.template = '#v-view-template';
    // },
    mounted : function() {
        var that = this;
        VLIST = this;
        console.log('MOUNTED CALLED');
        that.route = that._getRoute(that.routeConf.values);
        this.fetchData(that.route,function (json) {
            that.fillData(that.route,json);
            that.keys = that.getKeys();
            that.draw();
            that.loading = false;
        });
    },
    data :  function () {
        var that = this;
        console.log('DATA CALLED');
        //console.log('CRUDCONF',that.$Crud);
        var routeConf =  Utility.cloneObj(that.$crud.routes.list);
        routeConf.values = {
            modelName: this.cModel
        }

        if (this.$route && this.$route.query)
            routeConf.params = that.$route.query;

        // var route = that._getRoute(routeConf.values);
        var conf = that.getConf(that.cModel,'list');
        console.log('v-list conf',conf);

        //var route = Route.factory('list',routeConf);
        //that.route = route;
        //that.conf = ModelTest.list;

        //this.loading = true;
        var d = {
            loading : true,
            renders : {},
            keys : [],
            recordActionsName : [],
            recordActions: [],
            globalActions : {},
            globalActionsName : [],
            routeConf : routeConf,
            route : null,
            data : [],
            maxPage : 0,
            conf : conf,
            needSelection : true,
            pagination : {},
            viewTitle : '',
            defaultRenderType : 'r-text',
        };
        if (d.conf.viewTitle) {
            d.viewTitle = d.conf.viewTitle;
        }
        return d;
    },
    _existsActions : function(name) {
        alert(name)
    },
    methods: {

        draw : function() {
            var that = this;
            that.createActions();
            that.createRenders();
            that.createGlobalActions();
            //console.log('renders',that.renders,'recordActions',that.recordActions);
            //console.log('globalActions',that.globalActions);
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

                var protocol = Protocol.factory(route.protocol);
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

        },

        // createActions : function () {
        //     var that = this;
        //     var globalActionsName = [];
        //     var recordActionsName = [];
        //
        //     for (var i in that.conf.actions) {
        //         var aName = that.conf.actions[i];
        //         if (that.$crud.recordActions[aName])
        //             recordActionsName.push(that.conf.actions[i]);
        //         else if (that.$crud.globalActions[aName])
        //             globalActionsName.push(aName);
        //         else if (that.conf.customActions[aName]) {
        //             Vue.component(aName, {
        //                 extends : actionBase
        //             });
        //             if (that.conf.customActions[aName].type == 'global')
        //                 globalActionsName.push(aName);
        //             else if (that.conf.customActions[aName].type == 'record')
        //                 recordActionsName.push(aName);
        //             else
        //                 throw  "tipo di action (" + that.conf.customActions[aName].type + ") non definito! valori accettati sono record,global";
        //         } else {
        //             throw "Impossibile trovare la definizione di " + aName;
        //         }
        //     }
        //     //console.log('data',data,'conf',conf,'keys',keys);
        //     that.globalActionsName = globalActionsName;
        //     that.recordActionsName = recordActionsName;
        //     that.globalActions = {};
        //     that.recordActions = [];
        // },
        // createRecordActions : function(row) {
        //     //console.log('row',row);
        //     var that = this;
        //     var recordActionsName = that.recordActionsName;
        //     var recordActions = that.recordActions;
        //     var data = that.data;
        //
        //     for(var k in recordActionsName) {
        //         var aName = recordActionsName[k];
        //         var aConf = that.getActionConfig(aName,'record');
        //         //var a = jQuery.extend(true,{},aConf);
        //         //a.id = data.value[i].id;
        //         aConf.modelData = Utility.cloneObj(data.value[row]);
        //         aConf.modelName = that.cModel;
        //         aConf._index = row;
        //         recordActions[row][aName] = aConf;
        //     }
        // },
        // createGlobalActions : function () {
        //     var that = this;
        //     var globalActions = [];
        //     var globalActionsName = that.globalActionsName;
        //     var data = that.data;
        //
        //     for (var i in globalActionsName) {
        //         var aName = globalActionsName[i];
        //         var aConf = that.getActionConfig(aName,'global');
        //         //var a = jQuery.extend(true,{},aConf);
        //         //a.id = data.value[i].id;
        //         aConf.modelData = jQuery.extend(true,{},data.value);
        //         aConf.modelName = that.cModel;
        //         aConf.rootElement = that.$el;
        //         globalActions[aName] = aConf;
        //     }
        //     that.globalActions = globalActions;
        // },
        getOrderConf : function (key) {
            var that = this;
            var conf = that.getActionConfig('action-order','global');
            conf.title = 'Order by ' + key;
            conf.text = key;
            conf.orderField = that.conf.orderFields[key]?that.conf.orderFields[key]:key;
            //if (that.data.order_field)
            var order = that.data.metadata.order || {};
            console.log('GETORDERCONF CALLED',key,order);
            conf.orderDirection = (order.field == conf.orderField)?order.direction:null;
            return conf;
        },
        reload : function () {
            var that = this;
            //that.route = that._getRoute(that.routeConf.values);
            //var route = Route.factory('list',that.routeConf);
            that.route = new Route(that.routeConf);
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
            console.log('select3ed',sel);
            return sel;
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
