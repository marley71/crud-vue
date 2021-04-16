<template>
    <div class="relative flex w-full flex-wrap items-stretch mb-3">
        <select type="text" c-select2 :placeholder="translate('app.digita-per-cercare')"
               class="px-3 py-3 placeholder-gray-400 text-gray-700
               relative bg-white bg-white rounded text-sm shadow outline-none focus:outline-none focus:shadow-outline w-full pr-10"
                :name="getFieldName()" v-model="value" v-on:change="change"
        />
    </div>
</template>

<script>

import wBase from './wBase'
import wB2Select2Mixin from '../../../../core/mixins/components/widgets/wB2Select2Mixin'
import crud from '../../../../core/crud'

crud.conf['w-b2-select2'] = {
  labelFields: [],
  resources: [
    'https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.12/css/select2.min.css',
    'https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.12/js/select2.min.js'
  ],
  routeName: 'autocomplete',
  route: null,
  primaryKey: 'id',
  allowClear: true,
  data: null // eventuali dati statici
}

export default {
  name: 'w-b2-select2',
  extends: wBase,
  mixins: [wB2Select2Mixin]
}
</script>

<style scoped>

</style>
