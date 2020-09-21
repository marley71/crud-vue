crud.components.views.coreVListEdit = Vue.component('core-v-list-edit', {
    extends : crud.components.views.coreVList,
    props : {
        'cModel' : {
            default: null
        },
        'cType' : {
            default: 'listEdit'
        }
    },
    data : function() {
        var dListEdit = {
            widgetsEdit : {},
            editMode : []
        };
        return dListEdit;
    },

    beforeDestroy () {
        for (var row in this.widgetsEdit) {
            for (var key in this.widgetsEdit[row]) {
                this.getWidgetEdit(row,key).$destroy();
            }
        }
    },
    methods: {

        draw : function() {
            var that = this;
            that.editMode = new Array(that.value.length).fill(false);
            that.createActions();
            that.createActionsClass();
            that.createWidgets();
            that.createWidgetsEdit();
            that.loading = false;
            setTimeout(function () {
                that.completed();
            },10);
        },

        createWidgetsEdit : function () {
            var that = this;
            that.setKeys();
            //console.log('Vlist-create widgets',that.data);
            var widgetsEdit = [];
            //var data = that.data;
            //var keys = that.getKeys();
            for (var i in that.value) {
                widgetsEdit.push({});
                for (var k in that.keys) {
                    var key = that.keys[k];
                    var dconf = that._defaultWidgetConfig(key,'fieldsConfigEditMode');
                    // se non c'e' la configurazione in modalità edit lo forzo ad essere un w-input
                    if (!that.fieldsConfigEditMode || !that.fieldsConfigEditMode[key])
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
            console.log('edit mode',index);
            if (that.actions.indexOf('action-delete') >= 0)
                that.hideRA(index,'action-delete');
            if (that.actions.indexOf('action-edit-mode') >= 0)
                that.hideRA(index,'action-edit-mode');
            if (that.actions.indexOf('action-view') >= 0)
                that.hideRA(index,'action-view');

            if (that.actions.indexOf('action-view-mode') >= 0)
                that.showRA(index,'action-view-mode');
            if (that.actions.indexOf('action-save-row') >= 0)
                that.showRA(index,'action-save-row');
            //that.recordActions[index]['action-delete'].setVisible(false);
            that.$set(that.editMode,index, true);
        },
        setViewMode : function (index) {
            var that = this;
            that.$set(that.editMode,index, false);
            if (that.actions.indexOf('action-delete') >= 0)
                that.showRA(index,'action-delete');
            if (that.actions.indexOf('action-edit-mode') >= 0)
                that.showRA(index,'action-edit-mode');
            if (that.actions.indexOf('action-view') >= 0)
                that.showRA(index,'action-view');

            if (that.actions.indexOf('action-view-mode') >= 0)
                that.hideRA(index,'action-view-mode');
            if (that.actions.indexOf('action-save-row') >= 0)
                that.hideRA(index,'action-save-row');
        },
        hideRA : function (index,name) {
            var that = this;
            var a = that.getRecordAction(index,name);
            a.setVisible(false);

            //var n = that.getRefId(that._uid,'ra',index,name);
            //this.$crud.cRefs[n]? this.$crud.cRefs[n].setVisible(false):null;
        },
        showRA : function (index,name) {
            var that = this;
            var a = that.getRecordAction(index,name);
            a.setVisible(true);
            //var n = that.getRefId(that._uid,'ra',index,name);
            //this.$crud.cRefs[n]? this.$crud.cRefs[n].setVisible(true):null;
        },
        getWidgetEdit : function (row,key) {
            var wConf =  this.widgetsEdit[row][key];
            return this.$crud.cRefs[wConf.cRef];
        },
    },
    // watch : {
    //     routeConf : {
    //         deep : true,
    //         handler() {
    //             this.reload();
    //
    //         }
    //     }
    // }
});
