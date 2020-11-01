<template>
  <vx-card no-shadow>
    <vs-list>
      <!--=========GROUP=========-->
      <vs-list-header
        title="ข้อมูลบัญชี"
        color="primary"
        icon="people"
      ></vs-list-header>
      <div class="my-10">
        <p>อีเมล: {{ userData.username }}</p>
        <p>ชื่อ: {{ userData.first_name }} </p>
        <p>นามสกุล: {{ userData.last_name }} </p>
        <p v-if="userData.role > 0"><strong>บัญชีแอดมิน</strong></p>
      </div>
      <!--=========END=========-->
      <!--=========GROUP=========-->
      <vs-list-header
        title="ข้อมูลทั่วไป"
        color="success"
        icon="description"
      ></vs-list-header>
      <div class="my-10">
        <p>วันเกิด: {{ birthDay }}</p>
        <p>โทรศัพท์: {{ userData.phone }}</p>
        <p>เพศ: {{ userData.gender }}</p>
        <p>กรุ๊ปเลือด: {{ userData.blood_type }}</p>
        <p>สัญชาติ: {{ userData.nationality }}</p>
        <p>ทีม: {{ userData.team }}</p>
        <p>ภูมิแพ้และโรคประจำตัว: {{ userData.allergy_or_disease }}</p>
        <p>ผู้ติดต่อฉุกเฉิน: {{ userData.emergency_contact }}</p>
        <p>โทรศัพท์ผู้ติดต่อฉุกเฉิน: {{ userData.emergency_phone }}</p>
      </div>
      <!--=========END=========-->
      <!--=========GROUP=========-->
      <vs-list-header
        title="ที่อยู่สำหรับจััดส่ง"
        color="salmon"
        icon="home"
      ></vs-list-header>
      <div class="my-10">
        <p>ที่อยู่: {{ fullAddress }}</p>
      </div>
      <!--=========END=========-->
      <!--=========GROUP=========-->
      <vs-list-header
        title="สถิติ"
        color="deeppink"
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
import {formatDate} from '../../../functions'

export default {
  data () {
    return {
      userData: {}
    }
  },
  async mounted () {
    await axios
      .get(`/user/${this.$route.params.id}`)
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
  margin-bottom: 0.8rem;
}
</style>
