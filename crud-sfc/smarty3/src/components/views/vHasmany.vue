<template>
    <c-loading v-if="loading"></c-loading>
    <div v-else>
        <div class="row">
            <v-widget v-for="(widget, key) in widgets" :c-widget="widget" :key="key"></v-widget>
        </div>
    </div>
</template>

<script>
import vRecord from './vRecord'
import crud from '../../../../core/crud'

crud.conf['v-hasmany'] = {
  confParent: 'v-record',
  defaultWidgetType: 'w-input'
}

export default {
  name: 'v-hasmany',
  extends: vRecord,
  methods: {
    getFieldName: function (key) {
      var that = this
      return that.cModel + '-' + key + '[]'
    },
    getValue: function () {
      var that = this
      var value = {}
      for (var k in that.widgets) {
        value[k] = that.getWidget(k).getValue()
      }
      return value
    }
  }
}
</script>

<style scoped>

</style>
