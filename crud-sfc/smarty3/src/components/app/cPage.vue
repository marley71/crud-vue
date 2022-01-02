<template>
  <div>
    <div id="page_container"></div>
  </div>
</template>

<script>

import cComponent from '../misc/cComponent'
import {cPageMixin} from 'crud-vue-core'


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
