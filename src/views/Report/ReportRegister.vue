<template>
  <div class="vx-col w-full">
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

      <div class="vx-col w-full sm:w-1/2 md:w-1/2 lg:w-1/4 xl:w-1/4" @click="activePrompt1=true">
        <statistics-card-line hideChart class="mb-base" icon="UsersIcon" icon-right :statistic="sum_data.vip"
          statisticTitle="รวมเปิดยูสเติมเงิน" color="success" />
      </div>

      <div class="vx-col w-full sm:w-1/2 md:w-1/2 lg:w-1/4 xl:w-1/4" @click="activePrompt2=true">
        <statistics-card-line hideChart class="mb-base" icon="UserCheckIcon" icon-right :statistic="sum_data.register_vip"
          statisticTitle="สมัครและเปิดยูส" color="success" />
      </div>

      <div class="vx-col w-full sm:w-1/2 md:w-1/2 lg:w-1/4 xl:w-1/4 " @click="activePrompt3=true">
        <statistics-card-line hideChart class="mb-base" icon="UsersIcon" icon-right :statistic="sum_data.register"
          statisticTitle="สมัครสมาชิก" color="danger" />
      </div>

      <div class="vx-col w-full sm:w-1/2 md:w-1/2 lg:w-1/4 xl:w-1/4" @click="activePrompt4=true">
        <statistics-card-line hideChart class="mb-base" icon="UsersIcon" icon-right :statistic="sum_data.normal"
          statisticTitle="สมัครและยังไม่เปิดยูส" color="warning" />
      </div>
    </div>
     <vs-prompt title="รวมเปิดยูสเติมเงิน" class="export-options" @cancle="clearFields" @accept="exportToExcel(get_sumdata.data_vip,'รวมเปิดยูสเติมเงิน')" accept-text="Export" @close="clearFields" :active.sync="activePrompt1">
        <vs-input v-model="fileName" placeholder="Enter File Name.."  class="w-full" />
        <v-select v-model="selectedFormat" :options="formats" class="my-4" />
        <div class="flex">
          <span class="mr-4">Cell Auto Width:</span>
          <vs-switch v-model="cellAutoWidth">Cell Auto Width</vs-switch>
        </div>
    </vs-prompt>
     <vs-prompt title="สมัครและเปิดยูส" class="export-options" @cancle="clearFields" @accept="exportToExcel(get_sumdata.data_regster_vip, 'สมัครและเปิดยูส')" accept-text="Export" @close="clearFields" :active.sync="activePrompt2">
        <vs-input v-model="fileName" placeholder="Enter File Name.." class="w-full" />
        <v-select v-model="selectedFormat" :options="formats" class="my-4" />
        <div class="flex">
          <span class="mr-4">Cell Auto Width:</span>
          <vs-switch v-model="cellAutoWidth">Cell Auto Width</vs-switch>
        </div>
    </vs-prompt>
     <vs-prompt title="สมัครสมาชิก" class="export-options" @cancle="clearFields" @accept="exportToExcel(get_sumdata.data_register,'สมัครสมาชิก')" accept-text="Export" @close="clearFields" :active.sync="activePrompt3">
        <vs-input v-model="fileName" placeholder="Enter File Name.." class="w-full" />
        <v-select v-model="selectedFormat" :options="formats" class="my-4" />
        <div class="flex">
          <span class="mr-4">Cell Auto Width:</span>
          <vs-switch v-model="cellAutoWidth">Cell Auto Width</vs-switch>
        </div>
    </vs-prompt>
     <vs-prompt title="สมัครสมาชิกและไม่เปิดยูส" class="export-options" @cancle="clearFields" @accept="exportToExcel(get_sumdata.data_normal,'สมัครสมาชิกและไม่เปิดยูส')" accept-text="Export" @close="clearFields" :active.sync="activePrompt4">
        <vs-input v-model="fileName" placeholder="Enter File Name.." class="w-full" />
        <v-select v-model="selectedFormat" :options="formats" class="my-4" />
        <div class="flex">
          <span class="mr-4">Cell Auto Width:</span>
          <vs-switch v-model="cellAutoWidth">Cell Auto Width</vs-switch>
        </div>
    </vs-prompt>
  </div>

</template>

<script>
import flatPickr from 'vue-flatpickr-component'
import 'flatpickr/dist/flatpickr.css'
import StatisticsCardLine from '@/components/statistics-cards/StatisticsCardLine.vue'
import axios from '../../axios'
import vSelect from 'vue-select'
import moment from 'moment'
import log from '../../log'
export default {
  data () {
    return {
      before_datetime: moment.tz('Asia/Bangkok').format('YYYY-MM-DD HH:mm'),
      after_datetime: moment.tz('Asia/Bangkok').add(1, 'days').format('YYYY-MM-DD HH:mm'),
      configdateTimePicker: {
        enableTime: true,
        dateFormat: 'Y-m-d H:i',
        time_24hr: true
      },
      fileName: '',
      headerTitle: ['Username', 'วันที่สมัคร', 'วันที่เติมเงินครั้งแรก', 'เบอร์โทรศัพท์', 'LINE'],
      headerVal: ['username', 'member_register_date', 'member_vip_date', 'phone', 'email'],
      get_sumdata: [],
      sum_data: {vip: '', register_vip: '', register: '', normal: ''},
      activePrompt1: false,
      activePrompt2: false,
      activePrompt3: false,
      activePrompt4: false,
      formats:['xlsx', 'csv', 'txt'],
      selectedFormat: 'xlsx',
      cellAutoWidth: true
      
      
    }
  },
  components: {
    flatPickr,
    StatisticsCardLine,
    vSelect
  },
  async mounted () {
    await axios
      .get(`reportregister/register/${this.before_datetime }/${ this.after_datetime}`)
      .then(response => (this.get_sumdata = response.data))
    this.sum_data.vip = this.get_sumdata.vip
    this.sum_data.register_vip = this.get_sumdata.register_vip
    this.sum_data.register = this.get_sumdata.register
    this.sum_data.normal = this.get_sumdata.normal
    this.fileName = `Report_Register ${this.before_datetime} ${this.after_datetime}`
  },
  methods: {
    async selectdate_time () {
      await axios
        .get(`reportregister/register/${this.before_datetime }/${ this.after_datetime}`)
        .then(response => (this.get_sumdata = response.data))
      this.sum_data.vip = this.get_sumdata.vip
      this.sum_data.register_vip = this.get_sumdata.register_vip
      this.sum_data.register = this.get_sumdata.register
      this.sum_data.normal = this.get_sumdata.normal
      this.fileName = `Report_Register ${this.before_datetime} ${this.after_datetime}`
    },
    exportToExcel (sum_data, name) {
      import('@/vendor/Export2Excel').then(excel => {
        const list = sum_data
        const data = this.formatJson(this.headerVal, list)
        excel.export_json_to_excel({
          header: this.headerTitle,
          data,
          filename: this.fileName,
          autoWidth: this.cellAutoWidth,
          bookType: this.selectedFormat
        })
        log.agent('', 'Report_Register', 0, `ดาวน์โหลดไฟล์ Report ${name} วันที่ ${this.before_datetime} ถึงวันที่ ${this.after_datetime}`)
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
    }

  }
}

</script>

<style>

</style>