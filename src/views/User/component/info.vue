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
        <p>ชื่อผู้ใช้ : {{ userData.username }}</p>
        <vs-divider />
        <p>
          ชื่อ - นามสกุล : {{ userData.first_name }} {{ userData.last_name }}
        </p>
        <vs-divider />
        <p>เบอร์โทร : {{ userData.phone }}</p>
        <vs-divider />
        <p>อีเมลล์ : {{ userData.email }}</p>
        <vs-divider />
        <p>ที่อยู่ : {{ fullAddress }}</p>
        <vs-divider />
        <p>ผู้ติดต่อฉุกเฉิน : {{ userData.emergency_contact }}</p>
        <vs-divider />
        <p>เบอร์ติดต่อฉุกเฉิน : {{ userData.emergency_phone }}</p>
      </div>
      <!--=========END=========-->
      <!--=========GROUP=========-->
      <vs-list-header
        title="ประวัติ"
        color="purple"
        icon="description"
      ></vs-list-header>
      <div class="my-10">
        <p>ทีม/ชมรม : {{ userData.team }}</p>
        <vs-divider />
        <p>วันเกิด : {{ birthDay }}</p>
        <vs-divider />
        <p>สัญชาติ : {{ userData.nationality }}</p>
        <vs-divider />
        <p>เพศ : {{ userData.gender }}</p>
        <vs-divider />
        <p>กรุ๊ปเลือด : {{ userData.blood_type }}</p>
        <vs-divider />
        <p>ภูมิแพ้/โรคประจำตัว : {{ userData.allergy_or_disease }}</p>
        <vs-divider />
      </div>
      <!--=========END=========-->
      <!--=========GROUP=========-->
      <vs-list-header
        title="สถิติ"
        color="blue"
        icon="swap_horiz"
      ></vs-list-header>
      <div class="my-10">
        <p>ร่วมงานวิ่ง : {{ total_run }} ครั้ง</p>
        <vs-divider />
        <p>วิ่งสะสม : {{ total_km }} กิโลเมตร</p>
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
      userData: {},
      total_run: 0,
      total_km: 0
    }
  },
  async mounted () {
    await axios
      .get(`/user/${this.$route.params.username}`)
      .then(response => (this.userData = response.data.data))
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
