<template>
  <div class="" v-if="(widgets && Object.keys(widgets).length > 0)">
    <c-loading v-if="loading" :error-msg="errorMsg"></c-loading>
    <form class="form-search " :class="'form-'+modelName" v-else>
      <!-- campi nascosti -->
      <v-widget v-for="(widget, key) in widgets" v-if="isHiddenField(key)" :c-widget="widget" :key="key"></v-widget>
      <div class="row">
        <div class="col-12">
          <div class="row">
            <div v-for="(widget, key) in widgets" :key="key" class="col col-6" :class="key.replace('|','-')" >
              <v-widget :c-widget="widget" v-if="!isHiddenField(key)" :key="key"></v-widget>
            </div>
          </div>
        </div>
        <div class="col-12 search-buttons" :class="buttonsClass">
          <div class="p-3" v-show="actions.length">
            <template v-for="(action,name) in actionsConf">
              <v-action :c-action="action" :key="name"></v-action>
              <!--                            <component  v-bind:is="name" v-bind:c-conf="action"></component>-->
            </template>
          </div>
        </div>
      </div>
    </form>
    <div class="h--10 border-bottom border-danger">
      &nbsp;
    </div>
  </div>
</template>

<script>
import vRecord from './vRecord'
import vSearchMixin from '../../../../core/mixins/components/views/vSearchMixin'
import crud from '../../../../core/crud'

crud.conf['v-search'].buttonsClass = 'text-left'

export default {
  name: 'v-search',
  extends: vRecord,
  mixins: [vSearchMixin],
  props: {
    cType: {
      default: 'search'
    }
  }
}
</script>

<style scoped>

</style>
