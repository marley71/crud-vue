Crud.components.views.vRecord = Vue.component('v-record', {
    extends : Crud.components.views.vBase,
    props : ['cModel','cPk'],
    methods : {

        setFieldValue : function(key,value) {
            var that = this;
            if (!that.renders[key]) {
                throw 'accesso a render con chiave inesistente ' + key;
            }
            Crud.cRefs[that.renders[key].cRef].setValue(value);
        },

        createRenders : function() {
            var that = this;
            var keys = (that.conf.fields && that.conf.fields.length > 0)?that.conf.fields:Object.keys(that.data.value);
            var renders = {};
            for (var k in keys) {
                var key = keys[k];
                renders[key] = that._defaultRenderConfig(key);
                renders[key].cRef = that.$Crud.getRefId(that._uid,'r',key);
                renders[key].value = null;
                renders[key].operator = null;
                if (that.data.value && (key in that.data.value) )
                    renders[key].value = that.data.value[key];

                renders[key].name = that.getFieldName(key);
                // var c = that.conf.fieldsConfig[key]?that.conf.fieldsConfig[key]:{type:that.defaultRenderType};
                // if (!c.type)
                //     c.type = that.defaultRenderType;
                // if (that.data.value && that.data.value[key])
                //     c.value = that.data.value[key];
                // if (!c.template)
                //     c.template = that.conf.renderTemplate;
                // renders[key] = c;
                //
                // var metadata = renders[key].metadata || {};
                // renders[key].metadata = Utility.merge( metadata,(that.data.metadata[key] || {}));

            }

            console.log('v-record.renders',renders);
            that.renders = renders;
        },
        createActions : function() {
            var that = this;
            var actions = [];
            for (var i in that.conf.actions) {
                var aName = that.conf.actions[i];
                if (that.$Crud.globalActions[aName])
                    actions.push(aName);
                else if (that.conf.customActions[aName])
                    actions.push(aName);
                else
                    throw "Impossibile trovare la definizione di " + aName;
            }
            that.actions = actions;
        },
        createActionsClass : function () {
            var that = this;
            var actions = {};
            console.log('confff',that.actions,that);
            for (var i in that.actions) {
                var aName = that.actions[i];
                var aConf = that.getActionConfig(aName,'global');
                aConf.modelData = Utility.cloneObj(that.data.value); //jQuery.extend(true,{},that.data.value);
                aConf.modelName = that.cModel;
                aConf.rootElement = that.$el;
                aConf.cRef = that.$Crud.getRefId(that._uid,'a',aName);
                actions[aName] = aConf;
            }
            that.actionsClass = actions;
        },
        fillData : function (route,json) {
            var that = this;
            var data = {value : {}};
            if (!route) {
                console.log('dati manuali',that.conf.data);
                if (that.conf.data) {
                    data = that.conf.data;
                }
            } else {
                var protocol = Protocol.factory(route.protocol);
                protocol.jsonToData(json);
                var prop = Object.getOwnPropertyNames(protocol);
                //console.log(prop);


                for (var i in prop) {
                    //console.log(k,k,prop[k]);
                    data[prop[i]] = protocol[prop[i]];
                }
            }

            that.data = data;
        },
        defaultData : function () {
            return {
                viewTitle : '',
                loading : true,
                renders : {},
                actionsName : [],
                actions : {},
                vueRefs:{},
                conf : this.cConf || {}
            }
        },
        getFormData : function () {
            var that = this;
            var data = {};
            if (that.jQe('form').length) {
                data = Utility.getFormData(that.jQe('form'));
            }
            return data;
        },
        getRender : function (key) {
            var rConf = this.renders[key];
            console.log('getRenderd',key,rConf);
            return this.$Crud.cRefs[rConf.cRef];
        },
        getAction : function (name) {
            var rConf = this.actionsClass[name];
            console.log('getAction',name,rConf);
            return this.$Crud.cRefs[rConf.cRef];
        }
    },
    data : function() {
        var d =  this.defaultData();
        if (this.cModel)
            d.conf.modelName = this.cModel;
        if (this.cPk)
            d.conf.pk = this.cPk;
        return d;
    },
    template : '<div>view record base</div>'
});