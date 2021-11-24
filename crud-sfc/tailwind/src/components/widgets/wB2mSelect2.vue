<template>
<!--    <div>-->
<!--        <div class="relative flex w-full flex-wrap items-stretch mb-3">-->
<!--            <select type="text" c-select2 :placeholder="translate('app.digita-per-cercare')"-->
<!--                    class="px-3 py-3 placeholder-gray-400 text-gray-700 relative bg-white bg-white rounded text-sm shadow outline-none focus:outline-none focus:shadow-outline w-full pr-10"-->
<!--                    v-on:change="change"  v-model="value" multiple="true"-->
<!--            />-->
<!--        </div>-->
<!--        <div c-selected-items>-->
<!--            &lt;!&ndash; hidden input for selected items &ndash;&gt;-->
<!--        </div>-->
<!--    </div>-->
  <div>
    <select c-select2 class="form-control m-select2" name="" multiple="true"
            :placeholder="translate('app.digita-per-cercare')"
            v-model="value" v-on:change="change">

    </select>
    <div c-selected-items>
      <!-- hidden input for selected items -->
    </div>
  </div>
</template>

<script>

import wB2Select2 from './wB2Select2'
import wB2mSelect2Mixin from '../../../../core/mixins/components/widgets/wB2mSelect2Mixin'
// import crud from '../../../../core/crud'

export default {
  name: 'w-b2m-select2',
  extends: wB2Select2,
  mixins: wB2mSelect2Mixin
}
</script>

<style scoped>

</style>
