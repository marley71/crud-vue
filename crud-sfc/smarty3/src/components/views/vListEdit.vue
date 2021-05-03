<template>
  <div>
    <h4 v-show="viewTitle">{{ viewTitle }}</h4>
    <c-loading v-if="loading" :error-msg="errorMsg"></c-loading>
    <div v-else>
      <div class="row justify-content-end">
        <div v-if="paginator" class="col-12 col-md-6 mt-1 mb-2">
          <!-- v-bind:c-route-conf="routeConf" -->
          <c-paginator v-if="widgets.length > 0" v-show="pagination" :c-conf="pagination"></c-paginator>
        </div>
        <div class="col-12 col-md-6 mt-1 mb-2" v-if="collectionActionsName.length">
          <template v-for="name in collectionActionsName">
            <v-action :c-action="collectionActions[name]" :key="name"></v-action>
          </template>
        </div>

      </div>
      <div class="table-responsive">
        <table class="table table-striped">
          <thead>
          <tr v-if="widgets.length > 0">
            <th v-show="recordActionsName.length">
              <input c-row-check-all v-on:change="selectAllRows" v-if="needSelection"
                     class="btn btn-sm btn-outline-secondary" type="checkbox">
              <span>{{ "app.azioni" | translate }}</span>
            </th>
            <th v-for="key in keys" v-if="!isHiddenField(key)" :key="key">
              <action-order v-if="orderFields[key]" v-bind:c-conf="getOrderConf(key)"></action-order>
              <span v-else>{{ key + '.label' | translate(langContext) }}</span>
            </th>
          </tr>
          <tr v-if="widgets.length == 0">
            <th v-show="recordActionsName.length">
              {{ "app.nessun-elemento" | translate }}
            </th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(row,index) in widgets" :key="index">
            <td v-show="recordActionsName.length">

              <div class="btn-group btn-group-sm" role="group">
                <div v-if="needSelection" class="input-group-text bg-transparent">
                  <input c-row-check type="checkbox">
                </div>

                <template v-for="(action,name) in recordActions[index]" >
                  <v-action :c-action="action" :key="name"></v-action>
                </template>
              </div>

            </td>
            <td v-for="(widget, key) in row" v-if="!isHiddenField(key)" :key="key">
              <v-widget v-show="!editMode[index]" :c-widget="widget" :key="key"></v-widget>
              <v-widget v-show="editMode[index]" :c-widget="widgetsEdit[index][key]" :key="key"></v-widget>
            </td>
            <template v-for="(widget, key) in row" v-if="isHiddenField(key)">
              <v-widget :c-widget="widget" :key="key"></v-widget>
            </template>
          </tr>
          </tbody>
        </table>
      </div>
      <div class="clearfix">
        <div class="float-left" v-show="collectionActionsName.length">
          <template v-for="name in collectionActionsName">
            <v-action :c-action="collectionActions[name]" :key="name"></v-action>
          </template>
        </div>
        <div v-if="paginator" class="float-right">
          <c-paginator v-if="widgets.length > 0" v-show="pagination" v-bind:c-pagination="pagination"
                       v-bind:c-route="route"></c-paginator>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import vList from './vList'
import vListEditMixin from '../../../../core/mixins/components/views/vListEditMixin'
// import crud from '../../../../core/crud'

export default {
  name: 'v-list-edit',
  extends: vList,
  mixins: [vListEditMixin]
}
</script>

<style scoped>
/*div[role=group] > button:first-child {*/
/*    !*border: 2px solid red;*!*/
/*    border-top-left-radius: 15px;*/
/*    border-bottom-left-radius: 15px;*/
/*}*/
/*div[role=group] > button:last-child {*/
/*    !*border: 2px solid red;*!*/
/*    border-top-right-radius: 15px;*/
/*    border-bottom-right-radius: 15px;*/
/*    border-left: none;*/
/*}*/
/*div[role=group] > button:not(:first-child):not(:last-child) {*/
/*    !*border: 2px solid red;*!*/
/*    border-left: none;*/
/*}*/
</style>
