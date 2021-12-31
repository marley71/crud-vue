<template>
  <span v-html="getFormattedText()"></span>
</template>

<script>
import wBase from './wBase'
import {wTextMixin} from 'crud-vue-package'

export default {
  name: 'w-text',
  extends: wBase,
  mixins: [wTextMixin],
  methods: {
    getFormattedText() {
      var that = this
      var txt = that.value
      if (that.maxLength && txt.length > that.maxLength) {
        txt = txt.substring(0, that.maxLength) + '...'
      }
      if (that.maxLineLength) {
        return that.lining(txt, that.maxLineLength)
      }
      return txt
    }
  }
}
</script>

<style scoped>

</style>
