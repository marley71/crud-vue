<template>
  <div v-html="value">
  </div>
</template>

<script>
import wBase from './wBase'
import wCustomMixin from 'crud-vue-package'

export default {
  name: 'w-custom',
  extends: wBase,
  mixins: [wCustomMixin]
}
</script>

<style scoped>

</style>
