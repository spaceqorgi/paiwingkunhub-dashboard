<template>
  <div class="the-navbar__user-meta flex items-center" v-if="activeUserInfo.photoURL">
    <div class="text-right leading-tight hidden sm:block">
      <p class="font-semibold">{{ activeUserInfo.username }}</p>
      <small>{{ getRole(activeUserInfo.role) }}</small>
    </div>

    <vs-dropdown vs-custom-content vs-trigger-click class="cursor-pointer">
      <div class="con-img ml-3">
        <img
          key="onlineImg"
          :src="activeUserInfo.photoURL"
          alt="user-img"
          width="40"
          height="40"
          class="rounded-full shadow-md cursor-pointer block"
        />
      </div>

      <vs-dropdown-menu class="vx-navbar-dropdown">
        <ul style="min-width: 9rem">
          <li class="flex py-2 pl-4 cursor-pointer hover:bg-primary hover:text-white" @click="showPopup">
            <feather-icon icon="EditIcon" svgClasses="w-4 h-4" />
            <span class="ml-2">ตั้งค่าบัญชี</span>
          </li>
          <li class="flex py-2 pl-4 cursor-pointer hover:bg-primary hover:text-white" @click="logout">
            <feather-icon icon="LogOutIcon" svgClasses="w-4 h-4" />
            <span class="ml-2">ออกจากระบบ</span>
          </li>
        </ul>
      </vs-dropdown-menu>
    </vs-dropdown>

    <!-------------------------------------------------------------------Action popup------------------------------------------------------------------------------>
    <vs-popup title="ข้อมูลบัญชี" :active.sync="popupOptionLookup">
      <div class="px-5 my-1">
        <vs-row class="my-1">
          <!------------------INPUTS--------------->
          <vs-col class="px-2" vs-sm="12" vs-w="6">
            <h4 class="mb-5">ข้อมูล</h4>
            <p class="my-4"><strong>ประเภท:</strong> {{ getRole(AppActiveUser.role) }}</p>
            <p class="my-4"><strong>รหัส:</strong> {{ AppActiveUser.id }}</p>
            <p class="my-4"><strong>อีเมล:</strong> {{ AppActiveUser.username }}</p>
            <p class="my-4"><strong>ชื่อ:</strong> {{ AppActiveUser.username }}</p>
            <p class="my-4"><strong>นามสกุล:</strong> {{ AppActiveUser.username }}</p>
            <p class="my-4"><strong>โทรศัพท์:</strong> {{ AppActiveUser.phone }}</p>
          </vs-col>
          <vs-col class="px-2" vs-sm="12" vs-w="6">
            <h4 class="mb-5">ตั้งรหัสผ่านใหม่</h4>
            <vs-input
              label-placeholder="รหัสผ่านเดิม"
              class="my-8"
              v-model="oldPassword"
              type="password"
              name="oldPassword"
            />
            <vs-input
              label-placeholder="รหัสผ่าน"
              class="my-8"
              v-model="password"
              type="password"
              name="password"
            />
            <vs-input
              label-placeholder="ยืนยันรหัสผ่าน"
              class="my-2"
              v-model="confirmPassword"
              type="password"
              name="confirmPassword"
            />
            <vs-button
              :disabled="!validateForm"
              class="mx-1 my-3"
              size="small"
              color="success"
              type="filled"
              @click="changePassword"
              >อัพเดทรหัสผ่าน</vs-button
            >
          </vs-col>
        </vs-row>
        <div class="text-center">
          <vs-button class="mx-1" size="small" color="dark" type="filled" @click="cancel">ปิด</vs-button>
        </div>
      </div>
    </vs-popup>
    <!---------------------------------------------------------------------END Action popup--------------------------------------------------------------------->
  </div>
</template>

<script>
import axios from '@/axios'
import store from '@/store/store.js'

export default {
  data () {
    return {
      popupOptionLookup: false,
      oldPassword: '',
      password: '',
      confirmPassword: '',
      success: false,
      AppActiveUser: store.state.AppActiveUser
    }
  },
  computed: {
    activeUserInfo () {
      return this.$store.state.AppActiveUser
    },
    validateForm () {
      return this.password === this.confirmPassword && this.password !== ''
    }
  },
  methods: {
    cancel () {
      this.popupOptionLookup = false
      this.oldPassword = ''
      this.password = ''
      this.confirmPassword = ''
    },
    async changePassword () {
      await axios
        .post('/auth/admin/password/change', {
          oldPassword: this.oldPassword,
          password: this.password
        })
        .then(() => (this.success = true))
        .catch(() => (this.success = false))

      if (this.success) this.$vs.notify({
        title: 'ทำรายการสำเร็จ',
        text: 'แก้ไขข้อมูลสำเร็จ',
        position: 'top-right',
        iconPack: 'feather',
        icon: 'icon-alert-circle',
        color: 'success'
      })
      else this.$vs.notify({
        title: 'เกิดข้อผิดพลาด',
        text: 'แก้ไขข้อมูลไม่สำเร็จ',
        position: 'top-right',
        iconPack: 'feather',
        icon: 'icon-alert-circle',
        color: 'danger'
      })

      this.cancel()
    },
    getRole (role) {
      switch (role) {
      case 1:
        return 'Organizer'
      case 2:
        return 'Staff'
      case 3:
        return 'Admin'
      default:
        return 'Role ERROR'
      }
    },
    async logout () {
      localStorage.removeItem('userInfo')
      localStorage.removeItem('accessToken')
      // await this.$router.push('/Login')
      window.location.href = '/'
    },
    showPopup () {
      this.popupOptionLookup = true
    }
  }
}
</script>
