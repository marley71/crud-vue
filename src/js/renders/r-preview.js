Vue.component('r-preview',{
    extends : Crud.components.renders.rBase,
    template : '#r-preview-template',
    mounted : function() {
        this._draw();
    },
    data : function () {
        var that = this;
        var d = that.defaultData();
        d.icon = false;
        d.iconClass = '';
        d.ext = null;
        console.log('PREVIEW DATA',d);
        return d;
    },
    methods : {
        _draw : function () {
            var that = this;
            console.log('r-preview.draw',that.conf);
            //var mimetype = that.conf.mimetype || null;
            var previewType = that.conf.previewType || null;
            var ext = that.conf.ext || that._getExt();
            // if (!previewType && that.value) {
            //     previewType = that._previewType();
            // }
            // console.log('mimetype',previewType);
            switch (previewType) {
                case 'image':
                    that.icon = false;
                    that.iconClass = '';
                    break;
                case 'default':
                    that.icon=true;
                    that.iconClass = that.$Crud.icons.mimetypes['default'];
                    if (that.$Crud.icons.mimetypes[ext])
                        that.iconClass = that.$Crud.icons.mimetypes[ext];
                    break;
            }
            that.iconClass = that.iconClass?that.iconClass + ' fa-3x':that.iconClass;
        },
        _getExt : function () {
            var that = this;
            //console.log('value',that.value);
            if (!that.value || that.value.lastIndexOf('.') < 0)
                return null;
            return this.value.toLowerCase().substr(this.value.lastIndexOf('.'));
        }
    },
    watch : {
        cConf : {
            handler (val) {
                this.conf = this.cConf;
                console.log('watch ocnf',this.cConf)
                this._draw()
            },
            deep:true,
        }
    }
})