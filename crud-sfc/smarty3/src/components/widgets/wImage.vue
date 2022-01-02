<template>
    <img :src="value" :class="cssClass">
</template>

<script>
import wBase from './wBase'
import {wImageMixin} from 'crud-vue-core'

export default {
  name: 'w-image',
  extends: wBase,
  mixins: [wImageMixin]
}
</script>

<style scoped>

</style>
