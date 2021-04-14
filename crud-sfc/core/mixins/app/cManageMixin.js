import jQuery from 'jquery'

const cManageMixin = {
    mounted: function () {
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
            jQuery(el).velocity({ opacity: 1}, { duration: 1000 })
            jQuery(el).velocity({ fontSize: '1em' }, { complete: done })
        },
        leave: function (el, done) {

            jQuery(el).velocity({
                opacity: 0
            }, { duration: 1000 })
        },
        beforeEnterList: function (el) {
            el.style.opacity = 1
        },
        enterList: function (el, done) {
            jQuery(el).velocity(
                "slideDown", {duration: 1000});
            // jQuery(el).velocity({ fontSize: '1em' }, { complete: done })
        },
        leaveList: function (el, done) {
            jQuery(el).velocity(
                "slideUp", {duration: 1000});

            jQuery(el).velocity({
                opacity: 0
            }, { complete: done })
        },
        dynamicData(conf) {
            var thisManage = this;
            //var _conf = this._getConf() || {};

            if (!conf.modelName)
                conf.modelName = thisManage.cModel ? thisManage.cModel : null;
            if (thisManage.cInlineEdit)
                conf.inlineEdit = thisManage.cInlineEdit;

            // if (!conf.modelName)
            //     throw 'model Name not found!';
            conf.layoutGradientColor = thisManage.$crud.layoutGradientColor;

            console.log(conf.modelName , thisManage.cCollapsible);
            var collapsibleElement = (thisManage.cCollapsible !== undefined) ? thisManage.cCollapsible :
                (conf.collapsible !== undefined) ? conf.collapsible :
                    true;
            conf.collapsible = (collapsibleElement === true || collapsibleElement === 'collapsed');
            conf.collapsed =  (collapsibleElement === 'collapsed');
            conf.collapseId = conf.collapseId || 'manageCollapse'+conf.modelName;

            conf = thisManage._getListConfiguration(conf);
            conf = thisManage._getSearchConfiguration(conf);
            conf = thisManage._getListEditConfiguration(conf);
            conf = thisManage._getEditConfiguration(conf);
            conf = thisManage._getInsertConfiguration(conf);
            conf = thisManage._getViewConfiguration(conf);

            console.log('CONF MANAGE',conf);
            return conf;
        },
        createList: function () {
            var that = this;
            if (that.listComp)
                that.listComp.$destroy();
            // monto la lista
            var id = 'd' + (new Date().getTime());
            that.jQe('[c-list-container]').html('<div id="' + id + '"></div>');
            if (that.list) {
                that.listComp = new that.$options.components[that.listComponentName]({
                    propsData: {
                        cConf: that.listConf,
                        cRef: 'list-view'
                    }
                });
            } else {
                that.listComp = new that.$options.components[that.listEditComponentName]({
                    propsData: {
                        cConf: that.listEditConf,
                        cRef: 'list-view'
                    }
                });
            }

            that.listComp.$mount('#' + id);
        },
        createSearch: function () {
            var that = this;
            if (!that.searchConf || that.searchConf.fields.length == 0)
                return;
            if (that.searchComp)
                that.searchComp.$destroy();
            // monto la search
            var id = 'd' + (new Date().getTime());
            that.jQe('[c-search-container]').html('<div id="' + id + '"></div>');
            that.searchComp = new that.$options.components[that.searchComponentName]({
                propsData: {
                    cModel: that.cModel,
                    cConf: that.searchConf,
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
            //console.log('primary key ',thisManage.listComp.primaryKey,action)
            var pkTranslation = thisManage.translate(thisManage.modelName + "." + thisManage.listComp.primaryKey + '.label');

            if (thisManage.modelName === 'istituto') {

                thisManage.updateTitle = 'Modifica ' + thisManage.translate(thisManage.modelName+'.label') + ' (' +
                    pkTranslation +
                    ':' + action.modelData[thisManage.listComp.primaryKey] + ')';
            } else {
                thisManage.updateTitle = 'Modifica ' + thisManage.translate(thisManage.modelName+'.label');
            }

            var id = 'd' + (new Date().getTime());
            thisManage.jQe('[c-edit-container]').html('<div id="' + id + '"></div>');
            thisManage.editComp = new thisManage.$options.components[thisManage.editComponentName]({

                propsData: {
                    cModel: thisManage.modelName,
                    cPk: action.modelData[thisManage.listComp.primaryKey],
                    cConf: thisManage.editConf
                }
            });
            thisManage.editComp.$mount('#' + id);
            thisManage.showEdit = true;
            thisManage.showList = false;

            // thisManage.jQe('[c-collapse-edit]').collapse('show');
            // thisManage.jQe('[c-collapse-list]').collapse('hide');
        },
        _createView: function (action) {
            var thisManage = this;
            //var that = this;
            var id = 'd' + (new Date().getTime());
            let primaryKey = thisManage.listComp?thisManage.listComp.primaryKey:thisManage.listEditComp.primaryKey;

            var pkTranslation = thisManage.translate(thisManage.modelName + "." + primaryKey + '.label');
            thisManage.viewTitle = thisManage.translate("model." + thisManage.modelName, 0) + ' (' +
                pkTranslation +
                ':' + action.modelData[primaryKey] + ')';

            if (thisManage.viewComp) {
                thisManage.viewComp.$destroy();
                thisManage.viewComp = null;
            }
            var pk = action.modelData[primaryKey];
            var dlgView = thisManage.customDialog('<div id="' + id + '"></div>');

            //console.log('VIEWDATA',pk);
            //viewConf.pk = pk;
            //thisManage.jQe('[c-view-container]').html('<div id="' + id + '"></div>');
            thisManage.viewComp = new thisManage.$options.components[thisManage.viewComponentName]({
                propsData: {
                    cModel: thisManage.modelName,
                    cPk: pk,
                    cConf: thisManage.viewConf,
                    cBig: true,
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
            thisManage.insertComp = new thisManage.$options.components[thisManage.insertComponentName]({
                propsData: {
                    cModel: thisManage.modelName,
                    cConf: thisManage.insertConf
                }
            });
            //}
            thisManage.insertComp.$mount('#' + id);
            thisManage.showEdit = true;
            thisManage.showList = false;
            // thisManage.jQe('[c-collapse-edit]').collapse('show');
            // thisManage.jQe('[c-collapse-list]').collapse('hide');
        },
        _actionSaveBack: function () {
            var thisManage = this;

            return thisManage.merge(thisManage.$crud.conf['action-save'], {
                text: 'Salva e Torna alla lista',
                afterExecute: function () {
                    thisManage.showEdit = false;
                    thisManage.showList = true;
                    // thisManage.jQe('[c-collapse-edit]').collapse('hide');
                    // thisManage.jQe('[c-collapse-list]').collapse('show');
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
                    // thisManage.jQe('[c-collapse-edit]').collapse('hide');
                    // thisManage.jQe('[c-collapse-list]').collapse('show');
                    this.view.$destroy();
                    thisManage.listComp.reload();
                    thisManage.jQe('[c-edit-container]').html(' ');
                }
            }
        },
        _getListConfiguration: function (conf) {
            var thisManage = this;
            var modelConf = "Model" + thisManage.pascalCase(conf.modelName);
            var originalConf = window[modelConf] ? window[modelConf] : {};
            //console.log('conf.modelName',conf.modelName,modelConf,originalConf);
            var listConf = null;

            if (!thisManage.cInlineEdit && !conf.inlineEdit) {
                listConf = conf.listConf || originalConf.list || {};
                listConf = thisManage.mergeConfView(thisManage.$crud.conf.list, listConf);
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
            conf.listConf = listConf;
            return conf;
        },
        _getListEditConfiguration: function (conf) {
            var thisManage = this;
            var modelConf = "Model" + thisManage.pascalCase(conf.modelName);
            var originalConf = window[modelConf] ? window[modelConf] : {};
            //console.log('conf.modelName',conf.modelName,modelConf,originalConf);
            var listEditConf = null;

            if (thisManage.cInlineEdit || conf.inlineEdit) {
                listEditConf = thisManage.mergeConfView(conf.listEditConf, (originalConf.listEdit || {}));
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
            }
            conf.listEditConf = listEditConf;
            return conf;
        },
        _getSearchConfiguration: function (conf) {
            var thisManage = this;
            if (conf.searchConf === null) return conf;
            var modelConf = "Model" + thisManage.pascalCase(conf.modelName);
            var originalConf = window[modelConf] ? window[modelConf] : {};
            var searchConf = conf.searchConf || originalConf.search || {};
            //searchConf = thisManage.mergeConfView(thisManage.$crud.conf.search, searchConf);

            if (!searchConf.customActions) searchConf.customActions = {};

            var acSearch = searchConf.customActions['action-search'] || {};

            acSearch.execute = function () {
                var that = this;
                var formData = that.view.getViewData();
                var viewParams = thisManage.listComp.route.getParams();
                formData = that.merge(viewParams, formData);
                thisManage.listComp.route.setParams(formData);
                thisManage.listComp.reload();
                return;
            };
            searchConf.customActions['action-search'] = acSearch;
            conf.searchConf = searchConf;
            return conf;
        },
        _getEditConfiguration: function (conf) {
            var thisManage = this;
            var modelConf = "Model" + thisManage.pascalCase(conf.modelName);
            var originalConf = window[modelConf] ? window[modelConf] : {};

            var editConf = conf.editConf || originalConf.edit || {};
            editConf = thisManage.mergeConfView(thisManage.$crud.conf.edit, editConf);
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
            console.log("EDITCONFACTIONS::: ",editConf.actions);
            conf.editConf = editConf;
            return conf;
        },
        _getInsertConfiguration: function (conf) {
            var thisManage = this;
            var modelConf = "Model" + thisManage.pascalCase(conf.modelName);
            var originalConf = window[modelConf] ? window[modelConf] : {};
            var editConf = thisManage.mergeConfView(thisManage.$crud.conf.edit, (originalConf.edit || {}));
            var insertConf = conf.insertConf || originalConf.insert || editConf;
            insertConf = thisManage.mergeConfView(thisManage.$crud.conf.insert, insertConf);
            //insertConf.routeName = 'insert';
            // prendo eventuali configurazioni locali al modello.
            var _asb = insertConf.customActions['action-save-back'] || {};
            insertConf = thisManage.mergeConfView(insertConf, {
                customActions: {
                    'action-save-back': thisManage.merge(thisManage._actionSaveBack(),_asb),
                    'action-back': thisManage._actionBack()
                }
            });
            if (insertConf.actions.indexOf('action-save-back') < 0)
                insertConf.actions.push('action-save-back');
            var actionSaveIndex = insertConf.actions.indexOf('action-save');
            if (actionSaveIndex >= 0) {
                delete insertConf.actions[actionSaveIndex];
            }
            conf.insertConf = insertConf;
            return conf;
        },
        _getViewConfiguration: function (conf) {
            var thisManage = this;
            var modelConf = "Model" + thisManage.pascalCase(conf.modelName);
            var originalConf = window[modelConf] ? window[modelConf] : {};
            var viewConf = conf.viewConf || originalConf.view || {};
            viewConf = thisManage.mergeConfView(thisManage.$crud.conf.view, viewConf);
            conf.viewConf = viewConf;
            return conf;
        }
    }
}
export default cManageMixin
