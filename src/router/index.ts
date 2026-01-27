import { createRouter, createWebHistory } from 'vue-router'
import DemoPage from '../pages/Demo.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/demo',
      name: 'demo',
      component: DemoPage,
    },
  ],
})

export default router
