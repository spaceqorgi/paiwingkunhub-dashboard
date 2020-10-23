/*=========================================================================================
  File Name: router.js
  Description: Routes for vue-router. Lazy loading is enabled.
==========================================================================================*/

import Vue from 'vue'
import Router from 'vue-router'
import auth from './middleware/auth'
import store from './store/store'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior () {
    return {
      x: 0,
      y: 0
    }
  },
  routes: [
    {
      path: '/Login',
      name: 'login',
      component: () => import('./views/Login.vue')
    },
    {
      // =============================================================================
      // MAIN LAYOUT ROUTES
      // =============================================================================
      path: '',
      component: () => import('./layouts/main/Main.vue'),
      children: [
        // ==========================================================================
        // Theme Routes
        // ==========================================================================
        {
          path: '/',
          name: 'dashbord',
          component: () => import('./views/Dashboard/Dashboard.vue'),
          meta: {
            middleware: [auth]
          }
        },
        //===============================================================
        // event
        //===============================================================
        {
          path: '/event',
          name: 'event',
          component: () => import('./views/Event/Event.vue'),
          meta: {
            middleware: [auth],
            breadcrumb: [
              { title: 'หน้าแรก', url: '/' },
              { title: 'งานวิ่งทั้งหมด', active: true }
            ],
            pageTitle: 'งานวิ่งทั้งหมด',
            rule: 'editor'
          }
        },
        {
          path: 'event/:id',
          name: 'eventinfo',
          component: () => import('./views/Event/EventInfo.vue'),
          meta: {
            middleware: [auth],
            breadcrumb: [
              { title: 'หน้าแรก', url: '/' },
              { title: 'งานวิ่งทั้งหมด', url: '/event' },
              { title: 'ข้อมูลงานวิ่ง', active: true }
            ],
            pageTitle: 'ข้อมูลงานวิ่ง',
            rule: 'editor'
          }
        },
        {
          path: '/search_event',
          name: 'search_event',
          component: () => import('./views/Event/EventSearch.vue'),
          meta: {
            middleware: [auth],
            breadcrumb: [
              { title: 'หน้าแรก', url: '/' },
              { title: 'ค้นหางานวิ่ง', active: true }
            ],
            pageTitle: 'ค้นหางานวิ่ง',
            rule: 'editor'
          }
        },
        {
          path: '/add_event',
          name: 'add_event',
          component: () => import('./views/Event/EventAdd.vue'),
          meta: {
            middleware: [auth],
            breadcrumb: [
              { title: 'หน้าแรก', url: '/' },
              { title: 'เพิ่มงานวิ่ง', active: true }
            ],
            pageTitle: 'เพิ่มงานวิ่ง',
            rule: 'editor'
          }
        },
        //===============================================================
        // End event
        //===============================================================
        //===============================================================
        // User
        //===============================================================
        {
          path: '/user',
          name: 'user',
          component: () => import('./views/User/User.vue'),
          meta: {
            middleware: [auth],
            breadcrumb: [
              { title: 'หน้าแรก', url: '/' },
              { title: 'ผู้ใช้ทั้งหมด', active: true }
            ],
            pageTitle: 'ผู้ใช้ทั้งหมด',
            rule: 'editor'
          }
        },
        {
          path: 'user/:id',
          name: 'userinfo',
          component: () => import('./views/User/UserInfo.vue'),
          meta: {
            middleware: [auth],
            breadcrumb: [
              { title: 'หน้าแรก', url: '/' },
              { title: 'ผู้ใช้ทั้งหมด', url: '/user' },
              { title: 'ข้อมูลผู้ใช้', active: true }
            ],
            pageTitle: 'ข้อมูลผู้ใช้',
            rule: 'editor'
          }
        },
        {
          path: '/search_user',
          name: 'search_user',
          component: () => import('./views/User/UserSearch.vue'),
          meta: {
            middleware: [auth],
            breadcrumb: [
              { title: 'หน้าแรก', url: '/' },
              { title: 'ค้นหาผู้ใช้', active: true }
            ],
            pageTitle: 'ค้นหาผู้ใช้',
            rule: 'editor'
          }
        },
        //===============================================================
        // End user
        //===============================================================
        //===============================================================
        // participate
        //===============================================================
        {
          path: '/participate_registered',
          name: 'participate_registered',
          component: () => import('./views/Participate/ParticipateRegistered.vue'),
          meta: {
            middleware: [auth],
            breadcrumb: [
              { title: 'หน้าแรก', url: '/' },
              { title: 'รายการสมัครวิ่ง' },
              { title: 'รอการชำระเงิน', active: true }
            ],
            pageTitle: 'รอการชำระเงิน',
            rule: 'editor'
          }
        },
        {
          path: '/participate_pending',
          name: 'participate_pending',
          component: () => import('./views/Participate/ParticipatePending.vue'),
          meta: {
            middleware: [auth],
            breadcrumb: [
              { title: 'หน้าแรก', url: '/' },
              { title: 'รายการสมัครวิ่ง' },
              { title: 'รอการยืนยัน', active: true }
            ],
            pageTitle: 'รอการยืนยัน',
            rule: 'editor'
          }
        },
        {
          path: '/participate_list',
          name: 'participate_list',
          component: () => import('./views/Participate/ParticipateList.vue'),
          meta: {
            middleware: [auth],
            breadcrumb: [
              { title: 'หน้าแรก', url: '/' },
              { title: 'รายการสมัครวิ่ง' },
              { title: 'สมัครวิ่งสำเร็จ', active: true }
            ],
            pageTitle: 'สมัครวิ่งสำเร็จ',
            rule: 'editor'
          }
        }
        //===============================================================
        // End participate
        //===============================================================
      ],
      meta: {
        middleware: [auth]
      }
    },
    {
      path: '*',
      component: () => import('./views/Error/404.vue')
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (!to.meta.middleware) {
    return next()
  }
  const middleware = to.meta.middleware

  const context = {
    to,
    from,
    next,
    store
  }
  return middleware[0]({
    ...context
  })
})

router.afterEach(() => {
  // Remove initial loading
  const appLoading = document.getElementById('loading-bg')
  if (appLoading) {
    appLoading.style.display = 'none'
  }
})

export default router
