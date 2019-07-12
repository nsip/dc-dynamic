/*
export function someGetter (state) {
}
*/
// export function getContent (state) {
//   return state.lessons
// }
// export function getTitle (state) {
//   return state.lessons.title
// }
// export function getLesson (state) {
//   return state.lesson
// }
export function lessonSet (state) {
  return state.lessonList.map(lessonId => state.lessons[lessonId])
}

// const getters = {
//   services ({ services, servicesList }) {
//     return map(servicesList, id => service[keyForService(id)])
//   }
// }
