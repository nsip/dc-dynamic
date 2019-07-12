/*
export function someGetter (state) {
}
*/
export function getLessonById (state, id) {
  let lessons = state.lessons
  if (Array.isArray(lessons)) {
    lessons = lessons.filter(lesson => parseInt(id) === parseInt(lesson.lessonId))
    return lessons.length ? lessons[0] : null
  } else {
    return null
  }
}
export function getSelectresult (state) {
  return state.Selectresult
}
