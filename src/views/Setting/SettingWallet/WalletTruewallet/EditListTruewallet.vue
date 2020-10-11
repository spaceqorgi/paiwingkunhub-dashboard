<!-- =========================================================================================
    File Name: TableExpandableData.vue
    Description: Create expandable rows which have custom data

========================================================================================== -->


<template>
  <vx-card title="แก้ไขข้อมูลบัญชี">

    <div class="vx-row">
      <div class="vx-col md:w-1/2 w-full">
        <vs-input class="w-full mt-4" v-validate="'required'" label="E-MAIL" placeholder="กรุณาใส่e-mail"
          v-model="new_data.email" name="walletemail" />
        <span class="text-danger text-sm" v-show="errors.has('walletemail')">{{ errors.first('walletemail') }}</span>
        <vs-input class="w-full mt-4" v-validate="'required|numeric|max:10'" label="Phone"
          placeholder="กรุณาใส่หมายเลขโทรศัพท์ TrueWallet" v-model="new_data.phone" name="phone" />
        <span class="text-danger text-sm" v-show="errors.has('phone')">{{ errors.first('phone') }}</span>
      </div>
      <div class="vx-col md:w-1/2 w-full">
        <vs-input class="w-full mt-4" v-validate="'required'" label="Name" placeholder="กรุณาใส่ชื่อบัญชี"
          v-model="new_data.name" name="fullname" />
        <span class="text-danger text-sm" v-show="errors.has('fullname')">{{ errors.first('fullname') }}</span>
        <vs-input class="w-full mt-4" v-validate="'required|alpha_num'" label="Password" placeholder="กรุณาใส่ Password"
          v-model="new_data.password" name="password" />
        <span class="text-danger text-sm" v-show="errors.has('password')">{{ errors.first('password') }}</span>


      </div>
    </div>
    <div class="mt-8 flex flex-wrap items-center justify-end">
      <vs-button color="success" class="ml-4 mt-2" @click="Save">ยืนยัน</vs-button>
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
      alpha_num: 'ตัวอักษรภาษาอังกฤษและตัวเลขเท่านั้น'
    },
    password: {
      required: 'กรุณากรอกข้อมูล',
      alpha_num: 'ต้องเป็นตัวเลขหรือจุดทศนิยมเท่านั้น'
    },
    fullname: {
      required: 'กรุณากรอกข้อมูล'
    },
    phone: {
      required: 'กรุณากรอกข้อมูล',
      numeric: 'กรุณากรอกตัวเลขเท่านั้น',
      max:'กรุณากรอกตัวอักษรไม่เกิน10ตัว'
    }
  }
}
Validator.localize('en', dict)
export default {

  data () {
    return {
      bankfrom: this.$route.params.bank,
      bankid: this.$route.params.id,
      walletemail: '',
      fullname: '',
      password: '',
      walletphone: '',
      databank: [],
      new_data:{
        email:'',
        name:'',
        phone:'',
        password:''
      },
      info_log: ''
    }
    
  },
  async mounted () {
    await axios.get(`settingwallet/edittruewallet/${this.$route.params.id}/${this.$route.params.bank}`)
      .then(response => (this.databank = response.data))
    this.new_data.email = this.databank[0].wallet_email
    this.new_data.name = this.databank[0].wallet_name
    this.new_data.phone = this.databank[0].wallet_phone
    this.new_data.password = this.databank[0].wallet_pass

  },

  methods: {
    async Save () {
      this.$validator.validateAll().then(async result => {
        if (result) {
          await axios
            .post('settingwallet/updatetruewallet', {
              bankfrom: this.bankfrom,
              walletno: this.databank[0].wallet_no,
              email: this.new_data.email,
              name: this.new_data.name,
              phone: this.new_data.phone,
              password: this.new_data.password
            }).then(response => (this.status = response.data))
          if (this.status.status === true) {
            this.$vs.notify({
              time: 3000,
              color: 'success',
              position: 'top-right',
              icon: 'check_box',
              title: this.status.info
            })
            await this.comparedata()
            await log.agent('', 'Edit_Truewallet', 0, this.info_log)
            setTimeout(() => { this.$router.push('/SettingTruewallet') }, 1500)
          } else {
            this.$vs.notify({
              time: 8000,
              color: 'danger',
              position: 'top-right',
              icon: 'error',
              title: 'บันทึกไม่สำเร็จ',
              text: this.status.info
            })
          }
        } else {
          this.$vs.notify({
            time: 8000,
            color: 'danger',
            position: 'top-right',
            icon: 'error',
            title: 'ไม่ได้กรอกข้อมูล',
            text: 'กรุณากรอกข้อมูลให้ครบถ้วน'
          })

        }
      })
    },
    async comparedata () {
      if (this.databank[0].wallet_email !== this.new_data.email) {
        this.info_log += `เลขบัญชี :    ${  this.databank[0].wallet_email  } > ${  this.new_data.email  } `
      }
      if (this.databank[0].wallet_name !== this.new_data.name) {
        this.info_log += `ชื่อบัญชี :     ${  this.databank[0].wallet_name  } > ${  this.new_data.name } `
      }
      if (this.databank[0].wallet_phone !== this.new_data.phone) {
        this.info_log += `Phone :   ${  this.databank[0].wallet_phone  } > ${  this.new_data.phone  }`
      }
      if (this.databank[0].wallet_pass !== this.new_data.password) {
        this.info_log += ` password :  ${  this.databank[0].wallet_pass  } > ${  this.new_data.password}`
      }
      
    }
  }
}

</script>
