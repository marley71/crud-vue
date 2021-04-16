<template>
    <component v-if="cWidget.type=='w-hidden'" :is="cWidget.type" :c-conf="cWidget"></component>
    <div class="inline-grid grid-cols-2 gap-x-3 w-full border-1 border-gray-500" v-else>
        <span>
            {{cWidget.label}}
        </span>
        <span>
            <component :is="cWidget.type" :c-conf="cWidget"></component>
        </span>
    </div>
</template>

<script>
export default {
  name: 'tpl-record-view',
  props: ['cWidget']
}
</script>

<style scoped>

</style>
