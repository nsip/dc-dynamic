// import something here

// leave the export, even if you don't use it
export default ({ router, store, Vue }) => {
  router.beforeEach((to, from, next) => {
    // Now you need to add your authentication logic here, like calling an API endpoint
    const auth = router.app.$options.store.state.user.auth
    if ((auth && to.path.indexOf('/auth/') !== -1) || (!auth && to.meta.auth)
    ) {
      next('/auth/login')
    } else {
      next()
    }
  })
}
