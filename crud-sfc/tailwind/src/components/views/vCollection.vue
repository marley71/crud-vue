
<script>
import vBase from './vBase'
import vCollectionMixin from '../../../../core/mixins/components/views/vCollectionMixin'
import crud from '../../../../core/crud'

crud.conf['v-collection'] = {
  modelName: null,
  value: [],
  metadata: {},
  needSelection: false,
  collectionActionsName: [],
  recordActionsName: [],
  collectionActions: {},
  recordActions: [],
  paginator: true
}

export default {
  name: 'v-collection',
  extends: vBase,
  mixins: [vCollectionMixin]
}
</script>

<style scoped>

</style>
