Vue.component('r-preview',{
    extends : crud.components.renders.rBase,
    template : '#r-preview-template',
    // mounted : function() {
    //     var that = this;
    //     this._draw();
    // },
    data : function () {
        var that = this;
        var d = that.defaultData();
        if (!d.value)
            d.value = {};
        //d.url = null;
        //d.mimetype = null;
        d.icon = false;
        d.iconClass = '';
        // var value = d.value || {};
        // for (var k in value) {
        //     d[k] = value[k];
        // }
        //d.type = that.getType()
        return d;
    },
    methods : {
        getType : function () {
            var that = this;
            if (!that.value.mimetype)
                return null;


            var docTypes = [
                "application/xls",
                "xlsx",
                "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                "zip",
                "mp3",
                "application/pdf",
                "txt"
            ];
            var imageTypes = [
                "image/jpeg","image/png"
            ];

            if (docTypes.indexOf(that.value.mimetype) >= 0) {
                that.icon=true;
                that.iconClass = that.$crud.icons.mimetypes['default'];
                if (that.$crud.icons.mimetypes[that.value.mimetype])
                    that.iconClass = that.$crud.icons.mimetypes[that.value.mimetype];
                return 'doc';
            }

            if (imageTypes.indexOf(that.value.mimetype) >= 0) {
                return 'image';
            }

            console.warn('mimetype invalid ' + that.value.mimetype)
            return null;





            switch (that.value.mimetype) {
                case 'image/jpeg':
                case 'image/png':
                    return 'image';
                case 'application/pdf':
                    that.icon=true;
                    that.iconClass = that.$crud.icons.mimetypes['default'];
                    if (that.$crud.icons.mimetypes[that.value.mimetype])
                        that.iconClass = that.$crud.icons.mimetypes[that.value.mimetype];
                    return 'doc';
                default:
                    console.warn('mimetype invalid ' + that.value.mimetype)
                    return null;
            }
        }
    }
})
