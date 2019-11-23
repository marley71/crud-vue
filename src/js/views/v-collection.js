Crud.components.views.vCollection = Vue.component('v-collection', {
    extends : Crud.components.views.vBase,
    methods : {
        setFieldValue : function(row,col,value) {
            var that = this;
        },
        defaultData : function () {
            return {
                viewTitle : '',
                loading : true,
                renders : {},
                actionsName : [],
                actions : {},
                cRefs:{},
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
                    dconf.cRef = 'r-'+i+'-'+k;
                    dconf.modelData = data.value[i];
                    if (data.value[i][key])
                        dconf.value = data.value[i][key];
                    renders[i][key] = dconf;
                }
                that.createRecordActions(i);
            }
            that.renders = renders;
            that.recordActionsName = recordActionsName;
            //that.recordActions = recordActions;
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
        }
    },
    data : function () {
        return this.defaultData();
    },
    template : '<div>view collection base</div>'
});