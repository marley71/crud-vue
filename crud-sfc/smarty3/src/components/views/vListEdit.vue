<template>
    <div class="flex w-full bg-white">
        <!-- start:col: -->
        <!-- start:portlet -->

        <c-loading v-if="loading" :error-msg="errorMsg"></c-loading>
        <div v-else class="w-full flex-col">
            <div class="portlet-header w-full border-b" :class="headerClass">
                <span v-show="viewTitle">{{ viewTitle }}</span>
                <!-- options and pagination -->
                <div class="w-full md:flex justify-between items-center  py-3">

                    <div v-if="paginator" class="flex w-full md:w-1/2 pb-2 md:pb-0 justify-center">
                        <!-- v-bind:c-route-conf="routeConf" -->
                        <c-paginator v-if="widgets.length > 0" v-show="pagination"
                                     v-bind:c-pagination="pagination" v-bind:c-route="route"></c-paginator>
                    </div>
                    <div class="flex w-full md:w-1/2 justify-center h-8" v-show="collectionActionsName.length">
                        <template v-for="name in collectionActionsName">
                            <component v-bind:is="name" :c-conf="collectionActions[name]" :key="name"></component>&nbsp;
                        </template>
                    </div>

                </div>
                <!-- /options and pagination -->

                <!-- header -->
                <!-- portlet : header -->
                <!-- /portlet : header -->

                <!-- /header -->
            </div>
            <div class="">
                <div class="overflow-x-auto p-2 " :class="modelName">
<!--                    <table class="table-list table-auto w-full border rounded-lg">-->
                <table class="min-w-full divide-y divide-gray-200">
                    <thead class="bg-gray-100">
                    <tr v-if="widgets.length > 0">
                        <th v-if="needSelection" class="text-gray-500 w--50">
                            <label class="">
                                <input c-row-check-all v-on:change="selectAllRows"
                                       class="checkall" type="checkbox">
                                <i></i>
                            </label>
                        </th>
                        <th v-show="recordActionsName.length"></th>
                        <th v-for="key in keys" v-if="!isHiddenField(key)"
                            class="text-gray-500 font-weight-normal fs--14" :class="key" :key="key">
                            <action-order v-if="orderFields[key]"
                                          :c-conf="getOrderConf(key)"></action-order>
                            <span style="cursor:default"
                                  class="btn btn-default btn-xs mr-1 text-gray-500 font-weight-normal fs--14"
                                  v-else>{{ key + '.label' | translate(langContext) }}</span>
                            <!--                                <w-tooltip v-if="hasHelp(key)" :help="hasHelp(key)" :help-label="key"></w-tooltip>-->

                        </th>
                    </tr>
                    <tr v-if="widgets.length == 0">
                        <th v-show="recordActionsName.length" class="text-gray-500 w--50">
                            {{ "app.nessun-elemento" | translate }}
                        </th>
                    </tr>
                    </thead>
                    <tbody class="bg-white divide-y divide-gray-200">
                    <!-- product -->
                    <tr v-for="(row,index) in widgets" :key="index">
                        <th v-if="needSelection">

                            <label
                                class="form-checkbox form-checkbox-primary float-start">
                                <input c-row-check type="checkbox">
                                <i></i>
                            </label>

                        </th>
                        <th v-show="recordActionsName.length">
                            <div class="flex justify-center rounded-lg text-sm" role="group">
                                <template v-for="(action,name) in recordActions[index]">
                                    <v-action :c-action="action" :key="name"></v-action>
                                </template>
                            </div>

                        </th>

                        <td v-for="(widget, key) in row" v-if="!isHiddenField(key)" :key="key">
                            <v-widget v-show="!editMode[index]" :c-widget="widget"></v-widget>
                            <v-widget v-show="editMode[index]" :c-widget="widgetsEdit[index][key]"></v-widget>
                        </td>
                        <template v-for="(widget, key) in row" v-if="isHiddenField(key)">
                            <v-widget :c-widget="widget" :key="key"></v-widget>
                        </template>
                    </tr>
                    </tbody>
                    <tfoot v-if="hasFooter">
                    <tr v-if="widgets.length > 0">
                        <th v-if="needSelection" class="text-gray-500 w--50">

                        </th>
                        <th v-show="recordActionsName.length"></th>
                        <th v-for="key in keys" v-if="!isHiddenField(key)"
                            class="text-gray-500 font-weight-normal fs--14" :key="key">
                            <action-order v-if="orderFields[key]"
                                          v-bind:c-conf="getOrderConf(key)"></action-order>
                            <span style="cursor:default"
                                  class="btn btn-default btn-xs mr-1 text-gray-500 font-weight-normal fs--14"
                                  v-else>{{ key + '.label' | translate(langContext) }}</span>
                            <button v-if="hasHelp(key)"
                                    type="button"
                                    class="btn-xs btn-squared btn-light"
                                    data-trigger="focus"
                                    data-container="body"
                                    data-toggle="popover"
                                    data-placement="top"
                                    :data-content="hasHelp(key)">
                                <i class="fi fi-round-question-full text-red-700"></i>
                            </button>

                        </th>
                    </tr>
                    </tfoot>

                </table>
            </div>
<!--            <div class="clearfix">-->
<!--                <div class="float-left" v-show="collectionActionsName.length">-->
<!--                    <template v-for="name in collectionActionsName">-->
<!--                        <v-action :c-action="collectionActions[name]"></v-action>-->
<!--                    </template>-->
<!--                </div>-->
<!--                <div v-if="paginator" class="float-right">-->
<!--                    <c-paginator v-if="widgets.length > 0" v-show="pagination" v-bind:c-pagination="pagination"-->
<!--                                 v-bind:c-route="route"></c-paginator>-->
<!--                </div>-->
            </div>
        </div>
    </div>
</template>

<script>
import vList from './vList'
import vListEditMixin from '../../../../core/mixins/components/views/vListEditMixin'
import crud from '../../../../core/crud'

crud.conf['v-list-edit'] = {
  confParent: 'v-list',
  widgetsEdit: {},
  editMode: [],
  routeName: 'list',
  primaryKey: 'id',
  customActions: {},
  fieldsConfig: {},
  orderFields: {},
  widgetTemplate: 'tpl-list',
  actions: [
    'action-insert',
    'action-delete-selected',
    'action-view',
    'action-edit-mode',
    'action-delete',
    'action-save-row',
    'action-view-mode'
  ]
}

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
