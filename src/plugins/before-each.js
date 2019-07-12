// import something here

// leave the export, even if you don't use it
export default ({ app, router, Vue }) => {
  // something to do
  router.beforeEach((to, from, next) => {
    const auth = router.app.$options.store.state.user.auth
    if (auth && to.path.indexOf('/auth/') !== -1) {
      next('/')
    } else {
      next()
    }
  })
}
