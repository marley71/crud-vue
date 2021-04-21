// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import Vue from 'vue'
import App from './App'

import router from './router'
import crud from '../../core/crud'
import coreMixin from '../../core/mixins/coreMixin'
import dialogsMixin from '../../core/mixins/dialogsMixin'
import mainMixin from '../../core/mixins/mainMixin'
import jQuery from 'jquery'

// ---    configurazioni tempalte ----
import './confs/actions'
import './confs/routes'

// -- import css smarty3 --
// import './assets/index.css'
import './assets/css/core.css'
import './assets/css/vendor_bundle.css'
import './assets/css/select2-bootstrap4.css'
import './assets/css/app.css'

import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'

require('./components/misc')
require('./components/actions')
require('./components/widgets')
require('./components/dialogs')
require('./components/widgetTemplates')
require('./components/views')
require('./components/app')

crud.EventBus = new Vue()
Vue.config.productionTip = false
Vue.prototype.$crud = crud

/* eslint-disable no-new */
var app = new Vue({
  // el: '#app',
  router,
  components: { App },
  template: '<App/>',
  mixins: [coreMixin, dialogsMixin, mainMixin]
})

Vue.filter('translate', function (value, context, plural, params) {
  var langKey = context ? context + '.' + value : value
  return app.translate(langKey, plural, params)
})
window.jQuery = jQuery
window.app = app
app.loadResources([
  // 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&amp;display=swap'
], function () {
  console.log('caricato tutto')
  app.$mount('#app')
})
