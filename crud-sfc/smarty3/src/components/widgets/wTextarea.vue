<template>
<!--    <textarea :maxlength="maxlength"-->
<!--              class="px-3 py-3 placeholder-gray-400 text-gray-700 relative bg-white bg-white rounded text-sm shadow outline-none focus:outline-none focus:shadow-outline w-full"-->
<!--              :class="{'js-form-advanced-char-count-down' : charleft}"-->
<!--              data-output-target=".js-form-advanced-char-left"-->
<!--              v-model="value" :name="getFieldName()"-->
<!--              v-on:change="change"></textarea>-->
  <textarea :maxlength="maxlength"
            class="form-control" :class="{'js-form-advanced-char-count-down' : charleft}"
            data-output-target=".js-form-advanced-char-left"
            v-model="value" v-bind:name="getFieldName()"
            v-on:change="change"></textarea>
</template>

<script>
import wBase from './wBase'
import crud from '../../../../core/crud'
// import wAutocompleteMixin from '../../../../core/mixins/components/widgets/wAutocompleteMixin'

crud.conf['w-textarea'] = {
  maxlength: 1000,
  charleft: false
}

export default {
  name: 'w-textarea',
  extends: wBase
}
</script>

<style scoped>

</style>
