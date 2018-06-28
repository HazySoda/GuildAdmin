import Vue from 'vue'
import Router from 'vue-router'

import Login from '@/views/login'
import Reg from '@/views/reg'

import AppLayout from '@/views/app'
import FirstPublish from '@/views/app/firstPublish'
import Role from '@/views/app/role'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/reg',
      name: 'Reg',
      component: Reg
    },
    {
      path: '/app',
      name: 'AppLayout',
      component: AppLayout,
      children: [
        {
          path: 'first-publish',
          name: 'FirstPublish',
          component: FirstPublish
        },
        {
          path: 'role',
          name: 'Role',
          component: Role
        }
      ]
    }
  ]
})
