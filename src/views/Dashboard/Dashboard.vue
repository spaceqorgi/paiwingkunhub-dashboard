<template>
  <div id="extra-component-chartist-demo">

    <!-- ROW 1-->
    <div class="vx-row">
      <div class="vx-col w-full sm:w-1/2 md:w-1/2 lg:w-1/4 xl:w-1/4">
        <statistics-card-line hideChart class="mb-base" icon="HeartIcon" :statistic="eventCount"
          statisticTitle="จำนวนงานวิ่ง" color="success" />
      </div>

      <div class="vx-col w-full sm:w-1/2 md:w-1/2 lg:w-1/4 xl:w-1/4">
        <statistics-card-line hideChart class="mb-base" icon="UsersIcon" statisticTitle="จำนวนผู้ใช้"
          :statistic="userCount" />
      </div>
    </div>

  </div>
</template>

<script>
import StatisticsCardLine from '@/components/statistics-cards/StatisticsCardLine.vue'
import axios from '../../axios'

export default {
  components: {
    StatisticsCardLine,
  },
  data () {
    return {
      eventCount: 0,
      userCount: 0
    }
  },
  async mounted () {
    await axios.get('/stat/row_count/events')
      .then(response => { this.eventCount = parseInt(response.data.count) })
      .catch()  
    await axios.get('/stat/row_count/users')
      .then(response => { this.userCount = parseInt(response.data.count) })
      .catch()
  }
}

</script>
