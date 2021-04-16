<script>

import cComponentMixin from '../../../../core/mixins/components/misc/cComponentMixin'
import coreMixin from '../../../../core/mixins/coreMixin'
import dialogsMixin from '../../../../core/mixins/dialogsMixin'
import crud from '../../../../core/crud'

crud.conf['c-component'] = {
  resourcesLoaded: false
}

export default {
  name: 'c-component',
  mixins: [coreMixin, dialogsMixin, cComponentMixin]
}
</script>

<style scoped>

</style>
