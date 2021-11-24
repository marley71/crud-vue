<template>
  <div :class="getLayoutClass()">
    <component :is="cWidget.type" :c-conf="cWidget" ></component>
  </div>
</template>
<script>
export default {
  name: 'tpl-base',
  props: {
    cWidget: Object,
    cTemplate: {
      type: Object,
      default: function () {
        return {}
      },
      required: true
    }
  },
  data () {
    if (!this.cTemplate.layoutType) {
      this.cTemplate.layoutType = 'half'
    }
    if (!this.cTemplate.labelType) {
      this.cTemplate.labelType = 'bottom'
    }
    return {}
  },
  methods: {
    getLayoutClass () {
      var classes = ''
      if (this.cTemplate.layoutClass) {
        classes = this.cTemplate.layoutClass + ' ' + this.cWidget.name
      } else {
        switch (this.cTemplate.layoutType) {
          case 'full':
            classes = 'col-lg-12 col-md-12 mb-2'
            break
          case 'half':
            classes = 'col-lg-6 col-md-12 mb-2'
            break
        }
        classes += ' ' + this.cWidget.name
      }
      return classes
    }
  }
}
</script>

<style scoped>

</style>
