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
import vHasmanyMixin from '../../../../core/mixins/components/views/vHasmanyMixin'

crud.conf['v-hasmany'] = {
  confParent: 'v-record',
  defaultWidgetType: 'w-input'
}

export default {
  name: 'v-hasmany',
  extends: vRecord,
  mixins: [vHasmanyMixin]
}
</script>

<style scoped>

</style>
