<template>
  <div id="page-user-list">
    
      <div class="flex flex-wrap items-center">

  
        <!-- ITEMS PER PAGE -->
        <div class="flex-grow">
          <div class="vx-row">
            <div class="vx-col w-full">
              <vx-card title="เลือกวันเวลา">
                <label>เริ่มต้น: </label>
                <flat-pickr :config="configdateTimePicker" v-model="before_datetime" placeholder="Date Time" />
                <br>
                <br>
                <label> สิ้นสุด: </label>
                <flat-pickr :config="configdateTimePicker" v-model="after_datetime" placeholder="Date Time" />
                <br>
                <br>
                <vs-button color="primary" @click="selectdate_time ()">ค้นหา</vs-button>
              </vx-card>
            </div>
          </div>
          <br>
          <div class="vx-row">
            <div class="vx-col w-full sm:w-1/3 md:w-1/3 lg:w-1/3 xl:w-1/3">
              <statistics-card-line hideChart class="mb-base" icon="DollarSignIcon" icon-right :statistic="sum_data.sumreturn" 
                statisticTitle="ยอดรวมคืนยอดเล่นทั้งหมด/บาท" color="success" />
            </div>

            <div class="vx-col w-full sm:w-1/3 md:w-1/3 lg:w-1/3 xl:w-1/3">
              <statistics-card-line hideChart class="mb-base" icon="UserCheckIcon" icon-right :statistic="sum_data.countreturn"
                statisticTitle="จำนวนคืนยอดเล่นทั้งหมด/ครั้ง" color="warning" />
            </div>

             <div class="vx-col w-full sm:w-1/3 md:w-1/3 lg:w-1/3 xl:w-1/3">
                <statistics-card-line
                  hideChart
                  class="mb-base"
                  icon="UsersIcon"
                  icon-right
                  :statistic="sum_data.countpeople"
                  statisticTitle="จำนวนผู้ใช้ที่รับคืนยอดเล่นทั้งหมด/คน"
                  color="danger" />
            </div>
          </div>

          <vx-card>
            <vs-prompt title="Export To Excel" class="export-options" @cancle="clearFields" @accept="exportToExcel"
              accept-text="Export" @close="clearFields" :active.sync="activePrompt">
              <vs-input v-model="fileName" placeholder="Enter File Name.." class="w-full" />
              <v-select v-model="selectedFormat" :options="formats" class="my-4" />
              <div class="flex">
                <span class="mr-4">Cell Auto Width:</span>
                <vs-switch v-model="cellAutoWidth">Cell Auto Width</vs-switch>
              </div>
            </vs-prompt>

            <div class="export-table">
              <vs-table stripe pagination max-items="10" :data="table_data" search>

                <template slot="header">
                  <vs-button @click="activePrompt=true">Export</vs-button>
                </template>

                <template slot="thead">
              
                   <vs-th >username</vs-th>
                  <vs-th> Phone</vs-th>
                  <vs-th> Line </vs-th>
                  <vs-th> Trun</vs-th>
         

                </template>

                <template slot-scope="{data}">
                 
                  <vs-tr :key="indextr" v-for="(tr, indextr) in data" >
                    <!-- <vs-button radius color="primary" type="flat"   @click="gotomember(data[indextr].member_username)">{{ data[indextr].member_username}}</vs-button> -->
                    <vs-td class="text-danger"><router-link :to="`/user/${data[indextr].member_username}`">{{ data[indextr].member_username}}</router-link></vs-td>
                    <vs-td>{{ data[indextr].member_phone}}</vs-td>
                    <vs-td>{{ data[indextr].member_line }}</vs-td>
                    <vs-td>{{ data[indextr].sum_turn}}</vs-td>
                      
                  </vs-tr>
                  
                </template>

              </vs-table>
            </div>
          </vx-card>

        </div>
      </div>
    
  </div>

</template>

<script>
import StatisticsCardLine from '@/components/statistics-cards/StatisticsCardLine.vue'
import times from './ReportAff'
import flatPickr from 'vue-flatpickr-component'
import 'flatpickr/dist/flatpickr.css'
import axios from '../../axios'
import moment from 'moment'
import vSelect from 'vue-select'
import log from '../../log'

export default {
  components: {
    vSelect,
    flatPickr,
    times,
    StatisticsCardLine
  },
  data () {
    return {
     
      formats:['xlsx', 'csv', 'txt'],
      cellAutoWidth: true,
      selectedFormat: 'xlsx',
      headerTitle: ['Username', 'Phone', 'Line', 'Trun'],
      headerVal: ['member_username', 'member_phone', 'member_line', 'sum_turn'],
      before_datetime: moment.tz('Asia/Bangkok').format('YYYY-MM-DD HH:mm'),
      after_datetime: moment.tz('Asia/Bangkok').add(1, 'days').format('YYYY-MM-DD HH:mm'),
      fileName: '',
      configdateTimePicker: {
        enableTime: true,
        dateFormat: 'Y-m-d H:i',
        time_24hr: true
      },
      table_data: [],
      get_sumdata: [],
      sum_data: {sumreturn: '', countreturn: '', countpeople: ''},
      activePrompt: false
  
    }
  },
  async mounted () {
    await axios
      .get(`reportreturn/cardreturn/${this.before_datetime }/${ this.after_datetime}`)
      .then(response => (this.get_sumdata = response.data))
    await axios
      .get(`reportreturn/tablereturn/${this.before_datetime }/${ this.after_datetime}`)
      .then(response => (this.table_data = response.data))
    this.fileName = `Report_Return ${this.before_datetime} ${this.after_datetime}`
    if (this.get_sumdata.sumreturn === null) {
      this.get_sumdata.sumreturn = 0.00
    }
    this.sum_data.sumreturn = this.get_sumdata.sumreturn
    this.sum_data.countreturn = this.get_sumdata.countreturn
    this.sum_data.countpeople = this.get_sumdata.countpeople
  },
  methods: {
    async selectdate_time () {
      await axios
        .get(`reportreturn/cardreturn/${this.before_datetime }/${ this.after_datetime}`)
        .then(response => (this.get_sumdata = response.data))
      await axios
        .get(`reportreturn/tablereturn/${this.before_datetime }/${ this.after_datetime}`)
        .then(response => (this.table_data = response.data))
      this.fileName = `Report_Return ${this.before_datetime} ${this.after_datetime}`

      
      if (this.get_sumdata.sumreturn === 'null') {
        this.get_sumdata.sumreturn = 0.00
      }
      this.sum_data.sumreturn = this.get_sumdata.sumreturn
      this.sum_data.countreturn = this.get_sumdata.countreturn
      this.sum_data.countpeople = this.get_sumdata.countpeople
    },
    exportToExcel () {
      import('@/vendor/Export2Excel').then(excel => {
        const list = this.table_data
        const data = this.formatJson(this.headerVal, list)
        excel.export_json_to_excel({
          header: this.headerTitle,
          data,
          filename: this.fileName,
          autoWidth: this.cellAutoWidth,
          bookType: this.selectedFormat
        })
        log.agent('', 'Report_Turn', 0, `ดาวน์โหลดไฟล์ Report คืนยอดเล่น วันที่ ${this.before_datetime} ถึงวันที่ ${this.after_datetime}`)
        this.clearFields()
      })
    },
    formatJson (filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => {
        // Add col name which needs to be translated
        // if (j === 'timestamp') {
        //   return parseTime(v[j])
        // } else {
        //   return v[j]
        // }

        return v[j]
      }))
    },
    clearFields () {
      this.filename = ''
      this.cellAutoWidth = true
      this.selectedFormat = 'xlsx'
    },
    gotomember (username) {
      this.$router.push(`member/${username}`)
    }
  }

}

</script>
