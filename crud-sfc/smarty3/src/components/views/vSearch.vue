<template>
  <div class="v-search" v-if="(widgets && Object.keys(widgets).length > 0)">
    <c-loading v-if="loading" :error-msg="errorMsg"></c-loading>
    <form class="form-search " :class="'form-'+modelName" v-else>
      <!-- campi nascosti -->
      <v-widget v-for="(widget, key) in widgets" v-if="isHiddenField(key)" :c-widget="widget" :key="key"></v-widget>
      <div class="row">
        <div class="col-12">
          <div class="row">
            <div v-for="(widget, key) in widgets" :key="key" class="col col-md-6 col-12" :class="key.replace('|','-')" >
              <v-widget :c-widget="widget" v-if="!isHiddenField(key)" :key="key"></v-widget>
            </div>
          </div>
        </div>
        <div v-if="advancedFields.length > 0" class="col-12">
          <div class="col-12">
            <a class="cursor-pointer text-primary" v-on:click="toggleAdvanced()">
              <span v-show="!advancedVisible"><i class="fa fa-arrow-to-bottom"></i></span>
              <span v-show="advancedVisible"><i class="fa fa-arrow-to-top"></i></span>
              <span v-show="!advancedVisible">{{'app.mostra-ricerca-avanzata' | translate}}</span>
              <span v-show="advancedVisible">{{'app.nascondi-ricerca-avanzata' | translate}}</span>
            </a>
          </div>
          <div v-show="advancedVisible" class="row pt--4">
            <div v-for="(widget, key) in advancedWidgets" :key="key" class="col col col-md-6 col-12" :class="key.replace('|','-')" >
              <v-widget :c-widget="widget" :key="key"></v-widget>
            </div>
          </div>
        </div>
        <div class="col-12 search-buttons" :class="buttonsClass">
          <div class="p-3" v-show="actions.length">
            <template v-for="(action,name) in actionsConf">
              <v-action :c-action="action" :key="name"></v-action>
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
crud.conf['v-search'].advancedVisible = false

export default {
  name: 'v-search',
  extends: vRecord,
  mixins: [vSearchMixin],
  props: {
    cType: {
      default: 'search'
    }
  },
  methods: {
    toggleAdvanced () {
      this.advancedVisible = !this.advancedVisible
    }
  }
}
</script>

<style scoped>

</style>
