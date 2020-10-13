<template>
  <div id="extra-component-chartist-demo">

    <!-- ROW 1-->
    <div class="vx-row">
      <div class="vx-col w-full sm:w-1/2 md:w-1/2 lg:w-1/4 xl:w-1/4">
        <statistics-card-line hideChart class="mb-base" icon="PlusCircleIcon" :statistic="data.eventCount"
          statisticTitle="จำนวนงานวิ่ง" color="success" />
      </div>

      <div class="vx-col w-full sm:w-1/2 md:w-1/2 lg:w-1/4 xl:w-1/4">
        <statistics-card-line hideChart class="mb-base" icon="PlusCircleIcon" statisticTitle="จำนวนผู้ใช้"
          :statistic="data.userCount" />
      </div>
    </div>

  </div>
</template>

<script>
import VueApexCharts from 'vue-apexcharts'
import StatisticsCardLine from '@/components/statistics-cards/StatisticsCardLine.vue'
import axios from '../../axios'
const themeColors = ['#28C76F', '#EA5455', '#EA5455', '#FF9F43', '#1E1E1E']
export default {
  data () {
    return {
      //themeColors: ['#7367F0', '#28C76F', '#EA5455', '#FF9F43', '#1E1E1E'],
      lineAreaChartSpline: {
        series: [],
        chartOptions: {
          noData: {
            text: 'Loading...'
          },
          dataLabels: {
            enabled: false
          },
          stroke: {
            curve: 'smooth'
          },
          colors: themeColors,
          xaxis: {
            type: 'date',
            categories: [
              this.moment().subtract(6, 'days').format('YYYY-MM-DD'), this.moment().subtract(5, 'days').format(
                'YYYY-MM-DD'), this.moment().subtract(4, 'days').format('YYYY-MM-DD'),
              this.moment().subtract(3, 'days').format('YYYY-MM-DD'), this.moment().subtract(2, 'days').format(
                'YYYY-MM-DD'), this.moment().subtract(1, 'days').format('YYYY-MM-DD'),
              this.moment().format('YYYY-MM-DD')
            ]
          },
          yaxis: {
            title: {
              text: '฿ (บาท)'
            }
          },
          tooltip: {
            x: {
              format: 'dd/MM/yy HH:mm'
            },
            y: {
              formatter (val) {
                return `${String(val.toFixed(2)).replace(/\d(?=(\d{3})+\.)/g, '$&,')} บาท`
              }
            }

          }
        }
      },
      columnChart: {
        series: [],
        chartOptions: {
          noData: {
            text: 'Loading...'
          },
          colors: this.themeColors,
          plotOptions: {
            bar: {
              horizontal: false,
              endingShape: 'rounded',
              columnWidth: '25%'
            }
          },
          dataLabels: {
            enabled: false
          },
          stroke: {
            show: true,
            width: 2,
            colors: ['transparent']
          },

          xaxis: {
            categories: [
              this.moment().subtract(6, 'days').format('YYYY-MM-DD'), this.moment().subtract(5, 'days').format(
                'YYYY-MM-DD'), this.moment().subtract(4, 'days').format('YYYY-MM-DD'),
              this.moment().subtract(3, 'days').format('YYYY-MM-DD'), this.moment().subtract(2, 'days').format(
                'YYYY-MM-DD'), this.moment().subtract(1, 'days').format('YYYY-MM-DD'),
              this.moment().format('YYYY-MM-DD')
            ]
          },
          yaxis: {
            title: {
              text: '฿ (บาท)'
            }
          },
          fill: {
            opacity: 1

          },
          tooltip: {
            y: {
              formatter (val) {
                return `${String(val.toFixed(2)).replace(/\d(?=(\d{3})+\.)/g, '$&,')} บาท`
              }
            }
          }
        }
      },
      data7day: [],
      topup: [],
      withdraw: [],
      deposit: [],
      deposit_wallet: [],
      deposit_scb: [],
      deposit_kbank: [],
      deposit_admin: [],
      getdata: [],
      data: {
        topup_today: 0,
        withdraw_today: 0,
        profit: 0,
        count_uservip_today: 0,
        count_topup_today: 0,
        count_withdraw_today: 0,
        count_bonus_today: 0,
        aff_today: 0,
        avg_withdrawtime: 0
      },
      datapermission: [],
      level_permission: this.$store.state.AppActiveUser.lv,
      check_permission: false
    }
  },
  components: {
    VueApexCharts,
    StatisticsCardLine
  },
  async mounted () {
    //GET DATA FOR lineAreaChartSpline Charts
    await axios
      .get('dashboardchart/datachart')
      .then(response => (this.data7day = response.data))
    for (let i = 0; i < 7; i++) {
      this.topup.push(this.data7day.topup[i].sum)
      this.withdraw.push(this.data7day.withdraw[i].sum)
    }
    this.topup.reverse()
    this.withdraw.reverse()
    this.lineAreaChartSpline.series = [
      {
        name: 'topup',
        data: this.topup
      },
      {
        name: 'withdraw',
        data: this.withdraw
      }
    ]

    //GET DATA FOR columnChart Charts
    await axios
      .get('dashboardchart/depositchart')
      .then(response => (this.deposit = response.data))
    for (let i = 0; i < 7; i++) {
      this.deposit_wallet.push(this.deposit.wallet[i].sum)
      this.deposit_scb.push(this.deposit.scb[i].sum)
      this.deposit_kbank.push(this.deposit.kbank[i].sum)
      this.deposit_admin.push(this.deposit.admin[i].sum)
    }
    this.deposit_wallet.reverse()
    this.deposit_scb.reverse()
    this.deposit_kbank.reverse()
    this.deposit_admin.reverse()
    this.columnChart.series = [
      {
        name: 'wallet',
        data: this.deposit_wallet
      },
      {
        name: 'scb',
        data: this.deposit_scb
      },
      {
        name: 'kbank',
        data: this.deposit_kbank
      },
      {
        name: 'admin',
        data: this.deposit_admin
      }
    ]

    //GET DATA FOR OTHERS DATA
    await axios
      .get('dashboardchart/data')
      .then(response => (this.getdata = response.data))
    this.data.topup_today = this.currency(this.getdata.topup_today)
    this.data.withdraw_today = this.currency(this.getdata.withdraw_today)
    this.data.profit = this.getdata.topup_today - this.getdata.withdraw_today
    this.data.profit = this.data.profit.toFixed(2)
    this.data.profit = this.currency(this.data.profit)
    this.data.count_uservip_today = this.currency(this.getdata.count_uservip_today)
    this.data.count_topup_today = this.currency(this.getdata.count_topup_today)
    this.data.count_withdraw_today = this.currency(this.getdata.count_withdraw_today)
    this.data.count_bonus_today = this.currency(this.getdata.count_bonus_today)
    this.data.aff_today = this.currency(this.getdata.aff_today)
    this.data.avg_withdrawtime = this.getdata.avg_withdrawtime

    //CHECK Permission 
    await axios
      .get('settingstaff/getpermission')
      .then(response => (this.datapermission = response.data))
    this.level_permission = this.level_permission.toString(2)
    const cal_length = this.datapermission.length - this.level_permission.length

    for (let i = 0; i < cal_length; i++) {
      this.level_permission = 0 + this.level_permission
    }
    this.level_permission = this.level_permission.split('')
    this.level_permission = this.level_permission.reverse()
    if (this.level_permission[0] === '1') {
      this.check_permission = true
    }
  },
  methods: {
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
        return `${(amount).replace(/\d(?=(\d{3})+\.)/g, '$&,')}`
      }
      
    }
  }
}

</script>
