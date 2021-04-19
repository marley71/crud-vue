<template>
  <div class="col col-12">
    <component :is="cWidget.type" :c-conf="cWidget"></component>
  </div>
</template>

<script>
export default {
  name: 'tpl-full-no',
  props: ['cWidget']
}
</script>

<style scoped>

</style>
