<template>
  <input :placeholder="label" class="form-control" :type="inputType" v-model="value" :name="getFieldName()"
         v-on:change="change">
</template>

<script>

import wBase from './wBase'
import {wInputMixin} from 'crud-vue-package'

export default {
  name: 'w-input',
  extends: wBase,
  mixins: [wInputMixin]
}
</script>

<style scoped>

</style>
