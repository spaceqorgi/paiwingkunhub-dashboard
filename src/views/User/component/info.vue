<template>
  <vx-card no-shadow>
    <vs-list>
      <!--=========GROUP=========-->
      <vs-list-header title="ข้อมูลบัญชี" color="primary" icon="people"></vs-list-header>
      <div class="my-10">
        <p><strong>อีเมล:</strong> {{ userData.username }}</p>
        <p><strong>ชื่อ:</strong> {{ userData.first_name }}</p>
        <p><strong>นามสกุล:</strong> {{ userData.last_name }}</p>
        <p class="text-danger" v-if="userData.role > 0">บัญชีแอดมิน</p>
      </div>
      <!--=========END=========-->
      <!--=========GROUP=========-->
      <vs-list-header title="ข้อมูลทั่วไป" color="success" icon="description"></vs-list-header>
      <div class="my-10">
        <p><strong>วันเกิด:</strong> {{ birthDay }}</p>
        <p><strong>โทรศัพท์:</strong> {{ userData.phone }}</p>
        <p><strong>เพศ:</strong> {{ userData.gender }}</p>
        <p><strong>กรุ๊ปเลือด:</strong> {{ userData.blood_type }}</p>
        <p><strong>สัญชาติ:</strong> {{ userData.nationality }}</p>
        <p><strong>ทีม:</strong> {{ userData.team }}</p>
        <p>
          <strong>ภูมิแพ้และโรคประจำตัว:</strong>
          {{ userData.allergy_or_disease }}
        </p>
        <p><strong>ผู้ติดต่อฉุกเฉิน:</strong> {{ userData.emergency_contact }}</p>
        <p>
          <strong>โทรศัพท์ผู้ติดต่อฉุกเฉิน:</strong>
          {{ userData.emergency_phone }}
        </p>
      </div>
      <!--=========END=========-->
      <!--=========GROUP=========-->
      <vs-list-header title="ที่อยู่สำหรับจัดส่ง" color="salmon" icon="home"></vs-list-header>
      <div class="my-10">
        <p><strong>ที่อยู่:</strong> {{ fullAddress }}</p>
      </div>
      <!--=========END=========-->
      <!--=========GROUP=========-->
      <vs-list-header title="สถิติ" color="deeppink" icon="swap_horiz"></vs-list-header>
      <div class="my-10">
        <p>
          <strong>ร่วมงานวิ่ง:</strong>
          {{ userData.total_participations }} ครั้ง
        </p>
        <p><strong>วิ่งสะสม:</strong> {{ userData.total_run_in_km }} กิโลเมตร</p>
      </div>
      <!--=========END=========-->
    </vs-list>
  </vx-card>
</template>

<script>
import axios from '../../../axios'
import { formatDate } from '@/functions'

export default {
  data () {
    return {
      userData: {}
    }
  },
  computed: {
    birthDay () {
      return formatDate(this.userData.birth_day)
    },
    fullAddress () {
      const info = this.userData
      const address = info.address ? info.address : ''
      const sub_district = info.sub_district ? info.sub_district : ''
      const district = info.district ? info.district : ''
      const province = info.province ? info.province : ''
      const zipcode = info.zipcode ? info.zipcode : ''
      const country = info.country ? info.country : ''

      return `${address} ${sub_district} ${district} ${province} ${zipcode} ${country}`
    }
  },
  async mounted () {
    await axios.get(`/user/${this.$route.params.id}`).then(response => {
      this.userData = response.data.data
    })
  }
}
</script>

<style scoped>
p {
  margin-bottom: 0.8rem;
}
</style>
