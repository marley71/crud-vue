<template>
    <action-base :c-conf="conf"></action-base>
</template>

<script>
export default {
  name: 'v-action',
  props: ['cAction'],
  data: function () {
    var that = this
    var aConf = {}
    if (that.cAction) {
      aConf = {
        name: that.cAction.name,
        conf: that.cAction
      }
    } else {
      console.warn('configurazione azione non valida', this.cAction)
    }
    return aConf
  }
}
</script>

<style scoped>

</style>
