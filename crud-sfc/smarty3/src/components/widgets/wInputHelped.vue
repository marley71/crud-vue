<template>
    <div>
        <input :readonly="!customValue"
               class="px-3 py-3 placeholder-gray-400 text-gray-700 relative bg-white bg-white rounded text-sm shadow outline-none focus:outline-none focus:shadow-outline w-full" type="text" name="getFieldName()" v-model="value"
               v-on:change="change">
        <div>
            <div class="flex flex-row mt-1" role="group" aria-label="...">
                <button v-for="dVal in domainValuesOrder" type="button" :key="dVal"
                        class="text-blue-500 bg-transparent border border-solid border-blue-500 hover:bg-blue-500 hover:text-white active:bg-blue-600 font-bold uppercase text-xs px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1"
                        v-on:click="setValue(dVal)">{{ domainValues[dVal] }}
                </button>
            </div>
        </div>
    </div>
</template>

<script>

import wBase from './wBase'
import crud from '../../../../core/crud'

crud.conf['w-input-helped'] = {
  domainValues: {},
  domainValuesOrder: [],
  customValue: false
}

export default {
  name: 'w-input-helped',
  extends: wBase,
  mounted: function () {
    var that = this
    if (that.domainValuesOrder.length === 0 && Object.keys(that.domainValues).length > 0) {
      that.domainValuesOrder = Object.keys(that.domainValues)
    }
  }
}
</script>

<style scoped>

</style>
