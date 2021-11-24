<template>
  <div id="dynamicContainer">
    <div ></div>
  </div>

</template>

<script>
import cComponent from '../misc/cComponent'

export default {
  name: 'c-dynamic',
  extends: cComponent,
  props: {
    cIs: {
      type: 'string',
      required: true
    }
  },
  mounted () {
    var that = this
    console.log('cdynamic', this.cIs)
    if (that.cIs) {
      var conf = that.cConf || {}
      if (!that.$crud._dynamicComponents[this.cIs]) {
        throw new Error({message: 'componente ' + that.cIs + ' non trovato'})
      }
      var c = new that.$crud._dynamicComponents[this.cIs]({
        propsData: {
          cConf: conf
        }
      })
      c.$mount('#dynamicContainer')
    }
  }
}
</script>

<style scoped>

</style>
