<template>
  <label class="form-switch form-switch-pill d-block" :class="switchClass" v-on:click="swap" :title="title">
    <input type="checkbox" :value="value">
<!--    <i v-if="dataSwitched" data-on="&#10005;" data-off="&#10004;"></i>-->
<!--    <i v-else data-on="&#10004;" data-off="&#10005;"></i>-->
    <i v-if="dataSwitched" data-on="v" data-off="x"></i>
    <i v-else data-on="x" data-off="v"></i>
  </label>
</template>

<script>
import wBase from './wBase'
import {wSwapMixin} from 'crud-vue-package'

export default {
  name: 'w-swap',
  extends: wBase,
  mixins: [wSwapMixin],
  mounted () {
    var that = this
    if (that.toggleActive) {
      that.jQe('[type="checkbox"]').prop('checked', true)
    } else {
      that.jQe('[type="checkbox"]').prop('checked', false)
    }
  }
}
</script>

<style scoped>

/* CHECKBOX TOGGLE SWITCH */
/* @apply rules for documentation, these do not work as inline style */

/*.toggle-checkbox {*/
/*    @apply: right-0 border-green-400;*/
/*    right: 0;*/
/*    border-color: var(--bg-inactive,blue);*/
/*}*/

.toggle-checkbox:checked {
    @apply: right-0 border-green-400 bg-green-400;
    right: 0;
    /*border-color: var(--bg-active,red);*/
}
.toggle-checkbox:checked + .toggle-label {
    @apply: var(bgActive);
    right:auto;
    /*background-color: var(--bg-active,red);*/
}

.toggle-checkbox:not(checked) {
    @apply: right-0 border-green-400;
    /*right: 0;*/
    /*border-color: var(--bg-active,blue);*/
}

.toggle-checkbox:not(checked) + .toggle-label {
    @apply: var(bgActive);
    right : 0;
    /*background-color: var(--bg-active,blue);*/
}

.text-color {
    color : var(--bg-active,red)
}
</style>
