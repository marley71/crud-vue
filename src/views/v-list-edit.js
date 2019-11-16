


Vue.component('v-list-edit', {
    extends : Crud.components.views.vCollection,
    conf : {},
    props : ['c-conf','c-model'],

    mounted : function() {
        var that = this;
        VLIST = this;
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

        var routeConf =  Utility.cloneObj(that.$Crud.routes.list);
        routeConf.values = {
            modelName: this.cModel
        }

        if (this.$route && this.$route.query)
            routeConf.params = that.$route.query;

        var conf = that.getConf(that.cModel,Utility.camelCase('list-edit'));
        conf.customActions['action-edit'] = {
            execute : function () {
                var thatA = this;
                that.$set(that.editMode,thatA.cIndex, true);
            }
        };
        console.log('v-list-edit conf',conf)

        var d = {
            loading : true,
            renders : {},
            rendersEdit : {},
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
            editMode : [],

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
            that.editMode = new Array(that.data.value.length).fill(false);
            that.createActions();
            that.createRenders();
            var rendersEdit = [];
            for (var row in that.renders) {
                rendersEdit.push({});
                for (var key in that.renders[row]) {
                    rendersEdit[row][key] = Utility.cloneObj(that.renders[row][key])
                    rendersEdit[row][key].type = 'r-input';
                }
            }
            // var rowRenders = that.renders[0];
            // for (var k in rowRenders) {
            //     that.rendersEdit[k] = Utility.cloneObj(rowRenders[k]);
            //     that.rendersEdit[k].type = 'r-input';
            // }
            that.rendersEdit = rendersEdit;
            that.createGlobalActions();
            console.log('renders',that.renders,'recordActions',that.recordActions);
            console.log('globalActions',that.globalActions);
            console.log('editMode',that.editMode)
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
            //console.log('row',row);
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
                aConf.cIndex = row;
                if (['action-view-mode','action-save-row'].indexOf(aName) >= 0) {
                    aConf.visible = false;
                    //console.log('nazoscond')
                }
                console.log('ACTION RECORD INDEX',aConf.cIndex)
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
            console.log('GETORDERCONF CALLED');
            var conf = that.getActionConfig('action-order','global');
            conf.title = 'Order by ' + key;
            conf.text = key;
            conf.orderField = that.conf.orderFields[key]?that.conf.orderFields[key]:key;
            if (that.data.order_field)
                conf.orderDirection = (that.data.metadata.order.order_field == conf.orderField)?that.data.metadata.order.order_direction:null;
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
        },
        setEditMode : function (index) {
            var that = this;
            that.hideRA(index,'action-delete');
            that.hideRA(index,'action-edit-mode');
            that.hideRA(index,'action-view');


            that.showRA(index,'action-view-mode');
            that.showRA(index,'action-save-row');
            //that.recordActions[index]['action-delete'].setVisible(false);
            that.$set(that.editMode,index, true);
        },
        setViewMode : function (index) {
            var that = this;
            that.$set(that.editMode,index, false);
            that.showRA(index,'action-delete');
            that.showRA(index,'action-edit-mode');
            that.showRA(index,'action-view');

            that.hideRA(index,'action-view-mode');
            that.hideRA(index,'action-save-row');
        },
        hideRA : function (index,name) {
            var n = 'ra-'+index+'-'+name;
            this.$Crud.cRefs[n]? this.$Crud.cRefs[n].setVisible(false):null;
        },
        showRA : function (index,name) {
            var n = 'ra-'+index+'-'+name;
            this.$Crud.cRefs[n]? this.$Crud.cRefs[n].setVisible(true):null;
        },
        getRef : function (prefix,index,key) {
            var s =  prefix + '-' + index + '-' + key;
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
