/*=========================================================================================
  File Name: state.js
  Description: Vuex Store - state

==========================================================================================*/

import { themeConfig, colors } from '@/../themeConfig.js'
// /////////////////////////////////////////////
// Helper
// /////////////////////////////////////////////

// *From Auth - Data will be received from auth provider
const userDefaults = {
  uid: 0, // From Auth
  name: '', // From Auth
  lv: 0,
  photoURL: require('@/assets/images/portrait/small/profile.png') // From Auth
}

// Check if device is touch device
// This is used to remove perfect scrollbar from touch devices
// Using Dynamic components
const is_touch_device = () => {
  const prefixes = ' -webkit- -moz- -o- -ms- '.split(' ')
  const mq = function (query) {
    return window.matchMedia(query).matches
  }

  if ('ontouchstart' in window || window.DocumentTouch) {
    return true
  }

  // include the 'heartz' as a way to have a non matching MQ to help terminate the join
  // https://git.io/vznFH
  const query = ['(', prefixes.join('touch-enabled),('), 'heartz', ')'].join('')
  return mq(query)
}

// status use bank
const status_bank = {
  status: false
}

// status use truewallet
const status_truewallet = {
  status: false
}

// status withdraw
const status_withdraw = {
  status: false
}

// status setting popup
const status_popup = {
  status: false
}

// /////////////////////////////////////////////
// State
// /////////////////////////////////////////////

const state = {
  StatusPopup: status_popup,
  StatusWithdraw: status_withdraw,
  StatusTruewallet: status_truewallet,
  StatusBank: status_bank,
  AppActiveUser: userDefaults,
  bodyOverlay: false,
  isVerticalNavMenuActive: true,
  is_touch_device: is_touch_device(),
  mainLayoutType: themeConfig.mainLayoutType || 'vertical',
  reduceButton: themeConfig.sidebarCollapsed,
  verticalNavMenuWidth: 'default',
  verticalNavMenuItemsMin: false,
  scrollY: 0,
  theme: themeConfig.theme || 'light',
  themePrimaryColor: colors.primary,

  // Can be used to get current window with
  // Note: Above breakpoint state is for internal use of sidebar & navbar component
  windowWidth: null
}

export default state
