<!-- =========================================================================================
    File Name: TableExpandableData.vue
    Description: Create expandable rows which have custom data
    ----------------------------------------------------------------------------------------
    Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
      Author: Pixinvent
    Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->


<template>
  <vx-card title="แก้ไขข้อมูลบัญชี">

    <div class="vx-row">
      <div class="vx-col md:w-1/2 w-full">
        <vs-input class="w-full mt-4" v-validate="'required|numeric|max:10'" label="หมายเลขบัญชี"
          placeholder="กรุณาใส่หมายเลขบัญชี" v-model="new_data.bankno" name="bankno"  />
        <span class="text-danger text-sm" v-show="errors.has('bankno')">{{ errors.first('bankno') }}</span>
        <vs-input class="w-full mt-4" v-validate="'required|alpha_num|max:20'" label="Username" placeholder="กรุณาใส่ Username"
          v-model="new_data.username" name="username" />
        <span class="text-danger text-sm" v-show="errors.has('username')">{{ errors.first('username') }}</span>
        <br>
        <label class="vs-input--label">เลือกประเภทบัญชี</label>
        <!-- <v-select v-model="databank[0].bank_reserve" :options="typeOptions" name="test" :dir="$vs.rtl ? 'rtl' : 'ltr'" /> -->
        <vs-select  class="w-full mt-4" v-model="new_data.bankreserve" >
                <vs-select-item  :key="index" :value="item.value" :text="item.text" v-for="(item,index) in datagroups" />
                
        </vs-select>
      </div>
      <div class="vx-col md:w-1/2 w-full">

        <vs-input class="w-full mt-4" v-validate="'required'" label="ชื่อบัญชี"
          placeholder="กรุณาใส่ชื่อบัญชี" v-model="new_data.fullname" name="fullname" />
        <span class="text-danger text-sm" v-show="errors.has('fullname')">{{ errors.first('fullname') }}</span>
        <vs-input class=" w-full mt-4" v-validate="'required|alpha_num'" type="password" label="Password" placeholder="กรุณาใส่ Password"
          v-model="new_data.password" name="password"/>
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
import vSelect from 'vue-select'
import axios from '../../../../axios'
import log from '../../../../log'
const dict = {
  custom: {
    username: {
      required: 'กรุณากรอกข้อมูล',
      alpha_num: 'ตัวอักษรภาษาอังกฤษและตัวเลขเท่านั้น',
      max:'กรุณากรอกตัวอักษรไม่เกิน20ตัว'
    },
    password: {
      required: 'กรุณากรอกข้อมูล',
      alpha_num: 'ตัวอักษรภาษาอังกฤษและตัวเลขเท่านั้น'
    },
    fullname: {
      required: 'กรุณากรอกข้อมูล'
    },
    bankno: {
      required: 'กรุณากรอกข้อมูล',
      numeric:'กรุณากรอกแต่ตัวเลขเท่านั้น',
      max:'กรุณากรอกตัวอักษรไม่เกิน10ตัว'
    },
    phone: {
      required: 'กรุณากรอกข้อมูล',
      numeric:'กรุณากรอกแต่ตัวเลขเท่านั้น'
    }
  }
}
Validator.localize('en', dict)
export default {
  components: {
    vSelect
  },
  data () {
    return {
      status: false,
      bankfrom: this.$route.params.bank,
      bankid: this.$route.params.id,
      databank: [],
      datagroups: [
        {
          text: 'บัญชีหลัก',
          value: 0
        },
        {
          text: 'บัญชีสำรอง',
          value: 1
        }

      ],
      new_data:{
        bankno:'',
        fullname:'',
        username:'',
        password:'',
        bankreserve:''
      },
      info_log: ''
    }
  },
  async mounted () {
    await axios.get(`settingwallet/editbankdeposit/${this.$route.params.id}/${this.$route.params.bank}`)
      .then(response => (this.databank = response.data))
    this.new_data.bankno = this.databank[0].bank_number
    this.new_data.fullname = this.databank[0].bank_fullname
    this.new_data.username = this.databank[0].bank_username
    this.new_data.password = this.databank[0].bank_password
    this.new_data.bankreserve = this.databank[0].bank_reserve

  },
  methods: {
    async Save () {
      this.$validator.validateAll().then(async result => {
        if (result) {
          await axios
            .post('settingwallet/updatebank', {
              bankfrom: this.bankfrom,
              bankid: this.bankid,
              bankno: this.new_data.bankno,
              fullname: this.new_data.fullname,
              username: this.new_data.username,
              password: this.new_data.password,
              bankreserve: this.new_data.bankreserve
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
              time: 3000,
              color: 'success',
              position: 'top-right',
              icon: 'check_box',
              title: this.status.info
            })
            await this.comparedata()
            await log.agent('', 'Edit_Deposit', 0, this.info_log)
            setTimeout(() => { this.$router.push('/SettingWalletDeposit') }, 1500)
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
      if (this.databank[0].bank_number !== this.new_data.bankno) {
        this.info_log += `เลขบัญชี :    ${  this.databank[0].bank_number  } > ${  this.new_data.bankno  } `
      }
      if (this.databank[0].bank_fullname !== this.new_data.fullname) {
        this.info_log += `ชื่อบัญชี :     ${  this.databank[0].bank_fullname  } > ${  this.new_data.fullname  } `
      }
      if (this.databank[0].bank_username !== this.new_data.username) {
        this.info_log += `username :   ${  this.databank[0].bank_username  } > ${  this.new_data.username  }`
      }
      if (this.databank[0].bank_password !== this.new_data.password) {
        this.info_log += ` password :  ${  this.databank[0].bank_password  } > ${  this.new_data.password}`
      }
      if (this.databank[0].bank_reserve !== this.new_data.bankreserve) {
        this.info_log += `ประเภทบัญชี :  ${  this.databank[0].bank_reserve  } > ${  this.new_data.bankreserve} `
      }
    }
  }
}

</script>
