/*=========================================================================================
  File Name: moduleAuthActions.js
  Description: Auth Module Actions
==========================================================================================*/

import axios from '../../axios'
import router from '@/router'
export default {
  login ({ commit }, data) {
    return new Promise((resolve, reject) => {
      axios
        .post('/auth/login', {
          username: data.username,
          password: data.password,
          admin: true
        })
        .then(response => {
          if (response.data.token) {
            // Set accessToken
            localStorage.accessToken = response.data.token
            // Update user d  etails
            //commit('UPDATE_USER_INFO', response.data.payload)
            commit('UPDATE_USER_INFO', response.data.data, {
              root: true
            })
            // Set bearer token in axios
            commit('SET_BEARER', response.data.token)
            router.push('/')
            resolve(response)
          } else {
            reject({
              message: 'ข้อมูลไม่ถูกต้อง'
            })
          }
        })
        .catch(function (error) {
          if (error.response.status === 401) {
            reject({
              err: error,
              message: 'ข้อมูลไม่ถูกต้อง'
            })
          } else if (error.response.status === 403) {
            reject({
              err: error,
              message: 'ผู้ใช้ถูกล็อค กรุณาติดต่อแอดมิน'
            })
          }
        })
    })
  } /*,
  logout({
    commit,
    state
  }){

  }*/
}
