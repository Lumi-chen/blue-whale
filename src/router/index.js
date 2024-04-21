import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/blue-whale',
    component: () => import('@/views/dash-borad/index.vue'),
    name: 'DashBoard'
  },
  {
    path: '/calendar',
    component: () => import('@/views/calendar/index.vue'),
    name: 'Calendar'
  }
  // { path: '/about', component: 'About', name: 'About' },
]

const router = createRouter({
  history: createWebHistory(),
  routes: [{
    path: '/',
    redirect: '/blue-whale'
  }, ...routes]

})

export default router
export { routes }

