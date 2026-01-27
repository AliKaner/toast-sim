import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/demo',
      name: 'demo',
      component: () => import('../pages/demo/DemoPage.vue'),
    },
  ],
})

export default router
