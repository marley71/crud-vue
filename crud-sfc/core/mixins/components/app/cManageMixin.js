
import crud from "../../../crud";
import Server from "../../../Server";

crud.conf['c-manage'] = {
    listComponentName: 'v-list',
    searchComponentName: 'v-search',
    listEditComponentName: 'v-list-edit',
    editComponentName: 'v-edit',
    insertComponentName: 'v-insert',
    viewComponentName: 'v-view',

    inlineEdit: false,

    listComp: null,
    searchComp: null,
    listEditComp: null,
    editComp: null,
    insertComp: null,
    viewComp: null,

    layoutGradientColor: null,
    manageHeaderClass: null,
    manageHeaderTextClass: 'text-dark',
    updateTitle: '',
    viewTitle: '',

    showEdit: false,
    showList: true,
    resources: [
        'https://unpkg.com/velocity-animate@2.0.6/velocity.min.js'
    ],
    // configurazioni delle varie view
    list: {},
    edit: {},
    search: {},
    view: {},
    listEdit: {},
    insert: null
}

const cManageMixin = {
    mounted: function () {
        this.insertConf = this._getInsertConfiguration();
        this.editConf = this._getEditConfiguration();
        this.createList();
        this.createSearch();
    },
    beforeDestroy() {
        if (this.listComp) this.listComp.$destroy();
        if (this.listEditComp) this.listEditComp.$destroy();
        if (this.editComp) this.editComp.$destroy();
        if (this.searchComp) this.searchComp.$destroy();
        if (this.viewComp) this.viewComp.$destroy();
        if (this.insertComp) this.insertComp.$destroy();
    },

    methods: {
        beforeEnter: function (el) {
            el.style.opacity = 0
            el.style.transformOrigin = 'left'
        },
        enter: function (el, done) {
            window.jQuery(el).velocity({ opacity: 1}, { duration: 1000 })
            window.jQuery(el).velocity({ fontSize: '1em' }, { complete: done })
        },
        leave: function (el, done) {

            window.jQuery(el).velocity({
                opacity: 0
            }, { duration: 1000 })
        },
        beforeEnterList: function (el) {
            el.style.opacity = 1
        },
        enterList: function (el, done) {
            window.jQuery(el).velocity(
                "slideDown", {duration: 1000});
            // window.jQuery(el).velocity({ fontSize: '1em' }, { complete: done })
        },
        leaveList: function (el, done) {
            window.jQuery(el).velocity(
                "slideUp", {duration: 1000});

            window.jQuery(el).velocity({
                opacity: 0
            }, { complete: done })
        },
        // dynamicData(conf) {
        //     var thisManage = this;
        //     //var _conf = this._getConf() || {};
        //
        //     if (!conf.modelName)
        //         conf.modelName = thisManage.cModel ? thisManage.cModel : null;
        //     if (thisManage.cInlineEdit)
        //         conf.inlineEdit = thisManage.cInlineEdit;
        //
        //     // if (!conf.modelName)
        //     //     throw 'model Name not found!';
        //     conf.layoutGradientColor = thisManage.$crud.layoutGradientColor;
        //
        //     console.log(conf.modelName , thisManage.cCollapsible);
        //     var collapsibleElement = (thisManage.cCollapsible !== undefined) ? thisManage.cCollapsible :
        //         (conf.collapsible !== undefined) ? conf.collapsible :
        //             true;
        //     conf.collapsible = (collapsibleElement === true || collapsibleElement === 'collapsed');
        //     conf.collapsed =  (collapsibleElement === 'collapsed');
        //     conf.collapseId = conf.collapseId || 'manageCollapse'+conf.modelName;
        //
        //     conf = thisManage._getListConfiguration(conf);
        //     conf = thisManage._getSearchConfiguration(conf);
        //     conf = thisManage._getListEditConfiguration(conf);
        //     conf = thisManage._getEditConfiguration(conf);
        //     conf = thisManage._getInsertConfiguration(conf);
        //     conf = thisManage._getViewConfiguration(conf);
        //
        //     console.log('CONF MANAGE',conf);
        //     return conf;
        // },
        createList: function () {
            var that = this;
            console.log('INLINE EDIT',that.inlineEdit);
            if (that.listComp)
                that.listComp.$destroy();
            if (this.listEditComp)
                this.listEditComp.$destroy();
            // monto la lista
            var id = 'd' + (new Date().getTime());
            that.jQe('[c-list-container]').html('<div id="' + id + '"></div>');
            var listC = null;
            if (that.inlineEdit) {
                var conf = that._getListEditConfiguration();
                var cDef = that.dynamicComponent(that.listEditComponentName);
                that.listEditComp = new cDef({
                    propsData: {
                        cConf: conf,
                        cRef: 'list-view'
                    }
                });
                listC = that.listEditComp;
            } else {

                var conf = that._getListConfiguration();
                var cDef = that.dynamicComponent(that.listComponentName);
                that.listComp = new cDef({
                    propsData: {
                        cConf: conf,
                        cRef: 'list-view'
                    }
                });
                listC = that.listComp;
            }

            listC.$mount('#' + id);
        },
        createSearch: function () {
            var that = this;
            if (!that.search || !that.search.fields || that.search.fields.length == 0)
                return;
            if (that.searchComp)
                that.searchComp.$destroy();
            // monto la search
            //that.search.targetRef = 'list-view';
            var conf = that._getSearchConfiguration();
            var id = 'd' + (new Date().getTime());
            that.jQe('[c-search-container]').html('<div id="' + id + '"></div>');
            var cDef = that.dynamicComponent(that.searchComponentName);
            that.searchComp = new cDef({
                propsData: {
                    cConf: conf,
                }
            });
            //}
            that.searchComp.$mount('#' + id);
        },
        _createEdit: function (action) {
            var thisManage = this;
            if (thisManage.editComp) {
                thisManage.editComp.$destroy();
                thisManage.editComp = null;
            }
            if (!this.edit) {
                throw new Error({message:'configurazione edit non trovata',code:500});
            }
            //console.log('primary key ',thisManage.listComp.primaryKey,action)
            var pkTranslation = thisManage.translate(thisManage.edit.modelName + "." + thisManage.listComp.primaryKey + '.label');

            thisManage.updateTitle = 'Modifica ' + thisManage.translate(thisManage.edit.modelName+'.label');

            var conf = thisManage._getEditConfiguration();

            var id = 'd' + (new Date().getTime());
            thisManage.jQe('[c-edit-container]').html('<div id="' + id + '"></div>');
            conf.pk = action.modelData[thisManage.listComp.primaryKey];
            var cDef = thisManage.dynamicComponent(thisManage.editComponentName);
            thisManage.editComp = new cDef({
                propsData: {
                    //cPk: action.modelData[thisManage.listComp.primaryKey],
                    cConf: conf
                }
            });
            thisManage.editComp.$mount('#' + id);
            thisManage.showEdit = true;
            thisManage.showList = false;
            thisManage.jQe('[c-collapse-edit]').collapse('show');
            thisManage.jQe('[c-collapse-list]').collapse('hide');
        },
        _createView: function (action) {
            var thisManage = this;
            //var that = this;
            var id = 'd' + (new Date().getTime());
            let primaryKey = thisManage.listComp?thisManage.listComp.primaryKey:thisManage.listEditComp.primaryKey;
            let modelName = thisManage.listComp?thisManage.listComp.modelName:thisManage.listEditComp.modelName;

            var pkTranslation = thisManage.translate(modelName + "." + primaryKey + '.label');
            thisManage.viewTitle = thisManage.translate("model." + modelName, 0) + ' (' +
                pkTranslation +
                ':' + action.modelData[primaryKey] + ')';

            if (thisManage.viewComp) {
                thisManage.viewComp.$destroy();
                thisManage.viewComp = null;
            }
            var pk = action.modelData[primaryKey];
            var dlgView = thisManage.customDialog('<div id="' + id + '"></div>');
            var conf = thisManage._getViewConfiguration();
            conf.pk = action.modelData[primaryKey];
            console.log('cManage viewConf',conf,'action caller',action);
            var cDef = thisManage.dynamicComponent(thisManage.viewComponentName);
            thisManage.viewComp = new cDef({
                propsData: {
                    cConf: conf,
                    //cBig: true,
                }
            });
            thisManage.viewComp.$mount('#' + id);
            dlgView.show();
            //thisManage.jQe('[c-view_dialog]').modal('show');
        },
        _createInsert: function (action) {
            var thisManage = this;
            thisManage.updateTitle = 'Inserimento ' + thisManage.translate(thisManage.modelName+'.label');
            var id = 'd' + (new Date().getTime());
            thisManage.jQe('[c-edit-container]').html('<div id="' + id + '"></div>');
            if (thisManage.insertComp)
                thisManage.insertComp.$destroy();
            console.log('_createInsert',thisManage.insertConf);
            var cDef = thisManage.dynamicComponent(thisManage.insertComponentName);
            thisManage.insertComp = new cDef({
                propsData: {
                    cConf: thisManage.insertConf
                }
            });

            thisManage.insertComp.$mount('#' + id);
            thisManage.showEdit = true;
            thisManage.showList = false;
            thisManage.jQe('[c-collapse-edit]').collapse('show');
            thisManage.jQe('[c-collapse-list]').collapse('hide');
        },
        _actionSaveBack: function () {
            var thisManage = this;

            return thisManage.merge(thisManage.$crud.conf['action-save'], {
                text: 'Salva e Torna alla lista',
                afterExecute: function () {
                    thisManage.showEdit = false;
                    thisManage.showList = true;
                    thisManage.jQe('[c-collapse-edit]').collapse('hide');
                    thisManage.jQe('[c-collapse-list]').collapse('show');
                    this.view.$destroy();
                    thisManage.listComp.reload();
                    thisManage.jQe('[c-edit-container]').html(' ');
                }
            });
        },
        _actionBack: function () {
            var thisManage = this;
            return {
                execute: function () {
                    thisManage.showEdit = false;
                    thisManage.showList = true;
                    thisManage.jQe('[c-collapse-edit]').collapse('hide');
                    thisManage.jQe('[c-collapse-list]').collapse('show');
                    this.view.$destroy();
                    thisManage.listComp.reload();
                    thisManage.jQe('[c-edit-container]').html(' ');
                }
            }
        },
        _getListConfiguration: function () {
            var thisManage = this;
            // var modelConf = "Model" + thisManage.pascalCase(conf.modelName);
            // var originalConf = window[modelConf] ? window[modelConf] : {};
            // //console.log('conf.modelName',conf.modelName,modelConf,originalConf);
            // var originalConf = thisManage.list || {};
            var listConf = thisManage.list || {};

            if (!thisManage.inlineEdit) {
                //listConf = conf.listConf || originalConf.list || {};
                listConf = thisManage.mergeConfView(thisManage.$crud.conf['v-list'], listConf);
                // se sono presente l'action-edit,action-view o action-insert le ridefinisco per la gestione automatica da parte della c-manage
                if (listConf.actions.indexOf('action-edit') >= 0) {
                    var aEdit = listConf.customActions['action-edit'] || {};
                    aEdit.execute = function () {
                        thisManage._createEdit(this);
                    }
                    listConf.customActions['action-edit'] = aEdit;
                }
                if (listConf.actions.indexOf('action-view') >= 0) {
                    var aView = listConf.customActions['action-view'] || {};
                    aView.execute = function () {
                        thisManage._createView(this);
                    }
                    listConf.customActions['action-view'] = aView;
                }

                if (listConf.actions.indexOf('action-insert') >= 0) {
                    var aInsert = listConf.customActions['action-insert'] || {};
                    aInsert.execute = function () {
                        thisManage._createInsert(this);
                    }
                    listConf.customActions['action-insert'] = aInsert;
                }
            }
            return listConf;
        },
        _getListEditConfiguration: function () {
            var thisManage = this;
            var listEditConf = thisManage.listEdit || {};

            //if (thisManage.inlineEdit) {
                listEditConf = thisManage.mergeConfView(thisManage.$crud.conf['v-list-edit'], listEditConf);
                //listEditConf = thisManage.mergeConfView(thisManage.$crud.conf.listEdit, listEditConf);
                console.log('acions list edit ', listEditConf.actions);
                if (listEditConf.actions.indexOf('action-view') >= 0) {
                    listEditConf.customActions['action-view'] = {
                        execute: function () {
                            thisManage._createView(this);
                        }
                    }
                }

                if (listEditConf.actions.indexOf('action-insert') >= 0) {
                    listEditConf.customActions['action-insert'] = {
                        execute: function () {
                            thisManage._createInsert(this);
                        }
                    }
                }
            //}
            return listEditConf;
        },
        _getSearchConfiguration: function () {
            var thisManage = this;
            var searchConf = thisManage.search || {};
            var listComp = thisManage.inlineEdit?thisManage.listEditComp:thisManage.listComp;
            if (!searchConf.customActions) searchConf.customActions = {};

            var acSearch = searchConf.customActions['action-search'] || {};
            // forzo la execute della search, siamo in un manage...
            acSearch.execute = function () {
                var that = this;
                var formData = that.view.getViewData();
                listComp.route.mergeParams(formData);
                listComp.route.setParam('page',1);
                listComp.reload();
                return;
            };
            searchConf.customActions['action-search'] = acSearch;
            return searchConf;
        },
        _getEditConfiguration: function () {
            var thisManage = this;

            var editConf = thisManage.edit || {};
            editConf = thisManage.mergeConfView(thisManage.$crud.conf['v-edit'], editConf);
            // prendo eventuali configurazioni locali al modello.
            var _asb = editConf.customActions['action-save-back'] || {};
            //var _as = editConf.customActions['action-save'] || {};
            editConf = thisManage.mergeConfView(editConf, {
                customActions: {
                    'action-save-back': thisManage.merge(thisManage._actionSaveBack(),_asb),
                    'action-back': thisManage._actionBack(),
                    //'action-save' : thisManage.merge(_as,)
                }
            });
            if (editConf.actions.indexOf('action-save-back') < 0)
                editConf.actions.push('action-save-back');
            if (editConf.actions.indexOf('action-back') < 0)
                editConf.actions.push('action-back');
            return editConf;
        },
        _getInsertConfiguration: function () {
            var thisManage = this;
            var insertConf = thisManage.insert || thisManage.edit || {};
            insertConf = thisManage.mergeConfView(thisManage.$crud.conf['v-insert'], insertConf);

            // prendo eventuali configurazioni locali al modello.
            var _asb = insertConf.customActions['action-save-back'] || {};
            var _ab = insertConf.customActions['action-back'] || {};
            insertConf = thisManage.mergeConfView(insertConf, {
                customActions: {
                    'action-save-back': thisManage.merge(thisManage._actionSaveBack(),_asb),
                    'action-back': thisManage.merge(thisManage._actionBack(),_ab)
                }
            });
            if (insertConf.actions.indexOf('action-save-back') < 0)
                insertConf.actions.push('action-save-back');
            if (insertConf.actions.indexOf('action-back') < 0)
                insertConf.actions.push('action-back');
            var actionSaveIndex = insertConf.actions.indexOf('action-save');
            if (actionSaveIndex >= 0) {
                delete insertConf.actions[actionSaveIndex];
            }
            return insertConf;
        },

        _getViewConfiguration: function () {
            var thisManage = this;
            var viewConf = thisManage.view || {};
            viewConf = thisManage.mergeConfView(thisManage.$crud.conf['v-view'], viewConf);
            return viewConf;
        }
    }
}
export default cManageMixin
