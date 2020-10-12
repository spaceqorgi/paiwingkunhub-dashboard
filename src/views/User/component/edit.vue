<template>
  <vx-card no-shadow title="แก้ไขข้อมูลผู้ใช้">
    <div class="vx-row">
      <div class="vx-col md:w-1/2 w-full">
        <vs-input class="w-full mt-4" label="ชื่อผู้ใช้" v-model="userData.member_username"
          v-validate="'required|alpha_num'" name="username" readonly />
        <vs-input class="w-full mt-4" label="เบอร์โทร" v-model="userData.member_phone"
          v-validate="'required|numeric'" name="phone" />
            <span class="text-danger text-sm" v-show="errors.has('phone')">{{ errors.first('phone') }}</span>

        <vs-input class="w-full mt-4" label="ชื่อ" v-model="userData.member_name" v-validate="'required'"
          name="name" />
          <span class="text-danger text-sm" v-show="errors.has('name')">{{ errors.first('name') }}</span>

        <vs-input  class="w-full mt-4" label="เลขบัญชี" v-model="userData.member_bank_number"
          v-validate="'required'" name="banknumber" />
          <span class="text-danger text-sm" v-show="errors.has('banknumber')">{{ errors.first('banknumber') }}</span>
          <vs-input  class="w-full mt-4" label="ยอดเทิร์นโอเวอร์" v-model="userData.member_turnover"
          v-validate="'required|decimal:2'" name="turnover" />
          <span class="text-danger text-sm" v-show="errors.has('turnover')">{{ errors.first('turnover') }}</span>

        
      </div>
      <div class="vx-col md:w-1/2 w-full">
        <vs-input class="w-full mt-4" label="ไลน์" v-model="userData.member_line" name="line" />
        <span class="text-danger text-sm" v-show="errors.has('line')">{{ errors.first('line') }}</span>

        <vs-input class="w-full mt-4" label="รหัสผ่าน" v-model="userData.member_password" name="password" />
          <span class="text-danger text-sm" v-show="errors.has('password')">{{ errors.first('password') }}</span>

        <vs-input class="w-full mt-4" label="นามสกุล" v-model="userData.member_surname"
          v-validate="'required'" name="surname" />
          <span class="text-danger text-sm" v-show="errors.has('surname')">{{ errors.first('surname') }}</span>

        <div class="mt-4">
          <label class="vs-input--label">ธนาคาร</label>
          <vs-select class="w-full" v-model="selectbank.value" >
            <vs-select-item :key="index" :value="item.value" :text="item.text" v-for="(item,index) in options_bank"/>
          </vs-select>
        </div>
        <div class="mt-4">
          <div v-if="userData.member_locked==1">
            <vs-input class="w-full mt-4" label="หมายเหตุ" v-model="userData.member_locked_info"
          v-validate="'required'" name="info" />
          <span class="text-danger text-sm" v-show="errors.has('info')">{{ errors.first('info') }}</span>
            <span class="text-danger text-sm">ยูสนี้ถูกระงับการใข้งาน กดปุ่มยืนยันเพื่อบันทึกข้อมูล</span>
          </div>
          <div v-else>
            <span class="text-warning text-sm">เลื่อนเปิดเพื่อระงับการใข้งาน กดปุ่มยืนยันเพื่อบันทึกข้อมูล</span>
          </div>
          <vs-switch v-model="userData.member_locked">
            <span slot="0">เปิด</span>
            <span slot="1">ปิด</span>
          </vs-switch>
        </div>
      </div>
    </div>
    <div class="mt-6 flex flex-wrap items-center justify-end">
      <vs-button color="success" class="ml-4 mt-2" @click="Save">ยืนยัน</vs-button>
    </div>
  </vx-card>
</template>

<script>
import axios from '../../../axios'
import vSelect from 'vue-select'
import log from '../../../log'
import {
  Validator
} from 'vee-validate'

const dict = {
  custom: {
    name: {
      required: 'กรุณากรอกข้อมูล'
    },
    banknumber: {
      required: 'กรุณากรอกข้อมูล',
      numeric: 'ต้องเป็นตัวเลขเท่านั้น'
    },
    phone: {
      required: 'กรุณากรอกข้อมูล',
      numeric: 'ต้องเป็นตัวเลขเท่านั้น'
    },
    surname: {
      required: 'กรุณากรอกข้อมูล'
    },
    turnover:{
      required: 'กรุณากรอกข้อมูล',
      decimal: 'ต้องเป็นตัวเลขหรือจุดทศนิยมเท่านั้น'
    }
    
  }
}
Validator.localize('en', dict)
export default {
  components: {
    // eslint-disable-next-line vue/no-unused-components
    vSelect
  },
  data () {
    return {
      turnover: 123.45,
      bank_see: 'SCB-1 สมัย แก้วบุญเรือง 4140559141',
      sum_deposit: 20000,
      selectbank:{
        text: '',
        value: ''
      },
      newmemberData:{phone : '', name : '', banknumber : '', turnover : '', line : '', password : '', surname : '', bankcode : '', banktype : '', memberlock : '', member_locked_info :'' },
      memberData: {},
      errorlog:[],
      info_log: '',
      options_bank: [
        {
          text: 'ไทยพาณิชย์',
          value: '000'
        }, {
          text: 'กรุงเทพ',
          value: '002'
        }, {
          text: 'กสิกรไทย',
          value: '004'
        }, {
          text: 'กรุงไทย',
          value: '006'
        },
        {
          text: 'ธกส',
          value: '034'
        }, {
          text: 'ทหารไทย',
          value: '011'
        }, {
          text: 'ไอซีบีซี',
          value: '070'
        }, {
          text: 'ไทยเครดิต',
          value: '071'
        },
        {
          text: 'ซิตี้แบงก์',
          value: '017'
        }, {
          text: 'ซูมิโตโม มิตซุย',
          value: '018'
        }, {
          text: 'สแตนดาร์ดชาร์เต',
          value: '020'
        }, {
          text: 'ซีไอเอ็มบี',
          value: '022'
        },
        {
          text: 'ยูโอบี',
          value: '024'
        }, {
          text: 'กรุงศรีฯ',
          value: '025'
        }, {
          text: 'ออมสิน',
          value: '030'
        }, {
          text: 'เอชเอสบีซี',
          value: '031'
        },
        {
          text: 'มิซูโฮ',
          value: '039'
        }, {
          text: 'ธอส.',
          value: '033'
        }, {
          text: 'แลนด์แอนด์เฮ้าส',
          value: '073'
        }, {
          text: 'ธนชาต',
          value: '065'
        },
        {
          text: 'ทิสโก้',
          value: '067'
        }, {
          text: 'เกียรตินาคิน',
          value: '069'
        }, {
          text: 'อิสลาม',
          value: '066'
        }
      ]
    }
  },
  methods: {
    async Save () {
      for (let i = 0; i < this.options_bank.length; i++) {
        if (this.selectbank.value === this.options_bank[i].value) {
          this.selectbank.text = this.options_bank[i].text
        }
      }
      this.$validator.validateAll().then(async result => {
        if (result) {
          await axios
            .post('member/editinfo', {
              username:this.userData.member_username,
              phone:this.userData.member_phone,
              name:this.userData.member_name,
              bank:this.selectbank.value,
              bankname:this.selectbank.text,
              memberlocked:this.userData.member_locked,
              line:this.userData.member_line,
              password:this.userData.member_password,
              surname:this.userData.member_surname,
              info:this.userData.member_locked_info,
              banknumber:this.userData.member_bank_number,
              turnover:this.userData.member_turnover
            }).then(response => (this.errorlog = response.data))
          if (this.errorlog.status === false) {
            this.$vs.notify({
              time: 8000,
              color: 'danger',
              position: 'top-right',
              icon: 'error',
              title: 'ทำรายการไม่สำเร็จ',
              text: this.errorlog.info
            })
          } else {
            await this.comparedata()
            await log.agent(this.userData.member_username, 'Edit_info', 0, this.info_log)
            this.$vs.notify({
              time: 8000,
              color: 'success',
              position: 'top-right',
              icon: 'check_box',
              title: 'ทำรายการสำเร็จ',
              text: this.errorlog.info
            })
          }
        } else {
          this.$vs.notify({
            time: 3000,
            color: 'warning',
            position: 'top-right',
            icon: 'error',
            title: 'ทำรายการไม่สำเร็จ',
            text: 'กรุณากรอกข่อมูลให้ครบ'
          })
        }
      })
    },
    async comparedata () {
      if (this.userData.member_phone !== this.newuserData.phone) {
        this.info_log += `เบอร์โทร : ${  this.userData.member_phone  } > ${ this.newuserData.phone} `
      } if (this.userData.member_name !== this.newuserData.name) {
        this.info_log += `ชื่อ : ${  this.userData.member_name  } > ${  this.newuserData.name} `
      }  if (this.userData.member_surname !== this.newuserData.surname) {
        this.info_log += `นามสกุล : ${ this.userData.member_surname  } > ${  this.newuserData.surname} `
      } if (this.userData.member_turnover !== this.newuserData.turnover) {
        this.info_log += `ยอดเทิร์นโอเวอร์ : ${  this.userData.member_turnover  } > ${ this.newuserData.turnover} `
      } if (this.userData.member_line !== this.newuserData.line) {
        this.info_log += `Line : ${  this.userData.member_line  } > ${  this.newuserData.line} `
      } if (this.userData.member_password !== this.newuserData.password) {
        this.info_log += `Password : ${  this.userData.member_password  } > ${  this.newuserData.password} `
      } if (this.userData.member_bank_number !== this.newuserData.banknumber) {
        this.info_log += `เลขบัญชี : ${  this.userData.member_bank_number  } > ${  this.newuserData.banknumber} `
      } if (this.selectbank.text !== this.newuserData.banktype) {
        this.info_log += `ธนาคาร : ${  this.selectbank.text  } > ${  this.newuserData.banktype} `
      } if (this.selectbank.value !== this.newuserData.bankcode) {
        this.info_log += `BankCode : ${  this.selectbank.value  } > ${  this.newuserData.bankcode} `
      } if (this.userData.member_locked !== this.newuserData.memberlock) {
        this.info_log += `สถานะล็อกผู้ใช้ : ${  this.newuserData.memberlock} > ${  this.userData.member_locked  } `
      } if (this.userData.member_locked_info !== this.newuserData.info) {
        this.info_log += `หมายเหตุ :  ${  this.newuserData.info} > ${  this.userData.member_locked_info  } `
      }

    }

  },
  async mounted () {
    await axios
      .get(`/user/${  this.$route.params.username}`).then(response => (this.memberData = response.data))
    this.selectbank.text = this.userData.member_bank_type
    this.selectbank.value = this.userData.member_bank_code
    this.newuserData.username = this.userData.member_username
    this.newuserData.phone = this.userData.member_phone
    this.newuserData.name = this.userData.member_name
    this.newuserData.banknumber = this.userData.member_bank_number
    this.newuserData.turnover = this.userData.member_turnover
    this.newuserData.line = this.userData.member_line
    this.newuserData.password = this.userData.member_password
    this.newuserData.surname = this.userData.member_surname
    this.newuserData.bankcode = this.userData.member_bank_code
    this.newuserData.memberlock = this.userData.member_locked
    this.newuserData.info = this.userData.member_locked_info
    this.newuserData.banktype = this.userData.member_bank_type
  }
}

</script>
