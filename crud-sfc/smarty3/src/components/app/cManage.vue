<template>
  <div class="portlet">
    <div class="portlet-header border-bottom mb-1" :class="manageHeaderClass">
      <span class="d-block text-truncate font-weight-medium" :class="manageHeaderTextClass">
        Gestione {{ translate(modelName + '.label', 1) }}
        <a class="btn btn-sm btn-success btn-soft float-end" data-toggle="collapse"
           :href="'#'+collapseId" role="button" aria-expanded="false"
           aria-controls="collapseExample2" v-if="collapsible">
          <span>+/-</span>
          <span class="group-icon">
            <i class="fi fi-arrow-end-slim"></i>
            <i class="fi fi-arrow-down-slim"></i>
          </span>
        </a>
      </span>
    </div>
    <div class="portlet-body pb-0" :class="collapsed?'collapse':'collapse show'" :id="collapseId">
      <transition
        v-on:before-enter="beforeEnterList"
        v-on:enter="enterList"
        v-on:leave="leaveList"
        v-bind:css="false"

      >
        <div class="collapse show" c-collapse-list v-show="showList">
          <div>
            <div>
              <div c-search-container class="border-b border-red-600">
              </div>
              <div c-list-container>

              </div>

            </div>
          </div>
        </div>
      </transition>

      <!--                     :class="showEdit ? 'transform transition transition-all duration-1000 delay-1000 ease-in-out translate-y-0' : ''"-->
      <div class="collapse relative" c-collapse-edit>
        <transition
          v-on:before-enter="beforeEnter"
          v-on:enter="enter"
          v-on:leave="leave"
          v-bind:css="false"
        >
          <div class="portlet" v-show="showEdit">

            <!-- portlet : header -->
            <div class="portlet-header border-bottom mb-3" :class="layoutGradientColor">
                            <span class="d-block text-white text-truncate font-weight-medium" v-show="updateTitle">
                                {{ updateTitle }}
                            </span>
            </div>
            <!-- /portlet : header -->
            <div class="portlet-body pb-0" c-edit-container>
            </div>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>

import cComponent from '../misc/cComponent'
import cManageMixin from '../../../../core/mixins/app/cManageMixin'
import crud from '../../../../core/crud'

crud.conf['c-manage'] = {
  listComponentName: 'v-list',
  searchComponentName: 'v-search',
  listEditComponentName: 'v-list-edit',
  editComponentName: 'v-edit',
  insertComponentName: 'v-insert',
  viewComponentName: 'v-view',

  inlineEdit: false,

  listComp: null,
  searchComp: null,
  listEditComp: null,
  editComp: null,
  insertComp: null,
  viewComp: null,

  layoutGradientColor: null,
  manageHeaderClass: null,
  manageHeaderTextClass: 'text-dark',
  updateTitle: '',
  viewTitle: '',

  showEdit: false,
  showList: true,
  resources: [
    'https://unpkg.com/velocity-animate@2.0.6/velocity.min.js'
  ],
  list:{},
  edit: {},
  search:{},
  view: {},
  listEdit: {},
  insert:null,
}

export default {
  name: 'c-manage',
  extends: cComponent,
  // props: ['cModel', 'cInlineEdit', 'cCollapsible'],
  mixins: [cManageMixin]

}
</script>

<style scoped>

</style>
