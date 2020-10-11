<template>
  <div id="page-user-list">

    <div class="flex flex-wrap items-center">


      <!-- ITEMS PER PAGE -->
      <div class="flex-grow">


          <vx-card title="เลือกวันเวลา">
        <div class="vx-row">
          <div class="vx-col w-full sm:w-1/3 md:w-1/3 lg:w-1/3 xl:w-1/3" >
           <label class="vs-input--label">เลือกเดือนที่ต้องการดูรายการย้อนหลัง</label>
            <!-- <v-select  v-model="month" :options="monthOptions" name="status"
              :dir="$vs.rtl ? 'rtl' : 'ltr'" /> -->
                         <vs-select  class="w-full mt-4" v-model="month" >
                <vs-select-item  :key="index" :value="item.value" :text="item.text" v-for="(item,index) in monthOptions" />
        </vs-select>
            <br>
          </div>
           <div class="vx-col w-full sm:w-1/3 md:w-1/3 lg:w-1/3 xl:w-1/3" >
            <label class="vs-input--label">เลือกปีที่ต้องการดูรายการย้อนหลัง</label>
            <!-- <v-select  v-model="year" :options="yearOptions" name="status"
              :dir="$vs.rtl ? 'rtl' : 'ltr'" /> -->
           <vs-select  class="w-full mt-4" v-model="year" >
                <vs-select-item  :key="index" :value="item.value" :text="item.text" v-for="(item,index) in yearOptions" />
        </vs-select>
            <br>
           </div>
           <div class="vx-col w-full sm:w-1/3 md:w-1/3 lg:w-1/3 xl:w-1/3" >
           <br>
           </div>
        </div>
         <vs-button  color="primary" @click="selectdate_time ()">ค้นหา</vs-button>
          </vx-card>
        <br>

        <div class="vx-row">

          <div class="vx-col w-full sm:w-1/3 md:w-1/3 lg:w-1/3 xl:w-1/3">
            <statistics-card-line hideChart class="mb-base" icon="PlusCircleIcon" icon-right :statistic="sum_deposit"
              statisticTitle="ยอดฝาก" color="warning" />
          </div>

          <div class="vx-col w-full sm:w-1/3 md:w-1/3 lg:w-1/3 xl:w-1/3">
            <statistics-card-line hideChart class="mb-base" icon="MinusCircleIcon" icon-right :statistic="sum_withdraw"
              statisticTitle="ยอดถอน" color="danger" />
          </div>
           <div class="vx-col w-full sm:w-1/3 md:w-1/3 lg:w-1/3 xl:w-1/3">
            <statistics-card-line hideChart class="mb-base" icon="DollarSignIcon" icon-right :statistic="sum_profit"
              statisticTitle="กำไร" color="success" />
          </div>
        </div>
        <div class="vx-row">
           <div class="vx-col w-full sm:w-1/3 md:w-1/3 lg:w-1/3 xl:w-1/3">
            <statistics-card-line hideChart class="mb-base" icon="DollarSignIcon" icon-right :statistic="sumsagame"
              statisticTitle="SA Game" color="warning" />
          </div>

          <div class="vx-col w-full sm:w-1/3 md:w-1/3 lg:w-1/3 xl:w-1/3">
            <statistics-card-line hideChart class="mb-base" icon="DollarSignIcon" icon-right :statistic="sumsexy"
              statisticTitle="Sexy Game" color="danger" />
          </div>
           <div class="vx-col w-full sm:w-1/3 md:w-1/3 lg:w-1/3 xl:w-1/3">
            <statistics-card-line hideChart class="mb-base" icon="DollarSignIcon" icon-right :statistic="sumpgslot"
              statisticTitle="PG SLOT" color="success" />
          </div>
        </div>
                <div class="vx-row">
           <div class="vx-col w-full sm:w-1/4 md:w-1/4 lg:w-1/4 xl:w-1/4">
            <statistics-card-line hideChart class="mb-base" icon="DollarSignIcon" icon-right :statistic="sumjokerslot"
              statisticTitle="JOKER SLOT" color="success" />
          </div>
           <div class="vx-col w-full sm:w-1/4 md:w-1/4 lg:w-1/4 xl:w-1/4">
            <statistics-card-line hideChart class="mb-base" icon="DollarSignIcon" icon-right :statistic="sumkmgame"
              statisticTitle="KINGMAKER GAME " color="success" />
          </div>
          <div class="vx-col w-full sm:w-1/4 md:w-1/4 lg:w-1/4 xl:w-1/4">
            <statistics-card-line hideChart class="mb-base" icon="DollarSignIcon" icon-right :statistic="sumwmgame"
              statisticTitle="WM GAME " color="success" />
          </div>
          <div class="vx-col w-full sm:w-1/4 md:w-1/4 lg:w-1/4 xl:w-1/4">
            <statistics-card-line hideChart class="mb-base" icon="DollarSignIcon" icon-right :statistic="sumambgame"
              statisticTitle="AMB POKER " color="success" />
          </div>
        </div>
        <vx-card title="ตารางสรุปยอดรายเดือน" v-if="table_data_all.length!==0">
          <h6 class="text-danger mb-4"> * ยอดอัพเดททุก 4 ชั่วโมง (อัพเดทล่าสุด : {{ lastupdate }})</h6>
          <div class="export-table">
            <vs-table  stripe :data="table_data_all">

              <template slot="thead">

                <vs-th>วันที่</vs-th>
                <vs-th> Deposit</vs-th>
                <vs-th> Withdraw </vs-th>
                <vs-th> SA Game</vs-th>
                <vs-th> Sexy Game </vs-th>
                <vs-th> JOKER SLOT </vs-th>
                <vs-th> PG SLOT </vs-th>
                <vs-th> KM GAME </vs-th>
                <vs-th> WM GAME </vs-th>
                <vs-th> AMB POKER </vs-th>
                <vs-th> Profit </vs-th>

              </template>

              <template slot-scope="{data}">

                <vs-tr :key="indextr" v-for="(tr, indextr) in data">

                  <vs-td>{{  data[indextr]['date'] }}</vs-td>
                  <vs-td>{{  currency(data[indextr]['sumdeposit']) }}</vs-td>
                  <vs-td>{{  currency(data[indextr]['sumwithdraw']) }}</vs-td>
                  <vs-td class="text-success" v-if="data[indextr]['sum_sagame']>0">{{  currency(data[indextr]['sum_sagame']) }}</vs-td>
                  <vs-td class="text-danger" v-else>{{  currency(data[indextr]['sum_sagame']) }}</vs-td>
                  <vs-td class="text-success" v-if="data[indextr]['sum_sexygame']>0">{{  currency(data[indextr]['sum_sexygame']) }}</vs-td>
                  <vs-td class="text-danger" v-else>{{  currency(data[indextr]['sum_sexygame']) }}</vs-td>
                  <vs-td class="text-success" v-if="data[indextr]['sum_joker']>0">{{  currency(data[indextr]['sum_joker']) }}</vs-td>
                  <vs-td class="text-danger" v-else>{{  currency(data[indextr]['sum_joker']) }}</vs-td>
                  <vs-td class="text-success" v-if="data[indextr]['sum_pg']>0">{{  currency(data[indextr]['sum_pg']) }}</vs-td>
                  <vs-td class="text-danger" v-else>{{  currency(data[indextr]['sum_pg']) }}</vs-td>
                  <vs-td class="text-success" v-if="data[indextr]['sum_kmgame']>0">{{  currency(data[indextr]['sum_kmgame']) }}</vs-td>
                  <vs-td class="text-danger" v-else>{{  currency(data[indextr]['sum_kmgame']) }}</vs-td>
                   <vs-td class="text-success" v-if="data[indextr]['sum_wm']>0">{{  currency(data[indextr]['sum_wm']) }}</vs-td>
                  <vs-td class="text-danger" v-else>{{  currency(data[indextr]['sum_wmgame']) }}</vs-td>
                                     <vs-td class="text-success" v-if="data[indextr]['sum_amb']>0">{{  currency(data[indextr]['sum_amb']) }}</vs-td>
                  <vs-td class="text-danger" v-else>{{  currency(data[indextr]['sum_amb']) }}</vs-td>
                  <vs-td class="text-success" v-if="data[indextr]['sumprofit']>0">{{ currency(data[indextr]['sumprofit']) }}</vs-td>
                  <vs-td class="text-danger" v-else>{{ currency(data[indextr]['sumprofit']) }}</vs-td>
                </vs-tr>

              </template>

            </vs-table>
          </div>
        </vx-card>
        <vx-card v-else>
              <h1 >ไม่พบมีข้อมูล</h1>
        </vx-card>
      </div>
    </div>

  </div>

</template>

<script>
import StatisticsCardLine from '@/components/statistics-cards/StatisticsCardLine.vue'
import axios from '../../axios'
import vSelect from 'vue-select'
import moment from 'moment'
export default {
  components: {
    StatisticsCardLine,
    vSelect
  },
  data () {
    return {
      monthOptions: [
        {
          text: 'มกราคม',
          value: '01'
        },
        {
          text: 'กุมภาพันธ์',
          value: '02'
        },
        {
          text: 'เมษายน',
          value: '04'
        },
        {
          text: 'พฤษภาคม',
          value: '05'
        },
        {
          text: 'มิถุนายน',
          value: '06'
        },
        {
          text: 'กรกฎาคม',
          value: '07'
        },
        {
          text: 'สิงหาคม',
          value: '08'
        },
        {
          text: 'กันยายน',
          value: '09'
        },
        {
          text: 'ตุลาคม',
          value: '10'
        },
        {
          text: 'พฤศจิกายน',
          value: '11'
        },
        {
          text: 'ธันวาคม',
          value: '12'
        }
      ],
      yearOptions: [
        {
          text: moment.tz('Asia/Bangkok').subtract(1, 'year').format('YYYY').toString(),
          value: moment.tz('Asia/Bangkok').subtract(1, 'year').format('YYYY')
        },
        {
          text: moment.tz('Asia/Bangkok').format('YYYY'),
          value: moment.tz('Asia/Bangkok').format('YYYY')
        }
      ],
      month: moment.tz('Asia/Bangkok').format('MM'),
      year: moment.tz('Asia/Bangkok').format('YYYY'),
      table_data_all: [],
      table_data: [],
      sum_data: [],
      sum_deposit: 0,
      sum_withdraw: 0,
      sumsagame: 0,
      sumpgslot: 0,
      sumjokerslot: 0,
      sumsexy: 0,
      sum_profit: 0,
      sumkmgame:0,
      sumwmgame:0,
      sumambgame:0,
      lastupdate: moment.tz('Asia/Bangkok').format('YYYY-MM-DD H:mm:ss')
    }
  },
  async mounted () {
    await this.get_data()
  },
  methods: {
    async  selectdate_time () {
      if (this.month === moment.tz('Asia/Bangkok').format('MM') && this.year === moment.tz('Asia/Bangkok').format('YYYY')) {
        await this.get_data()
      } else {
        await axios
          .get(`dashboardmonth/selectmonth/${this.month}/${this.year}`, {
          })
          .then(response => (this.table_data = response.data))
        if (this.table_data.length === 0) {
          this.table_data_all = ''
          this.sum_deposit = '0'
          this.sum_withdraw = '0'
          this.sum_profit = '0'
          this.sumsagame = 0
          this.sumsexy = 0
          this.sumkmgame = 0
          this.sumwmgame = 0
          this.sumambgame = 0
        } else {
          this.table_data_all = this.table_data[0].sm_all
          this.sum_deposit = this.table_data[0].sm_sum_deposit
          this.sum_withdraw = this.table_data[0].sm_sum_withdraw
          this.sum_profit = this.table_data[0].sm_sum_profit
          this.sumsexy = this.table_data[0].sm_sum_sexygame
          this.sumsagame = this.table_data[0].sm_sum_sagame
          this.sumkmgame = this.table_data[0].sm_sum_kingmaker
          this.sumwmgame = this.table_data[0].sm_sum_wm
          this.sumambgame = this.table_data[0].sm_sum_amb
          this.sum_deposit = this.currency(this.table_data[0].sm_sum_deposit)
          this.sum_withdraw = this.currency(this.table_data[0].sm_sum_withdraw)
          this.sum_profit = this.currency(this.table_data[0].sm_sum_profit)
          this.sumsexy = this.currency(this.table_data[0].sm_sum_sexygame)
          this.sumsagame = this.currency(this.table_data[0].sm_sum_sagame)
          this.sumkmgame = this.currency(this.table_data[0].sm_sum_kingmaker)
          this.sumwmgame = this.currency(this.table_data[0].sm_sum_wm)
          this.sumambgame = this.currency(this.table_data[0].sm_sum_amb)
        }
      }

    },
    async get_data () {
      await axios
        .get('dashboardmonth/deposit')
        .then(response => (this.sum_data = response.data))
      this.sum_deposit = this.currency(this.sum_data.sumdeposit)
      this.sum_withdraw = this.currency(this.sum_data.sumwithdraw)
      this.sum_profit = this.currency(this.sum_data.profit)
      this.sumsagame = this.currency(this.sum_data.sumsagame)
      this.sumsexy = this.currency(this.sum_data.sumsexy)

      await axios
        .get(`dashboardmonth/selectmonth/${this.month}/${this.year}`, {
        })
        .then(response => (this.table_data = response.data))
      if (this.table_data.length === 0) {
        this.table_data_all = ''
        this.sum_deposit = '0'
        this.sum_withdraw = '0'
        this.sum_profit = '0'
        this.sumsexy = '0'
        this.sumsagame = '0'
        this.sumpgslot = '0'
        this.sumjokerslot = '0'
        this.sumkmgame = 0
        this.sumwmgame = 0
        this.sumambgame = 0
      } else {
        this.table_data_all = this.table_data[0].sm_all
        this.sum_deposit = this.table_data[0].sm_sum_deposit
        this.sum_withdraw = this.table_data[0].sm_sum_withdraw
        this.sum_profit = this.table_data[0].sm_sum_profit
        this.sumsexy = this.table_data[0].sm_sum_sexygame
        this.sumsagame = this.table_data[0].sm_sum_sagame
        this.sumpgslot = this.table_data[0].sm_sum_pg
        this.sumjokerslot = this.table_data[0].sm_sum_joker
        this.sumkmgame = this.table_data[0].sm_sum_kingmaker
        this.sumambgame = this.table_data[0].sm_sum_amb
        this.lastupdate = moment(this.table_data[0].sm_lastupdate).tz('Asia/Bangkok').format('YYYY-MM-DD H:mm:ss')
        this.sum_deposit = this.currency(this.table_data[0].sm_sum_deposit)
        this.sum_withdraw = this.currency(this.table_data[0].sm_sum_withdraw)
        this.sum_profit = this.currency(this.table_data[0].sm_sum_profit)
        this.sumsexy = this.currency(this.table_data[0].sm_sum_sexygame)
        this.sumsagame = this.currency(this.table_data[0].sm_sum_sagame)
        this.sumpgslot = this.currency(this.table_data[0].sm_sum_pg)
        this.sumjokerslot = this.currency(this.table_data[0].sm_sum_joker)
        this.sumkmgame = this.currency(this.table_data[0].sm_sum_kingmaker)
        this.sumwmgame = this.currency(this.table_data[0].sm_sum_wm)
        this.sumambgame = this.currency(this.table_data[0].sm_sum_amb)
      }
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
  }
}

</script>
