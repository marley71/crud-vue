<template>
  <input :placeholder="label" class="form-control" :type="inputType" v-model="value" :name="getFieldName()"
         v-on:change="change">
</template>

<script>

import wBase from './wBase'
// import crud from '../../../../core/crud'

export default {
  name: 'w-input',
  extends: wBase
}
</script>

<style scoped>

</style>
