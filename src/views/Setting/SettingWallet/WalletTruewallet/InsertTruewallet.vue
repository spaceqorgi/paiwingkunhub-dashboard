<template>
  <vx-card no-shadow title="เพิ่มบัญชีทรูวอลเล็ต">

    <!-- Info -->
    <vs-input class="w-full " v-validate="'required'" label-placeholder="อีเมลล์" v-model="email" name="email"></vs-input>
    <span class="text-danger text-sm" v-show="errors.has('email')">{{ errors.first('email') }}</span>
    
    <vs-input class="w-full " v-validate="'required'" label-placeholder="ชื่อบัญชี (ชื่อ-นามสกุล)" v-model="name" name="name"></vs-input>
    <span class="text-danger text-sm" v-show="errors.has('name')">{{ errors.first('name') }}</span>
    
    <vs-input class="w-full" v-validate="'required|numeric|max:10'" label-placeholder="เบอร์โทรศัพท์" v-model="phone" name="phone"></vs-input>
    <span class="text-danger text-sm" v-show="errors.has('phone')">{{ errors.first('phone') }}</span>
    
    <vs-input class="w-full " v-validate="'required|alpha_num'" label-placeholder="พาสเวิร์ด" v-model="password" name="password"></vs-input>
    <span class="text-danger text-sm" v-show="errors.has('password')">{{ errors.first('password') }}</span>

    <!-- Save & Reset Button -->
    <div class="flex flex-wrap items-center justify-end ">
      <vs-button class="ml-auto mt-2" color="success" @click="Save">บันทึก</vs-button>
      <vs-button class="ml-4 mt-2" type="border" color="warning" @click="Reset()">Reset</vs-button>
    </div>
  </vx-card>
</template>

<script>
import {
  Validator
} from 'vee-validate'
import axios from '../../../../axios'
import log from '../../../../log'
const dict = {
  custom: {
    username: {
      required: 'กรุณากรอกข้อมูล',
      numeric: 'ตัวเลขเท่านั้น'
    },
    password: {
      required: 'กรุณากรอกข้อมูล',
      alpha_num: 'ต้องเป็นตัวเลขหรือจุดทศนิยมเท่านั้น'
    },
    name :{
      required : 'กรุณากรอกข้อมูล'
    },
    phone :{
      required : 'กรุณากรอกข้อมูล',
      max:'กรุณากรอกตัวอักษรไม่เกิน10ตัว'
    }
  }
}
Validator.localize('en', dict)
export default {
  data () {
    return {
      email: '',
      name: '',
      password: '',
      phone: '',
      status:false

    }
  },
  computed: {
    activeUserInfo () {
      return this.$store.state.AppActiveUser
    }
  },
  methods: {
    async Save () {
      this.$validator.validateAll().then(async result => {
        if (result) {
          await  axios
            .post('settingwallet/inserttruewallet', {
              email: this.email,
              name: this.name,
              password: this.password,
              phone: this.phone
            }).then(response => (this.status = response.data))
          if (this.status.status === false) {
            this.$vs.notify({
              time: 8000,
              color: 'danger',
              position: 'top-right',
              icon: 'error',
              title: 'บันทึกไม่สำเร็จ',
              text: this.status.info
            })
           
          } else {
            this.$vs.notify({
              time:3000,
              color:'success',
              position:'top-right',
              icon: 'check_box',
              title: this.status.info
            })
            log.agent('', 'Insert_Truewallet', 0, `เพิ่มบัญชีทรูวอเล็ทเบอร์ : ${  this.phone} ชื่อเจ้าของเบอร์ : ${  this.name}`)
            setTimeout(() => { window.location.reload() }, 1500)
          }
        } else {
          this.$vs.notify({
            time:8000,
            color: 'danger',
            position:'top-right',
            icon:  'error',
            title:'ไม่ได้กรอกข้อมูล',
            text: 'กรุณากรอกข้อมูลให้ครบถ้วน'
          })

        }
      })
    },
    Reset () {
      this.email = ''
      this.name = ''
      this.password = ''
      this.phone = ''
    }
  }
}

</script>
