import Vue from 'vue'
import Router from 'vue-router'

import vList from '../../components/views/vList'
import vListEdit from '../../components/views/vListEdit'
import vEdit from '../../components/views/vEdit'
import vInsert from '../../components/views/vInsert'
import vView from '../../components/views/vView'
import cPage from '../../components/app/cPage'
import cManage from '../../components/app/cManage'
import cImport from '../../components/app/cImport'
import cCalendar from '../../components/app/cCalendar'
import cWindow from '../../components/app/cWindow'

Vue.use(Router)

// function dynamicPropsFn (route) {
//   console.log('dynamicPropsFn', crud.env)
//   return {
//     cPath : crud.env.mainPage
//   }
// }

function getComponent() {
  console.log('getComponent', name)
  return cWindow
  // var w = new cWindow({
  //
  // })
  // return w
}
const router = new Router({
  routes: [
    // {
    //   path: '/',
    //   name: 'HelloWorld',
    //   component: HelloWorld
    // },
    {
      path: '/',
      name: 'default',
      component: getComponent('cPage'),
      props: {cPath: ''}
    },
    {
      path: '/list/:cConf',
      name: 'v-list',
      component: getComponent('vList'),
      props: true
    },
    {
      path: '/list-edit/:cConf',
      name: 'v-list-edit',
      component: getComponent('vListEdit'),
      props: true
    },
    {
      path: '/insert/:cConf',
      name: 'v-insert',
      component: getComponent('vInsert'),
      props: true
    },
    {
      path: '/edit/:cConf/:cPk',
      name: 'v-edit',
      component: getComponent('vEdit'),
      props: true
    },
    {
      path: '/view/:cConf/:cPk',
      name: 'v-view',
      component: getComponent('vView'),
      props: true
    },
    {
      path: '/page/:cPath',
      name: 'c-page',
      component: getComponent('cPage'),
      props: true
    },
    {
      path: '/manage/:cConf',
      name: 'c-manage',
      component: getComponent('cManage'),
      props: true
    },
    {
      path: '/import/:cConf',
      name: 'c-import',
      component: getComponent('cImport'),
      props: true
    },
    {
      path: '/calendar/:cConf',
      name: 'c-calendar',
      component: getComponent('cCalendar'),
      props: true
    }
  ],
  methods: {
    getComponent (name) {
      console.log('getComponent', name)
    }
  }
})

router.beforeEach((to, from, next) => {
  // ...
  console.log('to', to, 'from', from, 'next', next);
  console.log(this);
  var w = to.matched[0];
  w.showComponent(to.name, to.params)
  next()
})

export default router;
