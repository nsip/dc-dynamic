// import something here
import {neon} from 'vue-canvas-effect'
// leave the export, even if you don't use it
export default ({ app, router, Vue }) => {
  // something to do
  Vue.component(neon.name, neon)
}
