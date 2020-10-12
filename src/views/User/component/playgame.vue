<template>
  <div>
    <div class="vx-row">
      <div class="vx-col md:w-1/5 w-full">
        <vx-card title="เลือกวันเวลา">
          <br>
          <div >
            <div class="vx-col md:w-1/2 w-full">
              <label>เริ่มต้น: </label>
              <flat-pickr :config="configdateTimePicker" v-model="before_datetime" placeholder="Date Time" />
            </div>
            <br>
            <br>
            <div class="vx-col md:w-1/2 w-full">
              <label> สิ้นสุด: </label>
              <flat-pickr :config="configdateTimePicker" v-model="after_datetime" placeholder="Date Time" />
            </div>
          </div>
          <br>
          <br>
          <vs-button  color="primary" @click="selectdate_time ()" size="small">ค้นหา</vs-button>
          <br>
          <br>
          <br>
        </vx-card>
      </div>
      <div class="vx-col md:w-4/5 w-full">
        <div class="vx-row">
          <div class="vx-col md:w-1/3 w-full">
            <vx-card title="All Result">
              <h6>BetAmount : {{memberDatacard.sum_amount}}</h6>
              <br>
              <h6>Win/Lose : <span :class="memberDatacard.sum_winlose > 0 ? 'text-success' : 'text-danger' ">
                  {{memberDatacard.sum_winlose}} </span> </h6>
              <br>
              <h6>RollingAmount : {{memberDatacard.sum_rolling}}</h6>
              

            </vx-card>
            <br>
          </div>
          <div class="vx-col md:w-1/3 w-full">
            <vx-card title="SA Result">
              <h6>BetAmount : {{memberDatacard.sa_amount}}</h6>
              <br>
              <h6>Win/Lose : <span :class="memberDatacard.sa_winlose > 0 ? 'text-success' : 'text-danger' ">
                  {{memberDatacard.sa_winlose}} </span> </h6>
              <br>
              <h6>RollingAmount : {{memberDatacard.sa_rolling}}</h6>
              
            </vx-card>
          </div>
          <div class="vx-col md:w-1/3 w-full">
            <vx-card title="Sexy Result">
              <h6>BetAmount : {{memberDatacard.sexy_amount}}</h6>
              <br>
              <h6>Win/Lose : <span :class="memberDatacard.sexy_winlose > 0 ? 'text-success' : 'text-danger' ">
                  {{memberDatacard.sexy_winlose}} </span> </h6>
              <br>
              <h6>RollingAmount : {{memberDatacard.sexy_rolling}}</h6>
              
            </vx-card>
          </div>
         
        </div>
         <div class="vx-row">
            <div class="vx-col md:w-1/5 w-full">
            <vx-card title="Km Result">
              <h6>BetAmount : {{memberDatacard.km_amount}}</h6>
              <br>
              <h6>Win/Lose : <span :class="memberDatacard.sexy_winlose > 0 ? 'text-success' : 'text-danger' ">
                  {{memberDatacard.km_winlose}} </span> </h6>
              <br>
              <h6>RollingAmount : {{memberDatacard.km_rolling}}</h6>
              
            </vx-card>
          </div>
          <div class="vx-col md:w-1/5 w-full">
            <vx-card title="Wm Result">
              <h6>BetAmount : {{memberDatacard.wm_amount}}</h6>
              <br>
              <h6>Win/Lose : <span :class="memberDatacard.wm_winlose > 0 ? 'text-success' : 'text-danger' ">
                  {{memberDatacard.wm_winlose}} </span> </h6>
              <br>
              <h6>RollingAmount : {{memberDatacard.wm_rolling}}</h6>
              
            </vx-card>
          </div>
          <div class="vx-col md:w-1/5 w-full">
            <vx-card title="Joker Result">
              <h6>BetAmount : {{memberDatacard.joker_bet_amount}}</h6>
              <br>
              <h6>Win/Lose : <span :class="memberDatacard.joker_winlose > 0 ? 'text-success' : 'text-danger' ">
                  {{memberDatacard.joker_winlose}} </span> </h6>
              <br>
              <h6>RollingAmount : {{memberDatacard.joker_rolling}}</h6>
              
            </vx-card>
          </div>
          <div class="vx-col md:w-1/5 w-full">
          
            <vx-card title="PG Result">
              <h6>BetAmount : {{memberDatacard.pg_amount}}</h6>
              <br>
              <h6>Win/Lose : <span :class="memberDatacard.pg_winlose > 0 ? 'text-success' : 'text-danger' ">
                  {{memberDatacard.pg_winlose}} </span> </h6>
              <br>
              <h6>RollingAmount : {{memberDatacard.pg_rolling}}</h6>
              
            </vx-card>
          </div>
          <div class="vx-col md:w-1/5 w-full">
            <vx-card title="Amb Result">
              <h6>BetAmount : {{memberDatacard.amb_amount}}</h6>
              <br>
              <h6>Win/Lose : <span :class="memberDatacard.amb_winlose > 0 ? 'text-success' : 'text-danger' ">
                  {{memberDatacard.amb_winlose}} </span> </h6>
              <br>
              <h6>RollingAmount : {{memberDatacard.amb_rolling}}</h6>
              
            </vx-card>
          </div>
         </div>
      </div>
    </div>
    <br>
    <vx-card>
      <vs-table search :data="memberData">
      <template slot="thead">
        <vs-th sort-key="betdatetime">Bet Date/time</vs-th>
        <vs-th sort-key="payoutdatetime">Payout Date/time</vs-th>
        <vs-th sort-key="game_type">Game_Type</vs-th>
        <vs-th sort-key="username">Username</vs-th>
        <vs-th sort-key="gameid">GameID</vs-th>
        <vs-th sort-key="betamount">BetAmount</vs-th>
        <vs-th sort-key="type">type</vs-th>
        <vs-th sort-key="Before">Before</vs-th>
        <vs-th sort-key="winlost">Win/Lose</vs-th>
        <vs-th sort-key="after">After</vs-th>
        <vs-th sort-key="rollingamount">RollingAmount</vs-th>
      </template>

      <template slot-scope="{data}">
        <vs-tr :key="indextr" v-for="(tr, indextr) in data">

          <vs-td :data="data[indextr].timestamp">
            {{ moment(data[indextr].bet_time).tz('Asia/Bangkok').format('YYYY-MM-DD HH:mm:ss') }}
          </vs-td>

          <vs-td :data="data[indextr].timestamp">
            {{ moment(data[indextr].payout_time).tz('Asia/Bangkok').format('YYYY-MM-DD HH:mm:ss') }}
          </vs-td>
          <vs-td :data="data[indextr].game_type" v-if="data[indextr].game_type === 'SEXYBCRT'" style="color:#FF66CC;">
            SEXY
          </vs-td>
          <vs-td :data="data[indextr].game_type" v-if="data[indextr].game_type === 'KINGMAKER'" style="color:#00cd00;">
            KM
          </vs-td>
          <vs-td :data="data[indextr].game_type" v-if="data[indextr].game_type === 'SAGAME'" style="color:#FFD700;">
            {{ data[indextr].game_type }}
          </vs-td>
          <vs-td :data="data[indextr].game_type" v-if="data[indextr].game_type === 'JOKER'" style="color:#e699ff;">
            {{ data[indextr].game_type }}
          </vs-td>
          <vs-td :data="data[indextr].game_type" v-if="data[indextr].game_type === 'PG'" style="color:#FFD700;">
            {{ data[indextr].game_type }}
          </vs-td>
          <vs-td :data="data[indextr].game_type" v-if="data[indextr].game_type === 'WM'" style="color:#00ffff;">
            {{ data[indextr].game_type }}
          </vs-td>
          <vs-td :data="data[indextr].game_type" v-if="data[indextr].game_type === 'AMB'" style="color:#80ff00;">
            {{ data[indextr].game_type }}
          </vs-td>
          
          <vs-td :data="data[indextr].username">
            {{ data[indextr].username }}
          </vs-td>

          <vs-td :data="data[indextr].gameid">
            {{ data[indextr].gameid}}
          </vs-td>

          <vs-td :data="data[indextr].amount">
            {{ currency(data[indextr].amount) }}
          </vs-td>

          <vs-td :data="data[indextr].type" v-if="data[indextr].type == 'win'" class="text-success">
            {{ data[indextr].type }}
          </vs-td>
          <vs-td :data="data[indextr].type" v-else-if="data[indextr].type == 'lose'" class="text-danger">
            {{ data[indextr].type }}
          </vs-td>
          <vs-td :data="data[indextr].type" v-else-if="data[indextr].type == 'cancel'" class="text-warning">
            {{ data[indextr].type }}
          </vs-td>
          <vs-td :data="data[indextr].type" v-else style="color:#09A3E2;">
            {{ data[indextr].type }}
          </vs-td>

          <vs-td :data="data[indextr].bf_balance">
            {{ currency(data[indextr].bf_balance)}}
          </vs-td>

          <vs-td :data="data[indextr].result_amount" v-if="data[indextr].result_amount>0" class="text-success">
            {{ currency(data[indextr].result_amount) }}
          </vs-td>
          <vs-td :data="data[indextr].result_amount" v-else-if="data[indextr].result_amount<0" class="text-danger">
            {{ currency(data[indextr].result_amount) }}
          </vs-td>
          <vs-td :data="data[indextr].result_amount" v-else>
            {{currency( data[indextr].result_amount) }}
          </vs-td>

          <vs-td :data="data[indextr].af_balance">
            {{ currency(data[indextr].af_balance)}}
          </vs-td>

          <vs-td :data="data[indextr].rolling_amount" v-if="data[indextr].rolling_amount>0">
            {{ currency(data[indextr].rolling_amount) }}
          </vs-td>
          <vs-td :data="data[indextr].rolling_amount" v-else-if="data[indextr].rolling_amount<0">
            {{ currency(data[indextr].rolling_amount * -1.00)}}
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
      after_datetime: moment.tz('Asia/Bangkok').add(1, 'days').format('YYYY-MM-DD'),
      configdateTimePicker: {
        enableTime: true,
        dateFormat: 'Y-m-d H:i',
        time_24hr: true
      },
      searchQuery: '',
      memberData: [],
      memberDatacard: {}
    }
  },
  methods: {
    async selectdate_time () {
      await axios
        .get(`/member/${  this.$route.params.username}/playgameall/${this.before_datetime }/${ this.after_datetime}`)
        .then(response => (this.memberData = response.data))
      await axios
        .get(
          `/member/${  this.$route.params.username}/playgamecard/${this.before_datetime }/${ this.after_datetime}`)
        .then(response => (this.memberDatacard = response.data))
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
        return (amount).replace(/\d(?=(\d{3})+\.)/g, '$&,')
      } else {
        amount = String(Math.abs(amount))
        return `-${(amount).replace(/\d(?=(\d{3})+\.)/g, '$&,')}`
      }

    }
  },
  async mounted () {
    await  axios
      .get(`/member/${  this.$route.params.username}/playgameall/${this.before_datetime }/${ this.after_datetime}`)
      .then(response => (this.memberData = response.data))
    await axios
      .get(`/member/${  this.$route.params.username}/playgamecard/${this.before_datetime }/${ this.after_datetime}`)
      .then(response => (this.memberDatacard = response.data))
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
