<template>
  <div>
    <svg v-if="!errorMsg" class="animate-spin h-5 w-5 m-3 text-black-100 fa fa-spinner fa-2x">
      <!--carico...-->
    </svg>
    <div v-else>
      <span class="text-danger text-2xl">{{ errorMsg }}</span>
    </div>
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
