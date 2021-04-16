const wPreviewMixin = {
    methods: {
        getType: function () {
            var that = this
            if (!that.value.mimetype) {
                return null
            }
            if (that.mimetypes.docType.indexOf(that.value.mimetype) >= 0) {
                that.icon = true
                that.iconClass = that.mimetypes.icons['default']
                if (that.mimetypes.icons[that.value.mimetype]) {
                    that.iconClass = that.mimetypes.icons[that.value.mimetype]
                }

                return 'doc'
            }

            if (that.mimetypes.imageType.indexOf(that.value.mimetype) >= 0) {
                return 'image'
            }
            // console.warn('mimetype invalid ' + that.value.mimetype)
            return null
        }
    }
}
export default wPreviewMixin
