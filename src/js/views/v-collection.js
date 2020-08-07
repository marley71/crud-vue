crud.components.views.vCollection = Vue.component('v-collection', {
    extends : crud.components.views.vBase,
    props : {
        'cModel' : {
            default: null
        },
        'cType' : {
            default: 'list'
        }
    },
    mounted : function() {
        var that = this;
        if (that.cModel)
            that.conf.modelName = that.cModel;
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
                this.getWidget(row,key).$destroy();
            }
        }
        for (var row in this.recordActions) {
            for (var key in this.recordActions[row]) {
                this.getRecordAction(row,key).$destroy();
            }
        }
        for (var key in this.collectionActions) {
            var a = this.getCollectionAction(key).$destroy();
        }
    },

    data : function () {
        var that = this;
        //var _conf = that._getConf() || {};
        var d =  {};
        if (that.cModel)
            d.modelName = that.cModel;
        d.value = [];
        d.metadata = {};
        d.needSelection = false;

        return d;
    },
    methods : {

        draw : function() {
            var that = this;
            that.createWidgets();
            that.createActions();
            that.createActionsClass();
            that.loading = false;
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
                    dconf.cRef = that.getRefId(that._uid,'r',i,key);
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
            if (that.conf.fields && that.conf.fields.length > 0)
                keys = that.conf.fields;
            if (that.cFields) {
                keys = that.cFields.split(',');
            }
            if (keys.length == 0 && that.value.length)
                keys =Object.keys(that.value[0]);
            that.keys = keys;
        },
        getWidget : function (row,key) {
            var wConf =  this.widgets[row][key];
            return this.$crud.cRefs[wConf.cRef];
        },

        getRecordAction : function(row,actionName) {
            var aConf = this.recordActions[row][actionName];
            return this.$crud.cRefs[aConf.cRef];
        },
        getCollectionAction : function(actionName) {
            var aConf = this.collectionActions[actionName];
            return this.$crud.cRefs[aConf.cRef];
        },
        createActions : function () {
            var that = this;
            var collectionActionsName = [];
            var recordActionsName = [];

            for (var i in that.conf.actions) {
                var aName = that.conf.actions[i];
                var aConf = {};
                if (that.$crud.actions[aName]) {
                    aConf = that.$crud.actions[aName];
                } else if(that.conf.customActions[aName]) {
                    aConf = that.conf.customActions[aName];
                } else
                    throw "Impossibile trovare la configurazione di " + aName;

                if (aConf.type == 'collection') {
                    collectionActionsName.push(aName);
                } else if (aConf.type == 'record') {
                    recordActionsName.push(aName);
                } else {
                    console.log('action ',aConf);
                    throw "tipo di action (" + aConf.type + ") non definito! valori accettati sono record,collection";
                }
            }
            //console.log('data',data,'conf',conf,'keys',keys);
            that.collectionActionsName = collectionActionsName;
            that.recordActionsName = recordActionsName;
            that.collectionActions = {};
            that.recordActions = [];
        },

        createActionsClass : function() {
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
    },
});
