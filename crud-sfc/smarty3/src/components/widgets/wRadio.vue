<template>
    <div class="col-12 mb-2 form-label-group form-control bw--1 border-solid border-gray-400 p--6 rounded">
        <div class="in-label-group">
            <label v-for="key in domainValuesOrder" class="form-radio" :key="key">
                <input v-bind:name="getFieldName()" type="radio" :value="key"
                       v-model="value"
                       v-on:change="change">
                <i></i><span v-html="domainValues[key]"></span>
            </label>
        </div>
    </div>
</template>

<script>
import wBase from './wBase'
import { choiceMixin, wRadioMixin } from 'crud-vue-core'

export default {
  name: 'w-radio',
  extends: wBase,
  mixins: [choiceMixin, wRadioMixin]
}
</script>

<style scoped>

</style>
