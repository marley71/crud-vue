<script>

import componentMixin from '../../../../core/mixins/components/componentMixin'
import coreMixin from '../../../../core/mixins/coreMixin'
import dialogsMixin from '../../../../core/mixins/dialogsMixin'
import crud from '../../../../core/crud'

crud.conf['c-component'] = {
  resourcesLoaded: false
}

export default {
  name: 'c-component',
  mixins: [coreMixin, dialogsMixin, componentMixin]
}
</script>

<style scoped>

</style>
