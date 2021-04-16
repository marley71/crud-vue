<template>
    <div c-map></div>
</template>

<script>

/* eslint no-undef: "off" */

import wMap from './wMap'
import crud from '../../../../core/crud'
import wMapViewMixin from '../../../../core/mixins/components/widgets/wMapViewMixin'

crud.conf['w-map-view'] = {
  confParent: 'w-map'
}

export default {
  name: 'w-map-view',
  extends: wMap,
  mixins: [wMapViewMixin]
}

</script>

<style scoped>

</style>
