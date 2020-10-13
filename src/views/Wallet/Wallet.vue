<!-- =========================================================================================
    File Name: TableExpandableData.vue
    Description: Create expandable rows which have custom data
========================================================================================== -->


<template>
  <vx-card title="Truewallet">

    <vs-table :data="truewallet">

      <template slot="thead">
        <vs-th>ID</vs-th>
        <vs-th>Email</vs-th>
        <vs-th>Phone</vs-th>
        <vs-th>Name</vs-th>
        <vs-th>Status</vs-th>
        <vs-th></vs-th>
      </template>

      <template slot-scope="{data}">
        <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">
          <vs-td :data="tr.wallet_no">
            {{tr.wallet_no}}
          </vs-td>
          <vs-td :data="tr.wallet_email">
            {{tr.wallet_email}}
          </vs-td>
          <vs-td :data="tr.wallet_phone">
            {{tr.wallet_phone}}
          </vs-td>
          <vs-td :data="tr.wallet_name">
            {{tr.wallet_name}}
          </vs-td>
          <vs-td :data="tr.wallet_status">
            <vs-switch v-model="tr.wallet_status" @click="update_status(tr.wallet_no,tr.wallet_phone,tr.wallet_status)">
              <span slot="on">On</span>
              <span slot="off">Off</span>
            </vs-switch>
          </vs-td>
          <div class="flex">

            <router-link :to="`/wallet/list/${tr.wallet_no}`">
            <vs-button type="border" size="small" icon-pack="feather" icon="icon-list" class="mr-2"
              v-model="tr.wallet_no">List</vs-button>
              </router-link>
              <router-link :to="`/wallet/listsms/${tr.wallet_no}`">
            <vs-button type="border" size="small" icon-pack="feather" icon="icon-mail" class="mr-2"
              v-model="tr.wallet_no">List sms</vs-button>
              </router-link>
            <vs-button type="border" size="small" icon-pack="feather" icon="icon-log-in" color="success" class="mr-2"
              v-model="tr.wallet_no" @click="req_otp(tr.wallet_no,tr.wallet_phone)">Login
            </vs-button>
          </div>


        </vs-tr>
      </template>
    </vs-table>

    <vs-popup classContent="popup-example" title="ยืนยัน OTP" :active.sync="popup_req_otp">
      
      <vx-input-group class="mb-base">
        <template slot="prepend">
          <div class="prepend-text bg-primary">
            <span>REF</span>
          </div>
        </template>

        <vs-input placeholder="Ref" v-model="wallet_ref" />
      </vx-input-group>

      <vx-input-group class="mb-base">
        <template slot="prepend">
          <div class="prepend-text bg-primary">
            <span>OTP</span>
          </div>
        </template>

        <vs-input ref="inputOtp" placeholder="OTP" v-model="wallet_otp" />
      </vx-input-group>
      <vs-button @click="verify_otp()" color="primary" type="filled">Login</vs-button>
    </vs-popup>

  </vx-card>
</template>

<script>
import axios from '../../axios'
import log from '../../log'
export default {
  data () {
    return {
      truewallet: [],
      onoff_status: '',
      wallet_data: [],
      wallet_ref: 'Loding...',
      wallet_otp: '',
      wallet_no2: '',
      login_status: '',
      popup_req_otp: false
    }
  },
  async mounted () {
    await axios
      .get('wallet/settingwallet')
      .then(response => (this.truewallet = response.data))
  },
  methods: {
    async update_status (wallet_no, wallet_phone, wallet_status) {
      this.onoff_status = 0
      if (wallet_status === true) {
        wallet_status = false
      } else {
        wallet_status = true
      }
      await axios
        .post('wallet/settingwallet/status', {
          no: wallet_no,
          status: wallet_status
        })
        .then(response => (this.onoff_status = response.data))
      if (this.onoff_status.status === true) {
        this.$vs.notify({
          time:3000,
          color: wallet_status === true ? 'success' : 'warning',
          position:'top-right',
          icon:  wallet_status === true ? 'check_box' : 'error',
          title: wallet_status === true ? 'เปิดแสดง wallet หน้าเว็บสำเร็จ' : 'ปิดแสดง wallet หน้าเว็บสำเร็จ',
          text: wallet_status === true ? `เบอร์ : ${wallet_phone}` : `เบอร์ : ${wallet_phone}`
        })
        await log.agent('', 'Status_Wallet', 0, wallet_status === true ? `เปิดสถานะล็อกอิน เบอร์ : ${wallet_phone}` : `ปิดสถานะล็อกอิน เบอร์ : ${wallet_phone}`)
      } else {
        this.$vs.notify({
          time:8000,
          color: 'danger',
          position:'top-right',
          icon:  'error',
          title: wallet_status === true ? 'เปิดแสดง wallet หน้าเว็บไม่สำเร็จ!!' : 'ปิดแสดง wallet หน้าเว็บไม่สำเร็จ!!',
          text: 'กรุณาติดต่อทีมงานโปรแกรมเมอร์'
        })
      }
    },
    async req_otp (id, phone) {
      this.wallet_no2 = id
      this.wallet_ref = 'Loding...'
      this.wallet_otp = ''
      this.popup_req_otp = true
      this.$nextTick(() => {
        this.$refs.inputOtp.$el.querySelector('input').focus()
      })
      await axios
        .get(`wallet/reqotp/${ id}`)
        .then(response => (this.wallet_data = response.data))
      if ('code' in this.wallet_data) {
        this.wallet_ref = this.wallet_data.data.otp_reference
        await log.agent('', 'Reqotp_Wallet', 0, `ขอ otp เบอร์ : ${phone} OTP : ${this.wallet_ref}`)
      } else {
        this.$vs.notify({
          time:8000,
          color: 'danger',
          position:'top-right',
          icon:'error',
          title: this.wallet_data.error.code,
          text: `${this.wallet_data.error.title  }-${  this.wallet_data.error.message}`
        })
        await log.agent('', 'Reqotp_Wallet', 0, `ขอ otp เบอร์ : ${phone} OTP ไม่มา`)
      }
    },
    async verify_otp () {
      await axios.post('wallet/verifyotp', {
        wallet_no: this.wallet_no2,
        ref: this.wallet_ref,
        otp: this.wallet_otp
      })
        .then(response => (this.login_status = response.data)) 
      this.popup_req_otp = false
      if ('code' in this.login_status) {
        this.$vs.notify({
          time:8000,
          color: 'success',
          position:'top-right',
          icon:'check_box',
          title: this.login_status.code,
          text: 'Login Truewallet สำเร็จ'
        })
      } else {
        this.$vs.notify({
          time:8000,
          color: 'danger',
          position:'top-right',
          icon:'error',
          title: this.login_status.error.code,
          text: `${this.login_status.error.title  }-${  this.login_status.error.message}`
        })
      }
    }
  }
}

</script>
