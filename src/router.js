import Vue from 'vue'
import Router from 'vue-router'
import Footer from '@/components/Footer'

Vue.use(Router)

export default new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/search',
      name: 'search',
      components: {
        default: () => import('./views/search/index.vue')
      }
    },
    {
      path: '/searchlist:search',
      name: 'searchlist',
      components: {
        default: () => import('./views/searchlist/index.vue')
      }
    },
    {
      path: '/rankinglist/:id/:msg',
      name: 'rankinglist',
      components: {
        default: () => import('./views/rankinglist/index.vue')
      }
    },
    {
      path: '/detail/:id',
      name: 'detail',
      components: {
        default: () => import('./views/detail/index.vue')
      }
    },
    {
      path: '/home',
      name: 'home',
      components: {
        default: () => import('./views/home/index.vue'),
        footer: Footer
      }
    },
    {
      path: '/kind',
      name: 'kind',
      components: {
        default: () => import('./views/kind/index.vue'),
        footer: Footer
      }
    },
    {
      path: '/cart',
      name: 'cart',
      components: {
        default: () => import('./views/cart/index.vue'),
        footer: Footer
      }
    },
    {
      path: '/user',
      name: 'user',
      components: {
        default: () => import('./views/user/index.vue'),
        footer: Footer
      }
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('./views/login/index.vue')
    },
    {
      path: '/userInfo',
      name: 'userInfo',
      component: () => import('./views/userInfo/index.vue')
    },
     {
      path: '/order',
      name: 'order',
      component: () => import('./views/order/index.vue')
    },
     {
      path: '/aboutUs',
      name: 'aboutUs',
      component: () => import('./views/aboutUs/index.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('./views/register/index.vue')
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
})
