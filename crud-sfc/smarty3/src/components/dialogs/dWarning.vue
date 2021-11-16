<template>
  <div c-warning-dialog class="modal" tabindex="-1" role="dialog"
       aria-labelledby="" aria-hidden="true"
  >
    <div class="modal-dialog" :class="{'modal-lg':cBig}" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">{{ title | translate }}</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span class="fi fi-close fs--18" aria-hidden="true"></span>
          </button>
        </div>
        <div class="modal-body">
          <div class="alert alert-warning">
            <template v-if="Array.isArray(message)">
              <div  v-for="(msg,index) in message" v-html="msg" :key="index"></div>
            </template>
            <div v-else v-html="message"></div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary" data-dismiss="modal" v-on:click="ok">{{
              'app.ok' |
                translate
            }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import dBase from './dBase'

export default {
  name: 'd-warning',
  extends: dBase,
  mounted () {
    if (!this.title) {
      this.title = 'app.attenzione'
    }
  }
}
</script>

<style scoped>

</style>
