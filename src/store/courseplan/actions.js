/*
export function someAction (context) {
}
*/
// export const removeLesson = function ({ dispatch }, lesson) {
//   dispatch('REMOVE_LESSON')
// }
// export function removeLesson (lesson) {
//   lesson.commit('REMOVE_LESSON')
// }
export function loadlesson (context, lessons) {
  context.commit('MUTATE_LESSON', lessons)
}
