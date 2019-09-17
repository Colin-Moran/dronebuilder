import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'

import PageHome from '@/pages/PageHome'
import PageLogin from '@/pages/PageLogin'
import PageRegister from '@/pages/PageRegister'
import PageProfile from '@/pages/PageProfile'
import PageUserProfile from '@/pages/PageUserProfile'
import PageAbout from '@/pages/PageAbout'
import PageContact from '@/pages/PageContact'
import PageUserSearch from '@/pages/PageUserSearch'

import PageNotFound from '@/pages/PageNotFound'
import PageNotAuthenticated from '@/pages/PageNotAuthenticated'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'PageHome',
      component: PageHome
    },
    {
      path: '/me',
      name: 'PageProfile',
      component: PageProfile,
      meta: {onlyAuthUser: true}
    },
    {
      path: '/login',
      name: 'PageLogin',
      component: PageLogin,
      meta: { onlyGuestUser: true }
    },
    {
      path: '/register',
      name: 'PageRegister',
      component: PageRegister,
      meta: { onlyGuestUser: true }
    },
    {
      path: '/401',
      name: 'PageNotAuthenticated',
      component: PageNotAuthenticated
    },

    {
      path: '/search',
      name: 'PageUserSearch',
      component: PageUserSearch,
      meta: {onlyAuthUser: false}
    },
    {
      path: '/contact',
      name: 'PageContact',
      component: PageContact,
      meta: {onlyAuthUser: false}
    },
    {
      path: '/about',
      name: 'PageAbout',
      component: PageAbout,
      meta: {onlyAuthUser: false}
    },
    {
      path: '*',
      name: 'PageNotFound',
      component: PageNotFound
    },
    {
      path: '/:username',
      name: 'PageUserProfile',
      component: PageUserProfile,
      meta: {onlyAuthUser: false}
    },
  ],
  mode: 'history'
})


router.beforeEach((to, from, next) => {
  store.dispatch('auth/getAuthUser')
    .then(() => {
      const isAuthenticated = store.getters['auth/isAuthenticated']

      if (to.meta.onlyAuthUser) {
        if (isAuthenticated) {
          next()
        } else {
          next({name: 'PageRegister'})
        }
      } else if (to.meta.onlyGuestUser) {
        if (isAuthenticated) {
          next({name: 'PageHome'})
        } else {
          next()
        }
      } else {
        next()
      }
    })
})

export default router
