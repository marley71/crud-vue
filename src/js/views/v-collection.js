crud.components.views.vCollection = Vue.component('v-collection', {
    extends : crud.components.views.vBase,
    props : {
        'cModel' : {
            default: null
        },
        'cType' : {
            default: 'collection'
        },
        cConfDefaultName : {
            default : 'v-collection',
        }
    },
    mounted : function() {
        var that = this;
        // if (that.cModel)
        //     that.conf.modelName = that.cModel;
        that.route = that._getRoute();
        that.setRouteValues(that.route);
        that.fetchData(that.route,function (json) {
            that.fillData(that.route,json);
            //that.keys = that.getKeys();
            that.draw();
        });
    },

    beforeDestroy () {
        for (var row in this.widgets) {
            for (var key in this.widgets[row]) {
                this.getWidget(row,key) && this.getWidget(row,key).$destroy();
            }
        }
        for (var row in this.recordActions) {
            for (var key in this.recordActions[row]) {
                this.getRecordAction(row,key) && this.getRecordAction(row,key).$destroy();
            }
        }
        for (var key in this.collectionActions) {
            this.getCollectionAction(key) && this.getCollectionAction(key).$destroy();
        }
    },

    data : function () {
        var that = this;
        var d =  {};
        if (that.cModel)
            d.modelName = that.cModel;
        // d.value = [];
        // d.metadata = {};
        // d.needSelection = false;

        return d;
    },
    methods : {

        fillData : function(route, json) {
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

        draw : function() {
            var that = this;
            that.createWidgets();
            that.checkValidActions();
            that.createActionsConf();
            that.loading = false;
            that.$forceUpdate();
            setTimeout(function () {
                that.completed();
            },10);
        },

        setWidgetValue : function(row,key,value) {
            var that = this;
            if (!that.widgets[row][key]) {
                throw 'accesso a render con chiave inesistente '+ row + "," + key;
            }
            var wConf =  that.widgets[row][key];
            that.$crud.cRefs[wConf.cRef].setValue(value);
        },
        createWidgets : function () {
            var that = this;
            that.setKeys();
            //console.log('Vlist-create widgets',that.data);
            var widgets = [];
            //var recordActions = that.recordActions;
            //var recordActionsName = that.recordActionsName;
            var value = that.value;
            //var keys = that.getKeys();
            //console.log('keys',keys,value);
            for (var i in value) {
                widgets.push({});
                //recordActions.push({});
                for (var k in that.keys) {
                    var key = that.keys[k];
                    var dconf = that._defaultWidgetConfig(key);
                    dconf.cRef = that.getRefId(that._uid,'w',i,key);
                    dconf.modelData = value[i];
                    if (! ('value' in dconf))
                        dconf.value = null;
                    if (value[i][key])
                        dconf.value = value[i][key];
                    dconf.name = that.getFieldName(key);
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
        setKeys : function () {
            var that = this;
            var keys = [];
            if (that.fields && that.fields.length > 0)
                keys = that.fields;
            if (that.cFields) {
                keys = that.cFields.split(',');
            }
            if (keys.length == 0 && that.value.length)
                keys =Object.keys(that.value[0]);
            that.keys = keys;
        },
        getWidget : function (row,key) {
            var wConf =  this.widgets[row][key];
            if (!wConf) {
                //console.warn('attenzione widget non trovato per riga ' + row +  " key " + key);
                return null;
            }
            return this.$crud.cRefs[wConf.cRef];
        },

        getRecordAction : function(row,actionName) {
            var aConf = this.recordActions[row][actionName];
            if (!aConf) {
                //console.warn('attenzione recordAction non trovata per riga ' + row +  " nome " + actionName);
                return null;
            }
            return this.$crud.cRefs[aConf.cRef];
        },
        getCollectionAction : function(actionName) {
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
        checkValidActions : function () {
            var that = this;
            var collectionActionsName = [];
            var recordActionsName = [];

            for (var i in that.actions) {
                var aName = that.actions[i];
                var aConf = {};
                var valid = true;
                if (that.$crud.conf[aName]) {
                    aConf = that.$crud.conf[aName];
                } else if(that.customActions[aName]) {
                    aConf = that.customActions[aName];
                } else {
                    valid = false;
                    console.warn("Impossibile trovare la configurazione di " + aName);
                }
                if (valid) {
                    if (aConf.type == 'collection') {
                        collectionActionsName.push(aName);
                    } else if (aConf.type == 'record') {
                        recordActionsName.push(aName);
                    } else {
                        console.log('action ',aConf);
                        throw "tipo di action (" + aConf.type + ") non definito! valori accettati sono record,collection";
                    }
                }
            }
            //console.log('data',data,'conf',conf,'keys',keys);
            that.collectionActionsName = collectionActionsName;
            that.recordActionsName = recordActionsName;
            that.collectionActions = {};
            that.recordActions = [];
        },

        createActionsConf : function() {
            var that = this;
            that.createCollectionActions();
            for (var i in that.value) {
                that.recordActions.push({});
                that.createRecordActions(i);
            }
        },
        createRecordActions : function(row) {
            var that = this;
            //console.log('row',row,that.recordActionsName);
            var recordActionsName = that.recordActionsName;
            var recordActions = that.recordActions;
            for(var k in recordActionsName) {
                var aName = recordActionsName[k];
                var aConf = that.getActionConfig(aName);
                //var a = jQuery.extend(true,{},aConf);
                //a.id = data.value[i].id;
                aConf.modelData = this.cloneObj(that.value[row]);
                aConf.modelName = that.cModel;
                aConf.index = row;
                aConf.cRef = that.getRefId(that._uid,'ra',row,aName);
                aConf.name = aName;
                aConf.view = that;
                recordActions[row][aName] = aConf;
            }
        },
        createCollectionActions : function () {
            var that = this;
            var collectionActions = [];
            var collectionActionsName = that.collectionActionsName;
            //var data = that.data;

            for (var i in collectionActionsName) {
                var aName = collectionActionsName[i];
                var aConf = that.getActionConfig(aName);
                //var a = jQuery.extend(true,{},aConf);
                //a.id = data.value[i].id;
                aConf.modelData = jQuery.extend(true,{},that.value);
                aConf.modelName = that.cModel;
                aConf.rootElement = that.$el;
                aConf.cRef = that.getRefId(that._uid,'ca',aName);
                that.needSelection = that.needSelection || aConf.needSelection;
                aConf.name = aName;
                aConf.view = that;
                collectionActions[aName] = aConf;
            }
            that.collectionActions = collectionActions;
        },
        /**
         * funzione chiamata per gli ordinamenti delle liste con dati non dinamici, ma statici
         */
        staticOrder : function (orderField,orderDirection) {
            var that = this;
            that.loading = true;
            var value = that.cloneObj(that.value);
            that.value = new Array();
            that.$forceUpdate();
            var __sortOn = function (arr,prop,direction) {
                var sortOrder = direction=='ASC'?1:-1;
                arr.sort (
                    function (a, b) {
                        if (a[prop] < b[prop]){
                            return -1 * sortOrder;
                        } else if (a[prop] > b[prop]){
                            return 1 * sortOrder;
                        } else {
                            return 0;
                        }
                    }
                );
            }
            //var order_direction = (!that.orderDirection || that.orderDirection.toLowerCase() == 'desc')?'ASC':'DESC';
            //console.log(that.orderField,order_direction);
            __sortOn(value,orderField,orderDirection);
            that.metadata.order = {
                field : orderField,
                direction : orderDirection
            };
            that.$set(that,'value',value);
            //that.orderDirection = order_direction;
            that.$forceUpdate();

            that.reload();
        }
    },
});
