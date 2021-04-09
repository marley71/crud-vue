// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import crud from '../../core/crud'
import coreMixin from '../../core/mixins/coreMixin'
import dialogsMixin from '../../core/mixins/dialogsMixin'

Vue.config.productionTip = false
Vue.prototype.$crud = crud

require('./components/widgets')
require('./components/dialogs')

/* eslint-disable no-new */
var app = new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  mixins: [coreMixin, dialogsMixin]
})

Vue.filter('translate', function (value, context, plural, params) {
  var langKey = context ? context + '.' + value : value
  return app.translate(langKey, plural, params)
})
