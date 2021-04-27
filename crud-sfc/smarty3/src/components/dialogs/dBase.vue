
<script>
import cComponent from '../misc/cComponent'
import dBaseMixin from '../../../../core/mixins/components/dialogs/dBaseMixin'
// import crud from '../../../../core/crud'

export default {
  name: 'd-base',
  extends: cComponent,
  mixins: [dBaseMixin],
  methods: {
    show () {
      var that = this
      window.jQuery(that.jQe()).modal('show')
    }
  }
}
</script>

<style scoped>

</style>
