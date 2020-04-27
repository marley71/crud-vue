crud.components.widgets.wBase = Vue.component('w-base', {
    extends : crud.components.cComponent,
    props : ['cMarker'],

    mounted : function() {
        var that = this;
        if (!that.operator) {
            jQuery(that.$el).find('[c-operator]').remove();
        }
    },
    data :  function () {
        var that = this;
        var _conf = that.cConf || {};
        var d  = {};
        if (! ('value' in _conf))
            d.value = null;
        if (! ('operator' in _conf))
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
