<template>
  <div id="extra-component-chartist-demo">
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
          :statistic="userCount"
        />
      </div>

      <div class="vx-col w-full sm:w-1/2 md:w-1/2 lg:w-1/4 xl:w-1/4">
        <statistics-card-line
          hideChart
          class="mb-base"
          icon="StarIcon"
          statisticTitle="จำนวนยอดส่งผล"
          :statistic="userCount"
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
        <vx-card class="mb-base" title="จัดการงานวิ่ง">
          <vs-button class="my-3" to="/search_event" icon="search" style="width: 100%">ค้นหางานวิ่ง</vs-button>
          <vs-button class="my-3" to="/event" icon="list" style="width: 100%">งานวิ่งทั้งหมด</vs-button>
          <vs-button class="my-3" to="/add_event" icon="add" style="width: 100%">เพิ่มงานวิ่ง</vs-button>
        </vx-card>
      </div>

      <div class="vx-col w-full sm:w-1/2 md:w-1/2 lg:w-1/4 xl:w-1/4">
        <vx-card class="mb-base" title="รายการสมัครวิ่ง">
          <vs-button class="my-3" to="/participate_registered" icon="money_off" style="width: 100%">รอชำระเงิน</vs-button>
          <vs-button class="my-3" to="/participate_pending" icon="attach_money" style="width: 100%">ชำระเงินแล้ว (รอการยืนยัน)</vs-button>
          <vs-button class="my-3" to="/participate_approved" icon="check" style="width: 100%">สมัครวิ่งสำเร็จ (ยืนยันสลิปแล้ว)</vs-button>
        </vx-card>
      </div>

      <div class="vx-col w-full sm:w-1/2 md:w-1/2 lg:w-1/4 xl:w-1/4">
        <vx-card class="mb-base" title="รายการส่งผลวิ่ง">
          <vs-button class="my-3" to="/progress_registered" icon="emoji_people" style="width: 100%">ผลวิ่งรอการยืนยัน</vs-button>
          <vs-button class="my-3" to="/progress_pending" icon="emoji_events" style="width: 100%">ผลวิ่งยืนยันแล้ว</vs-button>
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

export default {
  components: {
    StatisticsCardLine
  },
  data () {
    return {
      eventCount: 0,
      userCount: 0
    }
  },
  async created () {
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
  }
}
</script>
