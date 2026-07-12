import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/pages/HomePage.vue')
  },
  {
    path: '/map',
    name: 'map',
    component: () => import('@/pages/MapPage.vue')
  },
  {
    path: '/driver-list',
    name: 'driverlist',
    component: () => import('@/pages/DriverListPage.vue')
  },
  {
    path: '/services',
    name: 'services',
    component: () => import('@/pages/ServicesPage.vue')
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('@/pages/AboutPage.vue')
  },
  {
    path: '/contact',
    name: 'contact',
    component: () => import('@/pages/ContactPage.vue')
  },
  {
    path: '/faq',
    name: 'faq',
    component: () => import('@/pages/faq/Index.vue')
  },
  {
    path: '/users',
    name: 'users',
    component: () => import('@/pages/users/Index.vue')
  },
  {
    path: '/profile',
    name: 'profile',
    component: () => import('@/pages/profile/Index.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  }
})

export default router
