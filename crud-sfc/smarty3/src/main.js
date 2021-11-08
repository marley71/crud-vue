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
import cPage from './components/app/cPage'
// import Server from '../../core/Server'
import httpVueLoader from 'http-vue-loader'

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
const fsss = require('fs')

crud.EventBus = new Vue()
Vue.config.productionTip = false
Vue.prototype.$crud = crud


Vue.use(httpVueLoader);

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
  var that = this;
  console.log('caricato tutto')
  var _dr = app.$crud.env.dynamicPageRoutes || {}
  console.log('dynamicPageRoutes', _dr)
  for (let k in _dr) {
    router.addRoute({
      path: k,
      name: k,
      component: cPage,
      props: {cPath: _dr[k].pagePath}
    })
  }
  var _rq = app.$crud.env.dynamicRequires || {};
  console.log('_rq', _rq);
  for (let k in _rq) {
    var comp = httpVueLoader(_rq[k], k)
    console.log('ahttloader ', comp.name, comp)
    app.$options.components[k] = Vue.component(k, comp)
    //httpVueLoaderRegister(Vue, _rq[k]);

    // Server.get(_rq[k], {}, function (html) {
    //   Vue.component(k, httpVueLoader(_rq['k']))
    //   // Vue.component(k, function (resolve, reject) {
    //   //   var moduleData = html
    //   //   var b64moduleData = "data:text/javascript;base64," + btoa(moduleData)
    //   //   var module = import(b64moduleData)
    //   //   resolve(module)
    //   //
    //   //   // setTimeout(function () {
    //   //   //   // Pass the component definition to the resolve callback
    //   //   //   resolve({
    //   //   //     template: '<div>I am async!</div>'
    //   //   //   })
    //   //   // }, 1000)
    //   // })
    // })












    // console.log(__dirname)
    // fsss.readdir('.', null, function (e, path) {
    //   console.log('readrid', path);
    // })
    // var files = fsss.readdirSync('.')
    // console.log('files', files)
    // Vue.component(
    //   k,
    //   // A dynamic import returns a Promise.
    //   () => import(_rq[k]).catch(
    //     err => {
    //       console.log('errore', err)
    //       // main.textContent = err.message;
    //     }
    //   )
    // )
  }


  // Vue.component('async-webpack-example', function (resolve) {
  //   // This special require syntax will instruct Webpack to
  //   // automatically split your built code into bundles which
  //   // are loaded over Ajax requests.
  //   // require(['./my-async-component'], resolve)
  //   require(_rq, resolve)
  //
  //   Vue.component(
  //     'async-webpack-example',
  //     // A dynamic import returns a Promise.
  //     () => import('./my-async-component')
  //   )
  // })
  app.$mount('#app')
})
