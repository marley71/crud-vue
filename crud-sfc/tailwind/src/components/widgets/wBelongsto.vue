<template>
    <div>
        <span v-for="(field, index) in labelFields" :key="index">
            {{value[field]}}&nbsp;
            <span v-if="index < labelFields.length - 1"> - </span>
        </span>
    </div>
</template>

<script>
import wBase from './wBase'
import crud from '../../../../core/crud'
import wBelongsToMixin from '../../../../core/mixins/components/widgets/wBelongsToMixin'

crud.conf['w-belongsto'] = {
  labelFields: ['text']
}

export default {
  name: 'w-belongsto',
  extends: wBase,
  mixins: [wBelongsToMixin]
}
</script>

<style scoped>

</style>
