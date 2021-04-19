<template>
  <component v-if="cWidget.type=='w-hidden'" :is="cWidget.type" :c-conf="cWidget"></component>
  <div v-else class="row">

    <div class="col-12 mb-1">
      <div class="form-label-group">
        <component :is="cWidget.type" :c-conf="cWidget"></component>
        <label :for="cWidget.name">
          {{ cWidget.label }}
        </label>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'tpl-record-in',
  props: ['cWidget']
}
</script>

<style scoped>

</style>
