Crud.components.views.vCollection = Vue.component('v-collection', {
    extends : Crud.components.views.vBase,
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
            var conf = that.conf;
            var keys = that.keys;

            for (var i in data.value) {
                renders.push({});
                recordActions.push({});
                for (var k in that.keys) {
                    var key = keys[k];
                    var dconf = that._defaultRenderConfig(key);
                    dconf.cRef = that.crudApp.getRefId(that._uid,'r',i,key);
                    dconf.modelData = data.value[i];
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
            if (keys.length == 0)
                keys =Object.keys(that.data.value[0]);
            return keys;
        },
        getRender : function (row,key) {
            return this.renders[row][key];
        }
    },
    data : function () {
        var d =  this.defaultData();
        if (this.cModel)
            d.conf.modelName = this.cModel;
        return d;
    },
    template : '<div>view collection base</div>'
});