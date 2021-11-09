<template>
    <component v-if="cWidget.type=='w-hidden'" :is="cWidget.type" :c-conf="cWidget"></component>
    <div :class="getLayoutClass()" v-else>
        <div class="text-gray-500 label" v-if="cTemplate.labelType === 'top'">
            {{cWidget.label}}
        </div>
        <div>
            <span class="text-gray-500 label" v-if="cTemplate.labelType === 'inline'">
              {{cWidget.label}}
            </span>
            <component :is="cWidget.type" :c-conf="cWidget"></component>
        </div>
        <div class="text-gray-500 label" v-if="cTemplate.labelType === 'bottom'">
          {{cWidget.label}}
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
