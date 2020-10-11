<template>
  <vx-card no-shadow>
    <vs-list>
      <vs-list-header title="Credit" icon="monetization_on"></vs-list-header>
      <br />
      <p class="text-danger">ยอดเงิน : {{currency(memberData.member_balance)}} บาท</p>
      <p v-if="memberData.member_play_fish == false" class="text-danger">สถานะยิงปลา : ไม่ได้อยู่ในเกม</p>
      <p v-if="memberData.member_play_fish == true" class="text-success">สถานะยิงปลา : อยู่ในเกมยิงปลา</p>
      <p v-if="memberData.member_bonus == 0" class="text-success">โบนัสล่าสุดที่ลูกค้ารับ : ไม่มี</p>
      <p v-else-if="memberData.member_bonus == 1" class="text-danger">โบนัสล่าสุดที่ลูกค้ารับ : สมาชิคใหม่รับโบนัส 50%</p>
      <p v-else-if="memberData.member_bonus == 2" class="text-danger">โบนัสล่าสุดที่ลูกค้ารับ : ฝากเงินครั้งแรกของวันรับโบนัส 10%</p>
      <p v-else-if="memberData.member_bonus == 3" class="text-danger">โบนัสล่าสุดที่ลูกค้ารับ : เปิดไพ่ลุ้นโชค</p>
      <p v-else-if="memberData.member_bonus == 4" class="text-danger">โบนัสล่าสุดที่ลูกค้ารับ : กงล้อลุ้นโชค</p>
      <p>ยอดเทรินโอเวอร์ที่ลูกค้าทำปัจจุบัน : {{currency(memberData.member_sum_turnover)}}</p>
      <p>ยอดเทรินโอเวอร์ขั้นต่ำที่ต้องทำ : {{currency(memberData.member_turnover)}}</p>
      <vs-button class="mr-20" size="small" icon-pack="feather" icon="icon-edit" color="danger"
        @click="popupplayfish()"> ปุ่มแก้สถานะยิงปลา</vs-button>
      <vs-popup classContent="popup-example" title="สถานะยิงปลา" :active.sync="popup_playfish">
        <br>
        <vx-input-group class="mb-base">
          <template slot="prepend">
              <p> กดยืนยันเพื่อแก้สถานะยิงปลา</p>
          </template>
        </vx-input-group>
        <vs-button @click="playfish()" color="primary" type="filled">ยืนยัน</vs-button>
      </vs-popup>
      <br />
      <vs-list-header title="UserInfo" color="success" icon="description"></vs-list-header>
      <br />
      <p>ยูสเซอร์เนม : {{memberData.member_username}}</p>
      <vs-divider />
      <p>เบอร์โทร : {{memberData.member_phone}}</p>
      <vs-divider />
      <p>รหัสผ่าน : {{memberData.member_password}}</p>
      <vs-divider />
      <p>ไอพี : {{memberData.member_lastplay_ip}} </p>
      <vs-divider />
      <p>ชื่อ นามสกุล : {{memberData.member_name}} {{memberData.member_surname}}</p>
      <vs-divider />
      <p>เลขบัญชี : {{memberData.member_bank_number}}</p>
      <vs-divider />
      <p>ธนาคาร : {{memberData.member_bank_type}}</p>
      <vs-divider />
      <p>ไลน์ : {{memberData.member_line}}</p>
      <vs-divider />
      <p class="text-primary">ผู้ที่แนะนำมา ขั้นที่1 : {{memberData.member_aff}}</p>
      <vs-divider />
      <p class="text-success">ผู้ที่แนะนำมา ขั้นที่2 : {{memberData.member_aff2}}</p>
      <vs-divider />
      <p class="text-warning">บัญชีที่ลูกค้าเห็น : {{memberDatabank.bank_for}} {{memberDatabank.bank_fullname}} {{memberDatabank.bank_number}} {{memberDatabank.bank_reserve}}</p>
      <br />
      <vs-list-header title="Summary" color="blue" icon="swap_horiz"></vs-list-header>
      <p>ยอดฝาก : {{currency(memberData.member_topup)}} บาท</p>
      <p>ยอดถอน : {{currency(memberData.member_withdraw)}} บาท</p>
      <br />
    </vs-list>
  </vx-card>
</template>

<script>
import axios from '../../../axios'
export default {
  data () {
    return {
      turnover: 0,
      bank_see: '',
      sum_deposit: 0,
      sum_withdraw: 0,
      memberData: {},
      memberDatabank:{},
      memberDataSumtransaction:[],
      popup_playfish: false
    }
  },
  methods: {
    currency (amount) {
      //SET NULL OR NaN = 0
      if (!amount || amount === 'NaN') {
        amount = 0
      }
      if (amount >= 0) {
        if (typeof amount === 'number') {
          amount = String(Math.abs(amount))
        }
        return (amount).replace(/\d(?=(\d{3})+\.)/g, '$&,')
      } else {
        return `-${(amount).replace(/\d(?=(\d{3})+\.)/g, '$&,')}`
      }
      
    },
    async playfish () {
      await axios
        .post('member/playfish', {
          username: this.$route.params.username
        }).then(response => (this.status = response.data))
      if (this.status.status === true) {
        this.$vs.notify({
          time: 3000,
          color: 'success',
          position: 'top-right',
          icon: 'check_box',
          title: this.status.info
        })
        setTimeout(() => {
          window.location.reload()
        }, 1500)
      } else {
        this.$vs.notify({
          time: 8000,
          color: 'danger',
          position: 'top-right',
          icon: 'error',
          title: 'แก้ไขสถานะยิงปลาไม่สำเร็จ',
          text: this.status.info
        })
        setTimeout(() => {
          window.location.reload()
        }, 1500)
      }
    },
    async popupplayfish () {
      this.popup_playfish = true
    }
  },
  async mounted () {
    await axios
      .get(`/member/${  this.$route.params.username}`).then(response => (this.memberData = response.data))
    await axios
      .get(`member/showbank/${  this.$route.params.username}`).then(response => (this.memberDatabank = response.data))
    if (this.memberDatabank.bank_reserve === 0) {
      this.memberDatabank.bank_reserve = '(บัญขีหลัก)'
    } else {
      this.memberDatabank.bank_reserve = '(บัญขีสำรอง)'
    }
    await axios
      .get(`member/sumtransaction/${  this.$route.params.username}`).then(response => (this.memberDataSumtransaction = response.data))
    this.memberDataSumtransaction[0] = this.currency(this.memberDataSumtransaction[0])
    this.memberDataSumtransaction[1] = this.currency(this.memberDataSumtransaction[1])
  }
}

</script>
