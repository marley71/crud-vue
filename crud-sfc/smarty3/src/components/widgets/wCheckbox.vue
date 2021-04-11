<template>
    <div class="flex flex-row" :class="inline?'flex-row':'flex-col'">
        <div class="mb-3 p-1" v-for="key in domainValuesOrder">
            <input class="" v-bind:name="getFieldName()" type="checkbox" :value="key"
                   v-model="value"
                   v-on:change="change">
            <label class=""><span v-html="domainValues[key]"></span></label>
        </div>
    </div>
</template>

<script>
import wBase from "./wBase";
import choice_mixin from "../../mixins/choice_mixin";
import crud from "../../crud/confs";

crud.conf['w-checkbox'] = {
    inline : true,
    domainValues: {},
    domainValuesOrder: [],
    value: [],
};

export default {
    name: "w-checkbox",
    extends: wBase,
    mixins: [choice_mixin],
    mounted: function () {
        var that = this;
        if (that.domainValuesOrder.length == 0 && Object.keys(that.domainValues).length > 0) {
            that.domainValuesOrder = Object.keys(that.domainValues);
        }
    },
    methods: {
        setDomainValues: function (domainValues, domainValuesOrder) {
            var that = this;
            that.domainValues = domainValues;
            that.domainValuesOrder = domainValuesOrder ? domainValuesOrder : Object.keys(domainValues);
            if (that.domainValuesOrder.indexOf(that.getValue()) < 0) {
                that.value = [that.domainValuesOrder[0]];
            }
        },
        getFieldName: function () {
            return this.name + '[]';
        }
    },
}
</script>

<style scoped>

</style>
