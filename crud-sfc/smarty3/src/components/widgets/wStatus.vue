<template>
    <span>
        <span v-if="statusType=='text'">{{ slot }}</span>
        <i v-if="statusType=='icon'" v-bind:class="slot"></i>
    </span>
</template>

<script>
import wBase from './wBase'
import crud from '../../../../core/crud'
import wStatusMixin from '../../../../core/mixins/components/widgets/wStatusMixin'

crud.conf['w-status'] = {
  iconClass: 'fa fa-circle',
  title: 'status',
  statusType: 'icon',
  slot: '',
  defaultDomainValues: {
    icon: {
      0: 'fa fa-circle text-red-500',
      1: 'fa fa-circle text-green-500'
    },
    text: {
      0: 'app.no',
      1: 'app.si'
    }
  }
}

export default {
  name: 'w-status',
  extends: wBase,
  mixins: [wStatusMixin]
}
</script>

<style scoped>

</style>
