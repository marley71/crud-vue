<template>
    <component v-if="cWidget.type=='w-hidden'" :is="cWidget.type" :c-conf="cWidget"></component>
    <div class="col-lg-6 col-md-12 mb-2" v-else>
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
