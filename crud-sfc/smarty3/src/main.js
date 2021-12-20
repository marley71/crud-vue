// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.



import Vue from 'vue'
import { crud, coreMixin, dialogsMixin, mainMixin } from 'crud-vue-package'

import App from './App'
import router from './router'
import jQuery from 'jquery'
import cPage from './components/app/cPage'

// ---    configurazioni tempalte ----
import './confs/actions'
import './confs/routes'

// -- import css smarty3 --
// import './assets/index.css'
import './assets/css/core.css'
import './assets/css/vendor_bundle.css'
import './assets/css/select2-bootstrap4.css'
import './assets/css/app.css'
import './assets/css/crud-vue.css'

import './assets/fontawesome/css/all.css'
import './assets/fontawesome/js/all.js'
import cCalendar from "./components/app/cCalendar";

// import '@fortawesome/fontawesome-free/css/all.css'
// import '@fortawesome/fontawesome-free/js/all.js'

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
app.loadConfigurations(function () {
  console.log('caricato tutto')
  var _dr = app.$crud.env.dynamicPageRoutes || {}
  console.log('dynamicPageRoutes', _dr)
  for (var k in _dr) {
    router.addRoute({
      path: k,
      name: k,
      component: cPage,
      props: {cPath: _dr[k].pagePath}
    })
  }
  app.$mount('#app')
})
