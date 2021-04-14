// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import crud from '../../core/crud'
import coreMixin from '../../core/mixins/coreMixin'
import dialogsMixin from '../../core/mixins/dialogsMixin'
import jQuery from 'jquery'

// -- import css smarty3 --

import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'

import './assets/index.css'

// import base from 'tailwindcss/base.css'
// import components from 'tailwindcss/components.css'
// import utilities from 'tailwindcss/utilities.css'

// --------

crud.EventBus = new Vue()
Vue.config.productionTip = false
Vue.prototype.$crud = crud

require('./components/misc')
require('./components/actions')
require('./components/widgets')
require('./components/dialogs')
require('./components/widgetTemplates')
require('./components/views')
require('./components/app')

/* eslint-disable no-new */
var app = new Vue({
  // el: '#app',
  router,
  components: { App },
  template: '<App/>',
  mixins: [coreMixin, dialogsMixin]
})

Vue.filter('translate', function (value, context, plural, params) {
  var langKey = context ? context + '.' + value : value
  return app.translate(langKey, plural, params)
})
window.jQuery = jQuery
app.$mount('#app')
