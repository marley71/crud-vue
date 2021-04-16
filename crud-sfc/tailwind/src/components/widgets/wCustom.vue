<template>
    <div>
        {{value}}
    </div>
</template>

<script>
import wBase from './wBase'
import crud from '../../../../core/crud'
import wCustomMixin from '../../../../core/mixins/components/widgets/wCustomMixin'

crud.conf['w-custom'] = {
}

export default {
  name: 'w-custom',
  extends: wBase,
  mixins: [wCustomMixin]
}
</script>

<style scoped>

</style>
