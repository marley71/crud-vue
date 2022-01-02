<template>
    <component :is="getTemplateName()" :c-widget="conf" :c-template="templateConf"></component>
</template>

<script>
import {vWidgetMixin} from 'crud-vue-core'

export default {
  name: 'v-widget',
  props: ['cWidget'],
  mixins: [vWidgetMixin]
}
</script>

<style scoped>

</style>
