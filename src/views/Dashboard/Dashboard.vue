<template>
  <div v-if="AppActiveUser.role >= 2" id="extra-component-chartist-demo">
    <!-- ROW 1-->
    <div class="vx-row">
      <div class="vx-col w-full sm:w-1/2 md:w-1/2 lg:w-1/4 xl:w-1/4">
        <statistics-card-line
          hideChart
          class="mb-base"
          icon="HeartIcon"
          :statistic="eventCount"
          statisticTitle="จำนวนงานวิ่ง"
          color="success"
        />
      </div>

      <div class="vx-col w-full sm:w-1/2 md:w-1/2 lg:w-1/4 xl:w-1/4">
        <statistics-card-line
          hideChart
          class="mb-base"
          icon="SmileIcon"
          statisticTitle="จำนวนยอดสมัคร"
          :statistic="registerCount"
        />
      </div>

      <div class="vx-col w-full sm:w-1/2 md:w-1/2 lg:w-1/4 xl:w-1/4">
        <statistics-card-line
          hideChart
          class="mb-base"
          icon="StarIcon"
          statisticTitle="จำนวนยอดส่งผล"
          :statistic="progressCount"
        />
      </div>

      <div class="vx-col w-full sm:w-1/2 md:w-1/2 lg:w-1/4 xl:w-1/4">
        <statistics-card-line
          hideChart
          class="mb-base"
          icon="UsersIcon"
          statisticTitle="จำนวนผู้ใช้"
          :statistic="userCount"
        />
      </div>
    </div>
    <!-- ROW 2-->
    <div class="vx-row">
      <div class="vx-col w-full sm:w-1/2 md:w-1/2 lg:w-1/4 xl:w-1/4">
        <vx-card class="mb-base" title="เมนูงานวิ่ง">
          <vs-button class="my-3" to="/search_event" icon="search" style="width: 100%">ค้นหางานวิ่ง</vs-button>
          <vs-button class="my-3" to="/event" icon="list" style="width: 100%">งานวิ่งทั้งหมด</vs-button>
          <vs-button class="my-3" to="/add_event" icon="add" style="width: 100%">เพิ่มงานวิ่ง</vs-button>
        </vx-card>
      </div>

      <div class="vx-col w-full sm:w-1/2 md:w-1/2 lg:w-1/4 xl:w-1/4">
        <vx-card class="mb-base" title="รายการสมัคร">
          <vs-button class="my-3" to="/participate_registered" icon="money_off" style="width: 100%"
            >รอชำระเงิน</vs-button
          >
          <vs-button class="my-3" to="/participate_pending" icon="attach_money" style="width: 100%"
            >รอยืนยันสลิป</vs-button
          >
          <vs-button class="my-3" to="/participate_approved" icon="check" style="width: 100%"
            >สมัครและชำระเงินสำเร็จ</vs-button
          >
        </vx-card>
      </div>

      <div class="vx-col w-full sm:w-1/2 md:w-1/2 lg:w-1/4 xl:w-1/4">
        <vx-card class="mb-base" title="รายการส่งผล">
          <vs-button class="my-3" to="/progress_pending" icon="people" style="width: 100%"
            >ผลวิ่งรอการยืนยัน</vs-button
          >
          <vs-button class="my-3" to="/progress_approved" icon="events" style="width: 100%"
            >ผลวิ่งยืนยันแล้ว</vs-button
          >
        </vx-card>
      </div>

      <div class="vx-col w-full sm:w-1/2 md:w-1/2 lg:w-1/4 xl:w-1/4">
        <vx-card class="mb-base" title="จัดการผู้ใช้">
          <vs-button class="my-3" to="/search_user" icon="search" style="width: 100%">ค้นหาผู้ใช้</vs-button>
          <vs-button class="my-3" to="/user" icon="list" style="width: 100%">ผู้ใช้ทั้งหมด</vs-button>
        </vx-card>
      </div>
    </div>
  </div>
</template>

<script>
import StatisticsCardLine from '@/components/statistics-cards/StatisticsCardLine.vue'
import axios from '../../axios'
import store from '@/store/store'

export default {
  components: {
    StatisticsCardLine
  },
  data () {
    return {
      eventCount: 0,
      userCount: 0,
      AppActiveUser: store.state.AppActiveUser,
      registerCount: 0,
      progressCount: 0
    }
  },
  async created () {
    if (this.AppActiveUser.role >= 2) {
      await axios
        .get('/stat/row_count/event')
        .then(response => {
          this.eventCount = parseInt(response.data.count)
        })
        .catch()
      await axios
        .get('/stat/row_count/user')
        .then(response => {
          this.userCount = parseInt(response.data.count)
        })
        .catch()
      await axios
        .get('/stat/row_count/user_participation')
        .then(response => {
          this.registerCount = parseInt(response.data.count)
        })
        .catch()
      await axios
        .get('/stat/row_count/user_participation_progress')
        .then(response => {
          this.progressCount = parseInt(response.data.count)
        })
        .catch()
    } else {
      this.$vs.loading()
      await this.$router.push('/event')
    }
  }
}
</script>
