<template>
    <component v-if="cWidget.type=='w-hidden'" :is="cWidget.type" :c-conf="cWidget"></component>
    <div :class="getLayoutClass()" v-else>
        <div v-if="cTemplate.labelType === 'top'">
            {{cWidget.label}}
        </div>
        <div>
            <span v-if="cTemplate.labelType === 'inline'">
              {{cWidget.label}}
            </span>
            <component :is="cWidget.type" :c-conf="cWidget"></component>
        </div>
        <div v-if="cTemplate.labelType === 'bottom'">
          {{cWidget.label}}
        </div>
    </div>
</template>

<script>
import tplBase from './tplBase'

export default {
  name: 'tpl-record-view',
  extends: tplBase
}
</script>

<style scoped>

</style>
