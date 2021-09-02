<template>
    <component :is="cWidget.type" :c-conf="cWidget" :mio="cTemplate.columnClass"></component>
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
