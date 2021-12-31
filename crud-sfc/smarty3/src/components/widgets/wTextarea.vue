<template>
  <textarea :maxlength="maxlength"
            class="form-control" :class="{'js-form-advanced-char-count-down' : charleft}"
            data-output-target=".js-form-advanced-char-left"
            v-model="value" v-bind:name="getFieldName()"
            v-on:change="change"></textarea>
</template>

<script>
import wBase from './wBase'
import {wTextareaMixin} from 'crud-vue-package'

export default {
  name: 'w-textarea',
  extends: wBase,
  mixins: [wTextareaMixin]
}
</script>

<style scoped>

</style>
