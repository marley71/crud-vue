<template>
    <img :src="value">
</template>

<script>
import wBase from './wBase'
import wImageMixin from '../../../../core/mixins/components/widgets/wImageMixin'
// import crud from '../../../../core/crud'

export default {
  name: 'w-image',
  extends: wBase,
  mixins: [wImageMixin]
}
</script>

<style scoped>

</style>
