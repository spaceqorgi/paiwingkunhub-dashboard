/*=========================================================================================
  File Name: main.js
  Description: main vue(js) file

==========================================================================================*/

import Vue from 'vue'
import App from './App.vue'

// Vuesax Component Framework
import Vuesax from 'vuesax'
import 'material-icons/iconfont/material-icons.css' //Material Icons
import 'vuesax/dist/vuesax.css' // Vuesax
//moment
import moment from 'moment-timezone'
// axios
import axios from './axios.js'
// Filters
import './filters/filters.js'

// Theme Configurations
import '../themeConfig.js'

// Globally Registered Components
import './globalComponents.js'

// Styles: SCSS
import './assets/scss/main.scss'

// Tailwind
import '@/assets/css/main.css'

// Vue Router
import router from './router'

// Vuex Store
import store from './store/store'

// Vuejs - Vue wrapper for hammerjs
import { VueHammer } from 'vue2-hammer'
// PrismJS
import 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'
// VeeValidate
import VeeValidate from 'vee-validate'

Vue.use(Vuesax)

moment.tz.setDefault('Asia/Bangkok')
Vue.prototype.moment = moment

Vue.prototype.$http = axios

Vue.use(VueHammer)

// Feather font icon
require('./assets/css/iconfont.css')

Vue.use(VeeValidate)

// Vue select css
// Note: In latest version you have to add it separately
// import 'vue-select/dist/vue-select.css';

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
