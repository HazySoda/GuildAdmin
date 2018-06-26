import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/views/home'
import FirstPublish from '@/views/firstPublish'
import Role from '@/views/role'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/first-publish',
      name: 'FirstPublish',
      component: FirstPublish
    },
    {
      path: '/role',
      name: 'Role',
      component: Role
    }
  ]
})
