/*
export function someMutation (state) {
}
*/
export function updateCourseArea (state, course) {
  state.lessons.learning_area = course
}
export function updateCoursestage (state, stage) {
  state.lessons.stage = stage
}
export function updateCourseName (state, coursename) {
  state.lessons.coursename = coursename
}
export function updateCourseSbject (state, subject) {
  state.lessons.subject = subject
}
export function addLesson (state, newlesson) {
  state.lessons.push(newlesson)
  // console.log(lesson)
}
export function updateLesson (state, input) {
  state.lessons[2].content = input
}
export function updateTitle (state, input) {
  state.lessons[2].title = input
}
export function setActive (state) {
  state.lessons.isActive = false
}
// export function getLesson (state, lessonId) {
//   return state.lessons[lessonId].content
// }
// export function REMOVE_LESSON (state, lesson) {
//   state.lessons.$remove(lesson)
// }
