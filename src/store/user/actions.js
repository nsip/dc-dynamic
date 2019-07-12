/*
export function someAction (context) {
}
*/
// import router from '../../router'

// register & login
export function login ({commit}, user) {
  // let user = state.user
  // if (!Array.isArray(user)) user = []
  if (user) commit('UPDATE_USER', user)
  // if (user) {
  //   const name = username
  //   const email = useremail
  //   const password = userpassword
  //   if (userid === undefined) {
  //     const lastUser = user[user.length + 1]
  //     if (lastUser) {
  //       userid = parseInt(lastUser.userid) + 1
  //     } else {
  //       userid = user.length + 1
  //     }
  //     user.push({
  //       userid,
  //       name,
  //       email,
  //       password
  //     })
  //   }
  //   console.log(user)
  // }
  commit('UPDATE_USER', user)
  // update user login status
  commit('UPDATE_AUTH', true)
  this.$router.push('/dashboard/' + user.name)
}
// logout
export function logout ({commit}) {
  commit('UPDATE_AUTH', false)
  this.$router.push({name: 'home', params: { logout: true }})
}

// create lesson plan
export function post ({commit, state}, {submitLessons, area, course, subject, stage, description, userid, lessonId}) {
  let lessons = state.lessons
  // console.log(submitLessons)
  if (!Array.isArray(lessons)) lessons = []
  if (lessons) {
    const lesson = submitLessons
    const thearea = area
    const thecourse = course
    const thesubject = subject
    const thestage = stage
    const thedescription = description
    const userId = userid
    console.log(lessons.length)
    if (lessonId === undefined) {
      const lastLesson = lessons[lessons.length + 1]
      if (lastLesson) {
        lessonId = parseInt(lastLesson.lessonId) + 1
      } else {
        lessonId = lessons.length + 1
      }
      lessons.push({
        lesson,
        userId,
        lessonId,
        thearea,
        thecourse,
        thesubject,
        thestage,
        thedescription
      })
    // Edit exist lesson plan
    } else {
      for (let i of lessons) {
        if (parseInt(i.lessonId) === parseInt(lessonId)) {
          i.userId = userId
          i.lesson = lesson
          i.thearea = area
          i.thecourse = course
          i.thesubject = subject
          i.thestage = stage
          i.thedescription = description
          break
        }
      }
    }
    commit('UPDATE_LESSONS', lessons)
    // console.log(lessons)
    this.$router.push({ name: 'dashboard', params: {username: userId} })
  }
}
// deletelessonplan
export function deleteLesson ({commit, state}, payload) {
  commit('DELETE_LESSONS', payload)
  // console.log(payload)
  // console.log(state.lessons)
  let lessons = state.lessons
  commit('UPDATE_LESSONS', lessons)
  // context.commit('UPDATE_LESSONS', payload)
}
// schedule lessson
export function postschedule ({commit, state}, {submmitschdule, lessonId, color, course, userid, schduleId}) {
  let lessonschdule = state.lessonschdule
  // console.log(lessonschdule)
  // console.log(lessonId)
  if (!Array.isArray(lessonschdule)) lessonschdule = []
  if (lessonschdule) {
    const lessontimesheet = submmitschdule
    const thelessonId = lessonId
    const thecolor = color
    const thecourse = course
    const userId = userid
    // schduleId = lessonschdule.length + 1
    if (schduleId === undefined) {
      const lastlessonschdule = lessonschdule[lessonschdule.length + 1]
      if (lastlessonschdule) {
        schduleId = parseInt(lastlessonschdule.schduleId) + 1
      } else {
        schduleId = lessonschdule.length + 1
      }
      // console.log(lessontimesheet)
      // console.log(schduleId)
      lessonschdule.push({
        schduleId,
        userId,
        thelessonId,
        thecolor,
        thecourse,
        lessontimesheet
      })
    } else {
      for (let i of lessonschdule) {
        if (parseInt(i.schduleId) === parseInt(schduleId)) {
          i.lessontimesheet = lessontimesheet
          break
        }
      }
    }
    commit('UPDATE_LESSON_SCHDULE', lessonschdule)
    console.log(lessonschdule)
    this.$router.push({ name: 'dashboard' })
  }
}
// delete schedule
export function deleteschdule ({commit, state}, payload) {
  console.log(payload)
  commit('DELETE_LESSONS_SECHDULE', payload)
  let lessonschdule = state.lessonschdule
  console.log(lessonschdule)
  commit('UPDATE_LESSON_SCHDULE', lessonschdule)
  this.$router.push({ name: 'dashboard' })
}
