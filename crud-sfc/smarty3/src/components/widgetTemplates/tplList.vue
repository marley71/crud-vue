<template>
    <component :is="cWidget.type" :c-conf="cWidget" ></component>
</template>

<script>

import tplBase from './tplBase'

export default {
  name: 'tpl-list',
  extends: tplBase
}
</script>

<style scoped>

</style>
