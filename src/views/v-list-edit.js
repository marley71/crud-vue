


Vue.component('v-list-edit', {
    extends : Crud.components.views.vCollection,
    conf : {},
    props : ['c-conf','c-model'],
    // beforeCreate : function() {
    //     this.template = '#v-view-template';
    // },
    data :  function () {
        VLIST = this;
        var that = this;
        //console.log('CRUDCONF',that.$Crud);
        var routeConf =  Utility.cloneObj(that.$Crud.routes.list);
        routeConf.values = {
            modelName: this.cModel
        }

        if (this.$route && this.$route.query)
           routeConf.params = that.$route.query;

        var route = Route.factory('list',routeConf);
        that.route = route;
        //that.conf = ModelTest.list;

        this.loading = true;
        this.fetchData(route,function (json) {
            that.fillData(route,json);
            that.keys = that.conf.fields?that.conf.fields:Object.keys(that.data.value[0]);
            that.draw();
            that.loading = false;
        });
        var d = {
            loading : true,
            renders : {},
            keys : [],
            recordActionsName : [],
            recordActions: [],
            globalActions : {},
            globalActionsName : [],
            routeConf : routeConf,
            route : route,
            data : [],
            maxPage : 0,
            conf : that.getConf(that.cModel,'list'),
            needSelection : true,
            pagination : {},
            viewTitle : '',
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
            console.log('renders',that.renders,'recordActions',that.recordActions);
            console.log('globalActions',that.globalActions);
        },

        fillData : function(route, json) {
            var protocol = Protocol.factory(route.protocol);
            protocol.jsonToData(json);
            var prop = Object.getOwnPropertyNames(protocol);
            //console.log(prop);
            var data = {};

            for (var i in prop) {
                //console.log(k,k,prop[k]);
                data[prop[i]] = protocol[prop[i]];
            }
            this.data = data;
            this.maxPage = data.pagination.last_page;
            this.pagination = data.pagination;
            console.log('MAX PAGE',this.maxPage,data.pagination)
        },
        // createRenders : function () {
        //     var that = this;
        //     //console.log('Vlist-create renders',that.data);
        //     var renders = [];
        //     var recordActions = that.recordActions;
        //     var recordActionsName = that.recordActionsName;
        //     var data = that.data;
        //     var conf = that.conf;
        //     var keys = that.keys;
        //
        //     for (var i in data.value) {
        //         renders.push({});
        //         recordActions.push({});
        //         for (var k in that.keys) {
        //             var key = keys[k];
        //             var c = conf.fieldsConfig[key]?Utility.cloneObj(conf.fieldsConfig[key]):{type:'r-text'};
        //             if (data.value[i][key])
        //                 c.value = data.value[i][key];
        //             c.modelData = data.value[i];
        //             renders[i][key] = c;
        //         }
        //         that.createRecordActions(i);
        //     }
        //     that.renders = renders;
        //     that.recordActionsName = recordActionsName;
        //     //that.recordActions = recordActions;
        // },
        createActions : function () {
            var that = this;
            var globalActionsName = [];
            var recordActionsName = [];

            for (var i in that.conf.actions) {
                var aName = that.conf.actions[i];
                if (that.$Crud.recordActions[aName])
                    recordActionsName.push(that.conf.actions[i]);
                else if (that.$Crud.globalActions[aName])
                    globalActionsName.push(aName);
                else if (that.conf.customActions[aName]) {
                    Vue.component(aName, {
                        extends : actionBase
                    });
                    if (that.conf.customActions[aName].type == 'global')
                        globalActionsName.push(aName);
                    else if (that.conf.customActions[aName].type == 'record')
                        recordActionsName.push(aName);
                    else
                        throw  "tipo di action (" + that.conf.customActions[aName].type + ") non definito! valori accettati sono record,global";
                } else {
                    throw "Impossibile trovare la definizione di " + aName;
                }
            }
            //console.log('data',data,'conf',conf,'keys',keys);
            that.globalActionsName = globalActionsName;
            that.recordActionsName = recordActionsName;
            that.globalActions = {};
            that.recordActions = [];
        },
        createRecordActions : function(row) {
            console.log('row',row);
            var that = this;
            var recordActionsName = that.recordActionsName;
            var recordActions = that.recordActions;
            var data = that.data;

            for(var k in recordActionsName) {
                var aName = recordActionsName[k];
                var aConf = that.getActionConfig(aName,'record');
                //var a = jQuery.extend(true,{},aConf);
                //a.id = data.value[i].id;
                aConf.modelData = Utility.cloneObj(data.value[row]);
                aConf.modelName = that.cModel;
                recordActions[row][aName] = aConf;
            }
        },
        createGlobalActions : function () {
            var that = this;
            var globalActions = [];
            var globalActionsName = that.globalActionsName;
            var data = that.data;

            for (var i in globalActionsName) {
                var aName = globalActionsName[i];
                var aConf = that.getActionConfig(aName,'global');
                //var a = jQuery.extend(true,{},aConf);
                //a.id = data.value[i].id;
                aConf.modelData = jQuery.extend(true,{},data.value);
                aConf.modelName = that.cModel;
                aConf.rootElement = that.$el;
                globalActions[aName] = aConf;
            }
            that.globalActions = globalActions;
        },
        getOrderConf : function (key) {
            var that = this;
            var conf = that.getActionConfig('action-order','global');
            conf.title = 'Order by ' + key;
            conf.text = key;
            conf.orderField = that.conf.orderFields[key];
            conf.orderDirection = (that.data.metadata.order_field == conf.orderField)?that.data.metadata.order_direction:null;
            return conf;
        },
        reload : function () {
            var that = this;
            var route = Route.factory('list',that.routeConf);
            that.loading = true;
            that.fetchData(route,function (json) {
                that.fillData(route,json);
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
    template : '#v-list-edit-template'
});
