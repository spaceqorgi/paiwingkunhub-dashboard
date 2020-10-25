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
    url: null,
    name: 'รายการสมัครวิ่ง',
    slug: '',
    icon: 'SmileIcon',
    submenu: [
      {
        url: '/participate_registered',
        name: 'รอชำระเงิน',
        slug: 'participate_registered'
      },
      {
        url: '/participate_pending',
        name: 'รอการยืนยัน',
        slug: 'participate_pending'
      },
      {
        url: '/participate_approved',
        name: 'สมัครวิ่งสำเร็จ',
        slug: 'participate_approved'
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
    name: 'รอยืนยัน',
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
        url: 'mailto:boon.nm@pm.me',
        target: '_blank',
        name: 'ติดต่อทีมโปรแกรมเมอร์',
        slug: 'external',
        icon: 'MailIcon'
      }
    ]
  }
]

if (role >= 2) show_menu = menu

show_menu.push(fixedMenus[0])

export default show_menu
