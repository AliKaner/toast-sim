import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../pages/Home.vue'
import DemoPage from '../pages/Demo.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage,
    },
    {
      path: '/demo',
      name: 'demo',
      component: DemoPage,
    },
  ],
})

export default router
