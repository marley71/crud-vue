
import ProtocolList from '../../../ProtocolList'
import jQuery from "jquery"
import crud from "../../../crud";


crud.conf['v-collection'] = {
    modelName: null,
    value: [],
    metadata: {},
    needSelection: false,
    collectionActionsName: [],
    recordActionsName: [],
    collectionActions: {},
    recordActions: [],
    paginator: true
}

const vCollectionMixin = {

    props: {
        'cModel': {
            default: null
        },
    },

    beforeDestroy() {
        for (var row in this.widgets) {
            for (var key in this.widgets[row]) {
                this.getWidget(row, key) && this.getWidget(row, key).$destroy();
            }
        }
        for (let row in this.recordActions) {
            for (let key in this.recordActions[row]) {
                this.getRecordAction(row, key) && this.getRecordAction(row, key).$destroy();
            }
        }
        for (let key in this.collectionActions) {
            this.getCollectionAction(key) && this.getCollectionAction(key).$destroy();
        }
    },
    methods: {

        dynamicData: function (conf) {
            if (this.cModel)
                conf.modelName = this.cModel;
            if (!conf.langContext && conf.langContext !== null) {
                conf.langContext = conf.modelName ? conf.modelName : this.cModel
                conf.langContext += '.fields';
            }
            return conf;
        },

        /**
         * riempe la view con i dati che arrivano dalla chiamata ajax della route
         * attraverso il protocollo definito nella route
         * @param route
         * @param json
         */
        fillData: function (route, json) {
            var that = this;
            if (route) {
                var protocol = that.createProtocol(route.getProtocol());
                protocol.jsonToData(json);
                var prop = Object.getOwnPropertyNames(protocol);
                for (var i in prop) {
                    that[prop[i]] = protocol[prop[i]];
                }
            }
            that.json = json;
        },

        draw: function () {
            var that = this;
            that.createWidgets();
            that.checkValidActions();
            that.createActionsConf();
            that.loading = false;
            that.$forceUpdate();
            //console.log('draw',that.loading);
            setTimeout(function () {
                that.completed();
            }, 100);
        },

        setWidgetValue: function (row, key, value) {
            var that = this;
            if (!that.widgets[row][key]) {
                throw 'accesso a render con chiave inesistente ' + row + "," + key;
            }
            var wConf = that.widgets[row][key];
            that.$crud.cRefs[wConf.cRef].setValue(value);
        },
        createWidgets: function () {
            var that = this;
            that.setKeys();
            //console.log('Vlist-create widgets',that.data);
            var widgets = [];
            //var recordActions = that.recordActions;
            //var recordActionsName = that.recordActionsName;
            var value = that.value;
            //console.log('collection value',value);
            //var keys = that.getKeys();
            //console.log('keys',keys,value);
            for (var i in value) {
                widgets.push({});
                //recordActions.push({});
                for (var k in that.keys) {
                    var key = that.keys[k];
                    var dconf = that._defaultWidgetConfig(key);
                    dconf.cRef = that.getRefId(that._uid, 'w', i, key);
                    dconf.modelData = value[i];
                    // if (! ('value' in dconf))
                    //     dconf.value = null;
                    //if (value[i][key])
                    dconf.value = value[i][key];
                    dconf.name = that.getFieldName(key);

                    if (! ('label' in dconf ))  {
                        dconf.label = key;
                        dconf.label = that.$options.filters.translate(dconf.label + '.label', that.langContext);
                    } else {
                        dconf.label = that.$options.filters.translate(dconf.label);
                    }

                    // if (!('label' in dconf)) {
                    //     dconf.label = key;
                    //     dconf.label = that.translate(dconf.label + '.label', that.langContext);
                    // } else {
                    //     dconf.label = that.translate(dconf.label);
                    // }
                    dconf.view = that;
                    //console.log(i,widgets,widgets[i],key,dconf),
                    widgets[i][key] = dconf;

                }
                //that.createRecordActions(i);
            }

            that.widgets = widgets;
            //that.recordActionsName = recordActionsName;
        },
        /**
         * valorizza i campi correnti calcolandoli o dai dati o dalla configurazione nella proprietà fields.
         * il risulato viene memorizzato in keys
         */
        setKeys: function () {
            var that = this;
            var keys = [];
            if (that.fields && that.fields.length > 0)
                keys = that.fields;
            if (that.cFields) {
                keys = that.cFields.split(',');
            }
            if (keys.length == 0 && that.value.length)
                keys = Object.keys(that.value[0]);
            that.keys = keys;
        },
        /**
         * ritorna solo le keys visibili
         **/
        getVisibleKeys() {
            var that = this;
            var visible = [];
            for (let i in that.keys) {
                if (!that.isHiddenField(that.keys[i]))
                    visible.push(that.keys[i]);
            }
            return visible;
        },
        getWidget: function (row, key) {
            var wConf = this.widgets[row][key];
            if (!wConf) {
                //console.warn('attenzione widget non trovato per riga ' + row +  " key " + key);
                return null;
            }
            return this.$crud.cRefs[wConf.cRef];
        },

        getRecordAction: function (row, actionName) {
            var aConf = this.recordActions[row][actionName];
            if (!aConf) {
                //console.warn('attenzione recordAction non trovata per riga ' + row +  " nome " + actionName);
                return null;
            }
            return this.$crud.cRefs[aConf.cRef];
        },
        getCollectionAction: function (actionName) {
            var aConf = this.collectionActions[actionName];
            if (!aConf) {
                //console.warn('attenzione action non trovata nome ' + actionName);
                return null;
            }
            return this.$crud.cRefs[aConf.cRef];
        },
        /**
         * controlla la validità delle azioni inserite nel vettore actions
         * e se e' di tipo record o collection.
         * se una azione non e' valida viene rimossa dal vettore
         */
        checkValidActions: function () {
            var that = this;
            var collectionActionsName = [];
            var recordActionsName = [];
            //console.log('customActions',that.customActions)
            for (var i in that.actions) {
                var aName = that.actions[i];
                var aConf = {};
                var valid = true;

                if (that.$crud.conf[aName]) {
                    aConf = that.$crud.conf[aName];
                } else if (that.customActions[aName]) {
                    aConf = that.mergeConf(that.customActions[aName]);

                    // var confBase = that.customActions[aName].componentName || 'a-base';
                    // var aConf = that.merge(that.$crud.conf[confBase],that.customActions[aName]);
                    // aConf = that.mergeConf(aConf);
                    // console.log('confCustom',aConf);
                    // //console.log('custom action',aName,JSON.parse(JSON.stringify(that.customActions[aName])))
                    // var confBase = that.customActions[aName].componentName ? that.customActions[aName].componentName : 'a-base';
                    // console.log('confBase',confBase,that.$crud.conf[confBase]);
                    // aConf = that.merge(that.$crud.conf[confBase], that.customActions[aName]);
                    // aConf = that.mergeConf(aConf);
                    //aConf.confParent = 'crud.conf.a-base';
                } else {
                    valid = false;
                    console.warn("Impossibile trovare la configurazione di " + aName);
                }
                //aConf = that.mergeConf(aConf);
                if (valid) {
                    //console.log('aConf',aName,aConf);
                    if (aConf.type == 'collection') {
                        collectionActionsName.push(aName);
                    } else if (aConf.type == 'record') {
                        recordActionsName.push(aName);
                    } else {
                        console.log('action ', aConf);
                        throw aName + ", tipo di action (" + aConf.type + ") non definito! valori accettati sono record,collection";
                    }
                }
            }
            //console.log('data',data,'conf',conf,'keys',keys);
            that.collectionActionsName = collectionActionsName;
            that.recordActionsName = recordActionsName;
            that.collectionActions = {};
            that.recordActions = [];
        },

        createActionsConf: function () {
            var that = this;
            that.createCollectionActions();
            for (var i in that.value) {
                that.recordActions.push({});
                that.createRecordActions(i);
            }
        },
        createRecordActions: function (row) {
            var that = this;
            //console.log('row',row,that.recordActionsName);
            var recordActionsName = that.recordActionsName;
            var recordActions = that.recordActions;
            for (var k in recordActionsName) {
                var aName = recordActionsName[k];
                var aConf = that.getActionConfig(aName);
                that._createActionComponent(aName,aConf);
                //var a = jQuery.extend(true,{},aConf);
                //a.id = data.value[i].id;
                aConf.modelData = this.cloneObj(that.value[row]);
                aConf.modelName = that.cModel;
                aConf.index = row;
                aConf.cRef = that.getRefId(that._uid, 'ra', row, aName);
                aConf.name = aName;
                aConf.view = that;
                recordActions[row][aName] = aConf;
            }
        },
        createCollectionActions: function () {
            var that = this;
            var collectionActions = [];
            var collectionActionsName = that.collectionActionsName;
            //var data = that.data;

            for (var i in collectionActionsName) {
                var aName = collectionActionsName[i];
                var aConf = that.getActionConfig(aName);
                that._createActionComponent(aName,aConf);
                //var a = jQuery.extend(true,{},aConf);
                //a.id = data.value[i].id;
                aConf.modelData = jQuery.extend(true, {}, that.value);
                aConf.modelName = that.cModel;
                aConf.rootElement = that.$el;
                aConf.cRef = that.getRefId(that._uid, 'ca', aName);
                that.needSelection = that.needSelection || aConf.needSelection;
                aConf.name = aName;
                aConf.view = that;
                collectionActions[aName] = aConf;
            }
            that.collectionActions = collectionActions;
        },
        getViewData: function () {
            var that = this;
            var values = [];
            for (var i=0;i<that.value.length;i++) {
                var v = {};
                for (var j in that.keys) {
                    var k = that.keys[j];
                    v[k] = that.getWidget(i,k).getValue();
                }
                values.push(v);
            }
            return values;
        },
        /**
         * funzione chiamata per gli ordinamenti delle liste con dati non dinamici, ma statici
         */
        staticOrder: function (orderField, orderDirection) {
            var that = this;
            that.loading = true;
            var value = that.cloneObj(that.value);
            that.value = new Array();
            that.$forceUpdate();
            var __sortOn = function (arr, prop, direction) {
                console.log('prop', prop, 'direction', direction)
                var sortOrder = direction == 'ASC' ? 1 : -1;
                arr.sort(
                    function (a, b) {
                        if (a[prop] < b[prop]) {
                            return -1 * sortOrder;
                        } else if (a[prop] > b[prop]) {
                            return 1 * sortOrder;
                        } else {
                            return 0;
                        }
                    }
                );
            }
            __sortOn(value, orderField, orderDirection);
            that.metadata.order = {
                field: orderField,
                direction: orderDirection
            };
            that.loading = true;
            console.log('nuovi valori ordinati', value);
            that.$set(that, 'value', value);
            //that.orderDirection = order_direction;

            setTimeout(function () {
                that.loading = false;  //  per far in modo di autodisegnarsi di nuovo
                that.reload();
            }, 100);
        },
    },
}

export default vCollectionMixin
