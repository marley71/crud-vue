crud.components.views.vRecord = Vue.component('v-record', {
    extends : crud.components.views.vBase,
    props : ['cModel','cPk'],
    mounted : function() {
        var that = this;
        if (that.cModel)
            that.conf.modelName = that.cModel;
        if (that.cPk)
            that.conf.pk = that.cPk;

        that.route = that._getRoute();
        that.setRouteValues(that.route);
        that.fetchData(that.route,function (json) {
            that.fillData(that.route,json);
            that.draw();
            that.loading = false;
            setTimeout(function () {
                that.completed();
            },10)

        });
    },

    data : function () {
        var that = this;
        var d =  {};
        if (that.cModel)
            d.modelName = that.cModel;
        if (that.cPk)
            d.pk = that.cPk;
        d.value = {};
        d.metadata = {};
        d.langContext = d.modelName;
        d.route = null;
        d.loading = true;
        d.widgets = {};
        d.actionsClass = [];
        d.actions = {};
        d.defaultWidgetType = 'w-input';

        return d;
    },

    methods : {

        setRouteValues : function(route) {
            return route;
        },
        draw : function() {
            var that = this;
            that.createActions();
            that.createActionsClass();
            that.createWidgets();
        },
        setWidgetValue : function(key,value) {
            var that = this;
            if (!that.widgets[key]) {
                throw 'accesso a render con chiave inesistente ' + key;
            }
            crud.cRefs[that.widgets[key].cRef].setValue(value);
        },

        createWidgets : function() {
            var that = this;
            var keys = (that.conf.fields && that.conf.fields.length > 0)?that.conf.fields:Object.keys(that.value);
            var widgets = {};
            for (var k in keys) {
                var key = keys[k];
                widgets[key] = that._defaultWidgetConfig(key);
                widgets[key].cRef = that.getRefId(that._uid,'r',key);
                widgets[key].value = null;
                if (that.value && (key in that.value) )
                    widgets[key].value = that.value[key];

                widgets[key].name = that.getFieldName(key);
                if (! ('label' in widgets[key]) )
                    widgets[key].label = key;
                //console.log('translate',that.langContext,widgets[key].label )
                widgets[key].label = that.$options.filters.translate(widgets[key].label+'.label',that.langContext);
            }

            console.log('v-record.widgets',widgets);
            that.widgets = widgets;
        },
        createActions : function() {
            var that = this;
            var actions = [];
            for (var i in that.conf.actions) {
                var aName = that.conf.actions[i];
                // if (that.$crud.collectionActions[aName])
                //     actions.push(aName);
                // if (!Vue.options.components[aName]) {
                //     console.log('CREO AZIONE ',aName);
                //     Vue.component(aName, {
                //         extends : crud.components.actions.actionBase
                //     });
                // }
                if (that.$crud.actions[aName])
                    actions.push(aName);
                else if (that.conf.customActions[aName])
                    actions.push(aName);
                else
                    console.warn("Impossibile trovare la definizione di " + aName);


            }
            that.actions = actions;
        },
        createActionsClass : function () {
            var that = this;
            var actions = {};
            console.log('confff',that.actions,that);
            for (var i in that.actions) {
                var aName = that.actions[i];
                var aConf = that.getActionConfig(aName,'record');
                aConf.modelData = this.cloneObj(that.value); //jQuery.extend(true,{},that.data.value);
                aConf.modelName = that.cModel;
                aConf.rootElement = that.$el;
                aConf.cRef = that.getRefId(that._uid,'a',aName);
                aConf.name = aName;
                aConf.view = that;
                actions[aName] = aConf;
            }
            that.actionsClass = actions;
        },
        fillData : function (route,json) {
            var that = this;
            //var data = {value : {}};
            if (!route) {
                console.log('dati manuali',that.conf.value);
                if (that.conf.value) {
                    that.value = that.conf.value;
                }
            } else {
                var protocol = that.createProtocol(route.getProtocol());
                protocol.jsonToData(json);
                var prop = Object.getOwnPropertyNames(protocol);
                for (var i in prop) {
                    that[prop[i]] = protocol[prop[i]];
                }
            }

            //that.data = data;
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

        reset: function() {
            var that = this;
            for (var k in that.widgets) {
                this.getWidget(k).reset();
            }
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
    }
});
