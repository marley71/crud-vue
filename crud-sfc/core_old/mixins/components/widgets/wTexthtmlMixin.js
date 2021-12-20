import crud from "../../../crud";

crud.conf['w-texthtml'] = {
    editor: null, // puntatore all'editor html
    resources: [
        'https://cdn.ckeditor.com/ckeditor5/24.0.0/classic/ckeditor.js'
    ]
}

const wTexthtmlMixin = {
    methods: {
        afterLoadResources () {
            var that = this
            ClassicEditor
                .create(document.querySelector('.summernote'))
                .then(editor => {
                    console.log(editor)
                    that.editor = editor
                    that.editor.model.document.on('change:data', () => {
                        console.log('The data has changed!')
                        that.jQe('[c-summernote]').val(that.editor.getData())
                    })
                })
                .catch(error => {
                    console.error(error)
                })
        },
        getValue: function () {
            var that = this
            return that.editor.getData()
        },
        setValue: function (text) {
            this.editor.setData(text)
            this.jQe('[c-summernote]').val(text)
        }
    }
}
export default wTexthtmlMixin
