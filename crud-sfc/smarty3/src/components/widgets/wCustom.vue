<template>
    <div>
        {{value}}
    </div>
</template>

<script>
import wBase from "./wBase";
import crud from "../../crud/confs";

crud.conf['w-custom'] = {
};

export default {
name: "w-custom",
    extends: wBase
}
</script>

<style scoped>

</style>
