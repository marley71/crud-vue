<template>
    <input v-model="value" :name="getFieldName()" type="hidden">
</template>

<script>
import wBase from "./wBase";
import crud from "../../crud/confs";

crud.conf['w-hidden'] = {
};

export default {
    name: "w-hidden",
    extends : wBase
}
</script>

<style scoped>

</style>
