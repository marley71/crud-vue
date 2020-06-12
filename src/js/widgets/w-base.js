crud.components.widgets.wBase = Vue.component('w-base', {
    extends : crud.components.cComponent,
    props : ['cMarker'],
    data :  function () {
        var that = this;
        var _conf = that._getConf() || {};
        var d  = {};
        if (! ('value' in _conf))
            d.value = null;
        if (! ('defaultValue') in _conf)
            d.defaultValue = null;
        return d;
    },
    methods : {

        getFieldName: function () {
            var that = this;
            return that.name;
        },

        getValue : function() {
            return this.value;
        },
        setValue : function(value) {
            this.value = value;
        },
        reset : function() {
            //console.log('defaultValue',this.defaultValue)
            this.value = this.defaultValue;
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
    template: '<div>render base</div>'
});
