<template>
  <!-- start:row -->
  <div v-if="template === 'default'">
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
                             :c-conf="pagination"></c-paginator>
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
                <table class="table table-framed table-stripedinner table-bordered">
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
                            v-else>{{ widgets[0][key].label }}</span>
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
                    <th  class="text-gray-500 w--50"> <!-- v-show="recordActionsName.length" -->
                      {{ "app.nessun-elemento" | translate }}
                    </th>
                  </tr>
                  </thead>
                  <tbody>
                  <!-- widgets  -->
                  <template v-for="(row,index) in widgets">
                    <tr  :key="index">
                      <th v-if="needSelection">

                        <label
                          class="form-checkbox form-checkbox-primary float-start">
                          <input c-row-check type="checkbox" :value="value[index][primaryKey]">
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
                    <tr :id="'ghost_container' +  index" class="d-none" :key="'ghost_'+index">
                      <td :colspan="keys.length+3"></td>
                    </tr>
                  </template>
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
                            v-else>{{ widgets[0][key].label }}</span>
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
  </div>
  <div v-else-if="template === 'inner'">
    <div class="container row border-bottom default-divider">
      <!-- start:col: -->
      <div class="col-12 mb-1 p-0">

        <!-- start:portlet -->
        <c-loading v-if="loading" :error-msg="errorMsg"></c-loading>
        <div v-else class="portlet">
          <div class="portlet-body border-bottom p-1 m-1" :class="headerClass" >
            <span v-show="viewTitle">{{ viewTitle }}</span>
            <!-- options and pagination -->
            <div class="row justify-content-end " v-show="collectionActionsName.length">

              <div class="col-12 col-md-6 mt-0 mb-0" >
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
            <div class="container-fluid py-1 px-0">

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
                                    <span style="cursor:default"
                                          class="mr-1 text-gray-500 font-weight-normal fs--14"
                                    >{{ widgets[0][key].label }}</span>
                      <a v-if="hasHelp(key)"
                         type="button"
                         class=""
                         data-trigger="focus"
                         data-container="body"
                         data-toggle="popover"
                         data-placement="top"
                         :data-content="hasHelp(key)">
                        <i class="fi fi-round-question-full text-red-700"></i>
                      </a>

                    </th>
                  </tr>
                  <tr v-if="widgets.length == 0">
                    <th  class="text-gray-500 w--50"> <!-- v-show="recordActionsName.length" -->
                      {{ "app.nessun-elemento" | translate }}
                    </th>
                  </tr>
                  </thead>
                  <tbody>
                  <!-- widgets  -->
                  <template v-for="(row,index) in widgets">
                    <tr  :key="index">
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
                  </template>
                  </tbody>

                </table>
              </div>

            </div>
            <!-- end:portlet -->
          </div>
        </div>

      </div>
      <!-- end:col: -->

    </div>
  </div>

</template>

<script>
import vCollection from './vCollection'
import {vListMixin} from 'crud-vue-core'

export default {
  name: 'v-list',
  extends: vCollection,
  mixins: [vListMixin],
  methods: {
    _dynamicData (conf) {
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
    },
    getGhostContainer (index) {
      return this.jQe('#ghost_container' + index + ' td')
    },
    showGhostContainer (index) {
      this.jQe('#ghost_container' + index).removeClass('d-none')
    },
    hideGhostContainer (index) {
      this.jQe('#ghost_container' + index).addClass('d-none')
    },
    isVisibleGhostContainer (index) {
      return !this.jQe('#ghost_container' + index).hasClass('d-none')
    }
  }
}
</script>

<style scoped>

</style>
