/*=========================================================================================
  File Name: sidebarItems.js
  Description: Sidebar Items list. Add / Remove menu items from here.
==========================================================================================*/
import store from '../../../../src/store/store.js'

const role = store.state.AppActiveUser.role
let show_menu = []
const menu = [
  {
    url: '/event',
    name: 'จัดการงานวิ่ง',
    slug: 'event',
    icon: 'HeartIcon',
    submenu: [
      {
        url: '/search_event',
        name: 'ค้นหางานวิ่ง',
        slug: 'search_event'
      },
      {
        url: '/event',
        name: 'งานวิ่งทั้งหมด',
        slug: 'event'
      },
      {
        url: '/add_event',
        name: 'เพิ่มงานวิ่ง',
        slug: 'add_event'
      }
    ]
  },
  {
    url: '/user',
    name: 'จัดการผู้ใช้',
    slug: 'user',
    icon: 'UsersIcon',
    submenu: [
      {
        url: '/search_user',
        name: 'ค้นหาผู้ใช้',
        slug: 'search_user'
      },
      {
        url: '/user',
        name: 'ผู้ใช้ทั้งหมด',
        slug: 'user'
      }
    ]
  },
  {
    url: '/participation',
    name: 'รายการสมัครวิ่ง',
    slug: 'participation',
    icon: 'StarIcon',
    submenu: [
      {
        url: '/search_participation',
        name: 'ค้นหารายการสมัคร',
        slug: 'search_participation'
      },
      {
        url: '/participation',
        name: 'รายการสมัครวิ่งทั้งหมด',
        slug: 'participation'
      }
    ]
  },
  {
    url: '/progress',
    name: 'รายการผลวิ่ง',
    slug: 'progress',
    icon: 'ActivityIcon',
    submenu: [
      {
        url: '/search_progress',
        name: 'ค้นหาผลวิ่ง',
        slug: 'search_progress'
      },
      {
        url: '/progress',
        name: 'ผลวิ่งทั้งหมด',
        slug: 'progress'
      }
    ]
  },
  {
    url: '/pending',
    name: 'รออนุมัติ',
    slug: 'pending',
    icon: 'ThumbsUpIcon',
    submenu: [
      {
        url: '/pending_payment',
        name: 'รายการชำระเงิน',
        slug: 'pending_payment'
      },
      {
        url: '/pending_progress',
        name: 'ผลวิ่งจากผู้ใช้',
        slug: 'pending_progress'
      }
    ]
  }
]

const fixedMenus = [
  {
    url: null,
    name: 'Link ต่างๆ',
    slug: '',
    icon: 'ExternalLinkIcon',
    submenu: [
      {
        url: 'https://paiwingkunhub-fe.vercel.app/',
        target: '_blank',
        name: 'ไปยังเว็บไซต์หน้าบ้าน',
        slug: 'external',
        icon: 'HomeIcon'
      },
      {
        url: 'mailto:spacecorgi@pm.me',
        target: '_blank',
        name: 'ติดต่อโปรแกรมเมอร์',
        slug: 'external',
        icon: 'MailIcon'
      }
    ]
  }
]

if (role >= 2) show_menu = menu

show_menu.push(fixedMenus[0])

export default show_menu
