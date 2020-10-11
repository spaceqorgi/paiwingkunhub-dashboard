/*=========================================================================================
  File Name: moduleAuthActions.js
  Description: Auth Module Actions
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/

import axios from '../../axios'
import router from '@/router'
export default {
  login ({ commit }, data) {
    return new Promise((resolve, reject) => {
      axios
        .post('/auth/login', {
          username: data.username,
          password: data.password
        })
        .then(response => {
          if (response.data.token) {
            // Set accessToken
            localStorage.accessToken = response.data.token
            // Update user d  etails
            //commit('UPDATE_USER_INFO', response.data.payload)
            commit('UPDATE_USER_INFO', response.data.payload, {
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
              message: 'ยูสเซอร์ถูกล็อค กรุณาติดต่อหัวหน้าทีม'
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
