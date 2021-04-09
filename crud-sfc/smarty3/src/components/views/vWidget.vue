<template>
    <component :is="cTemplate" :c-widget="conf"></component>
</template>

<script>
export default {
  name: 'v-widget',
  props: ['cWidget'],
  data: function () {
    if (this.cWidget) {
      var conf = null
      if (typeof this.cWidget === 'string' || this.cWidget instanceof String) {
        conf = this.getDescendantProp(window, this.cWidget)
        if (!conf) {
          conf = this.getDescendantProp(this.$crud.conf, this.cWidget)
        }
      } else {
        conf = this.cWidget
      }
      conf = conf || {}
      // console.log('cWidget conf ', conf);
      let id = 'd' + (new Date().getTime())
      return {
        cTemplate: conf.template ? conf.template : 'tpl-no',
        conf: conf,
        id: id
      }
    }
    console.warn('configurazione non valida', this.cWidget)
    return {
      cTemplate: 'tpl-no',
      conf: {
        type: 'w-text'
      }
    }
  }
}
</script>

<style scoped>

</style>
