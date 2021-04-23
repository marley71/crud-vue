<template>
  <button
    class="btn"
    v-if="controlType=='button'" type="button" v-show="_visible"
    :title="title | translate" :class="css" v-on:click="_execute" v-bind:disabled="_disabled">
    <i class="m-1" v-show="icon" :class="icon"></i>
    <span>{{ text | translate }}</span>
  </button>
  <a v-else
     class="btn" :target="target" :href="href" v-show="_visible"
     :title="title | translate" :class="css" :disabled="_disabled">
    <i class="m-1" v-show="icon" :class="icon"></i>
    <span>{{ text | translate }}</span>
  </a>
</template>

<script>
import aBase from './aBase'
import aOrderMixin from '../../../../core/mixins/components/actions/aOrderMixin'
import crud from '../../../../core/crud'

crud.conf['a-square'] = {
  confParent: 'c-component',
  type: null,
  visible: true,
  enabled: true,
  title: '',
  css: 'btn btn-sm mr-1 btn-success bg-success-soft',
  icon: '',
  text: '',
  controlType: 'button',
  href: '',
  target: '_self',
  needSelection: false,
  view: null,
  alertTime: null // eventuale timer per la visualizzazione di un messaggio in alert 0 chiusura manuale, null valore default , n numero millisecondi che il messaggio deve rimanere

}

export default {
  name: 'a-square',
  extends: aBase,
  mixins: [aOrderMixin]
}

</script>

<style scoped>

</style>
