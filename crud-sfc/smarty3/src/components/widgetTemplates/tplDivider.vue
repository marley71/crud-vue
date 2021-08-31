<template>
  <div class="col col-12">
    <component v-if="cWidget.type=='w-hidden'" :is="cWidget.type" :c-conf="cWidget"></component>
    <div class="col-lg-6 col-md-12 mb-2 form-label-group pl-0" :class="cWidget.name" v-else>
      <component :is="cWidget.type" :c-conf="cWidget"></component>
      <label :for="cWidget.name">
        {{ cWidget.label }}
      </label>
    </div> <!-- style="border-bottom: 2px solid green !important;" -->
    <div class="col col-12 divider mb-2 pb-1 mydivider" >

    </div>
  </div>
</template>

<script>
export default {
  name: 'tpl-divider',
  props: ['cWidget']
}
</script>

<style scoped>
  .mydivider {
    border-bottom: 2px solid green !important;
  }
</style>
