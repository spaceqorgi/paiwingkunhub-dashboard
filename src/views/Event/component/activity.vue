<template>
  <div>
    <div class="vx-row">
      <div class="mb-5 vx-col md:w-2/5 w-full">
        <vx-card title="เลือกวันเวลา">
          <div class="vx-row">
            <div class="vx-col md:w-5/5 w-full m-2">
              <flat-pickr
                :config="configDateTimePicker"
                v-model="before_datetime"
                placeholder="เริ่มจากวันที่"
              />
            </div>
          </div>
          <div class="vx-row">
            <div class="vx-col md:5/5 w-full m-2">
              <flat-pickr
                :config="configDateTimePicker"
                v-model="after_datetime"
                placeholder="จนถึงวันที่"
              />
            </div>
          </div>
          <div class="vx-row">
            <div class="vx-col md:5/5 w-full m-2">
              <vs-button color="primary" size="small" @click="selectdate_time()">
                ค้นหา
              </vs-button >
            </div>
          </div>
        </vx-card>
      </div>
      <div class="vx-col md:w-3/5 w-full">
      </div>
    </div>

    <vx-card>
      <vs-table search :data="userData">
        <template slot="thead">
          <vs-th sort-key="'event_name'">ชื่องานวิ่ง</vs-th>
          <vs-th sort-key="event_start">เริ่มวิ่ง</vs-th>
          <vs-th sort-key="event_end">หมดเขตวิ่ง</vs-th>
          <vs-th sort-key="ticket_name">ประเภทตั๋ว</vs-th>
          <vs-th sort-key="ticket_price">ราคาตั๋ว</vs-th>
        </template>

        <template slot-scope="{ data }">
          <vs-tr :key="indextr" v-for="(tr, indextr) in data">
            <vs-td :data="data[indextr].timestamp">
              {{
                moment(data[indextr].bet_time)
                  .tz('Asia/Bangkok')
                  .format('YYYY-MM-DD HH:mm:ss')
              }}
            </vs-td>
          </vs-tr>
        </template>
      </vs-table>
    </vx-card>
  </div>
</template>
<script>
import moment from 'moment'
import axios from '../../../axios'
import flatPickr from 'vue-flatpickr-component'
import 'flatpickr/dist/flatpickr.css'

export default {
  components: {
    flatPickr
  },
  data () {
    return {
      before_datetime: moment.tz('Asia/Bangkok').format('YYYY-MM-DD'),
      after_datetime: moment
        .tz('Asia/Bangkok')
        .add(1, 'days')
        .format('YYYY-MM-DD'),
      configDateTimePicker: {
        enableTime: true,
        dateFormat: 'Y-m-d H:i',
        time_24hr: true
      },
      searchQuery: '',
      userData: [],
      userDataCard: {}
    }
  },
  methods: {
    async selectdate_time () {
      await axios
        .get(
          `/user/${this.$route.params.id}/activity/${this.before_datetime}/${this.after_datetime}`
        )
        .then(response => (this.userData = response.data))
      await axios
        .get(
          `/user/${this.$route.params.id}/activity_card/${this.before_datetime}/${this.after_datetime}`
        )
        .then(response => (this.userDataCard = response.data))
    },
    currency (amount) {
      //SET NULL OR NaN = 0
      if (!amount || amount === 'NaN') {
        amount = 0
      }
      if (amount >= 0) {
        if (typeof amount === 'number') {
          amount = String(Math.abs(amount))
        }
        return amount.replace(/\d(?=(\d{3})+\.)/g, '$&,')
      } else {
        amount = String(Math.abs(amount))
        return `-${amount.replace(/\d(?=(\d{3})+\.)/g, '$&,')}`
      }
    }
  },
  async mounted () {
    await axios
      .get(
        `/user/${this.$route.params.id}/activity/${this.before_datetime}/${this.after_datetime}`
      )
      .then(response => (this.userData = response.data))
    await axios
      .get(
        `/user/${this.$route.params.id}/activity_card/${this.before_datetime}/${this.after_datetime}`
      )
      .then(response => (this.userDataCard = response.data))
  }
}
</script>

<style lang="scss" scoped>
#page-user-list {
  .user-list-filters {
    .vs__actions {
      position: absolute;
      right: 0;
      top: 50%;
      transform: translateY(-58%);
    }
  }
}

div.ag-root .ag-cell-focus {
  -webkit-user-select: text;
  -moz-user-select: text;
  -ms-user-select: text;
  user-select: text;
}
</style>
