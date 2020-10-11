/*=========================================================================================
  File Name: router.js
  Description: Routes for vue-router. Lazy loading is enabled.
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/

import Vue from 'vue'
import Router from 'vue-router'
import auth from './middleware/auth'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior() {
    return {
      x: 0,
      y: 0
    }
  },
  routes: [
    {
      path: '/Login',
      name: 'login',
      component: () => import('./views/Login.vue')
    },
    {
      // =============================================================================
      // MAIN LAYOUT ROUTES
      // =============================================================================
      path: '',
      component: () => import('./layouts/main/Main.vue'),
      children: [
        // ==========================================================================
        // Theme Routes
        // ==========================================================================
        {
          path: '/',
          name: 'dashbord',
          component: () => import('./views/Dashboard/Dashboard.vue'),
          meta: {
            middleware: [auth]
          }
        },
        {
          path: '/Month',
          name: 'month',
          component: () => import('./views/Dashboard/Month.vue'),
          meta: {
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Dashboard' },
              { title: 'Month ', active: true }
            ],
            pageTitle: 'Month',
            rule: 'editor',
            middleware: [auth]
          }
        },
        //===============================================================
        // member
        //===============================================================
        {
          path: '/member',
          name: 'member',
          component: () => import('./views/Member/Member.vue'),
          meta: {
            middleware: [auth],
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Member', active: true }
            ],
            pageTitle: 'Member',
            rule: 'editor'
          }
        },
        {
          path: 'member/:username',
          name: 'listmember',
          component: () => import('./views/Member/UserInfo.vue'),
          meta: {
            middleware: [auth],
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Member', url: '/member' },
              { title: 'Member List', active: true }
            ],
            pageTitle: 'Member List',
            rule: 'editor'
          }
        },
        {
          path: '/membersearch',
          name: 'member',
          component: () => import('./views/Member/MemberSearch.vue'),
          meta: {
            middleware: [auth],
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'membersearch', active: true }
            ],
            pageTitle: 'membersearch',
            rule: 'editor'
          }
        },
        //===============================================================
        // End member
        //===============================================================
        {
          path: '/agent',
          name: 'agent',
          component: () => import('./views/Agent/Agent.vue'),
          meta: {
            middleware: [auth],
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Agent', active: true }
            ],
            pageTitle: 'Agent',
            rule: 'editor'
          }
        },
        {
          path: '/agentminus',
          name: 'agentminus',
          component: () => import('./views/Agentminus.vue'),
          meta: {
            middleware: [auth],
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Agentminus', active: true }
            ],
            pageTitle: 'Agentminus',
            rule: 'editor'
          }
        },
        {
          path: '/Topup',
          name: 'topup',
          component: () => import('./views/Topup/Topup.vue'),
          meta: {
            middleware: [auth],
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Topup List', active: true }
            ],
            pageTitle: 'Topup List',
            rule: 'editor'
          }
        },
        {
          path: '/creditfreelist',
          name: 'creditfreelist',
          component: () => import('./views/Creditfree/Creditfreelist.vue'),
          meta: {
            middleware: [auth],
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Creditfree Wait', active: true }
            ],
            pageTitle: 'Creditfree Wait',
            rule: 'editor'
          }
        },
        {
          path: '/creditfreeinfo',
          name: 'creditfreeinfo',
          component: () => import('./views/Creditfree/Creditfreeinfo.vue'),
          meta: {
            middleware: [auth],
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Creditfree info', active: true }
            ],
            pageTitle: 'Creditfree info',
            rule: 'editor'
          }
        },
        {
          path: '/creditfreewait',
          name: 'creditfreewait',
          component: () => import('./views/Creditfree/Creditfreewait.vue'),
          meta: {
            middleware: [auth],
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Creditfree List', active: true }
            ],
            pageTitle: 'Creditfree List',
            rule: 'editor'
          }
        },
        //===============================================================
        // withdrow
        //===============================================================
        {
          path: '/Withdraw',
          name: 'withdraw',
          component: () => import('./views/Withdraw/Withdraw.vue'),
          meta: {
            middleware: [auth],
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Withdraw' },
              { title: 'Withdraw', active: true }
            ],
            pageTitle: 'Withdraw',
            rule: 'editor'
          }
        },
        {
          path: '/withdrawwait/:id',
          name: 'withdrawwait',
          component: () => import('./views/Withdraw/WithdrawWait.vue'),
          meta: {
            middleware: [auth],
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Withdraw' },
              { title: 'Withdraw Wait', active: true }
            ],
            pageTitle: 'Withdraw Wait',
            rule: 'editor'
          }
        },
        {
          path: '/WithdrawList',
          name: 'withdrawelist',
          component: () => import('./views/Withdraw/WithdrawList.vue'),
          meta: {
            middleware: [auth],
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Withdraw' },
              { title: 'Withdraw List', active: true }
            ],
            pageTitle: 'Withdraw List',
            rule: 'editor'
          }
        },
        //===============================================================
        // End withdrow
        //===============================================================
        //===============================================================
        // Deposit
        //===============================================================
        ///// Truewallet List ///////////////////////////////////////////
        {
          path: '/Wallet',
          name: 'wallet',
          component: () => import('./views/Wallet/Wallet.vue'),
          meta: {
            middleware: [auth],
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Deposit' },
              { title: 'Truewallet ', active: true }
            ],
            pageTitle: 'Truewallet',
            rule: 'editor'
          }
        },
        {
          path: 'Wallet/List/:id',
          name: 'list',
          component: () => import('./views/Wallet/List.vue'),
          meta: {
            middleware: [auth],
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Deposit' },
              { title: 'Truewallet', url: '/Wallet' },
              { title: 'Truewallet List', active: true }
            ],
            pageTitle: 'Truewallet List',
            rule: 'editor'
          }
        },
        {
          path: 'Wallet/ListSms/:id',
          name: 'listsms',
          component: () => import('./views/Wallet/ListSms.vue'),
          meta: {
            middleware: [auth],
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Deposit' },
              { title: 'Truewallet', url: '/Wallet' },
              { title: 'Truewallet SMS', active: true }
            ],
            pageTitle: 'Truewallet SMS',
            rule: 'editor'
          }
        },
        ///// End Truewallet List //////////////////////////////////////
        ///// Bank List ////////////////////////////////////////////////
        {
          path: '/Bank',
          name: 'bank',
          component: () => import('./views/Bank/Bank.vue'),
          meta: {
            middleware: [auth],
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Deposit' },
              { title: 'Bank ', active: true }
            ],
            pageTitle: 'Bank',
            rule: 'editor'
          }
        },
        {
          path: 'Bank/banklist/:bank/:id/:bankfor/',
          name: 'list',
          component: () => import('./views/Bank/banklist.vue'),
          meta: {
            middleware: [auth],
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Bank', url: '/Bank' },
              { title: 'Bank List', active: true }
            ],
            pageTitle: 'Bank List',
            rule: 'editor'
          }
        },
        {
          path: 'Bank/banklistout/:bank/:id/:bankfor/',
          name: 'list',
          component: () => import('./views/Bank/banklistout.vue'),
          meta: {
            middleware: [auth],
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Bank', url: '/Bank' },
              { title: 'Bank List', active: true }
            ],
            pageTitle: 'Bank List',
            rule: 'editor'
          }
        },
        ///// End Bank List ///////////////////////////////////////////
        //===============================================================
        // End Deposit
        //===============================================================
        //===============================================================
        // Setting
        //===============================================================
        {
          path: '/settingsystem',
          name: 'settingsystem',
          component: () => import('./views/Setting/SettingSystem.vue'),
          meta: {
            middleware: [auth],
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Setting' },
              { title: 'System Settings', active: true }
            ],
            pageTitle: 'System Settings',
            rule: 'editor'
          }
        },
        {
          path: '/settingwithdraw',
          name: 'settingwithdraw',
          component: () => import('./views/Setting/SettingWithdraw.vue'),
          meta: {
            middleware: [auth],
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Setting' },
              { title: 'Withdraw Settings', active: true }
            ],
            pageTitle: 'Withdraw Settings',
            rule: 'editor'
          }
        },
        {
          path: 'SettingPopup',
          name: 'settingpopup',
          component: () =>
            import('../src/views/Setting/SettingPopup/index.vue'),
          meta: {
            middleware: [auth],
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Setting' },
              { title: 'Popup Setting', active: true }
            ],
            pageTitle: 'Popup Setting',
            rule: 'editor'
          }
        },
        {
          path: 'settingStaff',
          name: 'settingstaff',
          component: () => import('./views/SettingStaff/SettingStaff.vue'),
          meta: {
            middleware: [auth],
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Setting' },
              { title: 'Staff Setting', active: true }
            ],
            pageTitle: 'Staff Setting',
            rule: 'editor'
          }
        },
        {
          path: 'SettingStaff/Edit/:id',
          name: 'settingstaffedit',
          component: () => import('./views/SettingStaff/SettingStaffEdit.vue'),
          meta: {
            middleware: [auth],
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Setting' },
              { title: 'Staff Setting Edit', active: true }
            ],
            pageTitle: 'Staff Setting Edit',
            rule: 'editor'
          }
        },
        ///////// Setting Wallet ///////////
        {
          path: '/SettingWalletDeposit',
          name: 'settingwwalletdeposit',
          component: () =>
            import(
              './views/Setting/SettingWallet/WalletDeposit/SettingWalletDeposit.vue'
            ),
          meta: {
            middleware: [auth],
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Setting', url: '/SettingWalletDeposit' },
              { title: 'Deposit Setting', active: true }
            ],
            pageTitle: 'Deposit Setting',
            rule: 'editor'
          }
        },
        {
          path: '/SettingWalletWithdraw',
          name: 'settingwalletwithdraw',
          component: () =>
            import(
              './views/Setting/SettingWallet/WalletWithdraw/SettingWalletWithdraw.vue'
            ),
          meta: {
            middleware: [auth],
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Setting', url: '/SettingWalletDeposit' },
              { title: 'Withdraw Setting', active: true }
            ],
            pageTitle: 'Withdraw Setting',
            rule: 'editor'
          }
        },
        {
          path: '/SettingTruewallet',
          name: 'settingtruewallet',
          component: () =>
            import(
              './views/Setting/SettingWallet/WalletTruewallet/SettingWalletTruewallet.vue'
            ),
          meta: {
            middleware: [auth],
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Setting', url: '/SettingTruewallet' },
              { title: 'Truewallet Setting', active: true }
            ],
            pageTitle: 'Truewallet Setting',
            rule: 'editor'
          }
        },
        {
          path: '/SettingWalletDeposit/SettingWalletedit/:bank/:id',
          name: 'settingdepositedit',
          component: () =>
            import(
              './views/Setting/SettingWallet/WalletDeposit/SettingWalletedit.vue'
            ),
          meta: {
            middleware: [auth],
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Setting', url: '/SettingWalletDeposit' },
              { title: 'Deposit Setting', url: '/SettingWalletDeposit' },
              { title: 'Edit Deposit', active: true }
            ],
            pageTitle: 'แก้ไขข้อมูลบัญชีฝาก',
            rule: 'editor'
          }
        },
        {
          path: '/SettingWalletWithdraw/EditWithdraw/:bank/:id',
          name: 'settingwithdrawedit',
          component: () =>
            import(
              './views/Setting/SettingWallet/WalletWithdraw/EditWithdraw.vue'
            ),
          meta: {
            middleware: [auth],
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Setting', url: '/SettingWalletWithdraw' },
              { title: 'Withdraw Setting', url: '/SettingWalletWithdraw' },
              { title: 'Edit Withdraw', active: true }
            ],
            pageTitle: 'แก้ไขข้อมูลบัญชีถอน',
            rule: 'editor'
          }
        },
        {
          path: '/settingwallettruewallet/editListtruewallet/:bank/:id',
          name: 'settingwithdrawedit',
          component: () =>
            import(
              './views/Setting/SettingWallet/WalletTruewallet/EditListTruewallet.vue'
            ),
          meta: {
            middleware: [auth],
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Setting', url: '/SettingTruewallet' },
              { title: 'TrueWallet Setting', url: '/SettingTruewallet' },
              { title: 'Edit TrueWallet', active: true }
            ],
            pageTitle: 'แก้ไขข้อมูลบัญชีทรูวอลเล็ต',
            rule: 'editor'
          }
        },
        ///////// End Setting Wallet /////////
        //===============================================================
        // End Setting
        //===============================================================
        //===============================================================
        // Report
        //===============================================================
        {
          path: '/ReportBonus',
          name: 'reportbonus',
          component: () => import('./views/Report/ReportBonus.vue'),
          meta: {
            middleware: [auth],
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Report', url: '/ReportBonus' },
              { title: 'Report Bonus', active: true }
            ],
            pageTitle: 'Report รับโบนัส',
            rule: 'editor'
          }
        },
        {
          path: '/ReportAff',
          name: 'reportaff',
          component: () => import('./views/Report/ReportAff.vue'),
          meta: {
            middleware: [auth],
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Report', url: '/ReportAff' },
              { title: 'Report Aff', active: true }
            ],
            pageTitle: 'Report แนะนำเพื่อน',
            rule: 'editor'
          }
        },
        {
          path: '/ReportTurn',
          name: 'reportturn',
          component: () => import('./views/Report/ReportTurn.vue'),
          meta: {
            middleware: [auth],
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Report', url: '/ReportTurn' },
              { title: 'Report Return', active: true }
            ],
            pageTitle: 'Report คืนยอดเล่น',
            rule: 'editor'
          }
        },
        {
          path: '/ReportRegister',
          name: 'reportregister',
          component: () => import('./views/Report/ReportRegister.vue'),
          meta: {
            middleware: [auth],
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Report', url: '/ReportRegister' },
              { title: 'Report Register', active: true }
            ],
            pageTitle: 'Report สมัครสมาชิค/เติมเงิน',
            rule: 'editor'
          }
        },
        {
          path: '/ReportMinigame',
          name: 'reportminigame',
          component: () => import('./views/Report/ReportMinigame.vue'),
          meta: {
            middleware: [auth],
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Report', url: '/ReportMinigame' },
              { title: 'Report Minigame', active: true }
            ],
            pageTitle: 'Report เปิดไพ่ / กงล้อ',
            rule: 'editor'
          }
        },
        {
          path: '/ReportLog',
          name: 'reportlog',
          component: () => import('./views/Report/ReportLog.vue'),
          meta: {
            middleware: [auth],
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Report', url: '/ReportLog' },
              { title: 'Report Log', active: true }
            ],
            pageTitle: 'Report ประวัติการใช้งาน',
            rule: 'editor'
          }
        },
        {
          path: '/ReportActiveuser',
          name: 'reportactiveuser',
          component: () => import('./views/Report/ReportActiveuser.vue'),
          meta: {
            middleware: [auth],
            breadcrumb: [
              { title: 'Home', url: '/' },
              { title: 'Report', url: '/ReportActiveuser' },
              { title: 'ReportActiveuser', active: true }
            ],
            pageTitle: 'Report Activeuser',
            rule: 'editor'
          }
        }

        //===============================================================
        // End Report
        //===============================================================
      ],
      meta: {
        middleware: [auth]
      }
    },
    {
      path: '*',
      component: () => import('./views/Error/404.vue')
    }
  ]
})
import store from './store/store'

router.beforeEach((to, from, next) => {
  if (!to.meta.middleware) {
    return next()
  }
  const middleware = to.meta.middleware

  const context = {
    to,
    from,
    next,
    store
  }
  return middleware[0]({
    ...context
  })
})

router.afterEach(() => {
  // Remove initial loading
  const appLoading = document.getElementById('loading-bg')
  if (appLoading) {
    appLoading.style.display = 'none'
  }
})

export default router
