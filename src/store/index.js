import Vue from 'vue'
import Vuex from 'vuex'
import stage from './stage'
import courseplan from './courseplan'
import user from './user'

Vue.use(Vuex)

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation
 */

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      stage,
      courseplan,
      user
    }
  })
  return Store
}
