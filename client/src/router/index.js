import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/app',
    name: 'app',
    redirect: { name: 'calendar' },
    component: () => import('@/layout/Layout.vue'),
    meta: { requiresAuth: true },
    children: [
      {
        path: '/calendar',
        name: 'calendar',
        component: () => import('@/views/calendar/Calendar.vue')
      },
      {
        path: '/dashboard',
        name: 'dashboard',
        component: () => import('@/views/dashboard/Dashboard.vue')
      },
      {
        path: '/profile',
        name: 'profile',
        redirect: '/profile/settings',
        component: () => import('@/views/profile/Profile.vue'),
        children: [
          // {
          //   path: 'overview',
          //   name: 'profile-overview',
          //   component: () => import('@/views/profile/ProfileOverview.vue')
          // },
          {
            path: 'settings',
            name: 'profile-settings',
            component: () => import('@/views/profile/ProfileSettings.vue')
          }
        ]
      },
      {
        path: '/projects',
        name: 'projects',
        component: () => import('@/views/project/ProjectList')
      },
      {
        path: '/project/create',
        name: 'project-create',
        component: () => import('@/views/project/ProjectCreate')
      },
      {
        path: '/project/:id/',
        name: 'project-detail',
        redirect: { name: 'project-overview' },
        component: () => import('@/views/project/ProjectDetail'),
        children: [
          {
            path: 'overview',
            name: 'project-overview',
            component: () => import('@/components/project/details/ProjectDetailsOverview')
          },
          {
            path: 'settings',
            name: 'project-settings',
            component: () => import('@/components/project/ProjectSettings')
          }
        ]
      },
      {
        path: '/customers',
        name: 'customers',
        component: () => import('@/views/customer/CustomerList.vue')
      },
      {
        path: '/admin/counter',
        name: 'admin-counter',
        meta: { superuserOnly: true },
        component: () => import('@/views/admin/AdminCounter.vue')
      },
    ]
  },
  {
    path: '/auth',
    component: () => import('@/layout/AuthLayout'),
    redirect: { name: 'signin' },
    children: [
      {
        path: 'signin',
        name: 'signin',
        component: () => import('@/views/auth/SignIn.vue')
      },
      {
        path: 'signup',
        name: 'signup',
        component: () => import('@/views/auth/SignUp.vue')
      },
      {
        path: 'reset-password',
        name: 'reset-password',
        component: () => import('@/views/auth/reset-password/ResetPasswordRequest.vue')
      },
      {
        path: 'reset-password/:uid64/:token',
        name: 'reset-password-confirm',
        component: () => import('@/views/auth/reset-password/ResetPasswordConfirm.vue')
      },
      {
        path: 'verify-email/:token',
        name: 'verify-email',
        component: () => import('@/views/auth/VerifyEmail.vue')
      },
    ]
  },
  {
    path: '/',
    name: 'landing-page',
    component: () => import('@/views/landing/Landing.vue')
  },
  {
    path: '/:slug',
    name: 'public-profile',
    component: () => import('@/views/public/PublicPage.vue')
  },
  {
    path: '/404',
    name: '404',
    component: () => import('@/views/error/Error404.vue')
  },
  {
    path: '/500',
    name: '500',
    component: () => import('@/views/error/Error500.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/404'
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.superuserOnly)) {
    const user = JSON.parse(localStorage.getItem('token'))
    if (!Object.keys(user, 'isSuperuser')) {
      next({ name: '404' })
    } else {
      next()
    }
  } else if (to.matched.some((record) => record.meta.requiresAuth)) {
    const loggedIn = localStorage.getItem('token')
    if (!loggedIn) {
      next({ name: 'signin' })
    } else {
      next()
    }
  } else { next() }
  setTimeout(() => {
    window.scrollTo(0, 0);
  }, 0);
})

export default router
