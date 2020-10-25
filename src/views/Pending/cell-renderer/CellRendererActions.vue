<template>
  <div>
    <div class="my-2 inline-flex">
      <vs-button class="mx-1" size="small" color="rgb(115, 103, 240)" type="filled" @click="req_bank()">ถอน
      </vs-button>
      <vs-button class="mx-1" size="small" color="success" type="filled" @click="confirm(params.data.wd_id)">ยืนยัน
      </vs-button>
      <vs-button class="mx-1" size="small" color="rgb(62, 201, 214)" type="filled"
        @click="req_return(params.data.username, params.data.amount, params.data.wd_id)">คืน
      </vs-button>
      <vs-button class="mx-1" size="small" color="danger" type="filled" @click="req_cancel()">ยกเลิก
      </vs-button>

      <!-- POPUP SELECT WD -->
      <vs-popup classContent="popup-example" title="เลือกธนาคาร" :active.sync="popup_wd">
        <!-- SCB -->
        <p class="text-center mt-2 mx-2" style="color:black;">ถอน SCB</p>
        <vs-button class="mt-2 mx-2" size="small" color="rgb(86, 2, 126)" type="filled"
          @click="req_scb_otp(item.bank_id, params.data.bank_code, params.data.bank_number, params.data.amount)"
          v-for="(item, index) in scb_bank" :key="index + 'scb'">SCB-{{item.bank_id}}
        </vs-button>
        <br>
        <!-- GSB -->
        <p class="text-center mt-2 mx-2" style="color:black;">ถอน GSB</p>
        <vs-button class="mt-2 mx-2" size="small" color="rgb(236, 6, 141)" type="filled"
          @click="req_gsb_otp(item.bank_id, params.data.bank_code, params.data.bank_number, params.data.amount)"
          v-for="(item, index) in gsb_bank" :key="index + 'gsb'">GSB-{{item.bank_id}}
        </vs-button>
        <br>
        <!-- BAY -->
         <p class="text-center mt-2 mx-2" style="color:black;">ถอน BAY</p>
        <vs-button class="mt-2 mx-2" size="small" color="rgb(255, 165, 0)" type="filled"
          @click="req_bay_otp(item.bank_id, params.data.bank_code, params.data.bank_number, params.data.amount)"
          v-for="(item, index) in bay_bank" :key="index + 'bay'">BAY-{{item.bank_id}}
        </vs-button>
      </vs-popup>

      <!-- POPUP SCB -->
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
          @click="verify_scb_otp(params.data.bank_code, params.data.username, params.data.amount, params.data.wd_id)"
          color="primary" type="filled">ยืนยันOTP</vs-button>
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
          @click="verify_gsb_otp(params.data.bank_code, params.data.bank_number, params.data.username, params.data.amount, params.data.wd_id)"
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
          @click="verify_bay_otp(params.data.username, params.data.amount, params.data.wd_id)"
          color="primary" type="filled">ยืนยันOTP</vs-button>
      </vs-popup>

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

        <vs-button @click="returncredit(params.data.username, params.data.amount, params.data.wd_id)" color="primary"
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

        <vs-button @click="cancel(params.data.username, params.data.wd_id)" color="primary" type="filled">ยืนยัน
        </vs-button>
      </vs-popup>
    </div>

    <!-- <div :style="{'direction': $vs.rtl ? 'rtl' : 'ltr'}" v-else-if ="params.data.check_use === true">
    <span class="text-success">ใช้งานแล้ว</span>
  </div> -->
  </div>
</template>

<script>
import axios from '../../../axios'
import store from '../../../store/store'
export default {
  name: 'CellRendererActions',
  data () {
    return {
      popup_wd: false,
      popup_return: false,
      popup_cancel: false,
      popup_scb: false,
      popup_gsb: false,
      popup_bay: false,
      scb_bank: [],
      get_scb_status: [],
      scb_form: {
        bank_id: '',
        ref_scb: '',
        otp_scb: '',
        info_scb: ''
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
      status_wd: []
    }
  },
  async mounted () {
    // // GET SCB BANK
    // await axios
    //   .get('settingwallet/banktransfer/scb')
    //   .then(response => (this.scb_bank = response.data))
  },
  methods: {
    set_store () {
      store.commit('SET_STATUS_WD', true)
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
    async req_bank () {
      this.popup_wd = true
      await this.get_scb_bank()
      await this.get_gsb_bank()
      await this.get_bay_bank()
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
    req_return () {
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
    req_cancel () {
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
    }
  }
}

</script>
