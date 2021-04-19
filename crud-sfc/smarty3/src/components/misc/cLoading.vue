<template>
  <div v-if="!errorMsg" class="spinner-border text-primary" role="status">
    <span class="sr-only">{{ 'app.carico'|translate }}</span>
  </div>
  <div v-else>
    <span class="text-danger text-2xl">{{ errorMsg }}</span>
  </div>
</template>

<script>
export default {
  name: 'c-loading',
  props: {
    errorMsg: {
      defaulValue: ''
    }
  }
}
</script>

<style scoped>

</style>
