<template>
<!--    <div class="flex w-full bg-white">-->
<!--        &lt;!&ndash; start:col: &ndash;&gt;-->
<!--        &lt;!&ndash; start:portlet &ndash;&gt;-->

<!--        <c-loading v-if="loading" :error-msg="errorMsg"></c-loading>-->
<!--        <div v-else class="w-full flex-col">-->
<!--            <div class="portlet-header w-full border-b" :class="headerClass">-->
<!--                <span v-show="viewTitle">{{ viewTitle }}</span>-->
<!--                &lt;!&ndash; options and pagination &ndash;&gt;-->
<!--                <div class="w-full md:flex justify-between items-center  py-3">-->

<!--                    <div v-if="paginator" class="flex w-full md:w-1/2 pb-2 md:pb-0 justify-center">-->
<!--                        &lt;!&ndash; v-bind:c-route-conf="routeConf" &ndash;&gt;-->
<!--                        <c-paginator v-if="widgets.length > 0" v-show="pagination"-->
<!--                                     :c-pagination="pagination" ></c-paginator>-->
<!--                    </div>-->
<!--                    <div class="flex w-full md:w-1/2 justify-center h-8" v-show="collectionActionsName.length">-->
<!--                        <template v-for="name in collectionActionsName">-->
<!--                            <component v-bind:is="name" :c-conf="collectionActions[name]" :key="name"></component>&nbsp;-->
<!--                        </template>-->
<!--                    </div>-->

<!--                </div>-->
<!--                &lt;!&ndash; /options and pagination &ndash;&gt;-->

<!--                &lt;!&ndash; header &ndash;&gt;-->
<!--                &lt;!&ndash; portlet : header &ndash;&gt;-->
<!--                &lt;!&ndash; /portlet : header &ndash;&gt;-->

<!--                &lt;!&ndash; /header &ndash;&gt;-->
<!--            </div>-->
<!--            <div class="">-->
<!--                <div class="overflow-x-auto p-2 " :class="modelName">-->
<!--&lt;!&ndash;                    <table class="table-list table-auto w-full border rounded-lg">&ndash;&gt;-->
<!--                <table class="min-w-full divide-y divide-gray-200">-->
<!--                    <thead class="bg-gray-100">-->
<!--                    <tr v-if="widgets.length > 0">-->
<!--                        <th v-if="needSelection" class="text-gray-500 w&#45;&#45;50">-->
<!--                            <label class="">-->
<!--                                <input c-row-check-all v-on:change="selectAllRows"-->
<!--                                       class="checkall" type="checkbox">-->
<!--                                <i></i>-->
<!--                            </label>-->
<!--                        </th>-->
<!--                        <th v-show="recordActionsName.length"></th>-->
<!--                        <th v-for="key in keys" v-if="!isHiddenField(key)"-->
<!--                            class="text-gray-500 font-weight-normal fs&#45;&#45;14" :class="key" :key="key">-->
<!--                            <action-order v-if="orderFields[key]"-->
<!--                                          :c-conf="getOrderConf(key)"></action-order>-->
<!--                            <span style="cursor:default"-->
<!--                                  class="btn btn-default btn-xs mr-1 text-gray-500 font-weight-normal fs&#45;&#45;14"-->
<!--                                  v-else>{{ key + '.label' | translate(langContext) }}</span>-->
<!--                            &lt;!&ndash;                                <w-tooltip v-if="hasHelp(key)" :help="hasHelp(key)" :help-label="key"></w-tooltip>&ndash;&gt;-->

<!--                        </th>-->
<!--                    </tr>-->
<!--                    <tr v-if="widgets.length == 0">-->
<!--                        <th v-show="recordActionsName.length" class="text-gray-500 w&#45;&#45;50">-->
<!--                            {{ "app.nessun-elemento" | translate }}-->
<!--                        </th>-->
<!--                    </tr>-->
<!--                    </thead>-->
<!--                    <tbody class="bg-white divide-y divide-gray-200">-->
<!--                    &lt;!&ndash; product &ndash;&gt;-->
<!--                    <tr v-for="(row,index) in widgets" :key="index">-->
<!--                        <th v-if="needSelection">-->

<!--                            <label-->
<!--                                class="form-checkbox form-checkbox-primary float-start">-->
<!--                                <input c-row-check type="checkbox">-->
<!--                                <i></i>-->
<!--                            </label>-->

<!--                        </th>-->
<!--                        <th v-show="recordActionsName.length">-->
<!--                            <div class="flex justify-center rounded-lg text-sm" role="group">-->
<!--                                <template v-for="(action,name) in recordActions[index]">-->
<!--                                    <v-action :c-action="action" :key="name"></v-action>-->
<!--                                </template>-->
<!--                            </div>-->

<!--                        </th>-->

<!--                        <td v-for="(widget, key) in row" v-if="!isHiddenField(key)" :key="key">-->
<!--                            <v-widget v-show="!editMode[index]" :c-widget="widget"></v-widget>-->
<!--                            <v-widget v-show="editMode[index]" :c-widget="widgetsEdit[index][key]"></v-widget>-->
<!--                        </td>-->
<!--                        <template v-for="(widget, key) in row" v-if="isHiddenField(key)">-->
<!--                            <v-widget :c-widget="widget" :key="key"></v-widget>-->
<!--                        </template>-->
<!--                    </tr>-->
<!--                    </tbody>-->
<!--                    <tfoot v-if="hasFooter">-->
<!--                    <tr v-if="widgets.length > 0">-->
<!--                        <th v-if="needSelection" class="text-gray-500 w&#45;&#45;50">-->

<!--                        </th>-->
<!--                        <th v-show="recordActionsName.length"></th>-->
<!--                        <th v-for="key in keys" v-if="!isHiddenField(key)"-->
<!--                            class="text-gray-500 font-weight-normal fs&#45;&#45;14" :key="key">-->
<!--                            <action-order v-if="orderFields[key]"-->
<!--                                          v-bind:c-conf="getOrderConf(key)"></action-order>-->
<!--                            <span style="cursor:default"-->
<!--                                  class="btn btn-default btn-xs mr-1 text-gray-500 font-weight-normal fs&#45;&#45;14"-->
<!--                                  v-else>{{ key + '.label' | translate(langContext) }}</span>-->
<!--                            <button v-if="hasHelp(key)"-->
<!--                                    type="button"-->
<!--                                    class="btn-xs btn-squared btn-light"-->
<!--                                    data-trigger="focus"-->
<!--                                    data-container="body"-->
<!--                                    data-toggle="popover"-->
<!--                                    data-placement="top"-->
<!--                                    :data-content="hasHelp(key)">-->
<!--                                <i class="fi fi-round-question-full text-red-700"></i>-->
<!--                            </button>-->

<!--                        </th>-->
<!--                    </tr>-->
<!--                    </tfoot>-->

<!--                </table>-->
<!--            </div>-->
<!--&lt;!&ndash;            <div class="clearfix">&ndash;&gt;-->
<!--&lt;!&ndash;                <div class="float-left" v-show="collectionActionsName.length">&ndash;&gt;-->
<!--&lt;!&ndash;                    <template v-for="name in collectionActionsName">&ndash;&gt;-->
<!--&lt;!&ndash;                        <v-action :c-action="collectionActions[name]"></v-action>&ndash;&gt;-->
<!--&lt;!&ndash;                    </template>&ndash;&gt;-->
<!--&lt;!&ndash;                </div>&ndash;&gt;-->
<!--&lt;!&ndash;                <div v-if="paginator" class="float-right">&ndash;&gt;-->
<!--&lt;!&ndash;                    <c-paginator v-if="widgets.length > 0" v-show="pagination" v-bind:c-pagination="pagination"&ndash;&gt;-->
<!--&lt;!&ndash;                                 v-bind:c-route="route"></c-paginator>&ndash;&gt;-->
<!--&lt;!&ndash;                </div>&ndash;&gt;-->
<!--            </div>-->
<!--        </div>-->
<!--    </div>-->
  <div>
    <h4 v-show="viewTitle">{{ viewTitle }}</h4>
    <c-loading v-if="loading" :error-msg="errorMsg"></c-loading>
    <div v-else>
      <div class="float-none">
        <div class="float-left" v-if="collectionActionsName.length">
          <template v-for="name in collectionActionsName">
            <v-action :c-action="collectionActions[name]" :key="name"></v-action>
          </template>
        </div>
        <div v-if="paginator" class="float-right">
          <!-- v-bind:c-route-conf="routeConf" -->
          <c-paginator v-if="widgets.length > 0" v-show="pagination" :c-conf="pagination"></c-paginator>
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
