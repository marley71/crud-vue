Vue.component('r-preview',{
    extends : Crud.components.renders.rBase,
    template : '#r-preview-template',
    mounted : function() {
        this._draw();
    },
    data : function () {
        var that = this;
        var d = {
            conf : that.cConf?that.cConf:{},
            icon : false,
            url : false,
            iconClass : '',
        };
        return d;
    },
    methods : {
        _draw : function () {
            var that = this;
            console.log('r-preview.draw',that.conf);
            switch (that.conf.metadata.mimetype ) {
                case 'image/jpeg':
                case 'image/png':
                    that.url = that.conf.value;
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