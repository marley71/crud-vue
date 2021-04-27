<template>
  <div c-confirm-dialog class="modal" tabindex="-1" role="dialog"
       aria-labelledby="" aria-hidden="true"
  >
    <div class="modal-dialog" :class="customClass ? customClass : (cBig ? 'modal-lg' : '')" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">{{ title | translate }}</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span class="fi fi-close fs--18" aria-hidden="true"></span>
          </button>
        </div>
        <div class="modal-body">
          <div class="alert alert-default">
            <template v-if="Array.isArray(message)">
              <div v-for="(msg,index) in message" v-html="msg" :key="index"></div>
            </template>
            <div v-else >{{message}}</div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary" data-dismiss="modal" v-on:click="ok">{{
              'app.ok' |
                translate
            }}
          </button>
          <button type="button" class="btn btn-secondary" data-dismiss="modal" v-on:click="cancel">
            {{ 'app.annulla' | translate }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import dBase from './dBase'

export default {
  name: 'd-confirm',
  extends: dBase,
  mounted () {
    if (!this.title) {
      this.title = 'app.richiesta-conferma'
    }
  }
}
</script>

<style scoped>

</style>
