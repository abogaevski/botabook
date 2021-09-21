import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    redirect: '/calendar',
    component: () => import('@/layout/Layout.vue'),
    children: [
      {
        path: '/calendar',
        name: 'calendar',
        component: () => import('@/views/calendar/Calendar.vue')
      },
      {
        path: '/dashboard',
        name: 'dashboard',
        component: () => import('@/views/Dashboard.vue')
      },
      {
        path: '/profile',
        name: 'profile',
        component: () => import('@/views/profile/Profile.vue'),
        children: [
          {
            path: 'overview',
            name: 'profile-overview',
            component: () => import('@/views/profile/ProfileOverview.vue')
          },
          {
            path: 'settings',
            name: 'profile-settings',
            component: () => import('@/views/profile/ProfileSettings.vue')
          },
        ]
      },
      {
        path: '/projects/list',
        name: 'projects',
        component: () => import('@/views/project/ProjectList')
      },
      {
        path: '/customer/list',
        name: 'customers-table',
        component: () => import('@/views/customer/CustomerListTable.vue')
      }
    ]
  },
  {
    path: '/signin',
    name: 'signin',
    component: () => import('@/views/auth/SignIn.vue')
  },
  {
    path: '/signup',
    name: 'signup',
    component: () => import('@/views/auth/SignUp.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  const publicPages = ['/signin', '/signup']
  const authRequired = !publicPages.includes(to.path)
  const loggedIn = localStorage.getItem('token')

  if (authRequired && !loggedIn) {
    next('/signin')
  } else {
    next()
  }
})

export default router
