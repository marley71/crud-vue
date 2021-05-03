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
import wTexthtmlMixin from '../../../../core/mixins/components/widgets/wTexthtmlMixin'

crud.conf['w-texthtml'].resources = [
  'https://cdn.jsdelivr.net/npm/summernote-bootstrap4@0.0.5/dist/summernote.css',
  'https://cdn.jsdelivr.net/npm/summernote-bootstrap4@0.0.5/dist/summernote.min.js'
]

export default {
  name: 'w-texthtml',
  extends: wBase,
  mixins: [wTexthtmlMixin],
  methods: {
    afterLoadResources () {
      var that = this
      var options = that.pluginOptions || {
        content: that.value
        // airMode : true
      }
      options = this.cloneObj(options)
      that.jQe('.summernote').summernote(options)
      window.jQuery('.summernote').on('summernote.change', function () {
        // console.log('Enter/Return key pressed',jQuery('.summernote').summernote('code'))
        that.jQe('[c-summernote]').val(window.jQuery('.summernote').summernote('code'))
        // that.jQe('[c-sum]').trigger('change')
        that.change()
        // that.jQe('[c-sum]').val('hh')
      })
      window.jQuery('.summernote').summernote('focus')
    },
    getValue () {
      var that = this
      return that.jQe('[c-summernote]').val()
    }
  }
}

</script>

<style scoped>

</style>
