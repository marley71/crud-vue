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
        return d;
    },
    methods : {
        _draw : function () {
            var that = this;
            console.log('r-preview.draw',that.conf);
            var mimetype = that.conf.mimetype || null;
            if (!mimetype && that.value) {
                mimetype = that._mimeType();
                console.log('nonPresente',mimetype);
            }
            console.log('mimetype',mimetype);
            switch (mimetype) {
                case 'image/jpeg':
                case 'image/jpg':
                case 'image/png':
                    that.icon = false;
                    that.iconClass = '';
                    break;
                case 'application/pdf':
                    that.icon=true;
                    that.iconClass = 'fa fa-pdf'
                    break;
                default :
                    that.icon=true;
                    that.iconClass = 'fa fa-file'
                    break;
            }
            that.iconClass = that.iconClass?that.iconClass + ' fa-3x':that.iconClass;
        },
        _mimeType : function () {
            var that = this;
            console.log('value',that.value);
            if (that.value.lastIndexOf('.') < 0)
                return null;

            var ext = this.value.toLowerCase().substr(this.value.lastIndexOf('.'));
            console.log('ext',ext);
            switch (ext) {
                case 'jpg':
                case  'png':
                    return 'image/jpg';
                default:
                    return null;
            }

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