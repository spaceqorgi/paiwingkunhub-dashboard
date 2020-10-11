/*=========================================================================================
  File Name: sidebarItems.js
  Description: Sidebar Items list. Add / Remove menu items from here.
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/
import store from '../../../../src/store/store.js'
let level_permission = store.state.AppActiveUser.lv
const show_menu = []
const menu = [
  {
    url: null,
    name: 'สรุปยอด',
    slug: '',
    icon: 'HomeIcon',
    submenu: [
      {
        url: '/',
        name: 'สรุปยอดรายวัน',
        slug: 'dashboard'
      },
      {
        url: '/month',
        name: 'สรุปยอดเดือน',
        slug: 'month'
      }
    ]
  },

  {
    url: '/member',
    name: 'ข้อมูลยูสเซอร์',
    slug: 'member',
    icon: 'UsersIcon',
    submenu: [
      {
        url: '/membersearch',
        name: 'ค้นหาข้อมูลยูสเซอร์',
        slug: 'membersearch'
      },
      {
        url: '/member',
        name: 'ข้อมูลยูสเซอร์ทั้งหมด',
        slug: 'member'
      }
    ]
  },

  {
    url: '/agent',
    name: 'เติม-ถอน เครดิต',
    slug: 'agent',
    icon: 'CreditCardIcon'
  },

  {
    url: '/agentminus',
    name: 'ถอน เครดิต',
    slug: 'agentminus',
    icon: 'CreditCardIcon'
  },
  {
    url: '/topup',
    name: 'รายการเพิ่มเครดิต',
    slug: 'topup',
    icon: 'PlusCircleIcon'
  },

  {
    url: null,
    name: 'รายการถอนเงิน',
    slug: '',
    icon: 'MinusCircleIcon',
    submenu: [
      {
        url: '/withdraw',
        name: 'รอทำรายการ',
        slug: 'withdraw'
      },
      {
        url: '/withdrawwait/error',
        name: 'ถอนไม่สำเร็จ',
        slug: 'withdrawerror'
      },
      {
        url: '/withdrawlist',
        name: 'ประวัติทำรายการ',
        slug: 'withdrawlist'
      }
    ]
  },

  {
    url: '/wallet',
    name: 'รายการ Truewallet',
    slug: 'wallet',
    icon: 'ListIcon'
  },

  {
    url: '/bank',
    name: 'รายการ ธนาคาร',
    slug: 'bank',
    icon: 'DollarSignIcon'
  },

  {
    url: null,
    name: 'ตั้งค่าระบบ',
    slug: '',
    icon: 'SettingsIcon',
    submenu: [
      {
        url: '/SettingSystem',
        name: 'ระบบ หน้าเว็บ',
        slug: 'settingsystem'
      },
      {
        url: '/SettingWithdraw',
        name: 'ระบบ ถอนเงิน',
        slug: 'settingwithdraw'
      },
      {
        url: '/SettingPopup',
        name: 'ระบบ แจ้งเตือน',
        slug: 'popupsetting'
      },
      {
        url: null,
        name: 'ระบบ บัญชี',
        slug: 'Acc',
        submenu: [
          {
            url: '/SettingWalletDeposit',
            name: 'บัญชีฝาก',
            slug: 'settingwalletdeposit'
          },
          {
            url: '/SettingWalletWithdraw',
            name: 'บัญชีถอน',
            slug: 'settingwalletwithdraw'
          },
          {
            url: '/SettingTruewallet',
            name: 'บัญชี Truewallet',
            slug: 'settingtruewallet'
          }
        ]
      }
    ]
  },

  {
    url: null,
    name: 'รีพอร์ท',
    slug: 'report',
    icon: 'DownloadIcon',
    submenu: [
      {
        url: '/reportbonus',
        name: 'โบนัส',
        slug: 'reportbonus'
      },
      {
        url: '/reportaff',
        name: 'แนะนำเพื่อน',
        slug: 'reportaff'
      },
      {
        url: '/reportturn',
        name: 'รับเงินคืน',
        slug: 'reportturn'
      },
      {
        url: '/reportregister',
        name: 'สมัคร / เติมเงิน',
        slug: 'reportregister'
      },
      {
        url: '/reportminigame',
        name: 'เปิดไพ่ / กงล้อ',
        slug: 'reportminigame'
      },
      {
        url: '/reportlog',
        name: 'ประวัติการใช้งาน',
        slug: 'reportlog'
      },
      {
        url: '/reportactiveuser',
        name: 'Activeuser',
        slug: 'reportactiveuser'
      }
    ]
  },
  {
    url: '/settingstaff',
    name: 'ระบบ พนักงาน',
    slug: 'settingstaff',
    icon: 'SettingsIcon'
  },
  {
    url: null,
    name: 'รายการเครดิตฟรี',
    slug: '',
    icon: 'CreditCardIcon',
    submenu: [
      {
        url: '/creditfreewait',
        name: 'รอทำรายการ',
        slug: 'creditfreewait'
      },
      {
        url: '/creditfreelist',
        name: 'รายการเครดิตฟรี',
        slug: 'creditfreelist'
      },
      {
        url: '/creditfreeinfo',
        name: 'แก้ไขลิงค์',
        slug: 'creditfreeinfo'
      }
    ]
  }
]

const fixmenu = [
  {
    url: null,
    name: 'Agent ตัวเกม',
    slug: '',
    icon: 'HomeIcon',
    submenu: [
      {
        url: 'https://www.sa-bo.net/?lang=en-US',
        target: '_blank',
        name: 'SA-GAMING',
        slug: 'external',
        icon: 'HomeIcon'
      },
      {
        url: 'https://ag.onlinegames22.com/',
        target: '_blank',
        name: 'SEXY-GAMING',
        slug: 'external',
        icon: 'HomeIcon'
      },
      {
        url: 'https://ag.wm555.net',
        target: '_blank',
        name: 'WM-CASINO',
        slug: 'external',
        icon: 'HomeIcon'
      },
      {
        url: 'http://www.partnerbo68.net',
        target: '_blank',
        name: 'JOKER-SLOT',
        slug: 'external',
        icon: 'HomeIcon'
      },
      {
        url: 'https://ag.pgslot.cc',
        target: '_blank',
        name: 'PG-SLOT',
        slug: 'external',
        icon: 'HomeIcon'
      },
      {
        url: 'https://ag.ambpoker.com/login',
        target: '_blank',
        name: 'AMB-POKER',
        slug: 'external',
        icon: 'HomeIcon'
      }
    ]
  }
]

level_permission = level_permission.toString(2)
const cal_length = menu.length - level_permission.length

for (let i = 0; i < cal_length; i++) {
  level_permission = 0 + level_permission
}
level_permission = level_permission.split('')
level_permission = level_permission.reverse()

for (let p = 0; p < menu.length; p++) {
  if (level_permission[p] === '1') {
    show_menu.push(menu[p])
  }
}

show_menu.push(fixmenu[0])

export default show_menu
