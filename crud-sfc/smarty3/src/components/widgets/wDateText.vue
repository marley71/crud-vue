<template>
    <span>{{formattedValue}}</span>
</template>

<script>

import wBase from './wBase'
import wDateTextMixin from 'crud-vue-package'
/* eslint no-undef: "off" */

export default {
  name: 'w-date-text',
  extends: wBase,
  mixins: [wDateTextMixin]
}
</script>

<style scoped>

</style>
