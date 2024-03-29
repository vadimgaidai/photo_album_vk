import Vue from 'vue'
import Router from 'vue-router'
import index from './views/index.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    },
    {
      path: '/gallery',
      name: 'gallery',
      // route level code-splitting
      // this generates a separate chunk (test.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "test" */ './views/gallery/')
    },
    {
      path: '/gallery/:photos',
      name: 'photos',
      // route level code-splitting
      // this generates a separate chunk (test.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "test" */ './views/photos/')
    },
    {
      path: '/gallery/:photos/:onePhoto',
      name: 'onePhoto',
      // route level code-splitting
      // this generates a separate chunk (test.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "test" */ './views/onePhoto/')
    },
    {
      path: '/droap',
      name: 'droap',
      // route level code-splitting
      // this generates a separate chunk (test.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "test" */ './views/droap/')
    }
  ]
})
