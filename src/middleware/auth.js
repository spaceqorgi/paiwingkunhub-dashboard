import axios from '../axios'

export default async function auth({ next, store }) {
  if (!localStorage.getItem('accessToken')) {
    window.location.replace('/Login')
  }
  store.commit('auth/SET_BEARER', localStorage.accessToken)
  store.commit('UPDATE_USER_INFO', JSON.parse(localStorage.userInfo))
  //check token
  await axios
    .post('/auth/validate', {
      username: JSON.parse(localStorage.userInfo).username
    })
    .then(response => {
      store.commit('UPDATE_USER_INFO', response.data.data)
    })
    .catch(err => {
      console.log(err)
      localStorage.removeItem('userInfo')
      localStorage.removeItem('accessToken')
      window.location.replace('/Login')
    })

  return next()
}
