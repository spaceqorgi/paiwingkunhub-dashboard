/*=========================================================================================
  File Name: moduleAuthMutations.js
  Description: Auth Module Mutations

==========================================================================================*/

import axios from '../../axios.js'

export default {
  SET_BEARER (state, accessToken) {
    axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`
  }
}
