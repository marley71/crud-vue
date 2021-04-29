<script>
import vList from './vList'
import crud from '../../../../core/crud'

crud.conf['v-list-constraint'] = {
  confParent: 'v-list',
  routeName: 'list-constraint'
}

export default {
  name: 'v-list-constraint',
  extends: vList,
  methods: {
    setRouteValues: function (route) {
      var that = this
      route.setValues({
        modelName: that.modelName,
        constraintKey: that.constraintKey,
        constraintValue: that.constraintValue
      })
      return route
    }
  }
}
</script>

<style scoped>

</style>
