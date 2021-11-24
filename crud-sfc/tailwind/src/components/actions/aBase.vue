<template>
    <!-- hover:text-bold hover:bg-gray-500 -->
    <button v-if="controlType=='button'" type="button" v-show="_visible" class="
                inline-block text-center text-sm leading-1 px-2 py-1
                border border-gray-300
                shadow-md"

            :title="title | translate" :class="css" v-on:click="_execute" v-bind:disabled="_disabled">
        <i class="m-1 align-middle" v-show="icon" :class="icon"></i>
        <span class="align-middle">{{ text | translate }}</span>
    </button>
    <a v-else class="btn btn-sm btn-pill px-2 py-1 fs--15" :target="target" :href="href" v-show="_visible"
       :title="title | translate" :class="css" :disabled="_disabled">
        <i class="m-1" v-show="icon" :class="icon"></i>
        <span>{{ text | translate }}</span>
    </a>
</template>

<script>
import cComponent from '../misc/cComponent'
import aBaseMixin from '../../../../core/mixins/components/actions/aBaseMixin'
// import crud from '../../../../core/crud'

export default {
  name: 'a-base',
  extends: cComponent,
  mixins: [aBaseMixin]
}

</script>

<style scoped>
    button:hover {
        -moz-box-shadow: 0 0 10px #bbb;
        -webkit-box-shadow: 0 0 10px #bbb;
        box-shadow: 0 0 10px #bbb;
    }
</style>
