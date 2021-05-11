<template>
  <input :placeholder="label" class="form-control" :type="inputType" v-model="value" :name="getFieldName()"
         v-on:change="change">
</template>

<script>

import wBase from './wBase'
import wInputMixin from '../../../../core/mixins/components/widgets/wInputMixin'
// import crud from '../../../../core/crud'

export default {
  name: 'w-input',
  extends: wBase,
  mixins: [wInputMixin]
}
</script>

<style scoped>

</style>
