<template>
    <span>{{formattedValue}}</span>
</template>

<script>

import wBase from './wBase'
import crud from '../../../../core/crud'
import wDateTextMixin from '../../../../core/mixins/components/widgets/wDateTextMixin'
/* eslint no-undef: "off" */

export default {
  name: 'w-date-text',
  extends: wBase,
  mixins: [wDateTextMixin]
}
</script>

<style scoped>

</style>
