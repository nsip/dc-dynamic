
const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('components/CourseSummary.vue')
    // children: [
    //   { path: '', name: 'Home', component: () => import('layouts/Index.vue') },
    // ]
  },
  { path: '/test/:value', name: 'test', component: () => import('components/test.vue'), props: true },
  // Undefine router
  {
    path: '*',
    redirect: '/'
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
