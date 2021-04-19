<template>
<!--    <div>-->
<!--        <div class="min-w-full relative block mr-2 align-middle select-none transition duration-200 ease-in">-->
<!--            <input v-on:change="swap" v-model="checkedValue" type="checkbox"  class="mr-2 toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"/>-->
<!--            <label for="toggle" class="mr-2 toggle-label absolute block overflow-hidden h-6 rounded-full  cursor-pointer">{{slot | translate}}</label>-->
<!--        </div>-->
<!--    </div>-->
  <button type="button" class="btn btn-sm btn-pill px-2 py-1 fs--15 btn btn-outline-secondary btn-sm rounded-circle"
          v-bind:title="title" v-on:click="swap">
    <span v-show="swapType=='text'">{{ slot }}</span>
    <i class="" v-show="swapType=='icon'" v-bind:class="slot"></i>
  </button>
</template>

<script>
import wBase from './wBase'
import crud from '../../../../core/crud'
import wSwapMixin from '../../../../core/mixins/components/widgets/wSwapMixin'

crud.conf['w-swap'] = {
  activeIcon: 'fa-check',
  routeName: 'set',
  title: 'swap',
  bgInactive: '#FF0000',
  bgActive: 'bg-red-400',
  domainValues: {
    0: 'app.no',
    1: 'app.si'
  },
  slot: '',
  toggleActive: false
}

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
