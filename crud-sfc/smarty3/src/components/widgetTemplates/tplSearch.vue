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
import tplBase from './tplBase'

export default {
  name: 'tpl-search',
  extends: tplBase
}
</script>

<style scoped>

</style>
