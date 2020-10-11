<template>
  <vx-card no-shadow title="เพิ่มบัญชีฝาก">

    <!-- Info -->
   <vs-input class="w-full " v-validate="'required|numeric|max:10'" label-placeholder="หมายเลขบัญชี" v-model="bankno" name="bankno"></vs-input>
     <span class="text-danger text-sm" v-show="errors.has('bankno')">{{ errors.first('bankno') }}</span>
     <br>
    <vs-input class="w-full" v-validate="'required'" label-placeholder="ชื่อบัญชี (ชื่อ-นามสกุล)" v-model="fullname" name="fullname"></vs-input>
     <span class="text-danger text-sm" v-show="errors.has('fullname')">{{ errors.first('fullname') }}</span>
     <br>
    <vs-input class="w-full" v-validate="'required|alpha_num|max:20'" label-placeholder="ยูสเซอร์เนม" v-model="username" name="username"/>
     <span class="text-danger text-sm" v-show="errors.has('username')">{{ errors.first('username') }}</span>
     <br>
    <vs-input class="w-full" v-validate="'required|alpha_num'" label-placeholder="พาสเวิร์ด" v-model="password" name="password"></vs-input>
    <span class="text-danger text-sm" v-show="errors.has('password')">{{ errors.first('password') }}</span>
    <br>
    <vs-input class="w-full " v-validate="'required|numeric'" label-placeholder="เบอร์โทร" v-model="phone" name="phone"></vs-input>
    <span class="text-danger text-sm" v-show="errors.has('phone')">{{ errors.first('phone') }}</span>
    <br>
    <label class="vs-input--label">เลือกรายการธนาคารที่ต้องการเพิ่มบัญชี</label>
    <v-select v-model="bankbank" :options="bankOptions" name="status" :dir="$vs.rtl ? 'rtl' : 'ltr'" />
    <br>
    <label class="vs-input--label">เลือกประเภทบัญชี</label>
    <v-select v-model="reserve" :options="typeOptions" name="test"  :dir="$vs.rtl ? 'rtl' : 'ltr'" />
    <br>
    <br>
    <br>
    <!-- Save & Reset Button -->
    <div class="flex flex-wrap items-center justify-end ">
      <vs-button class="ml-auto mt-2" color="success" @click="Save" >บันทึก</vs-button>
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
import vSelect from 'vue-select'
const dict = {
  custom: {
    username: {
      required: 'กรุณากรอกข้อมูล',
      alpha_num: 'ตัวอักษรภาษาอังกฤษและตัวเลขเท่านั้น',
      max:'กรุณากรอกตัวอักษรไม่เกิน20ตัว'
    },
    password: {
      required: 'กรุณากรอกข้อมูล',
      alpha_num: 'ต้องเป็นตัวเลขหรือจุดทศนิยมเท่านั้น'
    },
    fullname :{
      required : 'กรุณากรอกข้อมูล'
    },
    bankno :{
      required : 'กรุณากรอกข้อมูล',
      numeric:'กรุณากรอกแต่ตัวเลขเท่านั้น',
      max:'กรุณากรอกตัวอักษรไม่เกิน10ตัว'
    },
    phone :{
      required : 'กรุณากรอกข้อมูล',
      numeric:'กรุณากรอกแต่ตัวเลขเท่านั้น'
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
      status:false,
      bankno: '',
      fullname: '',
      username: '',
      password: '',
      phone: '',
      bankbank:'',
      reserve:'',
      bankOptions: [
        {
          label: 'รายการธนาคาร SCB',
          value: 'sa_bank'
        },
        {
          label: 'รายการธนาคาร KBANK',
          value: 'sa_bank_kbank'
        },
        {
          label: 'รายการธนาคาร SCB รับ SCB',
          value: 'sa_bank_scb'
        }
      ],
      typeOptions: [
        {
          label: 'บัญชีหลัก',
          value: '0'
        },
        {
          label: 'บัญชีสำรอง',
          value: '1'
        }
        
      ]
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
          await axios
            .post('settingwallet/insertbank', {
              bankno:this.bankno,
              fullname:this.fullname,
              username:this.username,
              password:this.password,
              phone:this.phone,
              bankbank:this.bankbank.value,
              reserve:this.reserve.value
            }).then(response => (this.status = response.data))
          if (this.status.status === true) {
           
            this.$vs.notify({
              time:3000,
              color:'success',
              position:'top-right',
              icon: 'check_box',
              title: this.status.info
          
            })
            log.agent('', 'Insert_Deposit', 0, `เพิ่มบัญชีฝาก : ${  this.bankbank.value} เลขบัญชี : ${  this.bankno} ชื่อเจ้าของบัญชี : ${  this.fullname}`)
            setTimeout(() => { window.location.reload() }, 1500)
          } else {
            this.$vs.notify({
              time:8000,
              color: 'danger',
              position:'top-right',
              icon:  'error',
              title:'บันทึกไม่สำเร็จ',
              text: this.status.info
            })
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
      this.bankno = ''
      this.fullname = ''
      this.username = ''
      this.password = ''
      this.phone = ''
      this.bankbank = ''
      this.reserve = ''
    //  setTimeout(() => {  window.location.reload() }, 1000)
    }
    
  }
}

</script>
