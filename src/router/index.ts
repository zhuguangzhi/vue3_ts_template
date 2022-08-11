import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
// 静态路由
export const constantRoutes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/Home',
    children: [
      {
        path: '/Home',
        name: 'Home',
        component: () => import(/* webpackChunkName: "Home" */ '@/views/Home/index.vue'),
      }
    ]
  },
]

const router = createRouter({
  history: createWebHashHistory(), // hash模式：createWebHashHistory，history模式：createWebHistory
  scrollBehavior: () => ({
    top: 0
  }),
  routes: constantRoutes
})
// @ts-ignore
router.beforeEach((to, from, next) => {
  next()
  // if (sessionStorage.getItem('auth')) {
  //   next()
  // } else if (to.path === '/login') {
  //   console.log('/login')
  //   next()
  // } else {
  //   next({
  //     path: '/login',
  //     query: { redirect: to.fullPath }
  //   })
  // }
})

export default router
