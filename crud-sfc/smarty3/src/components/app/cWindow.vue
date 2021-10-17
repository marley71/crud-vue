<template>
  <div >
    <div>Titolo</div>
    <div c-container></div>
  </div>
</template>

<script>
import cComponent from '../misc/cComponent'

export default {
  name: "cWindow",
  extends: cComponent,
  mounted () {
    var n = Math.random() * 1000
    window.jQuery(this.$el).append('ciao ' + n)
    this.$crud.EventBus.$on('window-load-component',function (params) {

    })
  },
  data () {
    return {
      loadedComponents: {}
    }
  },
  methods: {
    showComponent (cName, cProps) {
      if (!this.loadedComponents[cName]) {
        var id = this.createContainer(this.jQe('[c-container]'))
        var compObj = this._createComponent(id, cName, cProps)
        this.loadedComponents[cName] = {
          id: 'id',
          compObj: compObj
        }
        compObj.$mount(window.jQuery('#' + id)[0])
      }
      for (var k in this.loadedComponents) {
        var lc = this.loadedComponents[k];
        if (k !== cName) {
          this.jQe('#' + lc.id).addClass('d-none');
        } else {
          this.jQe('#' + lc.id).removeClass('d-none');
        }
      }
    },
    _createComponent (idContainer, cName, cProps) {
      var cDef = this.dynamicComponent(cName)
      var comp = new cDef({
        propsData: cProps
      })
      return comp
    }
  }
}
</script>

<style scoped>

</style>
