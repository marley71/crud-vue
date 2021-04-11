<template>
    <div>
        <span v-for="(field, index) in labelFields">
            {{value[field]}}&nbsp;
            <span v-if="index < labelFields.length - 1"> - </span>
        </span>
    </div>
</template>

<script>
import wBase from "./wBase";

import crud from "../../crud/confs";

crud.conf['w-belongsto'] = {
    labelFields : ['text']
};

export default {
name: "w-belongsto",
    extends: wBase
}
</script>

<style scoped>

</style>
