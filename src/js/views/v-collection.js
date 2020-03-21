crud.components.views.vCollection = Vue.component('v-collection', {
    extends : crud.components.views.vBase,
    props : ['cModel'],
    methods : {
        setFieldValue : function(row,key,value) {
            var that = this;
            if (!that.renders[row][key]) {
                throw 'accesso a render con chiave inesistente '+ row + "," + key;
            }
            that.renders[row][key].setValue(value);
        },
        defaultData : function () {
            return {
                viewTitle : '',
                loading : true,
                renders : {},
                actionsName : [],
                actions : {},
                conf : this.cConf || {},
            }
        },
        createRenders : function () {
            var that = this;
            //console.log('Vlist-create renders',that.data);
            var renders = [];
            var recordActions = that.recordActions;
            var recordActionsName = that.recordActionsName;
            var data = that.data;
            var keys = that.keys;
            console.log('keys',keys);
            for (var i in data.value) {
                renders.push({});
                recordActions.push({});
                for (var k in that.keys) {
                    var key = keys[k];
                    var dconf = that._defaultRenderConfig(key);
                    dconf.cRef = that.$crud.getRefId(that._uid,'r',i,key);
                    dconf.modelData = data.value[i];
                    if (! ('value' in dconf))
                        dconf.value = null;
                    if (data.value[i][key])
                        dconf.value = data.value[i][key];
                    dconf.name = that.getFieldName(key);

                    renders[i][key] = dconf;

                }
                that.createRecordActions(i);
            }

            that.renders = renders;
            that.recordActionsName = recordActionsName;
        },
        getKeys : function () {
            var that = this;
            var keys = [];
            if (that.conf.fields && that.conf.fields.length > 0)
                keys = that.conf.fields;
            if (that.cFields) {
                keys = that.cFields.split(',');
            }
            if (keys.length == 0 && that.data.value.length)
                keys =Object.keys(that.data.value[0]);
            return keys;
        },
        getRender : function (row,key) {
            return this.renders[row][key];
        },
        createActions : function () {
            var that = this;
            var collectionActionsName = [];
            var recordActionsName = [];

            for (var i in that.conf.actions) {
                var aName = that.conf.actions[i];
                if (that.$crud.recordActions[aName])
                    recordActionsName.push(that.conf.actions[i]);
                else if (that.$crud.collectionActions[aName])
                    collectionActionsName.push(aName);
                else if (that.conf.customActions[aName]) {
                    Vue.component(aName, {
                        extends : actionBase
                    });
                    if (that.conf.customActions[aName].type == 'collection')
                        collectionActionsName.push(aName);
                    else if (that.conf.customActions[aName].type == 'record')
                        recordActionsName.push(aName);
                    else
                        throw  "tipo di action (" + that.conf.customActions[aName].type + ") non definito! valori accettati sono record,collection";
                } else {
                    throw "Impossibile trovare la definizione di " + aName;
                }
            }
            //console.log('data',data,'conf',conf,'keys',keys);
            that.collectionActionsName = collectionActionsName;
            that.recordActionsName = recordActionsName;
            that.collectionActions = {};
            that.recordActions = [];
        },
        createRecordActions : function(row) {
            //console.log('row',row);
            var that = this;
            var recordActionsName = that.recordActionsName;
            var recordActions = that.recordActions;
            var data = that.data;

            for(var k in recordActionsName) {
                var aName = recordActionsName[k];
                var aConf = that.getActionConfig(aName,'record');
                //var a = jQuery.extend(true,{},aConf);
                //a.id = data.value[i].id;
                aConf.modelData = Utility.cloneObj(data.value[row]);
                aConf.modelName = that.cModel;
                aConf.index = row;
                aConf.cRef = that.$crud.getRefId(that._uid,'ra',row,aName);
                recordActions[row][aName] = aConf;
            }
        },
        createCollectionActions : function () {
            var that = this;
            var collectionActions = [];
            var collectionActionsName = that.collectionActionsName;
            var data = that.data;

            for (var i in collectionActionsName) {
                var aName = collectionActionsName[i];
                var aConf = that.getActionConfig(aName,'collection');
                //var a = jQuery.extend(true,{},aConf);
                //a.id = data.value[i].id;
                aConf.modelData = jQuery.extend(true,{},data.value);
                aConf.modelName = that.cModel;
                aConf.rootElement = that.$el;
                aConf.cRef = that.$crud.getRefId(that._uid,'ca',aName);
                collectionActions[aName] = aConf;
            }
            that.collectionActions = collectionActions;
        },
    },
    data : function () {
        var d =  this.defaultData();
        if (this.cModel)
           d.conf.modelName = this.cModel;
        return d;
    },
    template : '<div>view collection base</div>'
});