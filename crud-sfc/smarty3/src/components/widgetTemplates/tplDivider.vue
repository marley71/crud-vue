<template>
  <div :class="getLayoutClass()">
    <div :class="getDividerClass()" >{{ cWidget.label }}</div>
  </div>
</template>

<script>

import tplBase from './tplBase'

export default {
  name: 'tpl-divider',
  extends: tplBase,
  methods: {
    getDividerClass () {
      if (this.cTemplate.dividerClass) {
        return this.cTemplate.dividerClass
      }
      return 'col col-12 mb-2 pb-1 border-bottom border-primary bw--2 default-divider'
    }
  }
}
</script>

<style scoped>

</style>
