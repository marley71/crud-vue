import crud from "../../../crud";

crud.conf['v-list-edit'] = {
    confParent: 'v-list',
    widgetsEdit: {},
    editMode: [],
    routeName: 'list',
    primaryKey: 'id',
    customActions: {},
    fieldsConfig: {},
    orderFields: {},
    widgetTemplate: 'tpl-list',
    actions: [
        'action-insert',
        'action-delete-selected',
        'action-view',
        'action-edit-mode',
        'action-delete',
        'action-save-row',
        'action-view-mode'
    ]
}


const vListEditMixin = {
    beforeDestroy() {
        for (var row in this.widgetsEdit) {
            for (var key in this.widgetsEdit[row]) {
                this.getWidgetEdit(row, key).$destroy();
            }
        }
    },
    methods: {

        draw: function () {
            var that = this;
            that.editMode = new Array(that.value.length).fill(false);
            that.createWidgets();
            that.createWidgetsEdit();
            that.checkValidActions();
            that.createActionsConf();
            that.loading = false;
            setTimeout(function () {
                that.completed();
            }, 10);
        },

        createWidgetsEdit: function () {
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
                    var dconf = that._defaultWidgetConfig(key, 'fieldsConfigEditMode');
                    // se non c'e' la configurazione in modalità edit lo forzo ad essere un w-input
                    if (!that.fieldsConfigEditMode || !that.fieldsConfigEditMode[key])
                        dconf.type = 'w-input';
                    dconf.cRef = that.getRefId(that._uid, 'redit', i, key);
                    dconf.modelData = that.value[i];
                    dconf.value = that.value[i][key];
                    dconf.name = that.getFieldName(key);
                    if (!('label' in dconf)) {
                        dconf.label = key;
                        dconf.label = that.$options.filters.translate(dconf.label + '.label', that.langContext);
                    } else {
                        dconf.label = that.$options.filters.translate(dconf.label);
                    }
                    widgetsEdit[i][key] = dconf;
                }
            }
            that.widgetsEdit = widgetsEdit;
        },

        setEditMode: function (index) {
            var that = this;
            //console.log('edit mode',index);
            if (that.actions.indexOf('action-delete') >= 0)
                that.hideRA(index, 'action-delete');
            if (that.actions.indexOf('action-edit-mode') >= 0)
                that.hideRA(index, 'action-edit-mode');
            if (that.actions.indexOf('action-view') >= 0)
                that.hideRA(index, 'action-view');

            if (that.actions.indexOf('action-view-mode') >= 0)
                that.showRA(index, 'action-view-mode');
            if (that.actions.indexOf('action-save-row') >= 0)
                that.showRA(index, 'action-save-row');
            //that.recordActions[index]['action-delete'].setVisible(false);
            that.$set(that.editMode, index, true);
        },
        setViewMode: function (index) {
            var that = this;
            that.$set(that.editMode, index, false);
            if (that.actions.indexOf('action-delete') >= 0)
                that.showRA(index, 'action-delete');
            if (that.actions.indexOf('action-edit-mode') >= 0)
                that.showRA(index, 'action-edit-mode');
            if (that.actions.indexOf('action-view') >= 0)
                that.showRA(index, 'action-view');

            if (that.actions.indexOf('action-view-mode') >= 0)
                that.hideRA(index, 'action-view-mode');
            if (that.actions.indexOf('action-save-row') >= 0)
                that.hideRA(index, 'action-save-row');
        },
        hideRA: function (index, name) {
            var that = this;
            var a = that.getRecordAction(index, name);
            a.setVisible(false);
        },
        showRA: function (index, name) {
            var that = this;
            var a = that.getRecordAction(index, name);
            a.setVisible(true);
        },
        getWidgetEdit: function (row, key) {
            var wConf = this.widgetsEdit[row][key];
            return this.$crud.cRefs[wConf.cRef];
        },
        setRowData(index,values) {
            for (var k in values) {
                this.getWidgetEdit(index,k).setValue(values[k]);
                this.getWidget(index,k).setValue(values[k]);
            }
        }
    }
}
export default vListEditMixin
