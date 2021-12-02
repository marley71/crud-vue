<template>
<!--    <select class="px-3 py-3 placeholder-gray-400 text-gray-700 relative bg-white bg-white rounded text-sm shadow outline-none focus:outline-none focus:shadow-outline w-full" v-bind:name="getFieldName()" v-model="value"-->
<!--            v-on:change="change">-->
<!--        <option v-for="key in domainValuesOrder" :value="key" :key="key"-->
<!--        >{{ domainValues[key] }}-->
<!--        </option>-->
<!--    </select>-->
  <select class="form-control" v-bind:name="getFieldName()" v-model="value" v-on:change="change" multiple="multiple">
    <option v-for="key in domainValuesOrder" :value="key" :key="key"
    >{{ domainValues[key] }}
    </option>
  </select>
</template>

<script>
import wBase from './wBase'
import crud from '../../../../core/crud'
import choiceMixin from '../../../../core/mixins/choiceMixin'
import wSelectMixin from '../../../../core/mixins/components/widgets/wSelectMixin'
/* eslint-disable */
// import 'jquery'
// import '../../assets/bootstrap-multiselect-1.1.1/dist/js/bootstrap-multiselect.min'
// import '../../assets/bootstrap-multiselect-1.1.1/dist/css/bootstrap-multiselect.min.css'
/* eslint-enable */

crud.conf['w-multi-select'] = {
  defaultValue: -1,
  domainValues: {},
  domainValuesOrder: []
}

export default {
  name: 'w-multi-select',
  extends: wBase,
  mixins: [choiceMixin, wSelectMixin],
  methods: {
    ready () {
      this.jQe('select').multiselect({
        enableHTML: true
      })
    }
  }
}
</script>

<style scoped>

</style>
