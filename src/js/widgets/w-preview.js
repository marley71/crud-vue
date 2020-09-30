crud.components.widgets.coreWPreview = Vue.component('core-w-preview',{
    extends : crud.components.widgets.wBase,
    // mounted : function() {
    //     var that = this;
    //     console.log('previw conf',that.cConf);
    // },

    // data : function () {
    //     var that = this;
    //     var _conf = that._getConf() || {};
    //     var d = {
    //         icon : false,
    //         iconClass : ''
    //     };
    //     if (!_conf.value)
    //         d.value = {};
    //     return d;
    // },
    methods : {
        getType : function () {
            var that = this;
            if (!that.value.mimetype)
                return null;
            if (that.$crud.mimetypes.docTypes.indexOf(that.value.mimetype) >= 0) {
                that.icon=true;
                that.iconClass = that.$crud.icons.mimetypes['default'];
                if (that.$crud.mimetypes.icons[that.value.mimetype])
                    that.iconClass = that.$crud.mimetypes.icons[that.value.mimetype];
                return 'doc';
            }

            if (that.$crud.mimetypes.imageTypes.indexOf(that.value.mimetype) >= 0) {
                return 'image';
            }
            console.warn('mimetype invalid ' + that.value.mimetype)
            return null;
        }
    }
})
