import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '../components/HelloWorld'
import vList from '../components/views/vList'
import vListEdit from '../components/views/vListEdit'
import vEdit from '../components/views/vEdit'
import vInsert from '../components/views/vInsert'
import vView from '../components/views/vView'
import cPage from '../components/app/cPage'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/list/:cConf',
      name: 'v-list',
      component: vList,
      props: true
    },
    {
      path: '/list-edit/:cConf',
      name: 'v-list-edit',
      component: vListEdit,
      props: true
    },
    {
      path: '/insert/:cConf',
      name: 'v-insert',
      component: vInsert,
      props: true
    },
    {
      path: '/edit/:cConf/:cPk',
      name: 'v-edit',
      component: vEdit,
      props: true
    },
    {
      path: '/view/:cConf/:cPk',
      name: 'v-view',
      component: vView,
      props: true
    },
    {
      path: '/page/:cPath',
      name: 'c-page',
      component: cPage,
      props: true
    }
  ]
})
