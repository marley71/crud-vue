<template>
    <span>
      <span v-for="key in domainValuesOrder" :key="key" v-show="key==value">
        <span v-if="statusType=='text'">{{ domainValues[key] }}</span>
        <i v-if="statusType=='icon'" :class="domainValues[key]"></i>

<!--                <input v-bind:name="getFieldName()" type="radio" :value="key"-->
<!--                       v-model="value"-->
<!--                       v-on:change="change">-->
<!--                <i></i><span v-html="domainValues[key]"></span>-->
      </span>
    </span>
</template>

<script>
import wBase from './wBase'
import { choiceMixin, wStatusMixin } from 'crud-vue-package'


export default {
  name: 'w-status',
  extends: wBase,
  mixins: [choiceMixin, wStatusMixin]
}
</script>

<style scoped>

</style>
