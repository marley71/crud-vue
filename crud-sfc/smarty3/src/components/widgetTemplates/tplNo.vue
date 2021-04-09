<template>
    <component :is="cWidget.type" :c-conf="cWidget"></component>
</template>

<script>
export default {
  name: 'tpl-no',
  props: ['cWidget']
}
</script>

<style scoped>

</style>
