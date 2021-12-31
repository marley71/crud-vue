<template>
  <c-loading v-if="loading" :error-msg="errorMsg"></c-loading>
  <div v-else>
    <div v-html="beforeForm"></div>
    <form enctype="multipart/form-data">
      <!-- campi nascosti -->
      <template v-for="(widget, key) in widgets" v-if="isHiddenField(key)">
        <v-widget :c-widget="widget" :key="key"></v-widget>
      </template>
      <div class="row">
        <v-widget v-for="(widget, key) in widgets" :c-widget="widget" v-if="!isHiddenField(key)" :key="key"></v-widget>
      </div>
    </form>
    <div v-html="beforeActions"></div>
    <div class="p-3" v-show="actions.length">
      <template v-for="(action,name) in actionsConf">
        <v-action :c-action="action" :key="name"></v-action>
      </template>
    </div>
  </div>
</template>

<script>
import vRecord from './vRecord'
import {vEditMixin} from 'crud-vue-package'


export default {
  name: 'v-edit',
  extends: vRecord,
  mixins: [vEditMixin],
  props: {
    cType: {
      default: 'edit'
    }
  }
}
</script>

<style scoped>

</style>
