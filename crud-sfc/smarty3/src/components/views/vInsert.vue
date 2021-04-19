<template>
<!--    <c-loading v-if="loading" :error-msg="errorMsg"></c-loading>-->
<!--    <div v-else class="bg-white p-4 rounded">-->
<!--        <slot card-title><h4 v-show="viewTitle">{{ viewTitle }}</h4></slot>-->
<!--        <div v-html="beforeForm"></div>-->
<!--        <form enctype="multipart/form-data">-->
<!--            &lt;!&ndash; campi nascosti &ndash;&gt;-->
<!--            <template v-for="(widget, key) in widgets" v-if="isHiddenField(key)">-->
<!--                <v-widget :c-widget="widget" :key="key"></v-widget>-->
<!--            </template>-->
<!--            <div class="row">-->
<!--                <v-widget v-for="(widget, key) in widgets" :c-widget="widget" v-if="!isHiddenField(key)" :key="key"></v-widget>-->
<!--            </div>-->
<!--        </form>-->
<!--        <div v-html="beforeActions"></div>-->
<!--        <div class="clear-both mt-5" v-show="actions.length">-->
<!--            <template v-for="(action,name) in actionsConf">-->
<!--                <v-action :c-action="action" :key="name"></v-action>&nbsp;-->
<!--            </template>-->
<!--        </div>-->
<!--    </div>-->
  <c-loading v-if="loading" :error-msg="errorMsg"></c-loading>
  <div v-else>
    <div v-html="beforeForm"></div>
    <form enctype="multipart/form-data">
      <!-- campi nascosti -->
      <template v-for="(widget, key) in widgets" v-if="isHiddenField(key)">
        <v-widget :c-widget="widget" :key="key"></v-widget>
      </template>
      <div class="row">
        <v-widget v-for="(widget, key) in widgets" v-if="!isHiddenField(key)" :c-widget="widget" :key="key"></v-widget>
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
import crud from '../../../../core/crud'

crud.conf['v-insert'] = {
  confParent: 'v-record',
  beforeForm: null,
  beforeActions: null,
  primaryKey: 'id',
  routeName: 'insert',
  widgetTemplate: 'tpl-record',
  actions: ['action-save', 'action-back'],
  customActions: {},
  fieldsConfig: {
    id: 'w-hidden'
  },
  fields: []
}

export default {
  name: 'v-insert',
  extends: vRecord,
  props: {
    cType: {
      default: 'insert'
    }
  }
}
</script>

<style scoped>

</style>
