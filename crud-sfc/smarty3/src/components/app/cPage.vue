<template>
    <div id="page_container"></div>
</template>

<script>

import cComponent from '../misc/cComponent'
import cPageMixin from '../../../../core/mixins/app/cPageMixin'
// import crud from '../../../../core/crud'

export default {
  name: 'c-page',
  extends: cComponent,
  props: {
    cPath: {
      required: true
    }
  },
  mixins: [cPageMixin]
}
</script>

<style scoped>

</style>
