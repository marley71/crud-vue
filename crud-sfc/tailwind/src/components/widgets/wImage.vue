<template>
    <img :src="value">
</template>

<script>
import wBase from './wBase'
import crud from '../../../../core/crud'

crud.conf['w-image'] = {
}

export default {
  name: 'w-image',
  extends: wBase
}
</script>

<style scoped>

</style>
