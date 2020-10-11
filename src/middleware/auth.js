export default async function auth ({ next, store }) {
  if (!localStorage.getItem('accessToken')) {
    window.location.replace('/Login')
  }
  store.commit('auth/SET_BEARER', localStorage.accessToken)
  store.commit('UPDATE_USER_INFO', JSON.parse(localStorage.userInfo))
  //check token
  /*await axios.get('/auth/profile')
    .then((response) => {
      const payload = {
        lv : response.data.admin_level,
        name : response.data.admin_name,
        uid : response.data.admin_id
      }
      store.commit('UPDATE_USER_INFO', payload)
    })
    .catch((err) => {
      console.log(err)
      localStorage.removeItem('userInfo')
      localStorage.removeItem('accessToken')
      window.location.replace('/Login')
    })*/
  //set init

  return next()
}
