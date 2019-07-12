import ls from '../../utils/localStorage'

// export default {
//   //
//   lessons: [
//     {
//       id: 1,
//       content: 'Content ABC',
//       title: 'Titile 1'
//     },
//     {
//       id: 2,
//       content: 'Content DEF',
//       title: 'Titile 2'
//     }
//   ]
// }
export default {
  savedLessons: ls.getItem('savedLessons')
}
