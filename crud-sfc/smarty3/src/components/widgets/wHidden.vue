<template>
    <input v-model="value" :name="getFieldName()" type="hidden">
</template>

<script>
import wBase from './wBase'
import {wHiddenMixin} from 'crud-vue-package'

export default {
  name: 'w-hidden',
  extends: wBase,
  mixins: [wHiddenMixin]
}
</script>

<style scoped>

</style>
