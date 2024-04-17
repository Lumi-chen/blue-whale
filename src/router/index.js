import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/over-view',
    component: () => import('@/views/over-view/index.vue'),
    name: 'OverView'
  }
  // { path: '/about', component: 'About', name: 'About' },
]

const router = createRouter({
  history: createWebHistory(),
  routes: [{
    path: '/',
    redirect: '/blue-whale'
  },{
    path: '/blue-whale',
    component: () => import('@/views/home/index.vue'),
    name: 'Home'
  }, ...routes]

})

export default router
export { routes }

