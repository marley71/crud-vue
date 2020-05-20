crud.components.views.vListEdit = Vue.component('v-list-edit', {
    extends : crud.components.views.vList,

    data : function() {
        var that = this;
        //var d = that._loadConf(that.cModel,'listEdit');
        var dListEdit = {
            widgetsEdit : {},
            editMode : []
        };
        return dListEdit;
    },

    methods: {

        draw : function() {
            var that = this;
            that.editMode = new Array(that.value.length).fill(false);
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
            //var data = that.data;
            var keys = that.keys;
            for (var i in that.value) {
                widgetsEdit.push({});
                for (var k in that.keys) {
                    var key = keys[k];
                    var dconf = that._defaultWidgetConfig(key,'fieldsConfigEditMode');
                    // se non c'e' la configurazione in modalità edit lo forzo ad essere un w-input
                    if (!that.conf.fieldsConfigEditMode || !that.conf.fieldsConfigEditMode[key])
                        dconf.type = 'w-input';
                    dconf.cRef = that.getRefId(that._uid,'redit',i,key);
                    dconf.modelData = that.value[i];
                    if (! ('value' in dconf))
                        dconf.value = null;
                    if (that.value[i][key])
                        dconf.value = that.value[i][key];
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
            var n = that.getRefId(that._uid,'ra',index,name);
            this.$crud.cRefs[n]? this.$crud.cRefs[n].setVisible(false):null;
        },
        showRA : function (index,name) {
            var that = this;
            var n = that.getRefId(that._uid,'ra',index,name);
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
