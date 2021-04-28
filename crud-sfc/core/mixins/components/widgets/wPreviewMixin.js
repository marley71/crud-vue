import crud from "../../../crud";

crud.conf['w-preview'] = {
    icon: false,
    iconClass: '',
    value: {},
    mimetypes: {
        // associazione mimetype del file con icona da visualizzare
        icons: {
            'default': 'fa fa-file-o',
            'application/xls': 'fa fa-file-excel-o',
            'xlsx': 'fa fa-file-excel-o',
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': 'fa fa-file-excel-o',
            'zip': 'fa fa-file-archive-o',
            'mp3': 'fa fa-audio-o',
            'image/jpeg': 'fa fa-image-o',
            'application/pdf': 'fa fa-file-pdf-o',
            'txt': 'fa fa-file-text-o',
            'text/plain': 'fa fa-file-text-o',
            'text/csv': 'fa fa-file-text-o'
        },
        // associazione mimetype del file con il tipo upload documento
        docType: [
            'application/xls',
            'xlsx',
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            'zip',
            'mp3',
            'application/pdf',
            'txt',
            'text/csv',
            'text/plain'
        ],
        // associazione mimetype del file con il tipo upload image
        imageType: [
            'image/jpeg',
            'image/png'
        ]
    }
}

const wPreviewMixin = {
    methods: {
        getType: function () {
            var that = this
            if (!that.value.mimetype) {
                console.warn('mimetype not found ' + that.value.mimetype)
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
            console.warn('mimetype invalid ' + that.value.mimetype)
            return null
        }
    }
}
export default wPreviewMixin
