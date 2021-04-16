<template>
  <input class="form-control rounded w-full" :type="inputType" v-model="value" :name="getFieldName()" :change="change">
</template>

<script>

import wBase from './wBase'
import crud from '../../../../core/crud'

crud.conf['w-input'] = {
  inputType: 'text'
}

export default {
  name: 'w-input',
  extends: wBase
}
</script>

<style scoped>

</style>
