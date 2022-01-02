<template>
    <div>
        <input c-summernote type="hidden" v-model="value" :name="getFieldName()"
               v-on:change="change">
        <div class="summernote" v-html="value">
        </div>
    </div>
</template>

<script>
/* eslint no-undef: "off" */

import wBase from './wBase'
// import crud from '../../../../core/crud'
import {wTexthtmlMixin} from 'crud-vue-core'

export default {
  name: 'w-texthtml',
  extends: wBase,
  mixins: [wTexthtmlMixin]
}

</script>

<style scoped>

</style>
