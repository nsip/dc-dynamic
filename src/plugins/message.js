// import something here
import Message from '../components/Message.vue'
// leave the export, even if you don't use it
export default ({ Vue }) => {
  // something to do
  Vue.component('Message', Message)
}
