<script>
import vBase from './vBase'
import vRecordMixin from '../../../../core/mixins/components/views/vRecordMixin'
import crud from '../../../../core/crud'

crud.conf['v-record'] = {
  modelName: null,
  widgetTemplate: 'tpl-record',
  pk: 0,
  value: {},
  metadata: {},
  route: null,
  widgets: {},
  actionsConf: [],
  actionsName: {},
  defaultWidgetType: 'w-input',
  fields: [],
  fieldsConfig: {}
}

export default {
  name: 'v-record',
  extends: vBase,
  mixins: [vRecordMixin]
}
</script>

<style scoped>

</style>
