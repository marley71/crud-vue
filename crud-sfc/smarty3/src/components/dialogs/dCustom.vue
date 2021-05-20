<template>
  <div c-custom-dialog class="modal" tabindex="-1" role="dialog"
       aria-labelledby="" aria-hidden="true"
  >
    <div class="modal-dialog" :class="customClass + ' ' + (cBig ? 'modal-lg' : '')" role="document">
      <div class="modal-content">
        <div v-if="title" class="modal-header">
          <h5 class="modal-title">{{ title | translate }}</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span class="fi fi-close fs--18" aria-hidden="true"></span>
          </button>
        </div>
          <div class="modal-body" v-html="message">

          </div>
<!--        <div class="modal-body" v-html="message">-->

<!--        </div>-->
        <div v-if="Object.keys(callbacks).length > 0" class="modal-footer">
          <template v-for="(cb,key) in callbacks">
            <button :callback-name="key" type="button" class="btn btn-primary" v-on:click="callCb(key)" :key="key">{{ key | translate }}
            </button>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import dBase from './dBase'
export default {
  name: 'd-custom',
  extends: dBase,
  mounted () {
    if (!this.title) {
      this.title = 'app.nome-app'
    }
  }
}
</script>

<style scoped>

</style>
