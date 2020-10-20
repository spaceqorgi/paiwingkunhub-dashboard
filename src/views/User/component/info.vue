<template>
  <vx-card no-shadow>
    <vs-list>
      <!--=========GROUP=========-->
      <vs-list-header
        title="ข้อมูลติดต่อ"
        color="success"
        icon="description"
      ></vs-list-header>
      <div class="my-10">
        <p>อีเมลล์: {{ userData.username }}</p>
        <p> ชื่อ: {{ userData.first_name }} </p>
        <p> นามสกุล: {{ userData.last_name }} </p>
        <p>เบอร์โทร: {{ userData.phone }}</p>
        <p>อีเมลล์: {{ userData.email }}</p>
        <p>ที่อยู่: {{ fullAddress }}</p>
        <p>ผู้ติดต่อฉุกเฉิน: {{ userData.emergency_contact }}</p>
        <p>เบอร์ติดต่อฉุกเฉิน: {{ userData.emergency_phone }}</p>
      </div>
      <!--=========END=========-->
      <!--=========GROUP=========-->
      <vs-list-header
        title="ประวัติ"
        color="purple"
        icon="description"
      ></vs-list-header>
      <div class="my-10">
        <p>ทีม/ชมรม: {{ userData.team }}</p>
        <p>วันเกิด: {{ birthDay }}</p>
        <p>สัญชาติ: {{ userData.nationality }}</p>
        <p>เพศ: {{ userData.gender }}</p>
        <p>กรุ๊ปเลือด: {{ userData.blood_type }}</p>
        <p>ภูมิแพ้/โรคประจำตัว: {{ userData.allergy_or_disease }}</p>
      </div>
      <!--=========END=========-->
      <!--=========GROUP=========-->
      <vs-list-header
        title="สถิติ"
        color="blue"
        icon="swap_horiz"
      ></vs-list-header>
      <div class="my-10">
        <p>ร่วมงานวิ่ง: {{ userData.total_participations }} ครั้ง</p>
        <p>วิ่งสะสม: {{ userData.total_run_in_km }} กิโลเมตร</p>
      </div>
      <!--=========END=========-->
    </vs-list>
  </vx-card>
</template>

<script>
import axios from '../../../axios'
import { formatDate } from '../../../functions'

export default {
  data () {
    return {
      userData: {}
    }
  },
  async mounted () {
    await axios
      .get(`/user/${this.$route.params.username}`)
      .then(response => { this.userData = response.data.data })
  },
  computed: {
    fullAddress () {
      const info = this.userData
      const address = info.address ? info.address : ''
      const sub_district = info.sub_district ? info.sub_district : ''
      const district = info.district ? info.district : ''
      const province = info.province ? info.province : ''
      const zipcode = info.zipcode ? info.zipcode : ''
      const country = info.country ? info.country : ''

      return `${address} ${sub_district} ${district} ${province} ${zipcode} ${country}`
    },
    birthDay () {
      return formatDate(this.userData.birth_day)
    }
  }
}
</script>

<style scoped>
p {
  margin-bottom: 1rem;
}
</style>