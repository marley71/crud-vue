crud.components.views.vRecord = Vue.component('v-record', {
    extends : crud.components.views.vBase,
    props : ['cModel','cPk'],
    methods : {

        setWidgetValue : function(key,value) {
            var that = this;
            if (!that.widgets[key]) {
                throw 'accesso a render con chiave inesistente ' + key;
            }
            crud.cRefs[that.widgets[key].cRef].setValue(value);
        },

        createWidgets : function() {
            var that = this;
            var keys = (that.conf.fields && that.conf.fields.length > 0)?that.conf.fields:Object.keys(that.data.value);
            var widgets = {};
            for (var k in keys) {
                var key = keys[k];
                widgets[key] = that._defaultWidgetConfig(key);
                widgets[key].cRef = that.getRefId(that._uid,'r',key);
                widgets[key].value = null;
                if (that.data.value && (key in that.data.value) )
                    widgets[key].value = that.data.value[key];

                widgets[key].name = that.getFieldName(key);
                if (! ('label' in widgets[key]) )
                    widgets[key].label = key;

                widgets[key].label = that.$options.filters.translate(widgets[key].label,that.langContext);
            }

            console.log('v-record.widgets',widgets);
            that.widgets = widgets;
        },
        createActions : function() {
            var that = this;
            var actions = [];
            for (var i in that.conf.actions) {
                var aName = that.conf.actions[i];
                if (that.$crud.collectionActions[aName])
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
                var aConf = that.getActionConfig(aName,'collection');
                aConf.modelData = this.cloneObj(that.data.value); //jQuery.extend(true,{},that.data.value);
                aConf.modelName = that.cModel;
                aConf.rootElement = that.$el;
                aConf.cRef = that.getRefId(that._uid,'a',aName);
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
                var protocol = that.createProtocol(route.getProtocol());
                protocol.jsonToData(json);
                var prop = Object.getOwnPropertyNames(protocol);
                for (var i in prop) {
                    data[prop[i]] = protocol[prop[i]];
                }
            }

            that.data = data;
            that.json = json;
        },
        getViewData : function () {
            var that = this;
            var data = {};
            if (that.jQe('form').length) {
                data = this.getFormData(that.jQe('form'));
            }
            return data;
        },
        getWidget : function (key) {
            var rConf = this.widgets[key];
            console.log('getWidget',key,rConf);
            return this.$crud.cRefs[rConf.cRef];
        },
        getAction : function (name) {
            var rConf = this.actionsClass[name];
            console.log('getAction',name,rConf);
            return this.$crud.cRefs[rConf.cRef];
        }
    },
    template : '<div>view record base</div>'
});
