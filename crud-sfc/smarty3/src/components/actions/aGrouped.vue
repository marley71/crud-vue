<template>
  <div class="clearfix" v-show="_visible" :title="title | translate" :disabled="_disabled" >
    <a href="#" :class="css"
       data-toggle="dropdown" aria-expanded="false" aria-haspopup="true">
      <span class="group-icon">
          <i class="fi fi-dots-vertical-full"></i>
          <i class="fi fi-close"></i>
      </span>
    </a>
    <div
      class="dropdown-menu dropdown-menu-clean dropdown-click-ignore max-w-220">
      <div class="scrollable-vertical max-h-50vh">
        <template v-for="(action,name) in actionsConfig">
<!--          <v-action :c-action="action" :key="name"></v-action>-->
          <component :is="action.componentName" :c-conf="action" inline-template :key="name">
            <a class="dropdown-item text-truncate cursor-pointer" v-if="_visible"
               :class="name + ' ' +css" v-on:click="_execute"
               target="_blank">
              <i :class="icon"></i> {{text}}
            </a>
          </component>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import cComponent from '../misc/cComponent'
import {aGroupedMixin} from 'crud-vue-package'


export default {
  name: 'a-grouped',
  extends: cComponent,
  mixins: [aGroupedMixin]
}

</script>

<style scoped>
    button:hover {
        -moz-box-shadow: 0 0 10px #bbb;
        -webkit-box-shadow: 0 0 10px #bbb;
        box-shadow: 0 0 10px #bbb;
    }
</style>
