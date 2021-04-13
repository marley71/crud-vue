<template>
    <c-loading v-if="loading" :error-msg="errorMsg"></c-loading>
    <div v-else class="bg-white p-4 rounded">
        <slot card-title><h4 v-show="viewTitle">{{ viewTitle }}</h4></slot>
        <template v-for="(widget, key) in widgets" v-if="isHiddenField(key)">
            <v-widget :c-widget="widget" :key="key"></v-widget>
        </template>
        <div class="row">
            <v-widget v-for="(widget, key) in widgets" :c-widget="widget" v-if="!isHiddenField(key)" :key="key"></v-widget>
        </div>
        <div v-html="beforeActions"></div>
        <div class="clear-both mt-5" v-show="actions.length">
            <template v-for="(action,name) in actionsConf">
                <v-action :c-action="action" :key="name"></v-action>&nbsp;
            </template>
        </div>
    </div>

</template>

<script>
import vRecord from './vRecord'
import crud from '../../../../core/crud'

crud.conf['v-view'] = {
  confParent: 'v-record',
  defaultWidgetType: 'w-text',
  beforeActions: null,
  primaryKey: 'id',
  routeName: 'view',
  fieldsConfig: {},
  actions: [],
  customActions: {},
  widgetTemplate: 'tpl-record-view'
}

export default {
  name: 'v-view',
  extends: vRecord,
  props: {
    cType: {
      default: 'view'
    }
  },
  methods: {
    setRouteValues: function (route) {
      var that = this
      if (route) {
        route.setValues({
          modelName: that.modelName,
          pk: that.pk
        })
      }
      return route
    }
  }
}
</script>

<style scoped>

</style>
