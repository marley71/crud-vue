<template>
  <div class="flex justify-between items-center alert alert-danger py-3 px-3 rounded-lg crud-alert">
        <div class="float-left">
          <span class="font-semibold">{{ cMessage }}</span>
        </div>
        <div v-if="cTime===0" class="float-right">
            <a class="btn btn-sm text-danger" v-on:click="hide">
                <span class="text-2xl">&times;</span>
            </a>
        </div>
    </div>
</template>

<script>
import dAlert from './dAlert'

export default {
  name: 'd-alert-error',
  extends: dAlert
}
</script>

<style scoped>
.crud-alert {
  position:absolute;
  z-index:100000;
  width:50%;
  left:25%;
  top:0px
}
.crud-alert a {
  cursor: pointer;
}
</style>
