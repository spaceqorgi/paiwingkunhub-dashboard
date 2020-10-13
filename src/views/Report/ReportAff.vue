<template>
  <div id="page-user-list">
    <div class="vx-card p-6">
      <div class="flex flex-wrap items-center">

   <vs-prompt title="Export To Excel" class="export-options" @cancle="clearFields" @accept="exportToExcel" accept-text="Export" @close="clearFields" :active.sync="activePrompt">
        <vs-input v-model="fileName" placeholder="Enter File Name.." class="w-full" />
        <v-select v-model="selectedFormat" :options="formats" class="my-4" />
        <div class="flex">
          <span class="mr-4">Cell Auto Width:</span>
          <vs-switch v-model="cellAutoWidth">Cell Auto Width</vs-switch>
        </div>
    </vs-prompt>
        <!-- ITEMS PER PAGE -->
        <div class="flex-grow">
          <div class="vx-row">
            <div class="vx-col w-full">
              <vx-card title="เลือกวันเวลา">
                <label>เริ่มต้น: </label>
                <flat-pickr :config="configdateTimePicker" v-model="before_datetime" placeholder="Date Time" />
                
                
                <label> สิ้นสุด: </label>
                <flat-pickr :config="configdateTimePicker" v-model="after_datetime" placeholder="Date Time" />
                
                
                <vs-button color="primary" @click="selectdate_time ()">ค้นหา</vs-button>
              </vx-card>
            </div>
          </div>
          
          <vx-card>
            <div class="vx-card__title">
            <h4>ลำดับคนแนะนำเยอะสุด</h4>
            
          </div>
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
              <vs-table stripe pagination max-items="10" :data="sum_data" search>

                <template slot="header">
                  <vs-button @click="activePrompt=true">Export</vs-button>
                </template>

                <template slot="thead">
                  <vs-th> อันดับ</vs-th>
                  <vs-th> ยูเซอร์เนม</vs-th>
                  <vs-th> จำนวนยูสที่แนะนำมา </vs-th>

                </template>

                <template slot-scope="{data}">
                  <vs-tr :key="indextr" v-for="(tr, indextr) in data">
                    <vs-td > {{data[indextr].rank}}</vs-td>
                    <vs-td class="text-danger"><router-link :to="`/user/${data[indextr].member_aff}`">{{ data[indextr].member_aff}}</router-link></vs-td>
                    <vs-td>{{ data[indextr].aff }}</vs-td>

                  </vs-tr>
                </template>

              </vs-table>
            </div>
          </vx-card>
          
          <vx-card>
            <div class="vx-card__title">
            <h4>ผู้ใช้ที่ถูกแนะนำมา</h4>
            
          </div>
            <vs-prompt title="Export To Excel" class="export-options" @cancle="clearFields2" @accept="exportToExcel2"
              accept-text="Export" @close="clearFields2" :active.sync="activePrompt2">
              <vs-input v-model="fileName" placeholder="Enter File Name.." class="w-full" />
              <v-select v-model="selectedFormat" :options="formats" class="my-4" />
              <div class="flex">
                <span class="mr-4">Cell Auto Width:</span>
                <vs-switch v-model="cellAutoWidth">Cell Auto Width</vs-switch>
              </div>
            </vs-prompt>

            <div class="export-table">
              <vs-table stripe pagination max-items="10"   :data="userData" search>

                <template slot="header">
                  <vs-button @click="activePrompt2=true">Export</vs-button>
                </template>

                <template slot="thead">
                  <vs-th> USER ที่แนะนำมา</vs-th>
                  <vs-th> USER ที่ถูกแนะนำมา</vs-th>
                  <vs-th> วัน/เวลาที่สมัคร </vs-th>
                  <vs-th> สถานะยูเซอร์</vs-th>

                </template>

                <template slot-scope="{data}">
                  <vs-tr :key="indextr" v-for="(tr, indextr) in data" >
                    <vs-td class="text-danger"><router-link :to="`/user/${data[indextr].member_aff}`">{{ data[indextr].member_aff}}</router-link></vs-td>
                    <vs-td class="text-danger"><router-link :to="`/user/${data[indextr].username}`">{{ data[indextr].username }}</router-link></vs-td>
                    <vs-td>{{ data[indextr].member_register_date}}</vs-td>
                     
                    <vs-td class="text-danger" v-if="data[indextr].member_level==0">ยังไม่เติมเงิน</vs-td>
                    <vs-td class="text-success" v-if="data[indextr].member_level==1">เติมเงินแล้ว</vs-td>
                  </vs-tr>
                </template>

              </vs-table>
            </div>
          </vx-card>

        </div>
      </div>
    </div>
  </div>

</template>

<script>
import StatisticsCardLine from '@/components/statistics-cards/StatisticsCardLine.vue'
import times from './ReportAff'
import flatPickr from 'vue-flatpickr-component'
import 'flatpickr/dist/flatpickr.css'
import vSelect from 'vue-select'
import axios from '../../axios'
import moment from 'moment'
import log from '../../log'

// function currencyFormatter (params) {
//   return (params.value).replace(/\d(?=(\d{3})+\.)/g, '$&,')
// }
export default {
  components: {
    vSelect,
    flatPickr,
    times,
    StatisticsCardLine
  },
  data () {
    return {
      rank: [],
      fileName: '',
      formats:['xlsx', 'csv', 'txt'],
      cellAutoWidth: true,
      selectedFormat: 'xlsx',
      headerTitle: ['อันดับ', 'ยูเซอร์เนม', 'จำนวนยูสที่แนะนำมา', 'line', 'phone'],
      headerVal: ['rank', 'member_aff', 'aff', 'email', 'phone'],
      headerTitle2: ['USER ที่แนะนำมา', 'USER ที่ถูกแนะนำมา', 'วัน/เวลาที่สมัคร', 'สถานะยูเซอร์', 'line', 'phone'],
      headerVal2: ['member_aff', 'username', 'member_register_date', 'member_level', 'email', 'phone'],
      before_datetime: moment.tz('Asia/Bangkok').format('YYYY-MM-DD HH:mm'),
      after_datetime: moment.tz('Asia/Bangkok').add(1, 'days').format('YYYY-MM-DD HH:mm'),
      member_register_date: moment.tz('Asia/Bangkok').format('YYYY-MM-DD HH:mm'),
      configdateTimePicker: {
        enableTime: true,
        dateFormat: 'Y-m-d H:i',
        time_24hr: true
      },
      userData: [],
      sum_data: [],
      activePrompt: false,
      activePrompt2: false

    }
  },
  async mounted () {
    await axios
      .get(`reportaff/affdata/${this.before_datetime }/${ this.after_datetime}`)
      .then(response => (this.userData = response.data))
    await axios
      .get(`reportaff/aff/${this.before_datetime }/${ this.after_datetime}`)
      .then(response => (this.sum_data = response.data))
    this.fileName = `Report_Affiliate ${this.before_datetime} ${this.after_datetime}`
  },
  methods: {
    async selectdate_time () {
      await axios
        .get(`reportaff/affdata/${this.before_datetime }/${ this.after_datetime}`)
        .then(response => (this.userData = response.data))
      await axios
        .get(`reportaff/aff/${this.before_datetime }/${ this.after_datetime}`)
        .then(response => (this.sum_data = response.data))
      for (let i = 0; i < this.sum_data.length; i++) {
        this.rank[i] = i + 1
          
      }
      this.fileName = `Report_Affiliate ${this.before_datetime} ${this.after_datetime}`
    },
    exportToExcel () {
      import('@/vendor/Export2Excel').then(excel => {
        const list = this.sum_data
        const data = this.formatJson(this.headerVal, list)
        excel.export_json_to_excel({
          header: this.headerTitle,
          data,
          filename: this.fileName,
          autoWidth: this.cellAutoWidth,
          bookType: this.selectedFormat
        })
        log.agent('', 'Report_Aff', 0, `ดาวน์โหลดไฟล์ Report แนะนำเพื่อนเยอะสุด วันที่ ${this.before_datetime} ถึงวันที่ ${this.after_datetime}`)
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
    exportToExcel2 () {
      import('@/vendor/Export2Excel').then(excel => {
        const list = this.userData
        const data = this.formatJson(this.headerVal2, list)
        excel.export_json_to_excel({
          header: this.headerTitle2,
          data,
          filename: this.fileName,
          autoWidth: this.cellAutoWidth,
          bookType: this.selectedFormat
        })
        log.agent('', 'Report_Aff', 0, `ดาวน์โหลดไฟล์ Report ผู้ใช้ที่ถูกแนะนำมา วันที่ ${this.before_datetime} ถึงวันที่ ${this.after_datetime}`)
        this.clearFields2()
      })
    },
    formatJson2 (filterVal, jsonData) {
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
    clearFields2 () {
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