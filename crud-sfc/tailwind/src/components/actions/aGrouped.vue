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


<!--  <button class="btn btn-sm btn-pill px-2 py-1 fs&#45;&#45;15" v-if="controlType=='button'" type="button" v-show="_visible"-->
<!--          :title="title | translate" :class="css" v-on:click="_execute" v-bind:disabled="_disabled">-->
<!--    <i class="m-1" v-show="icon" :class="icon"></i>-->
<!--    <span>{{ text | translate }}</span>-->
<!--  </button>-->
<!--  <a v-else class="btn btn-sm btn-pill px-2 py-1 fs&#45;&#45;15" :target="target" :href="href" v-show="_visible"-->
<!--     :title="title | translate" :class="css" :disabled="_disabled">-->
<!--    <i class="m-1" v-show="icon" :class="icon"></i>-->
<!--    <span>{{ text | translate }}</span>-->
<!--  </a>-->
</template>

<script>
export default {
  name: "aGrouped"
}
</script>

<style scoped>

</style>
