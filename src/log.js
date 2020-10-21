import axios from '../src/axios'

export default {
  admin(username, type, info) {
    return axios.post('/log/admin', {
      username,
      type,
      info
    })
  }
}
