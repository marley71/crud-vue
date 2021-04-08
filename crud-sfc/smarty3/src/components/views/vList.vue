<template>
  <div>
      <h1>Titolo</h1>
      <div> CCa</div>
      <w-text></w-text>
  </div>
</template>

<script>
import vCollection from './vCollection'
import vListMixin from '../../../../core/mixins/components/views/vListMixin'
import crud from '../../../../core/crud'

crud.conf['v-list'] = {
  confParent: 'v-collection',
  headerClass: null,
  hasFooter: null,
  widgets: {},
  keys: [],
  route: null,
  pagination: {},
  defaultWidgetType: 'w-text',
  json: {},
  primaryKey: 'id',
  routeName: 'list',
  customActions: {},
  fieldsConfig: {},
  orderFields: {},
  widgetTemplate: 'tpl-list',
  actions: ['action-insert', 'action-delete-selected', 'action-view', 'action-edit', 'action-delete']
}

export default {
  name: 'v-list',
  extends: vCollection,
  mixins: [vListMixin]

}
</script>

<style scoped>

</style>
