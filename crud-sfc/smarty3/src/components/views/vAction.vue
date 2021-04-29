<template>
    <component :is="conf.confParent" :c-conf="conf"></component>
</template>

<script>
import vActionMixin from '../../../../core/mixins/components/views/vActionMixin'

export default {
  name: 'v-action',
  props: ['cAction'],
  mixins: [vActionMixin]
}
</script>

<style scoped>

</style>
