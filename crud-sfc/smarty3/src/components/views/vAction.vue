<template>
    <a-base :c-conf="conf"></a-base>
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
