
<script>
import cComponent from '../misc/cComponent'
import {dAlertMixin} from 'crud-vue-core'

export default {
  name: 'd-alert',
  extends: cComponent,
  mixins: [dAlertMixin],
  props: {
    'cMessage': {
      default: ''
    },
    'cTime': {
      default: 2000
    }
  }
}
</script>

<style scoped>

</style>
