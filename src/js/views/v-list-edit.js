crud.components.views.vListEdit = Vue.component('v-list-edit', {
    extends : crud.components.views.vList,

    data : function() {
        var that = this;
        var d = that._loadConf(that.cModel,'listEdit');
        var dListEdit = {
            widgetsEdit : {},
            editMode : []
        };
        return this.$crud.merge(dListEdit,d);
    },

    // data :  function () {
    //     var that = this;
    //
    //     var routeConf =  this.$crud.cloneObj(that.$crud.routes.list);
    //     routeConf.values = {
    //         modelName: this.cModel
    //     }
    //
    //     if (this.$route && this.$route.query)
    //         routeConf.params = that.$route.query;
    //
    //     var conf = that.getConf(that.cModel,'listEdit');
    //     // conf.customActions['action-edit'] = {
    //     //     execute : function () {
    //     //         var thatA = this;
    //     //         that.$set(that.editMode,thatA.cIndex, true);
    //     //     }
    //     // };
    //     console.log('v-list-edit conf',conf)
    //
    //     var d = {
    //         loading : true,
    //         widgets : {},
    //         widgetsEdit : {},
    //         keys : [],
    //         recordActionsName : [],
    //         recordActions: [],
    //         collectionActions : {},
    //         collectionActionsName : [],
    //         routeConf : routeConf,
    //         route : null,
    //         data : [],
    //         maxPage : 0,
    //         conf : conf,
    //         needSelection : true,
    //         pagination : {},
    //         viewTitle : '',
    //         defaultRenderType : 'w-text',
    //         editMode : [],
    //
    //     };
    //     if (d.conf.viewTitle) {
    //         d.viewTitle = d.conf.viewTitle;
    //     }
    //     return d;
    // },

    methods: {

        draw : function() {
            var that = this;
            that.editMode = new Array(that.data.value.length).fill(false);
            that.createActions();
            that.createWidgets();
            that.createWidgetsEdit();
            that.createCollectionActions();
            // console.log('widgetsEdit',that.widgetsEdit);
            // console.log('widgets',that.widgets,'recordActions',that.recordActions);
            // console.log('collectionActions',that.collectionActions);
            // console.log('editMode',that.editMode)
        },

        createWidgetsEdit : function () {
            var that = this;
            //console.log('Vlist-create widgets',that.data);
            var widgetsEdit = [];
            var data = that.data;
            var keys = that.keys;
            for (var i in data.value) {
                widgetsEdit.push({});
                for (var k in that.keys) {
                    var key = keys[k];
                    var dconf = that._defaultRenderConfig(key,'fieldsConfigEditMode');
                    // se non c'e' la configurazione in modalità edit lo forzo ad essere un w-input
                    if (!that.conf.fieldsConfigEditMode || !that.conf.fieldsConfigEditMode[key])
                        dconf.type = 'w-input';
                    dconf.cRef = that.$crud.getRefId(that._uid,'redit',i,key);
                    dconf.modelData = data.value[i];
                    if (! ('value' in dconf))
                        dconf.value = null;
                    if (data.value[i][key])
                        dconf.value = data.value[i][key];
                    dconf.name = that.getFieldName(key);
                    widgetsEdit[i][key] = dconf;
                }
            }
            that.widgetsEdit = widgetsEdit;
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
