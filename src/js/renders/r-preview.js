Vue.component('r-preview',{
    extends : crud.components.renders.rBase,
    template : '#r-preview-template',
    mounted : function() {
        var that = this;
        this._draw();
    },
    data : function () {
        var that = this;
        var d = that.defaultData();
        d.type = null;
        d.url = null;
        d.mimetype = null;
        d.icon = false;
        d.iconClass = '';
        var value = d.value || {};
        for (var k in value) {
            d[k] = value[k];
        }
        return d;
    },
    methods : {
        getType : function (mimetype) {
            var that = this;
            switch (mimetype) {
                case 'image/jpg':
                    return 'image';
                    break;
                case 'application/pdf':
                    that.icon=true;
                    that.iconClass = that.$crud.icons.mimetypes['default'];
                    if (that.$crud.icons.mimetypes[ext])
                        that.iconClass = that.$crud.icons.mimetypes[ext];
                    return 'doc';
            }
        },
        _getExt : function () {
            var that = this;
            //console.log('value',that.value);
            if (!that.url || that.url.lastIndexOf('.') < 0)
                return null;
            return this.url.toLowerCase().substr(this.url.lastIndexOf('.'));
        }
    },
    watch : {
        cConf : {
            handler (val) {
                this.conf = this.cConf;
                for (var k in this.cConf) {
                    this[k] = this.cConf[k];
                }
                console.log('watch ocnf',this.cConf)
                this._draw()
            },
            deep:true,
        }
    }
})