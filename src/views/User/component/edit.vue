<template>
  <vx-card no-shadow title="แก้ไขข้อมูลผู้ใช้">
    <div class="vx-row">
      <div class="vx-col md:w-1/2 w-full">
        <vs-input class="w-full mt-4" label="ชื่อผู้ใช้" v-model="memberData.member_username"
          v-validate="'required|alpha_num'" name="username" readonly />
        <vs-input class="w-full mt-4" label="เบอร์โทร" v-model="memberData.member_phone"
          v-validate="'required|numeric'" name="phone" />
            <span class="text-danger text-sm" v-show="errors.has('phone')">{{ errors.first('phone') }}</span>

        <vs-input class="w-full mt-4" label="ชื่อ" v-model="memberData.member_name" v-validate="'required'"
          name="name" />
          <span class="text-danger text-sm" v-show="errors.has('name')">{{ errors.first('name') }}</span>

        <vs-input  class="w-full mt-4" label="เลขบัญชี" v-model="memberData.member_bank_number"
          v-validate="'required'" name="banknumber" />
          <span class="text-danger text-sm" v-show="errors.has('banknumber')">{{ errors.first('banknumber') }}</span>
          <vs-input  class="w-full mt-4" label="ยอดเทิร์นโอเวอร์" v-model="memberData.member_turnover"
          v-validate="'required|decimal:2'" name="turnover" />
          <span class="text-danger text-sm" v-show="errors.has('turnover')">{{ errors.first('turnover') }}</span>

        
      </div>
      <div class="vx-col md:w-1/2 w-full">
        <vs-input class="w-full mt-4" label="ไลน์" v-model="memberData.member_line" name="line" />
        <span class="text-danger text-sm" v-show="errors.has('line')">{{ errors.first('line') }}</span>

        <vs-input class="w-full mt-4" label="รหัสผ่าน" v-model="memberData.member_password" name="password" />
          <span class="text-danger text-sm" v-show="errors.has('password')">{{ errors.first('password') }}</span>

        <vs-input class="w-full mt-4" label="นามสกุล" v-model="memberData.member_surname"
          v-validate="'required'" name="surname" />
          <span class="text-danger text-sm" v-show="errors.has('surname')">{{ errors.first('surname') }}</span>

        <div class="mt-4">
          <label class="vs-input--label">ธนาคาร</label>
          <vs-select class="w-full" v-model="selectbank.value" >
            <vs-select-item :key="index" :value="item.value" :text="item.text" v-for="(item,index) in options_bank"/>
          </vs-select>
        </div>
        <div class="mt-4">
          <div v-if="memberData.member_locked==1">
            <vs-input class="w-full mt-4" label="หมายเหตุ" v-model="memberData.member_locked_info"
          v-validate="'required'" name="info" />
          <span class="text-danger text-sm" v-show="errors.has('info')">{{ errors.first('info') }}</span>
            <span class="text-danger text-sm">ยูสนี้ถูกระงับการใข้งาน กดปุ่มยืนยันเพื่อบันทึกข้อมูล</span>
          </div>
          <div v-else>
            <span class="text-warning text-sm">เลื่อนเปิดเพื่อระงับการใข้งาน กดปุ่มยืนยันเพื่อบันทึกข้อมูล</span>
          </div>
          <vs-switch v-model="memberData.member_locked">
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
              username:this.memberData.member_username,
              phone:this.memberData.member_phone,
              name:this.memberData.member_name,
              bank:this.selectbank.value,
              bankname:this.selectbank.text,
              memberlocked:this.memberData.member_locked,
              line:this.memberData.member_line,
              password:this.memberData.member_password,
              surname:this.memberData.member_surname,
              info:this.memberData.member_locked_info,
              banknumber:this.memberData.member_bank_number,
              turnover:this.memberData.member_turnover
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
            await log.agent(this.memberData.member_username, 'Edit_info', 0, this.info_log)
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
      if (this.memberData.member_phone !== this.newmemberData.phone) {
        this.info_log += `เบอร์โทร : ${  this.memberData.member_phone  } > ${ this.newmemberData.phone} `
      } if (this.memberData.member_name !== this.newmemberData.name) {
        this.info_log += `ชื่อ : ${  this.memberData.member_name  } > ${  this.newmemberData.name} `
      }  if (this.memberData.member_surname !== this.newmemberData.surname) {
        this.info_log += `นามสกุล : ${ this.memberData.member_surname  } > ${  this.newmemberData.surname} `
      } if (this.memberData.member_turnover !== this.newmemberData.turnover) {
        this.info_log += `ยอดเทิร์นโอเวอร์ : ${  this.memberData.member_turnover  } > ${ this.newmemberData.turnover} `
      } if (this.memberData.member_line !== this.newmemberData.line) {
        this.info_log += `Line : ${  this.memberData.member_line  } > ${  this.newmemberData.line} `
      } if (this.memberData.member_password !== this.newmemberData.password) {
        this.info_log += `Password : ${  this.memberData.member_password  } > ${  this.newmemberData.password} `
      } if (this.memberData.member_bank_number !== this.newmemberData.banknumber) {
        this.info_log += `เลขบัญชี : ${  this.memberData.member_bank_number  } > ${  this.newmemberData.banknumber} `
      } if (this.selectbank.text !== this.newmemberData.banktype) {
        this.info_log += `ธนาคาร : ${  this.selectbank.text  } > ${  this.newmemberData.banktype} `
      } if (this.selectbank.value !== this.newmemberData.bankcode) {
        this.info_log += `BankCode : ${  this.selectbank.value  } > ${  this.newmemberData.bankcode} `
      } if (this.memberData.member_locked !== this.newmemberData.memberlock) {
        this.info_log += `สถานะล็อกผู้ใช้ : ${  this.newmemberData.memberlock} > ${  this.memberData.member_locked  } `
      } if (this.memberData.member_locked_info !== this.newmemberData.info) {
        this.info_log += `หมายเหตุ :  ${  this.newmemberData.info} > ${  this.memberData.member_locked_info  } `
      }

    }

  },
  async mounted () {
    await axios
      .get(`/user/${  this.$route.params.username}`).then(response => (this.memberData = response.data))
    this.selectbank.text = this.memberData.member_bank_type
    this.selectbank.value = this.memberData.member_bank_code
    this.newmemberData.username = this.memberData.member_username
    this.newmemberData.phone = this.memberData.member_phone
    this.newmemberData.name = this.memberData.member_name
    this.newmemberData.banknumber = this.memberData.member_bank_number
    this.newmemberData.turnover = this.memberData.member_turnover
    this.newmemberData.line = this.memberData.member_line
    this.newmemberData.password = this.memberData.member_password
    this.newmemberData.surname = this.memberData.member_surname
    this.newmemberData.bankcode = this.memberData.member_bank_code
    this.newmemberData.memberlock = this.memberData.member_locked
    this.newmemberData.info = this.memberData.member_locked_info
    this.newmemberData.banktype = this.memberData.member_bank_type
  }
}

</script>
