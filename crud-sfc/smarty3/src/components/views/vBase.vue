<script>
import cComponent from '../misc/cComponent'
import {vBaseMixin} from 'crud-vue-core'
import vWidget from './vWidget'
import vAction from './vAction'

export default {
  name: 'v-base',
  extends: cComponent,
  mixins: [vBaseMixin],
  components: {vWidget, vAction}
}
</script>

<style scoped>

</style>
