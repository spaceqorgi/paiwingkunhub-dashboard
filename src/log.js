import axios from '../src/axios'


export default {
  agent (username, type, amount, info) {
    return axios.post('/log/agent', {
      username,
      type,
      amount,
      info
    })
  }
}
