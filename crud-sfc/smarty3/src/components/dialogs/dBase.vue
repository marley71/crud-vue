
<script>
import cComponent from '../misc/cComponent'
import {dBaseMixin} from 'crud-vue-core'


export default {
  name: 'd-base',
  extends: cComponent,
  mixins: [dBaseMixin],
  methods: {
    show () {
      var that = this
      window.jQuery(that.jQe()).modal('show')
    },
    hide () {
      var that = this
      window.jQuery(that.jQe()).modal('hide')
    }
  }
}
</script>

<style scoped>

</style>
