Crud.components.renders.rBase = Vue.component('r-base', {
    extends : Crud.components.cComponent,
    props : ['c-marker'],

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

        if ( _conf.mounted ) {
            _conf.mounted.apply(that);
        }
    },
    data :  function () {
        var d  = this.defaultData();
        if (! ('value' in d))
            d.value = null;
        if (! ('operator' in d))
            d.operator = null;
        return d;
    },
    methods : {
        getFieldName: function () {
            var that = this;
            //console.log('GET FIELD NAME',this.cKey);
            if (that.operator) {
                return that.name + '[]';
            }
            return that.name;
        },
        getOperatorName : function () {
            var that = this;
            return that.name + "_operator";
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
