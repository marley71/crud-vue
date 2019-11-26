Crud.components.renders.rBase = Vue.component('r-base', {
    extends : Crud.components.cComponent,
    props : ['c-conf','c-marker','c-ref'],

    mounted : function() {
        var that = this;
        var _conf = that.cConf || {};
        if (!_conf.operator) {
            jQuery(that.$el).find('[c-operator]').remove();
        }
        var that =this;
        for (var k in _conf.methods) {
            //console.log('r-base implements methods',k);
            that[k] = function () {
                _conf.methods[k].apply(that,this.arguments);
            }
        }
        if (_conf.resources && _conf.resources.length) {
            that.beforeLoadResources();
            that.resourcesLoaded = false;
            that.crudApp.loadResources(_conf.resources,function () {
                console.log('resoures loaded callback',that);
                that.resourcesLoaded = true;
                that.afterLoadResources();
            })
        }

    },
    data :  function () {
        return this.defaultData();
    },
    methods : {
        getFieldName: function () {
            var that = this;
            //console.log('GET FIELD NAME',this.cKey);
            if (that.conf.operator) {
                return that.cKey + '[]';
            }
            return that.cKey;
        },
        getOperatorName : function () {
            var that = this;
            return this.cKey + "_operator";
        },
        defaultData : function () {
            var _c = this.cConf || {};
            var d = {
                //fieldName : this.getFieldName(),
                value: _c.value,
                operator : _c.operator,
                //operatorName : this.getOperatorName(),
                resourcesLoaded : true,
                conf : _c,
            }
            //console.log('r-base::defaultData',d);
            return d;
        },
        beforeLoadResources : function () {
            console.log('rBase.beforeLoadResources')
        },
        afterLoadResources : function () {
            console.log('rBase.afterLoadResources');
        },
        getValue : function() {
            return this.value;
        },
        setValue : function(value) {
            this.value = value;
        },
        //events
        change : function () {
            var that = this;
            var methods = that.conf.methods || {};
            if (methods.change) {
                methods.change.apply(that);
            }
        },
        updateConf : function (conf) {
            this.conf = conf;
        },

    },
    // watch : {
    //     resourcesLoaded : {
    //         deep : true,
    //         handler() {
    //             var that = this;
    //             console.log('resouces Loaded',that.resourcesLoaded)
    //             if (that.resourcesLoaded) {
    //                 jQuery(that.$el).find('[c-autocomplete]').mdbAutocomplete({
    //                     data: that.cConf.metadata.domainValues
    //                 });
    //             }
    //         }
    //     }
    // },
    template: '<div>render base</div>'
});
