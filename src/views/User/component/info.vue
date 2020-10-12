<template>
  <vx-card no-shadow>
    <vs-list>
      <vs-list-header title="UserInfo" color="success" icon="description"></vs-list-header>
      <br />
      <p>ชื่อผู้ใช้ : {{userData.username}}</p>
      <vs-divider />
      <p>เบอร์โทร : {{userData.phone}}</p>
      <vs-divider />
      <p>ชื่อ - นามสกุล : {{userData.first_name}} {{userData.last_name}}</p>
      <vs-divider />
      <p>อีเมลล์ : {{userData.email}}</p>
      <vs-divider />
      <vs-list-header title="สถิติ" color="blue" icon="swap_horiz"></vs-list-header>
      <p>ร่วมงานวิ่ง : {{userData.total_run}} ครั้ง</p>
      <p>วิ่งสะสม : {{userData.total_km}} กิโลเมตร</p>
      <br />
    </vs-list>
  </vx-card>
</template>

<script>
import axios from '../../../axios'
export default {
  data () {
    return {
      userData: {}
    }
  },
  async mounted () {
    await axios
      .get(`/user/${ this.$route.params.username }`).then(response => (this.userData = response.data.data))
  }
}
</script>
