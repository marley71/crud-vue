<template>
    <div>
        <input c-summernote type="hidden" v-model="value" :name="getFieldName()"
               v-on:change="change">
        <div class="summernote" v-html="value">
        </div>
    </div>
</template>

<script>
/* eslint no-undef: "off" */

import wBase from './wBase'
import crud from '../../../../core/crud'
// import wAutocompleteMixin from '../../../../core/mixins/components/widgets/wAutocompleteMixin'

crud.conf['w-texthtml'] = {
  editor: null, // puntatore all'editor html
  resources: [
    'https://cdn.ckeditor.com/ckeditor5/24.0.0/classic/ckeditor.js'
  ]
}

export default {
  name: 'w-texthtml',
  extends: wBase,
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
</script>

<style scoped>

</style>
