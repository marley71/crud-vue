
<script>

import cComponent from '../misc/cComponent'
import wBaseMixin from '../../../../core/mixins/components/widgets/wBaseMixin'
import crud from '../../../../core/crud'

crud.conf['w-base'] = {
  confParent: 'c-component',
  name: null,
  value: null,
  defaultValue: null,
  label: null,
  view: null // riferimento alla view
}

export default {
  name: 'w-base',
  extends: cComponent,
  mixins: [wBaseMixin]
}
</script>

<style scoped>

</style>
