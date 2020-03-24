
Vue.component('v-list-edit', {
    extends : crud.components.views.vList,
    conf : {},
    props : ['cConf','cModel'],

    data :  function () {
        var that = this;

        var routeConf =  this.$crud.cloneObj(that.$crud.routes.list);
        routeConf.values = {
            modelName: this.cModel
        }

        if (this.$route && this.$route.query)
            routeConf.params = that.$route.query;

        var conf = that.getConf(that.cModel,'listEdit');
        // conf.customActions['action-edit'] = {
        //     execute : function () {
        //         var thatA = this;
        //         that.$set(that.editMode,thatA.cIndex, true);
        //     }
        // };
        console.log('v-list-edit conf',conf)

        var d = {
            loading : true,
            renders : {},
            rendersEdit : {},
            keys : [],
            recordActionsName : [],
            recordActions: [],
            collectionActions : {},
            collectionActionsName : [],
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
            that.createRendersEdit();
            that.createCollectionActions();
            console.log('rendersEdit',that.rendersEdit);
            console.log('renders',that.renders,'recordActions',that.recordActions);
            console.log('collectionActions',that.collectionActions);
            console.log('editMode',that.editMode)
        },

        createRendersEdit : function () {
            var that = this;
            //console.log('Vlist-create renders',that.data);
            var rendersEdit = [];
            var data = that.data;
            var keys = that.keys;
            for (var i in data.value) {
                rendersEdit.push({});
                for (var k in that.keys) {
                    var key = keys[k];
                    var dconf = that._defaultRenderConfig(key,'fieldsConfigEditMode');
                    // se non c'e' la configurazione in modalità edit lo forzo ad essere un r-input
                    if (!that.conf.fieldsConfigEditMode || !that.conf.fieldsConfigEditMode[key])
                        dconf.type = 'r-input';
                    dconf.cRef = that.$crud.getRefId(that._uid,'redit',i,key);
                    dconf.modelData = data.value[i];
                    if (! ('value' in dconf))
                        dconf.value = null;
                    if (data.value[i][key])
                        dconf.value = data.value[i][key];
                    dconf.name = that.getFieldName(key);
                    rendersEdit[i][key] = dconf;
                }
            }
            that.rendersEdit = rendersEdit;
        },

        // getOrderConf : function (key) {
        //     var that = this;
        //     var conf = that.getActionConfig('action-order','collection');
        //     conf.title = 'app.ordina ' + key;
        //     conf.text = key;
        //     conf.orderField = that.conf.orderFields[key]?that.conf.orderFields[key]:key;
        //     if (that.data.order_field)
        //         conf.orderDirection = (that.data.metadata.order.order_field == conf.orderField)?that.data.metadata.order.order_direction:null;
        //     return conf;
        // },
        // reload : function () {
        //     var that = this;
        //     var route = Route.factory('list',that.routeConf);
        //     that.loading = true;
        //     that.fetchData(route,function (json) {
        //         that.fillData(route,json);
        //         that.draw();
        //         that.loading = false;
        //     });
        // },
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
            var that = this;
            var n = that.$crud.getRefId(that._uid,'ra',index,name);
            this.$crud.cRefs[n]? this.$crud.cRefs[n].setVisible(false):null;
        },
        showRA : function (index,name) {
            var that = this;
            var n = that.$crud.getRefId(that._uid,'ra',index,name);
            this.$crud.cRefs[n]? this.$crud.cRefs[n].setVisible(true):null;
        },
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
