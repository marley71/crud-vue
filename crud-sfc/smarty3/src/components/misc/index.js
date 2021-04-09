import Vue from 'vue'

// import actionBase from "./actionBase";
// import actionOrder from "./actionOrder";
import cComponent from './cComponent'
// import cRouter from "./cRouter";
import cPaginator from './cPaginator'
import cLoading from './cLoading'
// import cWait from "./cWait";
Vue.component('c-component', cComponent)
Vue.component('c-loading', cLoading)
Vue.component('c-paginator', cPaginator)

// Vue.component('action-base', actionBase);
// Vue.component('action-order',actionOrder);
// Vue.component('c-router',cRouter);

// Vue.component('c-wait',cWait);
