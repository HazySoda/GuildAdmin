import Vue from 'vue'
import Router from 'vue-router'

import Login from '@/views/login'
import AppLayout from '@/views/app'
import Home from '@/views/app/home'
import FirstPublish from '@/views/app/firstPublish'
import Role from '@/views/app/role'
import Events from '@/views/app/events'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/app',
      name: 'AppLayout',
      component: AppLayout,
      children: [
        {
          path: 'home',
          name: 'Home',
          component: Home
        },
        {
          path: 'first-publish',
          name: 'FirstPublish',
          component: FirstPublish
        },
        {
          path: 'role',
          name: 'Role',
          component: Role
        },
        {
          path: 'events',
          name: 'Events',
          component: Events
        }
      ]
    },
    {
      path: '/*',
      redirect: '/login'
    }
  ]
})
