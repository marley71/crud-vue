<template>
<!--  <div class="flex w-full bg-white">-->
<!--    &lt;!&ndash; start:col: &ndash;&gt;-->
<!--    &lt;!&ndash; start:portlet &ndash;&gt;-->

<!--    <c-loading v-if="loading" :error-msg="errorMsg"></c-loading>-->
<!--    <div v-else class="w-full flex-col">-->
<!--      <div class="portlet-header w-full border-b" :class="headerClass">-->
<!--        <span v-show="viewTitle">{{ viewTitle }}</span>-->
<!--        &lt;!&ndash; options and pagination &ndash;&gt;-->
<!--        <div class="w-full md:flex justify-between items-center  py-3">-->

<!--          <div v-if="paginator" class="flex w-full md:w-1/2 pb-2 md:pb-0 justify-center">-->
<!--            &lt;!&ndash; v-bind:c-route-conf="routeConf" &ndash;&gt;-->
<!--            <c-paginator v-if="widgets.length > 0" v-show="pagination"-->
<!--                         :c-conf="pagination" ></c-paginator>-->
<!--          </div>-->
<!--          <div class="flex w-full md:w-1/2 justify-center h-8" v-show="collectionActionsName.length">-->
<!--            <template v-for="name in collectionActionsName" >-->
<!--              <component v-bind:is="name" v-bind:c-conf="collectionActions[name]" :key="name"></component>&nbsp;-->
<!--            </template>-->
<!--          </div>-->

<!--        </div>-->
<!--&lt;!&ndash;        &lt;!&ndash; /options and pagination &ndash;&gt;&ndash;&gt;-->

<!--&lt;!&ndash;        &lt;!&ndash; header &ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;        &lt;!&ndash; portlet : header &ndash;&gt;&ndash;&gt;-->
<!--&lt;!&ndash;        &lt;!&ndash; /portlet : header &ndash;&gt;&ndash;&gt;-->

<!--&lt;!&ndash;        &lt;!&ndash; /header &ndash;&gt;&ndash;&gt;-->
<!--      </div>-->
<!--      <div class="">-->
<!--        <div class="overflow-x-auto p-2 " :class="modelName">-->
<!--          &lt;!&ndash;                    <table class="table-list table-auto w-full border rounded-lg">&ndash;&gt;-->
<!--          <table class="min-w-full divide-y divide-gray-200">-->
<!--            <thead class="bg-gray-100">-->
<!--              <tr v-if="widgets.length > 0">-->
<!--                <th v-if="needSelection" class="text-gray-500 w&#45;&#45;50">-->
<!--                  <label class="">-->
<!--                    <input c-row-check-all v-on:change="selectAllRows"-->
<!--                           class="checkall" type="checkbox">-->
<!--                    <i></i>-->
<!--                  </label>-->
<!--                </th>-->
<!--                <th v-show="recordActionsName.length"></th>-->
<!--                <th v-for="key in keys" v-if="!isHiddenField(key)" :key="key"-->
<!--                    class="text-gray-500 font-weight-normal fs&#45;&#45;14" :class="key">-->
<!--                  <a-order v-if="orderFields[key]"-->
<!--                                v-bind:c-conf="getOrderConf(key)"></a-order>-->
<!--                  <span style="cursor:default"-->
<!--                        class="btn btn-default btn-xs mr-1 text-gray-500 font-weight-normal fs&#45;&#45;14"-->
<!--                        v-else>{{ key + '.label' | translate(langContext) }}</span>-->
<!--                  &lt;!&ndash;                                <w-tooltip v-if="hasHelp(key)" :help="hasHelp(key)" :help-label="key"></w-tooltip>&ndash;&gt;-->

<!--                </th>-->
<!--              </tr>-->
<!--              <tr v-if="widgets.length == 0">-->
<!--                <th v-show="recordActionsName.length" class="text-gray-500 w&#45;&#45;50">-->
<!--                  {{ "app.nessun-elemento" | translate }}-->
<!--                </th>-->
<!--              </tr>-->
<!--            </thead>-->
<!--            <tbody class="bg-white divide-y divide-gray-200">-->
<!--            &lt;!&ndash; product &ndash;&gt;-->
<!--            <tr v-for="(row,index) in widgets" :key="index">-->
<!--              <th v-if="needSelection">-->

<!--                <label-->
<!--                  class="form-checkbox form-checkbox-primary float-start">-->
<!--                  <input c-row-check type="checkbox">-->
<!--                  <i></i>-->
<!--                </label>-->
<!--              </th>-->
<!--              <th v-show="recordActionsName.length">-->
<!--                <div class="flex justify-center rounded-lg text-sm" role="group">-->
<!--                  <template v-for="(action,name) in recordActions[index]">-->
<!--                    <v-action :c-action="action" :key="name"></v-action>-->
<!--                  </template>-->
<!--                </div>-->
<!--              </th>-->
<!--              <td v-for="(widget, key) in row" v-if="!isHiddenField(key)" :class="key" :key="key">-->
<!--                <v-widget :c-widget="widget" :key="key"></v-widget>-->
<!--              </td>-->
<!--              <template v-for="(widget, key) in row" v-if="isHiddenField(key)">-->
<!--                <v-widget :c-widget="widget" :key="key"></v-widget>-->
<!--              </template>-->
<!--            </tr>-->
<!--            </tbody>-->

<!--            <tfoot v-if="hasFooter">-->
<!--            <tr v-if="widgets.length > 0">-->
<!--              <th v-if="needSelection" class="text-gray-500 w&#45;&#45;50">-->

<!--              </th>-->
<!--              <th v-show="recordActionsName.length"></th>-->
<!--              <th v-for="key in keys" v-if="!isHiddenField(key)" :key="key"-->
<!--                  class="text-gray-500 font-weight-normal fs&#45;&#45;14" >-->
<!--                <a-order v-if="orderFields[key]"-->
<!--                              v-bind:c-conf="getOrderConf(key)"></a-order>-->
<!--                <span style="cursor:default"-->
<!--                      class="btn btn-default btn-xs mr-1 text-gray-500 font-weight-normal fs&#45;&#45;14"-->
<!--                      v-else>{{ key + '.label' | translate(langContext) }}</span>-->
<!--                <button v-if="hasHelp(key)"-->
<!--                        type="button"-->
<!--                        class="btn-xs btn-squared btn-light"-->
<!--                        data-trigger="focus"-->
<!--                        data-container="body"-->
<!--                        data-toggle="popover"-->
<!--                        data-placement="top"-->
<!--                        :data-content="hasHelp(key)">-->
<!--                  <i class="fi fi-round-question-full text-red-700"></i>-->
<!--                </button>-->
<!--              </th>-->
<!--            </tr>-->
<!--            </tfoot>-->
<!--          </table>-->
<!--        </div>-->
<!--      </div>-->
<!--    </div>-->

<!--  </div>-->

  <!-- start:row -->
  <div class="row">
    <!-- start:col: -->
    <div class="col-12 mb-1 p-0">

      <!-- start:portlet -->
      <c-loading v-if="loading" :error-msg="errorMsg"></c-loading>
      <div v-else class="portlet">
        <div class="portlet-header border-bottom" :class="headerClass">
          <span v-show="viewTitle">{{ viewTitle }}</span>
          <!-- options and pagination -->
          <div class="row justify-content-end">

            <div v-if="paginator" class="col-12 col-md-6 mt-1 mb-2">
              <!-- v-bind:c-route-conf="routeConf" -->
              <c-paginator v-if="widgets.length > 0" v-show="pagination"
                           v-bind:c-pagination="pagination" v-bind:c-route="route"></c-paginator>
            </div>
            <div class="col-12 col-md-6 mt-1 mb-2" v-show="collectionActionsName.length">
              <template v-for="name in collectionActionsName">
                <component v-bind:is="name" v-bind:c-conf="collectionActions[name]" :key="name"></component>
              </template>
            </div>

          </div>
          <!-- /options and pagination -->

          <!-- header -->
          <!-- portlet : header -->
          <!-- /portlet : header -->

          <!-- /header -->
        </div>
        <div class="portlet-body pb-0">
          <div class="container-fluid py-1">

            <div class="table-responsive" style="white-space:nowrap;" :class="modelName">
              <table class="table table-framed table-striped table-bordered">
                <thead>
                <tr v-if="widgets.length > 0">
                  <th v-if="needSelection" class="text-gray-500 w--50">
                    <label class="form-checkbox form-checkbox-primary float-start">
                      <input c-row-check-all v-on:change="selectAllRows"
                             class="checkall" type="checkbox">
                      <i></i>
                    </label>
                  </th>
                  <th v-show="recordActionsName.length"></th>
                  <th v-for="key in keys" v-if="!isHiddenField(key)"
                      class="text-gray-500 font-weight-normal fs--14" :class="key" :key="key">
                    <a-order v-if="orderFields[key]" :c-conf="getOrderConf(key)"></a-order>
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
                <tr v-if="widgets.length == 0">
                  <th v-show="recordActionsName.length" class="text-gray-500 w--50">
                    {{ "app.nessun-elemento" | translate }}
                  </th>
                </tr>
                </thead>
                <tbody>
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
                    <div class="btn-group" role="group">
                      <template v-for="(action,name) in recordActions[index]">
                        <v-action :c-action="action" :key="name"></v-action>
                      </template>
                    </div>

                  </th>

                  <td v-for="(widget, key) in row" v-if="!isHiddenField(key)" :class="key" :key="key">
                    <v-widget :c-widget="widget" :key="key"></v-widget>
                  </td>
                  <template v-for="(widget, key) in row" v-if="isHiddenField(key)" >
                    <v-widget :c-widget="widget" :key="key"></v-widget>
                  </template>
                </tr>
                </tbody>

                <tfoot v-if="hasFooter">
                <tr v-if="widgets.length > 0">
                  <th v-if="needSelection" class="text-gray-500 w--50">

                  </th>
                  <th v-show="recordActionsName.length"></th>
                  <th v-for="key in keys" v-if="!isHiddenField(key)" :key="key"
                      class="text-gray-500 font-weight-normal fs--14">
                    <action-order v-if="orderFields[key]"
                                  v-bind:c-conf="getOrderConf(key)" :key="key"></action-order>
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

          </div>
          <!-- end:portlet -->
        </div>
      </div>

    </div>
    <!-- end:col: -->

  </div>
</template>

<script>
import vCollection from './vCollection'
import vListMixin from '../../../../core/mixins/components/views/vListMixin'
// import crud from '../../../../core/crud'

export default {
  name: 'v-list',
  extends: vCollection,
  mixins: [vListMixin],
  methods: {
    dynamicData (conf) {
      if (!conf.langContext && conf.langContext !== null) {
        conf.langContext = conf.modelName ? conf.modelName : this.cModel
        conf.langContext += '.fields'
      }
      return conf
    },
    hasHelp (key) {
      var that = this
      if (this.fieldsConfig[key]) {
        return this.fieldsConfig[key].helpText || false
      }
    }
  }
}
</script>

<style scoped>

</style>
