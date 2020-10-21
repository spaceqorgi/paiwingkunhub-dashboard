/*=========================================================================================
  File Name: moduleAuthActions.js
  Description: Auth Module Actions
==========================================================================================*/

import axios from '../../axios'
import router from '@/router'

export default {
  login ({commit}, data) {
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
            commit('UPDATE_USER_INFO', response.data.data, {
              root: true
            })
            // Set bearer token in axios
            commit('SET_BEARER', response.data.token)
            router.push('/')
            resolve(response)
          } else {
            reject({
              message: 'ไม่สามารถเข้าสู่ระบบได้'
            })
          }
        })
        .catch(function (error) {
          if (!error.response) {
            reject({
              err: error,
              message: 'ไม่สามารถเชื่อมต่อระบบได้ในขณะนี้'
            })
          }

          if (error.response.status === 401) {
            reject({
              err: error,
              message: 'อีเมลหรือรหัสผ่าน ไม่ถูกต้อง'
            })
          } else if (error.response.status === 403) {
            reject({
              err: error,
              message: 'รหัสผู้ใช้ถูกล็อก โปรดติดต่อแอดมิน'
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
