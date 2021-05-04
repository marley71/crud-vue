import Vue from 'vue'

import dBase from './dBase'
import dConfirm from './dConfirm'
import dError from './dError'
import dMessage from './dMessage'
import dWarning from './dWarning'
import dCustom from './dCustom'
import dAlert from './dAlert'
import dAlertError from './dAlertError'
import dAlertSuccess from './dAlertSuccess'
import dAlertInfo from './dAlertInfo'
import dAlertWarning from './dAlertWarning'

Vue.component('d-base', dBase)
Vue.component('d-confirm', dConfirm)
Vue.component('d-error', dError)
Vue.component('d-message', dMessage)
Vue.component('d-warning', dWarning)
Vue.component('d-custom', dCustom)
Vue.component('d-alert', dAlert)
Vue.component('d-alert-error', dAlertError)
Vue.component('d-alert-success', dAlertSuccess)
Vue.component('d-alert-info', dAlertInfo)
Vue.component('d-alert-warning', dAlertWarning)
