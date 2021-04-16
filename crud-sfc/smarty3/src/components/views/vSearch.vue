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
                    <div v-for="(widget, key) in widgets" class="mx-1" :class="key.replace('|','-')"  :key="key">
                        <v-widget :c-widget="widget" v-if="!isHiddenField(key)"></v-widget>
                    </div>
                </div>
                <div class="flex search-buttons" :class="buttonsClass">
                    <div class="p-3 flex" v-show="actions.length">
                        <template v-for="(action,name) in actionsConf">
                            <v-action :c-action="action" :key="name"></v-action>
                        </template>
                    </div>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
import vRecord from './vRecord'
import vSearchMixin from '../../../../core/mixins/components/views/vSearchMixin'
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
  buttonsClass: null,
  prefixField: 's_'
}

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
