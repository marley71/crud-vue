<template>
    <c-loading v-if="loading" :error-msg="errorMsg"></c-loading>
    <div v-else class="bg-white p-4 rounded">
        <slot card-title><h4 v-show="viewTitle">{{ viewTitle }}</h4></slot>
        <div v-html="beforeForm"></div>
        <form class="bg-white z-1" :class="'form-'+modelName">
            <!-- campi nascosti -->
            <template v-for="(widget, key) in widgets" v-if="isHiddenField(key)">
                <v-widget :c-widget="widget" :key="key"></v-widget>
            </template>
            <div class="flex flex-col">
                <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
                    <div class="mx-1" :class="key.replace('|','-')" v-for="(widget, key) in widgets">
                        <v-widget :c-widget="widget" v-if="!isHiddenField(key)"></v-widget>
                    </div>
                </div>
                <div class="flex search-buttons" :class="buttonsClass">
                    <div class="p-3 flex" v-show="actions.length">
                        <template v-for="(action,name) in actionsConf">
                            <v-action :c-action="action"></v-action>
                        </template>
                    </div>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
import vRecord from './vRecord'
import jQuery from 'jquery';
import crud from '../../../../core/crud'

crud.conf['v-search'] = {
  confParent: 'v-record',
  beforeForm: null,
  beforeActions: null,
  primaryKey: 'id',
  routeName: 'search',
  actions: ['action-search', 'action-reset'],
  fieldsConfig: {},
  customActions: {},
  widgetTemplate: 'tpl-record',
  buttonsClass: null
};

export default {
  name: 'v-search',
  extends: vRecord,
  props: {
    cType: {
      default: 'search'
    }
  },
  methods: {
    completed: function () {
      var that = this
      that.jQe('form').each(function () {
        jQuery(this).find('input').keypress(function (e) {
          // Enter pressed?
          if (e.which == 10 || e.which == 13) {
            var a = that.getAction('action-search');
            a.execute();
          }
        });
      })
    },
    getFieldName: function (key) {
      return 's_' + key
    },
    setRouteValues: function (route) {
      var that = this
      if (route) {
        route.setValues({
          modelName: that.modelName
        });
      }
      return route
    }
  }
}
</script>

<style scoped>

</style>
