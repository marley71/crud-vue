<template>
<!--    <div class="mb-3 pt-0">-->
<!--        <input type="hidden" v-model="value" v-bind:name="getFieldName()"-->
<!--               v-on:change="change">-->
<!--        <input class="px-3 py-3 placeholder-gray-400 text-gray-700 relative bg-white bg-white rounded text-sm shadow outline-none focus:outline-none focus:shadow-outline w-full" c-picker>-->
<!--    </div>-->
<!--  <div class="form-control input-group">-->
<!--    <input type="hidden" v-model="value" v-bind:name="getFieldName()"-->
<!--           v-on:change="change">-->
<!--    <input class="datepicker w-100 border-0" c-picker>-->
<!--    <span><button v-on:click="reset()" type="button" class="btn btn-small btn-indigo"> X </button></span>-->

<!--    -->
<!--  </div>-->
<!--  <div class="input-group mb-3">-->
<!--    <div class="">-->
<!--          <input type="hidden" v-model="value" v-bind:name="getFieldName()" v-on:change="change">-->
<!--          <input class="datepicker w-100 border-0" c-picker>-->
<!--&lt;!&ndash;      <input name="file_input_name" type="file" class="custom-file-input js-advancified" id="inputGroupFile01" data-js-advanced-identifier="0957">&ndash;&gt;-->
<!--      <label v-on:click="reset()" class="custom-file-label" for="inputGroupFile01"><i class="fa fa-times"></i></label>-->

<!--    </div>-->
<!--  </div>-->

<!--  <div class="input-group mb-3">-->
<!--    <div class="input-group form-control">-->
<!--      <input class="w-100 border-0 datepicker" c-picker>-->
<!--    </div>-->
<!--    <div v-if="buttonClear" class="input-group-append">-->
<!--      <span v-on:click="reset()" class="input-group-text -mouse-pointer" id="basic-addon1">-->
<!--        <i class="fa fa-times"></i>-->
<!--        <input type="hidden" v-model="value" v-bind:name="getFieldName()" v-on:change="change">-->
<!--      </span>-->
<!--    </div>-->
<!--  </div>-->

  <div class="input-group form-control">
    <input class="w-100 border-0 datepicker" c-picker >
    <input type="hidden" v-model="value" v-bind:name="getFieldName()" v-on:change="change">
    <button v-if="buttonClear" class="close-icon" type="button" v-on:click="reset()"></button>
  </div>
</template>

<script>

// import jQuery from 'jquery'
import wBase from './wBase'
// import crud from '../../../../core/crud'
import wDatePickerMixin from '../../../../core/mixins/components/widgets/wDatePickerMixin'

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
}
</style>
