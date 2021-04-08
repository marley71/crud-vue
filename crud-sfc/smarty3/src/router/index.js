import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '../components/HelloWorld'
import vList from '../components/views/vList'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/v-list/:cConf',
      name: 'v-list',
      component: vList,
      props: true
    }
  ]
})
