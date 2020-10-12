<template>
  <vx-card no-shadow>
    <vs-list>
      <vs-list-header title="UserInfo" color="success" icon="description"></vs-list-header>
      <br />
      <p>ชื่อผู้ใช้ : {{memberData.member_username}}</p>
      <vs-divider />
      <p>เบอร์โทร : {{memberData.member_phone}}</p>
      <vs-divider />
      <p>รหัสผ่าน : {{memberData.member_password}}</p>
      <vs-divider />
      <p>ไอพี : {{memberData.member_lastplay_ip}} </p>
      <vs-divider />
      <p>ชื่อ - นามสกุล : {{memberData.member_name}} {{memberData.member_surname}}</p>
      <vs-divider />
      <p>อีเมลล์ : {{memberData.email}}</p>
      <vs-divider />
      <vs-list-header title="สถิติ" color="blue" icon="swap_horiz"></vs-list-header>
      <p>ร่วมงานวิ่ง : {{memberData.total_run}} ครั้ง</p>
      <p>วิ่งสะสม : {{memberData.total_km}} กิโลเมตร</p>
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
      .get(`/user/${ this.$route.params.username }`).then(response => (this.memberData = response.data.data))
  }
}

</script>
