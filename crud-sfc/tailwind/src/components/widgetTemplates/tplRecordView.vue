<template>
    <component v-if="cWidget.type=='w-hidden'" :is="cWidget.type" :c-conf="cWidget"></component>
    <div :class="getLayoutClass()" v-else>
        <div class="text-gray-500 label" v-if="cTemplate.labelType === 'top'">
            {{cWidget.label}} {{cWidget.required?'*':''}}
        </div>
        <div>
            <span class="text-gray-500 label" v-if="cTemplate.labelType === 'inline'">
              {{cWidget.label}} {{cWidget.required?'*':''}}
            </span>
            <component :is="cWidget.type" :c-conf="cWidget"></component>
        </div>
        <div class="text-gray-500 label" v-if="cTemplate.labelType === 'bottom'">
          {{cWidget.label}} {{cWidget.required?'*':''}}
        </div>
    </div>
</template>

<script>
import tplBase from './tplBase'

export default {
  name: 'tpl-record-view',
  extends: tplBase,
  data () {
    if (!this.cTemplate.layoutType) {
      this.cTemplate.layoutType = 'half'
    }
    if (!this.cTemplate.labelType) {
      this.cTemplate.labelType = 'top'
    }
    return {}
  }
}
</script>

<style scoped>
  .label {
    font-size: .8em;
  }
</style>
