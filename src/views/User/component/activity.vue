<template>
  <div>
    <div class="vx-row">
      <div class="vx-col md:w-2/5 w-full">
        <vx-card title="เลือกวันเวลา">
          <div class="vx-row">
            <div class="vx-col md:w-5/5 w-full m-2">
              <flat-pickr
                :config="configdateTimePicker"
                v-model="before_datetime"
                placeholder="Date Time"
              />
            </div>
          </div>
          <div class="vx-row">
            <div class="vx-col md:5/5 w-full m-2">
              <flat-pickr
                :config="configdateTimePicker"
                v-model="after_datetime"
                placeholder="Date Time"
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
        <div class="vx-row">
          <div class="vx-col md:w-3/3 w-full">
            <vx-card title="งานวิ่งทั้งหมด">
              <h6>ร่วมงานวิ่ง : {{ userDatacard.sum_amount }}</h6>
              
              <h6>
                ผลวิ่งรอการรับรอง :
                <span
                  :class="
                    userDatacard.sum_winlose > 0
                      ? 'text-success'
                      : 'text-danger'
                  "
                >
                  {{ userDatacard.sum_winlose }}
                </span>
              </h6>
              
              <h6>ระยะวิ่งสะสม : {{ userDatacard.sum_rolling }}</h6>
            </vx-card>
            
          </div>
        </div>
        <div class="vx-row">
          <div class="vx-col md:w-3/3 w-full">
            <vx-card title="งานวิ่งทั้งหมด">
              <h6>ร่วมงานวิ่ง : {{ userDatacard.sum_amount }}</h6>
              
              <h6>
                ผลวิ่งรอการรับรอง :
                <span
                  :class="
                    userDatacard.sum_winlose > 0
                      ? 'text-success'
                      : 'text-danger'
                  "
                >
                  {{ userDatacard.sum_winlose }}
                </span>
              </h6>
              
              <h6>ระยะวิ่งสะสม : {{ userDatacard.sum_rolling }}</h6>
            </vx-card>
            
          </div>
        </div>
      </div>
    </div>
    
    <vx-card>
      <vs-table search :data="userData">
        <template slot="thead">
          <vs-th sort-key="betdatetime">Bet Date/time</vs-th>
          <vs-th sort-key="payoutdatetime">Payout Date/time</vs-th>
          <vs-th sort-key="game_type">Game_Type</vs-th>
          <vs-th sort-key="username">Username</vs-th>
          <vs-th sort-key="gameid">GameID</vs-th>
          <vs-th sort-key="ร่วมกิจกรรม">ร่วมกิจกรรม</vs-th>
          <vs-th sort-key="type">type</vs-th>
          <vs-th sort-key="Before">Before</vs-th>
          <vs-th sort-key="winlost">ผลวิ่งรอรับรอง</vs-th>
          <vs-th sort-key="after">After</vs-th>
          <vs-th sort-key="rollingamount">RollingAmount</vs-th>
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

            <vs-td :data="data[indextr].timestamp">
              {{
                moment(data[indextr].payout_time)
                  .tz('Asia/Bangkok')
                  .format('YYYY-MM-DD HH:mm:ss')
              }}
            </vs-td>
            <vs-td
              :data="data[indextr].game_type"
              v-if="data[indextr].game_type === 'SEXYBCRT'"
              style="color: #ff66cc"
            >
              SEXY
            </vs-td>
            <vs-td
              :data="data[indextr].game_type"
              v-if="data[indextr].game_type === 'KINGMAKER'"
              style="color: #00cd00"
            >
              KM
            </vs-td>
            <vs-td
              :data="data[indextr].game_type"
              v-if="data[indextr].game_type === 'SAGAME'"
              style="color: #ffd700"
            >
              {{ data[indextr].game_type }}
            </vs-td>
            <vs-td
              :data="data[indextr].game_type"
              v-if="data[indextr].game_type === 'JOKER'"
              style="color: #e699ff"
            >
              {{ data[indextr].game_type }}
            </vs-td>
            <vs-td
              :data="data[indextr].game_type"
              v-if="data[indextr].game_type === 'PG'"
              style="color: #ffd700"
            >
              {{ data[indextr].game_type }}
            </vs-td>
            <vs-td
              :data="data[indextr].game_type"
              v-if="data[indextr].game_type === 'WM'"
              style="color: #00ffff"
            >
              {{ data[indextr].game_type }}
            </vs-td>
            <vs-td
              :data="data[indextr].game_type"
              v-if="data[indextr].game_type === 'AMB'"
              style="color: #80ff00"
            >
              {{ data[indextr].game_type }}
            </vs-td>

            <vs-td :data="data[indextr].username">
              {{ data[indextr].username }}
            </vs-td>

            <vs-td :data="data[indextr].gameid">
              {{ data[indextr].gameid }}
            </vs-td>

            <vs-td :data="data[indextr].amount">
              {{ currency(data[indextr].amount) }}
            </vs-td>

            <vs-td
              :data="data[indextr].type"
              v-if="data[indextr].type == 'win'"
              class="text-success"
            >
              {{ data[indextr].type }}
            </vs-td>
            <vs-td
              :data="data[indextr].type"
              v-else-if="data[indextr].type == 'lose'"
              class="text-danger"
            >
              {{ data[indextr].type }}
            </vs-td>
            <vs-td
              :data="data[indextr].type"
              v-else-if="data[indextr].type == 'cancel'"
              class="text-warning"
            >
              {{ data[indextr].type }}
            </vs-td>
            <vs-td :data="data[indextr].type" v-else style="color: #09a3e2">
              {{ data[indextr].type }}
            </vs-td>

            <vs-td :data="data[indextr].bf_balance">
              {{ currency(data[indextr].bf_balance) }}
            </vs-td>

            <vs-td
              :data="data[indextr].result_amount"
              v-if="data[indextr].result_amount > 0"
              class="text-success"
            >
              {{ currency(data[indextr].result_amount) }}
            </vs-td>
            <vs-td
              :data="data[indextr].result_amount"
              v-else-if="data[indextr].result_amount < 0"
              class="text-danger"
            >
              {{ currency(data[indextr].result_amount) }}
            </vs-td>
            <vs-td :data="data[indextr].result_amount" v-else>
              {{ currency(data[indextr].result_amount) }}
            </vs-td>

            <vs-td :data="data[indextr].af_balance">
              {{ currency(data[indextr].af_balance) }}
            </vs-td>

            <vs-td
              :data="data[indextr].rolling_amount"
              v-if="data[indextr].rolling_amount > 0"
            >
              {{ currency(data[indextr].rolling_amount) }}
            </vs-td>
            <vs-td
              :data="data[indextr].rolling_amount"
              v-else-if="data[indextr].rolling_amount < 0"
            >
              {{ currency(data[indextr].rolling_amount * -1.0) }}
            </vs-td>
            <vs-td :data="data[indextr].rolling_amount" v-else>
              {{ currency(data[indextr].rolling_amount) }}
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
      configdateTimePicker: {
        enableTime: true,
        dateFormat: 'Y-m-d H:i',
        time_24hr: true
      },
      searchQuery: '',
      userData: [],
      userDatacard: {}
    }
  },
  methods: {
    async selectdate_time () {
      await axios
        .get(
          `/user/${this.$route.params.username}/playgameall/${this.before_datetime}/${this.after_datetime}`
        )
        .then(response => (this.userData = response.data))
      await axios
        .get(
          `/user/${this.$route.params.username}/playgamecard/${this.before_datetime}/${this.after_datetime}`
        )
        .then(response => (this.userDatacard = response.data))
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
        `/user/${this.$route.params.username}/playgameall/${this.before_datetime}/${this.after_datetime}`
      )
      .then(response => (this.userData = response.data))
    await axios
      .get(
        `/user/${this.$route.params.username}/playgamecard/${this.before_datetime}/${this.after_datetime}`
      )
      .then(response => (this.userDatacard = response.data))
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
