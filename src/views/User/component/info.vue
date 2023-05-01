<template>
  <vx-card no-shadow>
    <h1>
      {{ userData.username }}
      <span class="text-danger" v-if="userData.role > 0">(Admin)</span>
    </h1>
    <vs-list>
      <!--=========GROUP=========-->
      <vs-list-header
        title="ข้อมูลบัญชี"
        color="primary"
        icon="people"
      ></vs-list-header>
      <div class="my-10">
        <h6 class="mt-3">อีเมล</h6>
        <p>{{ userData.username }}</p>
        <h6 class="mt-3">ชื่อ</h6>
        <p>{{ userData.first_name }}</p>
        <h6 class="mt-3">นามสกุล</h6>
        <p>{{ userData.last_name }}</p>
        <p class="text-danger" v-if="userData.role > 0">บัญชีแอดมิน</p>
      </div>
      <!--=========END=========-->
      <!--=========GROUP=========-->
      <vs-list-header
        title="ข้อมูลทั่วไป"
        color="success"
        icon="description"
      ></vs-list-header>
      <div class="my-10">
        <h6 class="mt-3">วันเกิด</h6>
        <p>{{ birthDay || '-' }}</p>
        <h6 class="mt-3">โทรศัพท์</h6>
        <p>{{ userData.phone || '-' }}</p>
        <h6 class="mt-3">เพศ</h6>
        <p>{{ userData.gender || '-' }}</p>
        <h6 class="mt-3">กรุ๊ปเลือด</h6>
        <p>{{ userData.blood_type || '-' }}</p>
        <h6 class="mt-3">สัญชาติ</h6>
        <p>{{ userData.nationality || '-' }}</p>
        <h6 class="mt-3">ทีม</h6>
        <p>{{ userData.team || '-' }}</p>
        <h6 class="mt-3">ภูมิแพ้และโรคประจำตัว</h6>
        <p> {{ userData.allergy_or_disease || '-' }} </p>
        <h6 class="mt-3">ผู้ติดต่อฉุกเฉิน</h6>
        <p>{{ userData.emergency_contact || '-' }}</p>
        <h6 class="mt-3">โทรศัพท์ผู้ติดต่อฉุกเฉิน</h6>
        <p> {{ userData.emergency_phone || '-' }} </p>
      </div>
      <!--=========END=========-->
      <!--=========GROUP=========-->
      <vs-list-header
        title="ที่อยู่สำหรับจัดส่ง"
        color="salmon"
        icon="home"
      ></vs-list-header>
      <div class="my-10">
        <h6 class="mt-3">ที่อยู่</h6>
        <p>{{ fullAddress }}</p>
      </div>
      <!--=========END=========-->
      <!--=========GROUP=========-->
      <vs-list-header
        title="สถิติ"
        color="deeppink"
        icon="swap_horiz"
      ></vs-list-header>
      <div class="my-10">
        <h6 class="mt-3">ร่วมงานวิ่ง</h6>
        <p>{{ userData.total_participations }} ครั้ง</p>
        <h6 class="mt-3">วิ่งสะสม</h6>
        <p>{{ userData.total_run_in_km }} กิโลเมตร</p>
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

      const result = []

      if (info.address) result.push(info.address)
      if (info.sub_district) result.push(info.sub_district)
      if (info.district) result.push(info.district)
      if (info.province) result.push(info.province)
      if (info.zipcode) result.push(info.zipcode)
      if (info.country) result.push(info.country)


      if (result) return result.join(' ')
      else return '-'
    }
  },
  async mounted () {
    await axios.get(`/user/${this.$route.params.id}`).then((response) => {
      this.userData = response.data.data
    })
  }
}
</script>

<style scoped>
</style>
