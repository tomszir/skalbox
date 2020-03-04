import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '@/pages/Home'
import Room from '@/pages/Room'

Vue.use(VueRouter)

export default new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: Home
    },
    {
      path: '/room',
      component: Room
    },
    {
      path: '/room/:roomId',
      component: Room
    }
  ]
})
