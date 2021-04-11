<template>
    <div>
        <input c-summernote type="hidden" v-model="value" :name="getFieldName()"
               v-on:change="change">
        <div class="summernote" v-html="value">
        </div>
    </div>
</template>

<script>
import wBase from "./wBase";
import jQuery from "jquery";
import crud from "../../crud/confs";

crud.conf['w-texthtml'] = {
    editor : null, //puntatore all'editor html
        resources : [
        //'https://cdnjs.cloudflare.com/ajax/libs/summernote/0.8.12/summernote.css',
        //'https://cdnjs.cloudflare.com/ajax/libs/summernote/0.8.12/summernote.min.js',

        // 'https://cdn.jsdelivr.net/npm/summernote-bootstrap4@0.0.5/dist/summernote.css',
        // 'https://cdn.jsdelivr.net/npm/summernote-bootstrap4@0.0.5/dist/summernote.min.js',

        "https://cdn.ckeditor.com/ckeditor5/24.0.0/classic/ckeditor.js",

    ],
};

export default {
    name: "w-texthtml",
    extends: wBase,
    methods : {
        afterLoadResources : function () {
            var that = this;
            // con summernote
            // var options = that.pluginOptions || {
            //     content : that.value,
            // };
            // options = this.cloneObj(options);
            // that.jQe('.summernote').summernote(options);
            // jQuery('.summernote').on('summernote.change', function() {
            //     //console.log('Enter/Return key pressed',jQuery('.summernote').summernote('code'));
            //     that.jQe('[c-summernote]').val(jQuery('.summernote').summernote('code'));
            //     that.change();
            // })
            // jQuery('.summernote').summernote('focus');
            ClassicEditor
                .create( document.querySelector( '.summernote' ) )
                .then( editor => {
                    console.log( editor );
                    that.editor = editor;
                    that.editor.model.document.on( 'change:data', () => {
                        console.log( 'The data has changed!' );
                        that.jQe('[c-summernote]').val(that.editor.getData());
                    } );
                } )
                .catch( error => {
                    console.error( error );
                } );

        },
        getValue : function () {
            var that = this;
            return that.editor.getData();
//            return that.jQe('[c-summernote]').val();
        },
        setValue : function (text) {
            this.editor.setData(text);
            this.jQe('[c-summernote]').val(text);
        }
    }
}
</script>

<style scoped>

</style>
