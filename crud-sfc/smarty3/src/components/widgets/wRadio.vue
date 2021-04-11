<template>
    <div class="col-12 mb-2 form-label-group form-control bw--1 border-solid border-gray-400 p--6 rounded">
        <div class="in-label-group">
            <label v-for="key in domainValuesOrder" class="form-radio">
                <input v-bind:name="getFieldName()" type="radio" :value="key"
                       v-model="value"
                       v-on:change="change">
                <i></i><span v-html="domainValues[key]"></span>
            </label>
        </div>
    </div>
</template>

<script>
import wBase from "./wBase";
import choice_mixin from "../../mixins/choice_mixin";
import crud from "../../crud/confs";

crud.conf['w-radio'] = {
    domainValues: {},
    domainValuesOrder: [],
};
export default {
    name: "w-radio",
    extends: wBase,
    mixins: [choice_mixin],
    mounted: function () {
        var that = this;
        if (that.domainValuesOrder.length == 0 && Object.keys(that.domainValues).length > 0) {
            that.domainValuesOrder = Object.keys(that.domainValues);
        }
    },
}
</script>

<style scoped>

</style>
