<template>
  <div class="input-group form-control">
    <input class="w-100 border-0 datepicker" c-picker >
    <input type="hidden" v-model="value" v-bind:name="getFieldName()" v-on:change="change">
    <button v-if="buttonClear" class="close-icon" type="button" v-on:click="reset()"></button>
  </div>
</template>

<script>

import wBase from './wBase'
import {wDatePickerMixin} from 'crud-vue-core'

/* eslint no-undef: "off" */

export default {
  name: 'w-date-picker',
  extends: wBase,
  mixins: [wDatePickerMixin]
}
</script>

<style scoped>
.close-icon {
  border:1px solid transparent;
  background-color: transparent;
  display: inline-block;
  vertical-align: middle;
  outline: 0;
  cursor: pointer;
}

.close-icon:after {
  content: "X";
  display: block;
  width: 15px;
  height: 15px;
  position: absolute;
  background-color: #AAAAAA;
  z-index:1;
  right: 35px;
  top: 0;
  bottom: 1px;
  margin: auto;
  padding: 2px;
  border-radius: 50%;
  text-align: center;
  color: white;
  font-weight: normal;
  font-size: 12px;
  box-shadow: 0 0 2px #000000;
  cursor: pointer;
  padding-bottom: 3px;
  padding-left: 1px;
}
</style>
