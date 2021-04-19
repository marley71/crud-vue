<template>
  <button class="btn btn-sm btn-pill px-2 py-1 fs--15" v-if="controlType=='button'" type="button" v-show="_visible"
          :title="title | translate" :class="css" v-on:click="_execute" v-bind:disabled="_disabled">
    <i class="m-1" v-show="icon" :class="icon"></i>
    <span>{{ text | translate }}</span>
  </button>
  <a v-else class="btn btn-sm btn-pill px-2 py-1 fs--15" :target="target" :href="href" v-show="_visible"
     :title="title | translate" :class="css" :disabled="_disabled">
    <i class="m-1" v-show="icon" :class="icon"></i>
    <span>{{ text | translate }}</span>
  </a>
</template>

<script>
import cComponent from '../misc/cComponent'
import aBaseMixin from '../../../../core/mixins/components/actions/aBaseMixin'
import crud from '../../../../core/crud'

crud.conf['a-base'] = {
  confParent: 'c-component',
  type: null,
  visible: true,
  enabled: true,
  title: '',
  css: 'btn btn-outline-secondary text-gray-500',
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
  name: 'a-base',
  extends: cComponent,
  mixins: [aBaseMixin]
}

</script>

<style scoped>
    button:hover {
        -moz-box-shadow: 0 0 10px #bbb;
        -webkit-box-shadow: 0 0 10px #bbb;
        box-shadow: 0 0 10px #bbb;
    }
</style>
