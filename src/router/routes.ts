import { LocalStorage } from 'quasar'
import { RouteConfig } from 'vue-router'

const routes: RouteConfig[] = [
  {
    path: '/login',
    component: () => import('layouts/Login.vue')
  },
  {
    path: '/',
    beforeEnter (to, from, next) {
      if (!LocalStorage.has('user')) return next('/login')
      next()
    },
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '/', component: () => import('pages/Index.vue') },
      { path: '/categorias', component: () => import('pages/Category.vue') },
      { path: '/logout', component: () => import('pages/Logout.vue') }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
