// axios
import axios from 'axios'
import store from '../src/store/store'

const baseURL = 'https://api-pwg.corgi.engineer'

const instance = axios.create({ baseURL })
instance.interceptors.response.use(
  function (response) {
    return response
  },
  function (error) {
    if (error.response.status === 401 && store.state.AppActiveUser.name.length !== 0) {
      localStorage.removeItem('userInfo')
      localStorage.removeItem('accessToken')
      window.location.replace('/Login')
    }
    return Promise.reject(error)
  }
)

export default instance
