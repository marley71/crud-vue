<template>
  <span>{{ value }}</span>
</template>

<script>
import wBase from './wBase'
import wTextMixin from '../../../../core/mixins/components/widgets/wTextMixin'

export default {
  name: 'w-text',
  extends: wBase,
  mixins: [wTextMixin]
}
</script>

<style scoped>

</style>
