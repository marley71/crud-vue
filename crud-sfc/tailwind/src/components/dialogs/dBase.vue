
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
      that.visible = true;
      //window.jQuery(that.jQe()).modal('show')
    },
    hide () {
      var that = this
      that.visible = false;
      //window.jQuery(that.jQe()).modal('hide')
    }
  }
}
</script>

<style scoped>

</style>
