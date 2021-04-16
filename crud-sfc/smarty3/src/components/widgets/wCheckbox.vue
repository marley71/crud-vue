<template>
    <div class="flex flex-row" :class="inline?'flex-row':'flex-col'">
        <div class="mb-3 p-1" v-for="key in domainValuesOrder" :key="key">
            <input class="" v-bind:name="getFieldName()" type="checkbox" :value="key"
                   v-model="value"
                   v-on:change="change">
            <label class=""><span v-html="domainValues[key]"></span></label>
        </div>
    </div>
</template>

<script>
import wBase from './wBase'
import choiceMixin from '../../../../core/mixins/choiceMixin'
import wCheckboxMixin from '../../../../core/mixins/components/widgets/wCheckboxMixin'
import crud from '../../../../core/crud'

crud.conf['w-checkbox'] = {
  inline: true,
  domainValues: {},
  domainValuesOrder: [],
  value: []
}

export default {
  name: 'w-checkbox',
  extends: wBase,
  mixins: [choiceMixin, wCheckboxMixin]
}
</script>

<style scoped>

</style>
