<template>
    <span>
        <span v-if="statusType=='text'">{{ slot }}</span>
        <i v-if="statusType=='icon'" v-bind:class="slot"></i>
    </span>
</template>

<script>
import wBase from './wBase'
// import crud from '../../../../core/crud'
import wStatusMixin from '../../../../core/mixins/components/widgets/wStatusMixin'

export default {
  name: 'w-status',
  extends: wBase,
  mixins: [wStatusMixin]
}
</script>

<style scoped>

</style>
