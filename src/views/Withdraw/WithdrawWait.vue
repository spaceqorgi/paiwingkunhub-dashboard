<template>
  <div id="page-withdraw-wait">
  
    <div class="vx-card p-6">
            <div class="flex flex-wrap items-center">

        <!-- ITEMS PER PAGE -->
        <div class="flex-grow">
          <div class="vx-card__title">
            <h4>รอทำรายการถอนเงิน <span class="uppercase" style="color:rgb(230, 0, 0);">{{this.$route.params.id}}</span></h4>
            <br>
          </div>
  
        </div>
        <vs-button class="mr-6" size="small" icon-pack="feather"  icon="icon-refresh-cw" color="success" @click="get_data()">ดึงรายการถอน</vs-button>
        <vs-button class="mr-22" size="small" icon-pack="feather"  icon="icon-trash" color="danger" @click="clearotp()">ลบ cookie ธนาคาร</vs-button>
       
      </div>
      <vs-table stripe pagination max-items="20" search :data="data_wd">
 <template slot="thead">
    <vs-th sort-key="datetime">Date/Time</vs-th>
    <vs-th sort-key="username">USERNAME</vs-th>
    <vs-th sort-key="credit">CREDIT</vs-th>
    <vs-th sort-key="name">NAME</vs-th>
    <vs-th sort-key="bank">BANK</vs-th>
    <vs-th sort-key="info">INFO</vs-th>
    <vs-th > </vs-th>
    <vs-th sort-key="admin">ADMIN</vs-th>
  </template>

  <template slot-scope="{data}">
    <vs-tr :key="indextr" v-for="(tr, indextr) in data">

      <vs-td :data="data[indextr].date_time">
        {{moment(data[indextr].date_time).format('YYYY-MM-DD HH:mm:ss')  }}
      </vs-td>

      <!-- <vs-td :data="data[indextr].username">
        {{ data[indextr].username }}
      </vs-td> -->
 <vs-td class="text-danger"><router-link :to="`/member/${data[indextr].username}`">{{ data[indextr].username}}</router-link></vs-td>
      <vs-td :data="data[indextr].amount">
        {{ currency(data[indextr].amount) }}
      </vs-td>

      <vs-td :data="data[indextr].fullname">
        {{ data[indextr].fullname }}
      </vs-td>

      <vs-td :data="data[indextr].bank">
        {{ data[indextr].bank }}
      </vs-td>
      <vs-td :data="data[indextr].info">
        {{ data[indextr].info }}
      </vs-td>
      <vs-td>

       <vs-button class="mx-1" size="small" color="rgb(115, 103, 240)" type="filled" @click="req_bank(data[indextr].username,data[indextr].amount,data[indextr].bank_code,data[indextr].bank_number,data[indextr].wd_id  )">ถอน
      </vs-button>
      <vs-button class="mx-1" size="small" color="success" type="filled" @click="checkpopup_confirm(data[indextr].wd_id,data[indextr].fullname)">ยืนยัน
      </vs-button>  
      <vs-button class="mx-1" size="small" color="rgb(62, 201, 214)" type="filled"
        @click="req_return(data[indextr].username,data[indextr].amount,data[indextr].bank_code,data[indextr].bank_number,data[indextr].wd_id)">คืน
      </vs-button>
      <vs-button class="mx-1" size="small" color="danger" type="filled" @click="req_cancel(data[indextr].username,data[indextr].amount,data[indextr].bank_code,data[indextr].bank_number,data[indextr].wd_id)">ยกเลิก
      </vs-button>
      </vs-td>
      <vs-td :data="data[indextr].admin" v-if="data[indextr].admin == null" class="text-center">
        -
      </vs-td>
       <vs-td :data="data[indextr].admin" v-else>
        {{ data[indextr].admin }}
      </vs-td>

    </vs-tr>
    
  </template>
</vs-table>
<!------------------------------------------------------------------- ยืนยัน popup------------------------------------------------------------------------------>
      <vs-popup classContent="popup-example" title="ถอนมือ" :active.sync="popup_confirm">
        <div class="text-center">
            <h3 class="text-success">ยืนยันการถอน</h3>
            <p>ของ " {{this.data_confirm.name}} "</p>
            <p>กดปุ่มยืนยันเพื่อใช้งานระบบ</p>
            <br>
            <vs-button class="mx-1" size="small" color="success" type="filled" @click="confirm(data_confirm.wd_id)">ยืนยัน
      </vs-button>  
        </div>
       

      </vs-popup>
 <!---------------------------------------------------------------------ยืนยัน popup END--------------------------------------------------------------------->
<!------------------------------------------------------------------- cler otp popup------------------------------------------------------------------------------>
      <vs-popup classContent="popup-example" title="เลือกธนาคาร" :active.sync="popupotp">
        <!-- SCB -->
        <p class="text-center mt-2 mx-2" style="color:black;">ลบ Cookie SCB</p>
        <vs-button class="mt-2 mx-2" size="small" color="rgb(86, 2, 126)" type="filled"
          @click="clear_scb_otp(item.bank_id, 'scb')"
          v-for="(item, index) in scb_bank" :key="index+'CLEARSCB'">SCB-{{item.bank_id}}
        </vs-button>
        <br>
        <!-- GSB -->
        <p class="text-center mt-2 mx-2" style="color:black;">ลบ Cookie GSB</p>
        <vs-button class="mt-2 mx-2" size="small" color="rgb(236, 6, 141)" type="filled"
          @click="clear_gsb_otp(item.bank_id, 'gsb')"
          v-for="(item, index) in gsb_bank" :key="index+'CLEARGSB'">GSB-{{item.bank_id}}
        </vs-button>
        <br>
        <!-- BAY -->
         <p class="text-center mt-2 mx-2" style="color:black;">ลบ Cookie BAY</p>
        <vs-button class="mt-2 mx-2" size="small" color="rgb(255, 165, 0)" type="filled"
          @click="clear_bay_otp(item.bank_id, 'bay')"
          v-for="(item, index) in bay_bank" :key="index+'CLEARBAY'">BAY-{{item.bank_id}}
        </vs-button>
      </vs-popup>
 <!---------------------------------------------------------------------cler otp popup END--------------------------------------------------------------------->
 <!---------------------------------------------------------------------ถอน popup START--------------------------------------------------------------------->
      <vs-popup classContent="popup-example" title="เลือกธนาคาร" :active.sync="popup_wd">
        <!-- SCB WEB -->
        <p class="text-center mt-2 mx-2" style="color:white;">ถอน SCB ผ่านเว็บ</p>
        <vs-button class="mt-2 mx-2" size="small" color="rgb(86, 2, 126)" type="filled"
          @click="req_scb_otp(item.bank_id, withdrawdata.bank_code, withdrawdata.bank_number, withdrawdata.amount)"
          v-for="(item, index) in scb_bank" :key="index + 'scb'">SCB-{{item.bank_id}}
        </vs-button>
        <br>
        <!-- SCB APP -->
        <p class="text-center mt-2 mx-2" style="color:white;">ถอน SCB ผ่านแอพ</p>
        <vs-button class="mt-2 mx-2" size="small" color="rgb(86, 2, 126)" type="filled"
          @click="verify_scb_app(item.bank_id, withdrawdata.bank_code, withdrawdata.bank_number, withdrawdata.amount, withdrawdata.wd_id)"
          v-for="(item, index) in scb_bank" :key="index + 'scb'">SCB-{{item.bank_id}}
        </vs-button>
        <br>
        <!-- GSB -->
        <p class="text-center mt-2 mx-2" style="color:white;">ถอน GSB</p>
        <vs-button class="mt-2 mx-2" size="small" color="rgb(236, 6, 141)" type="filled"
          @click="req_gsb_otp(item.bank_id, withdrawdata.bank_code, withdrawdata.bank_number, withdrawdata.amount)"
          v-for="(item, index) in gsb_bank" :key="index + 'gsb'">GSB-{{item.bank_id}}
        </vs-button>
        <br>
        <!-- BAY -->
         <p class="text-center mt-2 mx-2" style="color:white;">ถอน BAY</p>
        <vs-button class="mt-2 mx-2" size="small" color="rgb(255, 165, 0)" type="filled"
          @click="req_bay_otp(item.bank_id, withdrawdata.bank_code, withdrawdata.bank_number, withdrawdata.amount)"
          v-for="(item, index) in bay_bank" :key="index + 'bay'">BAY-{{item.bank_id}}
        </vs-button>
      </vs-popup>
   
       <!-- POPUP SCB WEB -->
      <vs-popup classContent="popup-scb" title="ถอน SCB ยืนยัน OTP" :active.sync="popup_scb">
        <br>
        <vx-input-group class="mb-base">
          <template slot="prepend">
            <div class="prepend-text bg-primary">
              <span>INFO</span>
            </div>
          </template>

          <vs-input placeholder="Info" v-model="scb_form.info_scb" disabled />
        </vx-input-group>

        <vx-input-group class="mb-base">
          <template slot="prepend">
            <div class="prepend-text bg-primary">
              <span>REF</span>
            </div>
          </template>

          <vs-input placeholder="Ref" v-model="scb_form.ref_scb" />
        </vx-input-group>

        <vx-input-group class="mb-base">
          <template slot="prepend">
            <div class="prepend-text bg-primary">
              <span>OTP</span>
            </div>
          </template>

          <vs-input ref="inputOtp" placeholder="OTP" v-model="scb_form.otp_scb" />
        </vx-input-group>
        <vs-button
          @click="verify_scb_otp(withdrawdata.bank_code, withdrawdata.username, withdrawdata.amount, withdrawdata.wd_id)"
          color="primary" type="filled">ยืนยันOTP</vs-button>
      </vs-popup>
             <!-- POPUP SCB APP -->
      <vs-popup classContent="popup-scb" title="ถอน SCB APP ยืนยัน" :active.sync="popup_scb_app">
        <br>
        <vx-input-group class="mb-base">
          <template slot="prepend">
            <div class="prepend-text bg-primary">
              <span>ยอดเงินคงเหลือในบัญชี</span>
            </div>
          </template>

          <vs-input placeholder="ยอดเงินคงเหลือในบัญชี" v-model="scb_app_form.balance_scb" />
        </vx-input-group>

        <vx-input-group class="mb-base">
          <template slot="prepend">
            <div class="prepend-text bg-primary">
              <span>INFO</span>
            </div>
          </template>

          <vs-input placeholder="Info" v-model="scb_app_form.info_scb" disabled />
        </vx-input-group>

        <vs-button
          @click="confirm_scb_app(withdrawdata.bank_code, withdrawdata.username, withdrawdata.amount, withdrawdata.wd_id)"
          color="primary" type="filled">ยืนยันการโอนเงิน</vs-button>
      </vs-popup>
            <!-- POPUP GSB -->
      <vs-popup classContent="popup-gsb" title="ถอน GSB ยืนยัน OTP" :active.sync="popup_gsb">
        <br>
        <vx-input-group class="mb-base">
          <template slot="prepend">
            <div class="prepend-text bg-primary">
              <span>INFO</span>
            </div>
          </template>

          <vs-input placeholder="Info" v-model="gsb_form.info_gsb" disabled />
        </vx-input-group>

        <vx-input-group class="mb-base">
          <template slot="prepend">
            <div class="prepend-text bg-primary">
              <span>REF</span>
            </div>
          </template>

          <vs-input placeholder="Ref" v-model="gsb_form.ref_gsb" />
        </vx-input-group>

        <vx-input-group class="mb-base">
          <template slot="prepend">
            <div class="prepend-text bg-primary">
              <span>OTP</span>
            </div>
          </template>

          <vs-input ref="inputOtp" placeholder="OTP" v-model="gsb_form.otp_gsb" />
        </vx-input-group>
        <vs-button
          @click="verify_gsb_otp(withdrawdata.bank_code, withdrawdata.bank_number, withdrawdata.username, withdrawdata.amount, withdrawdata.wd_id)"
          color="primary" type="filled">ยืนยันOTP</vs-button>
      </vs-popup>

            <!-- POPUP BAY -->
      <vs-popup classContent="popup-bay" title="ถอน BAY ยืนยัน OTP" :active.sync="popup_bay">
        <br>
        <vx-input-group class="mb-base">
          <template slot="prepend">
            <div class="prepend-text bg-primary">
              <span>INFO</span>
            </div>
          </template>

          <vs-input placeholder="Info" v-model="bay_form.info_bay" disabled />
        </vx-input-group>

        <vx-input-group class="mb-base">
          <template slot="prepend">
            <div class="prepend-text bg-primary">
              <span>REF</span>
            </div>
          </template>

          <vs-input placeholder="Ref" v-model="bay_form.ref_bay" />
        </vx-input-group>

        <vx-input-group class="mb-base">
          <template slot="prepend">
            <div class="prepend-text bg-primary">
              <span>OTP</span>
            </div>
          </template>

          <vs-input ref="inputOtp" placeholder="OTP" v-model="bay_form.otp_bay" />
        </vx-input-group>
        <vs-button
          @click="verify_bay_otp(withdrawdata.username, withdrawdata.amount, withdrawdata.wd_id)"
          color="primary" type="filled">ยืนยันOTP</vs-button>
      </vs-popup>
 <!---------------------------------------------------------------------ถอน popup END--------------------------------------------------------------------->


  <!-- POPUP RETRUN CREDIT -->
      <vs-popup classContent="popup-example" title="กรุณากรอกหมายเหตุ คืนเครดิต" :active.sync="popup_return">
        <br>
        <vx-input-group class="mb-base">
          <template slot="prepend">
            <div class="prepend-text bg-primary">
              <span>Info</span>
            </div>
          </template>

          <vs-input placeholder="Info" v-model="info" />
        </vx-input-group>

        <vs-button @click="returncredit(withdrawdata.username, withdrawdata.amount, withdrawdata.wd_id)" color="primary"
          type="filled">ยืนยัน</vs-button>
      </vs-popup>

      <!-- POPUP CANCEL WD -->
      <vs-popup classContent="popup-example" title="กรุณากรอกหมายเหตุ ยกเลิกการถอน" :active.sync="popup_cancel">
        <br>
        <vx-input-group class="mb-base">
          <template slot="prepend">
            <div class="prepend-text bg-primary">
              <span>Info</span>
            </div>
          </template>

          <vs-input placeholder="Info" v-model="info" />
        </vx-input-group>

        <vs-button @click="cancel(withdrawdata.username, withdrawdata.wd_id)" color="primary" type="filled">ยืนยัน
        </vs-button>
      </vs-popup>
    </div>
    
  </div>

</template>

<script>
import flatPickr from 'vue-flatpickr-component'
import 'flatpickr/dist/flatpickr.css'
import {
  AgGridVue
} from 'ag-grid-vue'
import '@/assets/scss/vuexy/extraComponents/agGridStyleOverride.scss'
import vSelect from 'vue-select'
import CellRendererActions from './cell-renderer/CellRendererActions.vue'

import axios from '../../axios'
import moment from 'moment'

// function currencyFormatter (params) {
//   return (params.value).replace(/\d(?=(\d{3})+\.)/g, '$&,')
// }
 
export default {
  components: {
    AgGridVue,
    vSelect,
    moment,
    flatPickr,
    CellRendererActions
  },
  data () {
    return {
      popup_wd: false,
      popup_return: false,
      popup_cancel: false,
      popup_scb: false,
      popup_gsb: false,
      popup_bay: false,
      popup_scb_app: false,
      withdrawdata: {
        username: '',
        amount: '',
        bank_code: '',
        bank_number: '',
        wd_id:''
      },
      scb_bank: [],
      get_scb_status: [],
      scb_form: {
        bank_id: '',
        ref_scb: '',
        otp_scb: '',
        info_scb: ''
      },
      get_scb_app: [],
      scb_app_form: {
        bank_id: '',
        balance_scb: '',
        info_scb: '',
        data_scb: ''
      },
      gsb_bank: [],
      get_gsb_status: [],
      gsb_form: {
        bank_id: '',
        ref_gsb: '',
        otp_gsb: '',
        info_gsb: '',
        from_acc_id: ''
      },
      bay_bank: [],
      get_bay_status: [],
      bay_form: {
        bank_id: '',
        ref_bay: '',
        otp_bay: '',
        info_bay: '',
        url: ''
      },
      info: '',
      status_wd: [],
      get_data_wd: [],
      data_wd: [],
      count_staff_wd: [],
      components: '',
      popupotp:false,
      popup_confirm:false,
      data_confirm : {
        wd_id:'',
        name:''
      },
      clearcookie:''
    }
  },
  methods: {
    async checkpopup_confirm (data, name) {
      this.popup_confirm = true
      this.data_confirm.wd_id = data
      this.data_confirm.name = name
    },
    currency (amount) {
      if (amount >= 0) {
        if (typeof amount === 'number') {
          amount = String(Math.abs(amount))
        }
        return (amount).replace(/\d(?=(\d{3})+\.)/g, '$&,')
      } else {
        return `${(amount).replace(/\d(?=(\d{3})+\.)/g, '$&,')}`
      }

    },
    set_store () {
      this.status_wd = true
    },
    async get_data () {
      // GET staff.length withdraw 
      await axios
        .get('settingwithdraw/settingwithdraw')
        .then(response => (this.count_staff_wd = response.data))

      // GET  waiting withdraw data
      await axios
        .get(`withdraw/waitwithdraw/${this.count_staff_wd[0].setting_data}/${this.$route.params.id}`)
        .then(response => (this.get_data_wd = response.data))
      this.data_wd = this.get_data_wd.data
    },
    async get_scb_bank () {
      // GET SCB BANK
      await axios
        .get('settingwallet/banktransfer/scb')
        .then(response => (this.scb_bank = response.data))
    },
    async get_gsb_bank () {
      // GET GSB BANK
      await axios
        .get('settingwallet/banktransfer/gsb')
        .then(response => (this.gsb_bank = response.data))
    },
    async get_bay_bank () {
      // GET BAY BANK
      await axios
        .get('settingwallet/banktransfer/bay')
        .then(response => (this.bay_bank = response.data))
    },
    async clearotp () {
      this.popupotp = true
      this.get_scb_bank()
      this.get_gsb_bank()
      this.get_bay_bank()
    },
    async req_bank (username, amount, bank_code, bank_number, wd_id) {
      this.popup_wd = true
      this.withdrawdata.username = username
      this.withdrawdata.amount = amount
      this.withdrawdata.bank_code = bank_code
      this.withdrawdata.bank_number = bank_number
      this.withdrawdata.wd_id = wd_id
      await this.get_scb_bank()
      await this.get_gsb_bank()
      await this.get_bay_bank()
    },
    async clear_scb_otp (id, bankcode) {
      await axios
        .post('withdraw/clearcookie', {
          bankid:id,
          bank:bankcode
        }).then(response => (this.clearcookie = response.data))
      await this.statusclearcookie(id, bankcode)   
    },
    async clear_gsb_otp (id, bankcode) {
      await axios
        .post('withdraw/clearcookie', {
          bankid:id,
          bank:bankcode
        }).then(response => (this.clearcookie = response.data))
      await this.statusclearcookie(id, bankcode) 
    },
    async clear_bay_otp (id, bankcode) {
      await axios
        .post('withdraw/clearcookie', {
          bankid:id,
          bank:bankcode
        }).then(response => (this.clearcookie = response.data))
      await this.statusclearcookie(id, bankcode) 
    },
    statusclearcookie (id, bankcode) {
      this.$vs.notify({
        time:5000,
        color: this.clearcookie.status === true ? 'success' : 'warning',
        position:'top-right',
        icon:  this.clearcookie.status === true ? 'check_box' : 'error',
        title: this.clearcookie.status === true ? 'ทำรายการสำเร็จ' : 'ทำรายการไม่สำเร็จ',
        text:  this.clearcookie.status === true ? `clear cookie ${bankcode}-${id} สำเร็จ`  : `clear cookie ${bankcode}-${id} ไม่สำเร็จ`})
    },
    clear_data () {
      //clear scb  data
      this.get_scb_status = []
      this.scb_form.bank_id = ''
      this.scb_form.ref_scb = ''
      this.scb_form.otp_scb = ''
      this.scb_form.info_scb = ''
      //clear gsb data
      this.get_gsb_status = []
      this.gsb_form.bank_id = ''
      this.gsb_form.ref_gsb = ''
      this.gsb_form.otp_gsb = ''
      this.gsb_form.info_gsb = ''
      this.gsb_form.from_acc_id = ''
      //clear bay data
      this.get_bay_status = []
      this.bay_form.bank_id = ''
      this.bay_form.ref_bay = ''
      this.bay_form.otp_bay = ''
      this.bay_form.info_bay = ''
      this.bay_form.url = ''
      //clear scb app data
      this.get_scb_app = []
      this.scb_app_form.bank_id = ''
      this.scb_app_form.balance_scb = ''
      this.scb_app_form.info_scb = ''
      this.scb_app_form.data_scb = ''
      //clear data
      this.info = ''
      this.status_wd = []
    },
    async confirm (wd_id) {
      await axios
        .post('withdraw/confirmwithdraw', {
          wd_id
        })
        .then(response => (this.status_wd = response.data))
      if (this.status_wd.status === true) {
        this.$vs.notify({
          time: 3000,
          color: 'success',
          position: 'top-right',
          icon: 'check_box',
          title: 'ถอนสำเร็จ',
          text: this.status_wd.info
        })
        this.set_store()
        this.get_data()
        this.popup_confirm = false
      } else {
        this.$vs.notify({
          time: 8000,
          color: 'danger',
          position: 'top-right',
          icon: 'error',
          title: 'ถอนไม่สำเร็จ',
          text: this.status_wd.info
        })
      }
    },
    req_return (username, amount, bank_code, bank_number, wd_id) {
      this.withdrawdata.username = username
      this.withdrawdata.amount = amount
      this.withdrawdata.bank_code = bank_code
      this.withdrawdata.bank_number = bank_number
      this.withdrawdata.wd_id = wd_id
      this.popup_return = true
    },
    async returncredit (username, amount, wd_id) {
      this.popup_return = false
      await axios
        .post('withdraw/returnwithdraw', {
          username,
          amount,
          wd_id,
          info: this.info
        })
        .then(response => (this.status_wd = response.data))
      if (this.status_wd.status === true) {
        this.$vs.notify({
          time: 3000,
          color: 'success',
          position: 'top-right',
          icon: 'check_box',
          title: 'คืนเครดิตสำเร็จ',
          text: this.status_wd.info
        })
        this.set_store()
        this.get_data()
      } else {
        this.$vs.notify({
          time: 8000,
          color: 'danger',
          position: 'top-right',
          icon: 'error',
          title: 'คืนเครดิตไม่สำเร็จ',
          text: this.status_wd.info
        })
        this.clear_data()
      }
    },
    req_cancel (username, amount, bank_code, bank_number, wd_id) {
      this.withdrawdata.username = username
      this.withdrawdata.amount = amount
      this.withdrawdata.bank_code = bank_code
      this.withdrawdata.bank_number = bank_number
      this.withdrawdata.wd_id = wd_id
      this.popup_cancel = true
    },
    async cancel (username, wd_id) {
      this.popup_cancel = false
      await axios
        .post('withdraw/cancelwithdraw', {
          wd_id,
          info: this.info
        })
        .then(response => (this.status_wd = response.data))
      if (this.status_wd.status === true) {
        this.$vs.notify({
          time: 3000,
          color: 'success',
          position: 'top-right',
          icon: 'check_box',
          title: 'ยกเลิกถอนสำเร็จ',
          text: this.status_wd.info
        })
        this.clear_data()
        this.set_store()
        this.get_data()
      } else {
        this.$vs.notify({
          time: 8000,
          color: 'danger',
          position: 'top-right',
          icon: 'error',
          title: 'ยกเลิกถอนไม่สำเร็จ',
          text: this.status_wd.info
        })
        this.clear_data()
      }
    },  //REQUEST SCB OTP
    async req_scb_otp (bankid, bank_code, bank_number, amount) {
      this.popup_wd = false
      this.popup_scb = true
      this.scb_form.info_scb = 'Loading...'
      this.scb_form.ref_scb = 'Loading...'
      this.scb_form.bank_id = bankid
      await axios.post('withdraw/transfer/scb', {
        bank_id: bankid,
        bank_code,
        bank_number,
        amount
      }).then(response => (this.get_scb_status = response.data))
      if (this.get_scb_status.success === true) {
        this.scb_form.ref_scb = this.get_scb_status.ref
        this.scb_form.info_scb = `โอนไปบัญชี ${  this.get_scb_status.toAcc}`
        if ('toName' in this.get_scb_status) {
          this.scb_form.info_scb =
              `โอนไปบัญชี ${ this.get_scb_status.toAcc  } บัญชีชื่อ ${  this.get_scb_status.toName}`
        }
      } else {
        this.popup_scb = false
        this.$vs.notify({
          time: 8000,
          color: 'danger',
          position: 'top-right',
          icon: 'error',
          title: 'ไม่สามารถขอ OTP ได้',
          text: 'กรุณาลองใหม่อีกครั้ง'
        })
        this.clear_data()
        this.set_store()
      }
    },  //VERIFY SCB OTP
    async verify_scb_otp (bank_code, username, amount, wd_id) {
      this.$vs.loading()
      await axios
        .post('withdraw/transfer/scb/confirm', {
          bank_id: this.scb_form.bank_id,
          bank_code,
          otp: this.scb_form.otp_scb,
          wd_id
        })
        .then(response => (this.status_wd = response.data))
      if (this.status_wd.success === true) {
        this.$vs.loading.close()
        this.popup_scb = false
        this.$vs.notify({
          time: 3000,
          color: 'success',
          position: 'top-right',
          icon: 'check_box',
          title: 'ถอนเงินสำเร็จ',
          text: `ยูสเซอร์ ${ username  } จำนวนเงิน ${ amount}`
        })
        this.clear_data()
        this.set_store()
        this.get_data()
      } else {
        this.$vs.loading.close()
        this.popup_scb = false
        this.$vs.notify({
          time: 8000,
          color: 'danger',
          position: 'top-right',
          icon: 'error',
          title: 'ถอนเงินไม่สำเร็จ',
          text: `ยูสเซอร์ ${ username  } จำนวนเงิน ${ amount}`
        })
        this.clear_data()
        this.set_store()
      }
    }, //REQUEST GSB OTP
    async req_gsb_otp (bankid, bank_code, bank_number, amount) {
      this.popup_wd = false
      this.popup_gsb = true
      this.gsb_form.info_gsb = 'Loading...'
      this.gsb_form.ref_gsb = 'Loading...'
      this.gsb_form.bank_id = bankid
      await axios.post('withdraw/transfer/gsb', {
        bank_id: bankid,
        bank_code,
        bank_number,
        amount
      }).then(response => (this.get_gsb_status = response.data))
      if (this.get_gsb_status.success === true) {
        this.gsb_form.ref_gsb = this.get_gsb_status.ref
        this.gsb_form.from_acc_id = this.get_gsb_status.fromAccountId
        if ('toAcc' in this.get_gsb_status) {
          this.gsb_form.info_gsb =
              `โอนไปบัญชี ${  this.get_gsb_status.toAcc  } บัญชีชื่อ ${  this.get_gsb_status.toName}`
        } else {
          this.gsb_form.info_gsb =
            `โอนไปบัญชีชื่อ ${  this.get_gsb_status.toName}`
        }
      } else {
        this.popup_gsb = false
        this.$vs.notify({
          time: 8000,
          color: 'danger',
          position: 'top-right',
          icon: 'error',
          title: 'ไม่สามารถขอ OTP ได้',
          text: 'กรุณาลองใหม่อีกครั้ง'
        })
        this.clear_data()
        this.set_store()
      }
    },  // VERIFY GSB OTP
    async verify_gsb_otp (bank_code, bank_number, username, amount, wd_id) {
      this.$vs.loading()
      await axios
        .post('withdraw/transfer/gsb/confirm', {
          bank_id: this.gsb_form.bank_id,
          bank_code,
          bank_number,
          otp: this.gsb_form.otp_gsb,
          amount,
          fromAccountId: this.gsb_form.from_acc_id,
          wd_id
        })
        .then(response => (this.status_wd = response.data))
      if (this.status_wd.success === true) {
        this.$vs.loading.close()
        this.popup_gsb = false
        this.$vs.notify({
          time: 3000,
          color: 'success',
          position: 'top-right',
          icon: 'check_box',
          title: 'ถอนเงินสำเร็จ',
          text: `ยูสเซอร์${ username  }จำนวนเงิน${ amount}`
        })
        this.clear_data()
        this.set_store()
        this.get_data()
      } else {
        this.$vs.loading.close()
        this.popup_gsb = false
        this.$vs.notify({
          time: 8000,
          color: 'danger',
          position: 'top-right',
          icon: 'error',
          title: 'ถอนเงินไม่สำเร็จ',
          text: `ยูสเซอร์${ username  }จำนวนเงิน${ amount}`
        })
        this.clear_data()
        this.set_store()
      }
    }, // REQUEST BAY OTP
    async req_bay_otp (bankid, bank_code, bank_number, amount) {
      this.popup_wd = false
      this.popup_bay = true
      this.bay_form.info_bay = 'Loading...'
      this.bay_form.ref_bay = 'Loading...'
      this.bay_form.bank_id = bankid
      await axios.post('withdraw/transfer/bay', {
        bank_id: bankid,
        bank_code,
        bank_number,
        amount
      }).then(response => (this.get_bay_status = response.data))
      if (this.get_bay_status.success === true) {
        this.bay_form.ref_bay = this.get_bay_status.ref
        this.bay_form.info_bay = `โอนไปบัญชี ${  this.get_bay_status.toAcc}`
        this.bay_form.url = this.get_bay_status.url
      } else {
        this.popup_bay = false
        this.$vs.notify({
          time: 8000,
          color: 'danger',
          position: 'top-right',
          icon: 'error',
          title: 'ไม่สามารถขอ OTP ได้',
          text: 'กรุณาลองใหม่อีกครั้ง'
        })
        this.clear_data()
        this.set_store()
      }
    },  // VERIFY BAY OTP
    async verify_bay_otp (username, amount, wd_id) {
      this.$vs.loading()
      await axios
        .post('withdraw/transfer/bay/confirm', {
          bank_id: this.bay_form.bank_id,
          otp: this.bay_form.otp_bay,
          url: this.bay_form.url,
          wd_id
        })
        .then(response => (this.status_wd = response.data))
      if (this.status_wd.success === true) {
        this.$vs.loading.close()
        this.popup_bay = false
        this.$vs.notify({
          time: 3000,
          color: 'success',
          position: 'top-right',
          icon: 'check_box',
          title: 'ถอนเงินสำเร็จ',
          text: `ยูสเซอร์${ username  }จำนวนเงิน${ amount}`
        })
        this.clear_data()
        this.set_store()
        this.get_data()
      } else {
        this.$vs.loading.close()
        this.popup_bay = false
        this.$vs.notify({
          time: 8000,
          color: 'danger',
          position: 'top-right',
          icon: 'error',
          title: 'ถอนเงินไม่สำเร็จ',
          text:  `ยูสเซอร์${ username  }จำนวนเงิน${ amount}`
        })
        this.clear_data()
        this.set_store()
      }
    }, //VERIFY SCB APP
    async verify_scb_app (bankid, bank_code, bank_number, amount, wd_id) {
      this.popup_wd = false
      this.popup_scb_app = true
      this.scb_app_form.info_scb = 'Loading...'
      this.scb_app_form.balance_scb = 'Loading...'
      this.scb_app_form.bank_id = bankid
      await axios.post('withdraw/transfer/scbapp', {
        bank_id: bankid,
        bank_code,
        bank_number,
        amount,
        wd_id
      }).then(response => (this.get_scb_app = response.data))
      if (this.get_scb_app.profile.status.code === 1000) {
        this.scb_app_form.balance_scb = this.get_scb_app.profile.accountBalance
        if (this.get_scb_app.verify.data) {
          this.scb_app_form.info_scb = `โอนไปบัญชี ${ this.get_scb_app.verify.data.accountToName  } เลขบัญชี ${  this.get_scb_app.verify.data.accountTo}`
          this.scb_app_form.data_scb = this.get_scb_app.verify
        } else {
          this.scb_app_form.info_scb = `${this.get_scb_app.verify.status.header  } ${  this.get_scb_app.verify.status.description}`
        }

      } else {
        this.popup_scb_app = false
        this.$vs.notify({
          time: 8000,
          color: 'danger',
          position: 'top-right',
          icon: 'error',
          title: this.get_scb_app.profile.status.header,
          text: this.get_scb_app.profile.status.description
        })
        this.clear_data()
        this.set_store()
      }
    },  //CONFIRM SCB APP
    async confirm_scb_app (bank_code, username, amount, wd_id) {
      this.$vs.loading()
      await axios
        .post('withdraw/transfer/scbapp/confirm', {
          bank_id: this.scb_app_form.bank_id,
          bank_code,
          amount,
          transfer_verify: this.scb_app_form.data_scb,
          wd_id
        })
        .then(response => (this.status_wd = response.data))
      if (this.status_wd.confirm.status.code === 1000) {
        this.$vs.loading.close()
        this.popup_scb_app = false
        this.$vs.notify({
          time: 3000,
          color: 'success',
          position: 'top-right',
          icon: 'check_box',
          title: 'ถอนเงินสำเร็จ',
          text: `ยูสเซอร์ ${ username  } จำนวนเงิน ${ amount}`
        })
        this.clear_data()
        this.set_store()
        this.get_data()
      } else {
        this.$vs.loading.close()
        this.popup_scb = false
        this.$vs.notify({
          time: 8000,
          color: 'danger',
          position: 'top-right',
          icon: 'error',
          title: this.status_wd.confirm.status.header,
          text: this.status_wd.confirm.status.description
        })
        this.clear_data()
        this.set_store()
      }
    }
  },
  async mounted () {
    await this.get_data()
    // await setInterval(() => {
    //   this.get_data()
    // }, 10000)

  }
}

</script>

<style lang="scss" scooped>
  #page-user-list {
    .user-list-filters {
      .vs__actions {
        position: absolute;
        right: 0;
        top: 50%;
        transform: translateY(-58%);
      }
    }
  }
div.ag-root .ag-cell-focus {
    -webkit-user-select: text;
    -moz-user-select: text;
    -ms-user-select: text;
    user-select: text;
}
</style>
