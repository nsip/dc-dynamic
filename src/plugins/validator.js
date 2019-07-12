// import something here
import validator from '../directives/validator'
// leave the export, even if you don't use it
export default ({ Vue }) => {
  Vue.directive('validator', validator)
}
