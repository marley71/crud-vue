<template>
    <div v-if="resourcesLoaded" class="mb-3 pt-0 flex flex-row">
        <input type="hidden" v-model="value" v-bind:name="getFieldName()" v-on:change="change">
        <w-select ref="day" v-bind:c-conf="cDay"></w-select>
        <w-select ref="month" v-bind:c-conf="cMonth"></w-select>
        <w-select ref="year" v-bind:c-conf="cYear"></w-select>
    </div>
</template>

<script>

import wBase from './wBase'
import wDateSelectMixin from 'crud-vue-package'

export default {
  name: 'w-date-select',
  extends: wBase,
  mixins: [wDateSelectMixin]
}

</script>

<style scoped>

</style>
