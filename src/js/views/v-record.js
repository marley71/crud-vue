crud.components.views.vRecord = Vue.component('v-record', {
    extends : crud.components.views.vBase,
    props : ['cModel','cPk'],
    mounted : function() {
        var that = this;
        that.route = that._getRoute();
        that.setRouteValues(that.route);
        that.fetchData(that.route,function (json) {
            that.fillData(that.route,json);
            that.draw();
        });
    },

    beforeDestroy () {
        for (var key in this.widgets) {
            this.getWidget(key).$destroy();
        }
        for (var key in this.actionsClass) {
            this.getAction(key).$destroy();
        }
    },

    data : function () {
        var that = this;
        var _conf = that._loadConf() || {}; //that._getConf() || {};
        var modelName = that.cModel || _conf.modelName;
        var langContext = _conf.langContext || modelName;
        var d =  {};

        d.modelName = modelName;

        d.pk = that.cPk || _conf.pk || 0;

        d.value = {};
        d.metadata = {};
        d.langContext = langContext;
        d.route = null;
        d.loading = true;
        d.widgets = {};
        d.actionsClass = [];
        d.actions = {};
        d.defaultWidgetType = 'w-input';
        d.fields = _conf.fields || [];
        d.fieldsConfig = _conf.fieldsConfig || {};
        console.log('d v-record',d);
        return d;
    },

    methods : {


        setRouteValues : function(route) {
            var that = this;
            console.log('setRouteValues',that);
            if (that.routeConf) {
                var _conf = that._loadRouteConf();
                console.log('routeConf params',_conf);
                var params = route.getParams();
                var p2 = _conf.params || {};
                for (var k in p2) {
                    params[k] = p2[k];
                }
                route.setParams(params);
            }
            return route;
        },
        draw : function() {
            var that = this;
            that.createActions();
            that.createActionsClass();
            that.createWidgets();
            that.loading = false;
            setTimeout(function () {
                that.completed();
            },10)
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
            var keys = (that.fields && that.fields.length > 0)?that.fields:Object.keys(that.value);
            var widgets = {};
            for (var k in keys) {
                var key = keys[k];
                widgets[key] = that._defaultWidgetConfig(key);
                widgets[key].cRef = that.getRefId(that._uid,'r',key);
                widgets[key].value = null;
                widgets[key].modelData = that.value;
                if (that.value && (key in that.value) )
                    widgets[key].value = that.value[key];

                widgets[key].name = that.getFieldName(key);
                if (! ('label' in widgets[key]) )
                    widgets[key].label = key;
                //console.log('translate',that.langContext,widgets[key].label )
                widgets[key].label = that.$options.filters.translate(widgets[key].label+'.label',that.langContext);
            }

            //console.log('v-record.widgets',widgets);
            that.widgets = widgets;
        },
        createActions : function() {
            var that = this;
            var actions = [];
            for (var i in that.conf.actions) {
                var aName = that.conf.actions[i];
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
            //console.log('confff',that.actions,that);
            for (var i in that.actions) {
                var aName = that.actions[i];
                var aConf = that.getActionConfig(aName);
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
            if (!rConf) {
                //console.warn('attenzione widget non trovato key ' + key);
                return null;
            }
            //console.log('getWidget',key,rConf);
            return this.$crud.cRefs[rConf.cRef];
        },
        getAction : function (name) {
            var rConf = this.actionsClass[name];
            if (!rConf) {
                //console.warn('attenzione action non trovata nome ' + name);
                return null;
            }
            //console.log('getAction',name,rConf);
            return this.$crud.cRefs[rConf.cRef];
        }
    }
});
