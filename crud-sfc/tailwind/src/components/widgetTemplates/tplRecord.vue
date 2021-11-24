<template>
  <component v-if="cWidget.type==='w-hidden'" :is="cWidget.type" :c-conf="cWidget"></component>
  <div :class="getLayoutClass()"  v-else>
    <label v-if="cTemplate.labelType === 'top'" :for="cWidget.name">
      {{ cWidget.label }} {{cWidget.required?'*':''}}
    </label>
    <component :is="cWidget.type" :c-conf="cWidget"></component>
    <label v-if="cTemplate.labelType === 'bottom'" :for="cWidget.name">
      {{ cWidget.label }} {{cWidget.required?'*':''}}
    </label>
  </div>
</template>

<script>
import tplBase from './tplBase'

export default {
  name: 'tpl-record',
  extends: tplBase,
  methods: {
    getLayoutClass () {
      var classes = ''
      if (this.cTemplate.layoutClass) {
        classes = this.cTemplate.layoutClass + ' ' + this.cWidget.name
      } else {
        switch (this.cTemplate.layoutType) {
          case 'full':
            classes = 'col-lg-12 col-md-12 mb-2 form-label-group'
            break
          case 'half':
            classes = 'col-lg-6 col-md-12 mb-2 form-label-group'
            break
        }
        classes += ' ' + this.cWidget.name
      }
      return classes
    }
  }
}
</script>

<style scoped>

</style>
