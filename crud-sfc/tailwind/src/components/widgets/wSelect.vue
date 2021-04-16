<template>
    <select class="px-3 py-3 placeholder-gray-400 text-gray-700 relative bg-white bg-white rounded text-sm shadow outline-none focus:outline-none focus:shadow-outline w-full" v-bind:name="getFieldName()" v-model="value"
            v-on:change="change">
        <option v-for="key in domainValuesOrder" :value="key" :key="key"
        >{{ domainValues[key] }}
        </option>
    </select>
</template>

<script>
import wBase from './wBase'
import crud from '../../../../core/crud'
import choiceMixin from '../../../../core/mixins/choiceMixin'

crud.conf['w-select'] = {
  domainValues: {},
  domainValuesOrder: []
}

export default {
  name: 'w-select',
  extends: wBase,
  mixins: [choiceMixin]
}
</script>

<style scoped>

</style>
