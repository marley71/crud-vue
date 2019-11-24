Vue.component('r-hasmany-attachment',{
    extends : Crud.components.renders.rBase,
    data :  function () {
        //console.log('r-hasmany-image',this.cData);
        //var dV = this.cData.metadata.domainValues;
        //var dVO = this.cData.metadata.domainValuesOrder?this.cData.metadata.domainValuesOrder:Object.keys(dV);
        return {
            //name : this.cData.name,
            value: this.cConf.value,
            //domainValues : dV,
            //domainValuesOrder : dVO
        }
    },
    methods : {
        mimeTypeIcon : function (index) {
            var that = this;
            var icon = that.$Crud.icons.mimetypes['default'];
            if (that.value && that.value[index]) {
                if (that.$Crud.icons.mimetypes[that.value[index].ext])
                    icon = that.$Crud.icons.mimetypes[that.value[index].ext];
            }
            return icon;
        }
    },
    template: '#r-hasmany-attachment-template',
});
