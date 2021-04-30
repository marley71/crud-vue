<template>
  <label class="form-switch form-switch-pill d-block" :class="switchClass" v-on:click="swap" :title="title">
    <input type="checkbox" v-model="value">
    <i v-if="dataSwitched" data-on="&#10005;" data-off="&#10004;"
       style="font-family:Zapf Dingbats,font-regular,sans-serif !important"></i>
    <i v-else data-on="&#10004;" data-off="&#10005;"></i>
  </label>
</template>

<script>
import wBase from './wBase'
// import crud from '../../../../core/crud'
import wSwapMixin from '../../../../core/mixins/components/widgets/wSwapMixin'

export default {
  name: 'w-swap',
  extends: wBase,
  mixins: [wSwapMixin]
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
