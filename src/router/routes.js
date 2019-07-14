
const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('components/CourseSummary.vue')
  },
  { path: '/test/:value', name: 'test', component: () => import('components/test.vue'), props: true },
  { path: '/test/student/:studentname', name: 'student', component: () => import('components/student.vue'), props: true },
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
