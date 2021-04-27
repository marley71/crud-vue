<template>
  <div c-wait :class="{'crud-overlay-body': global, 'crud-overlay' : !global}">
    <span class="crud-wait-msg">
      {{ msg | translate }}
    </span>
  </div>
</template>

<script>
import cComponent from './cComponent'
import jQuery from 'jquery'
import cWaitMixin from '../../../../core/mixins/components/misc/cWaitMixin'

export default {
  name: 'c-wait',
  extends: cComponent,
  //  props: ['cMsg', 'cGlobal'],
  mixins: [cWaitMixin],
  mounted: function () {
    var that = this
    if (that.global) {
      that.jQe('[c-wait]').css('height', jQuery(document).height())
    }
  }
  // ,
  // data: function () {
  //   return {
  //     msg: this.cMsg ? this.cMsg : '...',
  //     global: ('cGlobal' in this) ? this.cGlobal : true
  //   }
  // }
}
</script>

<style scoped>
    .crud-overlay-body {
        background-color: rgba(1, 1, 1, 0.3);
        bottom: 0;
        left: 0;
        position: fixed;
        right: 0;
        top: 0;
        z-index:100000;
        cursor : wait;
    }
    .crud-overlay {
        background-color: rgba(1, 1, 1, 0.3);
        bottom: 0;
        left: 0;
        position: absolute;
        right: 0;
        top: 0;
        z-index:100000;
        cursor : wait;
    }

    .crud-wait-msg {
        position:absolute;
        width:100%;
        top:40%;
        text-align:center;
        color:white;
        font-size: 1.1em;
    }
</style>
