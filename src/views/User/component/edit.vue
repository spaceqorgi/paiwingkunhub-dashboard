<template>
  <vx-card no-shadow title="แก้ไขข้อมูลผู้ใช้">
    <div class="vx-row">
      <div class="vx-col md:w-full w-full">
        <vs-input
          class="w-full mt-4"
          label="ชื่อผู้ใช้"
          v-model="userData.username"
          v-validate="'required|alpha_num'"
          name="username"
          readonly
        />

        <vs-input
          class="w-full mt-4"
          label="รหัสผ่าน"
          v-model="userData.password"
          name="password"
        />
        <span class="text-danger text-sm" v-show="errors.has('password')">{{
          errors.first('password')
        }}</span>

        <vs-input
          class="w-full mt-4"
          label="เบอร์โทร"
          v-model="userData.phone"
          v-validate="'required|numeric'"
          name="phone"
        />
        <span class="text-danger text-sm" v-show="errors.has('phone')">{{
          errors.first('phone')
        }}</span>

        <vs-input
          class="w-full mt-4"
          label="นามสกุล"
          v-model="userData.last_name"
          v-validate="'required'"
          name="last_name"
        />
        <span class="text-danger text-sm" v-show="errors.has('last_name')">{{
          errors.first('last_name')
        }}</span>

        <vs-input
          class="w-full mt-4"
          label="ชื่อ"
          v-model="userData.first_name"
          v-validate="'required'"
          name="name"
        />
        <span class="text-danger text-sm" v-show="errors.has('name')">{{
          errors.first('name')
        }}</span>
        <vs-input
          class="w-full mt-4"
          label="อีเมล์"
          v-model="userData.email"
          name="email"
        />
        <span class="text-danger text-sm" v-show="errors.has('email')">{{
          errors.first('email')
        }}</span>
      </div>
    </div>
    <div class="mt-6 flex flex-wrap items-center justify-end">
      <vs-button color="success" class="ml-4 mt-2" @click="submit" >ยืนยัน</vs-button
      >
    </div>
  </vx-card>
</template>

<script>
import axios from '../../../axios'
import {Validator} from 'vee-validate'

const dict = {
  custom: {
    fist_name: {
      required: 'กรุณากรอกข้อมูล'
    },
    phone: {
      required: 'กรุณากรอกข้อมูล',
      numeric: 'ต้องเป็นตัวเลขเท่านั้น'
    },
    last_name: {
      required: 'กรุณากรอกข้อมูล'
    }
  }
}
Validator.localize('en', dict)
export default {
  components: {
  },
  data () {
    return {
      newUserData: {
      },
      userData: {},
      errorlog: [],
      info_log: ''
    }
  },
  methods: {
    async submit () {
      for (let i = 0; i < this.options_bank.length; i++) {
        if (this.selectbank.value === this.options_bank[i].value) {
          this.selectbank.text = this.options_bank[i].text
        }
      }
      this.$validator.validateAll().then(async (result) => {
        if (result) {
          await axios
            .put(`/user/${this.userData.id}`, {
              username: this.userData.username,
              password: this.userData.password,
              phone: this.userData.phone,
              first_name: this.userData.first_name,
              last_name: this.userData.last_name,
              status: this.userData.status,
              email: this.userData.email
            })
            .then((response) => (this.errorlog = response.data))
          if (this.errorlog.status === false) {
            this.$vs.notify({
              time: 8000,
              color: 'danger',
              position: 'top-right',
              icon: 'error',
              title: 'บันทึกข้อมูลไม่สำเร็จ',
              text: this.errorlog.info
            })
          } else {
            await this.comparedata()
            this.$vs.notify({
              time: 8000,
              color: 'success',
              position: 'top-right',
              icon: 'check_box',
              title: 'บันทึกข้อมูลสำเร็จ',
              text: this.errorlog.info
            })
          }
        } else {
          this.$vs.notify({
            time: 3000,
            color: 'warning',
            position: 'top-right',
            icon: 'error',
            title: 'บันทึกข้อมูลไม่สำเร็จ',
            text: 'กรุณากรอกข้อมูลให้ครบ'
          })
        }
      })
    },
    async comparedata () {
      if (this.userData.first_name !== this.newUserData.name) {
        this.info_log += `ชื่อ : ${this.userData.first_name} > ${this.newUserData.name} `
      }
      if (this.userData.phone !== this.newUserData.phone) {
        this.info_log += `เบอร์โทร : ${this.userData.phone} > ${this.newUserData.phone} `
      }
      if (this.userData.last_name !== this.newUserData.last_name) {
        this.info_log += `นามสกุล : ${this.userData.last_name} > ${this.newUserData.last_name} `
      }
      if (this.userData.password !== this.newUserData.password) {
        this.info_log += `Password : ${this.userData.password} > ${this.newUserData.password} `
      }
      if (this.userData.status !== this.newUserData.status) {
        this.info_log += `สถานะล็อกผู้ใช้ : ${this.newUserData.status} > ${this.userData.status} `
      }
      if (this.userData.status_info !== this.newUserData.info) {
        this.info_log += `หมายเหตุ :  ${this.newUserData.info} > ${this.userData.status_info} `
      }
    }
  },
  async mounted () {
    await axios
      .get(`/user/${this.$route.params.id}`)
      .then((response) => (this.userData = response.data.data))
    this.selectbank.text = this.userData.member_bank_type
    this.selectbank.value = this.userData.member_bank_code
    this.newUserData.fist_name = this.userData.first_name
    this.newUserData.last_name = this.userData.last_name
    this.newUserData.phone = this.userData.phone
    this.newUserData.password = this.userData.password
    this.newUserData.status = this.userData.status
  }
}
</script>
