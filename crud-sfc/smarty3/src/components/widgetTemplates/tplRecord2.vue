<template>
  <component v-if="cWidget.type=='w-hidden'" :is="cWidget.type" :c-conf="cWidget"></component>
  <div class="col-lg-12 col-md-12 mb-2 form-label-group" v-else>
    <component :is="cWidget.type" :c-conf="cWidget"></component>
    <label :for="cWidget.name">
      {{ cWidget.label }}
    </label>
  </div>
</template>

<script>
export default {
  name: 'tpl-record2',
  props: ['cWidget']
}
</script>

<style scoped>

</style>
