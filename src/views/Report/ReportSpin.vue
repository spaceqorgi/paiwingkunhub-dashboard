<template>
  <div class="vx-col w-full">
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
        <vs-prompt class="export-options" @cancle="clearFields" @accept="exportToExcel(data[0],'กงล้อ 5 บาท')" accept-text="Export" @close="clearFields" :active.sync="activePrompt1" title="กงล้อ 5 บาท">
        <vs-input v-model="fileName" placeholder="Enter File Name.."  class="w-full" />
        <v-select v-model="selectedFormat" :options="formats" class="my-4" />
        <div class="flex">
          <span class="mr-4">Cell Auto Width:</span>
          <vs-switch v-model="cellAutoWidth">Cell Auto Width</vs-switch>
        </div>
    </vs-prompt>
  <vs-prompt class="export-options" @cancle="clearFields" @accept="exportToExcel(data[1],'กงล้อ 50 บาท')" accept-text="Export" @close="clearFields" :active.sync="activePrompt2" title="กงล้อ 50 บาท">
        <vs-input v-model="fileName" placeholder="Enter File Name.."  class="w-full" />
        <v-select v-model="selectedFormat" :options="formats" class="my-4" />
        <div class="flex">
          <span class="mr-4">Cell Auto Width:</span>
          <vs-switch v-model="cellAutoWidth">Cell Auto Width</vs-switch>
        </div>
    </vs-prompt>
    <vs-prompt class="export-options" @cancle="clearFields" @accept="exportToExcel(data[2],'กงล้อ 100 บาท')" accept-text="Export" @close="clearFields" :active.sync="activePrompt3" title="กงล้อ 100 บาท">
        <vs-input v-model="fileName" placeholder="Enter File Name.."  class="w-full" />
        <v-select v-model="selectedFormat" :options="formats" class="my-4" />
        <div class="flex">
          <span class="mr-4">Cell Auto Width:</span>
          <vs-switch v-model="cellAutoWidth">Cell Auto Width</vs-switch>
        </div>
    </vs-prompt>
    <vs-prompt class="export-options" @cancle="clearFields" @accept="exportToExcel(data[3],'กงล้อ 150 บาท')" accept-text="Export" @close="clearFields" :active.sync="activePrompt3" title="กงล้อ 150 บาท">
        <vs-input v-model="fileName" placeholder="Enter File Name.."  class="w-full" />
        <v-select v-model="selectedFormat" :options="formats" class="my-4" />
        <div class="flex">
          <span class="mr-4">Cell Auto Width:</span>
          <vs-switch v-model="cellAutoWidth">Cell Auto Width</vs-switch>
        </div>
    </vs-prompt>
    <vs-prompt class="export-options" @cancle="clearFields" @accept="exportToExcel(data[4],'กงล้อ 200 บาท')" accept-text="Export" @close="clearFields" :active.sync="activePrompt3" title="กงล้อ 200 บาท">
        <vs-input v-model="fileName" placeholder="Enter File Name.."  class="w-full" />
        <v-select v-model="selectedFormat" :options="formats" class="my-4" />
        <div class="flex">
          <span class="mr-4">Cell Auto Width:</span>
          <vs-switch v-model="cellAutoWidth">Cell Auto Width</vs-switch>
        </div>
    </vs-prompt>
    <vs-prompt class="export-options" @cancle="clearFields" @accept="exportToExcel(data[5],'กงล้อ 300 บาท')" accept-text="Export" @close="clearFields" :active.sync="activePrompt3" title="กงล้อ 300 บาท">
        <vs-input v-model="fileName" placeholder="Enter File Name.."  class="w-full" />
        <v-select v-model="selectedFormat" :options="formats" class="my-4" />
        <div class="flex">
          <span class="mr-4">Cell Auto Width:</span>
          <vs-switch v-model="cellAutoWidth">Cell Auto Width</vs-switch>
        </div>
    </vs-prompt>
    <vs-prompt class="export-options" @cancle="clearFields" @accept="exportToExcel(data[6],'กงล้อ 500 บาท')" accept-text="Export" @close="clearFields" :active.sync="activePrompt3" title="กงล้อ 500 บาท">
        <vs-input v-model="fileName" placeholder="Enter File Name.."  class="w-full" />
        <v-select v-model="selectedFormat" :options="formats" class="my-4" />
        <div class="flex">
          <span class="mr-4">Cell Auto Width:</span>
          <vs-switch v-model="cellAutoWidth">Cell Auto Width</vs-switch>
        </div>
    </vs-prompt>
    <vs-prompt class="export-options" @cancle="clearFields" @accept="exportToExcel(data[7],'กงล้อ 1000 บาท')" accept-text="Export" @close="clearFields" :active.sync="activePrompt3" title="กงล้อ 1000 บาท">
        <vs-input v-model="fileName" placeholder="Enter File Name.."  class="w-full" />
        <v-select v-model="selectedFormat" :options="formats" class="my-4" />
        <div class="flex">
          <span class="mr-4">Cell Auto Width:</span>
          <vs-switch v-model="cellAutoWidth">Cell Auto Width</vs-switch>
        </div>
    </vs-prompt>
    <vs-prompt class="export-options" @cancle="clearFields" @accept="exportToExcel(data[8],'กงล้อ 2000 บาท')" accept-text="Export" @close="clearFields" :active.sync="activePrompt3" title="กงล้อ 2000 บาท">
        <vs-input v-model="fileName" placeholder="Enter File Name.."  class="w-full" />
        <v-select v-model="selectedFormat" :options="formats" class="my-4" />
        <div class="flex">
          <span class="mr-4">Cell Auto Width:</span>
          <vs-switch v-model="cellAutoWidth">Cell Auto Width</vs-switch>
        </div>
    </vs-prompt>
    
  <vx-card>
  <div class="vx-row" >
    <div class="vx-col md:w-1/5 w-full">Type</div>
    <div class="vx-col md:w-1/5 w-full">Bonus</div>
    <div class="vx-col md:w-1/5 w-full">User</div>
    <div class="vx-col md:w-1/5 w-full">Credit</div>
    <div class="vx-col md:w-1/5 w-full"></div>
  </div>
  
  
  <div class="vx-row" >
    <div class="vx-col md:w-1/5 w-full text-warning">กงล้อ 5 บาท</div>
    <div class="vx-col md:w-1/5 w-full text-warning">{{reportspin.countbonus5}} ครั้ง</div>
     <div class="vx-col md:w-1/5 w-full text-warning">{{reportspin.countuser5}} คน</div>
    <div class="vx-col md:w-1/5 w-full text-warning">{{reportspin.sumbonus5}} Credit</div>
    <div class="vx-col md:w-1/5 w-full text-warning"><vs-button @click="activePrompt1 = true">Export</vs-button></div>
  </div>
  
  <div class="vx-row" >
    <div class="vx-col md:w-1/5 w-full text-success">กงล้อ 50 บาท</div>
    <div class="vx-col md:w-1/5 w-full text-success">{{reportspin.countbonus50}} ครั้ง</div>
    <div class="vx-col md:w-1/5 w-full text-success">{{reportspin.countuser50}} คน</div>
    <div class="vx-col md:w-1/5 w-full text-success">{{reportspin.sumbonus50}} Credit</div>
    <div class="vx-col md:w-1/5 w-full text-success"><vs-button @click="activePrompt2 = true">Export</vs-button></div>
  </div>
  
   <div class="vx-row" >
    <div class="vx-col md:w-1/5 w-full text-danger">กงล้อ 100 บาท</div>
    <div class="vx-col md:w-1/5 w-full text-danger">{{reportspin.countbonus100}} ครั้ง</div>
     <div class="vx-col md:w-1/5 w-full text-danger">{{reportspin.countuser100}} คน</div>
    <div class="vx-col md:w-1/5 w-full text-danger">{{reportspin.sumbonus100}} Credit</div>
    <div class="vx-col md:w-1/5 w-full text-danger"><vs-button @click="activePrompt3 = true">Export</vs-button></div>
  </div>
  
   <div class="vx-row" >
    <div class="vx-col md:w-1/5 w-full text-warning">กงล้อ 150 บาท</div>
    <div class="vx-col md:w-1/5 w-full text-warning">{{reportspin.countbonus150}} ครั้ง</div>
     <div class="vx-col md:w-1/5 w-full text-warning">{{reportspin.countuser150}} คน</div>
    <div class="vx-col md:w-1/5 w-full text-warning">{{reportspin.sumbonus150}} Credit</div>
    <div class="vx-col md:w-1/5 w-full text-warning"><vs-button @click="activePrompt4 = true">Export</vs-button></div>
  </div>
  
  <div class="vx-row" >
    <div class="vx-col md:w-1/5 w-full text-success">กงล้อ 200 บาท</div>
    <div class="vx-col md:w-1/5 w-full text-success">{{reportspin.countbonus200}} ครั้ง</div>
    <div class="vx-col md:w-1/5 w-full text-success">{{reportspin.countuser200}} คน</div>
    <div class="vx-col md:w-1/5 w-full text-success">{{reportspin.sumbonus200}} Credit</div>
    <div class="vx-col md:w-1/5 w-full text-success"><vs-button @click="activePrompt5 = true">Export</vs-button></div>
  </div>
  
   <div class="vx-row" >
    <div class="vx-col md:w-1/5 w-full text-danger">กงล้อ 300 บาท</div>
    <div class="vx-col md:w-1/5 w-full text-danger">{{reportspin.countbonus300}} ครั้ง</div>
     <div class="vx-col md:w-1/5 w-full text-danger">{{reportspin.countuser300}} คน</div>
    <div class="vx-col md:w-1/5 w-full text-danger">{{reportspin.sumbonus300}} Credit</div>
    <div class="vx-col md:w-1/5 w-full text-danger"><vs-button @click="activePrompt6 = true">Export</vs-button></div>
  </div>
  
   <div class="vx-row" >
    <div class="vx-col md:w-1/5 w-full text-warning">กงล้อ 500 บาท</div>
    <div class="vx-col md:w-1/5 w-full text-warning">{{reportspin.countbonus500}} ครั้ง</div>
     <div class="vx-col md:w-1/5 w-full text-warning">{{reportspin.countuser500}} คน</div>
    <div class="vx-col md:w-1/5 w-full text-warning">{{reportspin.sumbonus500}} Credit</div>
    <div class="vx-col md:w-1/5 w-full text-warning"><vs-button @click="activePrompt7 = true">Export</vs-button></div>
  </div>
  
  <div class="vx-row" >
    <div class="vx-col md:w-1/5 w-full text-success">กงล้อ 1000 บาท</div>
    <div class="vx-col md:w-1/5 w-full text-success">{{reportspin.countbonus1000}} ครั้ง</div>
    <div class="vx-col md:w-1/5 w-full text-success">{{reportspin.countuser1000}} คน</div>
    <div class="vx-col md:w-1/5 w-full text-success">{{reportspin.sumbonus1000}} Credit</div>
    <div class="vx-col md:w-1/5 w-full text-success"><vs-button @click="activePrompt8 = true">Export</vs-button></div>
  </div>
  
   <div class="vx-row" >
    <div class="vx-col md:w-1/5 w-full text-danger">กงล้อ 2000 บาท</div>
    <div class="vx-col md:w-1/5 w-full text-danger">{{reportspin.countbonus2000}} ครั้ง</div>
     <div class="vx-col md:w-1/5 w-full text-danger">{{reportspin.countuser2000}} คน</div>
    <div class="vx-col md:w-1/5 w-full text-danger">{{reportspin.sumbonus2000}} Credit</div>
    <div class="vx-col md:w-1/5 w-full text-danger"><vs-button @click="activePrompt9 = true">Export</vs-button></div>
  </div>
  
  </vx-card>
  </div>
</template>

<script>
import axios from '../../axios'
import moment from 'moment'
import flatPickr from 'vue-flatpickr-component'
import 'flatpickr/dist/flatpickr.css'
import StatisticsCardLine from '@/components/statistics-cards/StatisticsCardLine.vue'
import vSelect from 'vue-select'
import log from '../../log'

export default {
  components: {
    flatPickr,
    StatisticsCardLine,
    vSelect
  },
  data () {
    return {
      before_datetime: moment.tz('Asia/Bangkok').format('YYYY-MM-DD HH:mm'),
      after_datetime: moment.tz('Asia/Bangkok').add(1, 'days').format('YYYY-MM-DD HH:mm'),
      configdateTimePicker: {
        enableTime: true,
        dateFormat: 'Y-m-d H:i',
        time_24hr: true
      },
      reportspin:{},
      data:[],
      activePrompt1: false,
      activePrompt2: false,
      activePrompt3: false,
      activePrompt4: false,
      activePrompt5: false,
      activePrompt6: false,
      activePrompt7: false,
      activePrompt8: false,
      activePrompt9: false,
      fileName: '',
      cellAutoWidth: true,
      formats:['xlsx', 'csv', 'txt'],
      selectedFormat: 'xlsx',
      headerTitle: ['Username', 'เบอร์โทรศัพท์', 'LINE'],
      headerVal: ['topup_username', 'phone', 'email']


    }
  },
  async mounted () {
    await axios
      .get(`reportspin/spin/${this.before_datetime }/${ this.after_datetime}`)
      .then(response => (this.reportspin = response.data))
    await axios
      .get(`reportspin/dataspin/${this.before_datetime }/${ this.after_datetime}`)
      .then(response => (this.data = response.data))
    this.fileName = `Report_Spin ${this.before_datetime} ${this.after_datetime}`
  },
  methods: {
    async selectdate_time () {
      await axios
        .get(`reportspin/spin/${this.before_datetime }/${ this.after_datetime}`)
        .then(response => (this.reportspin = response.data))
      await axios
        .get(`reportspin/dataspin/${this.before_datetime }/${ this.after_datetime}`)
        .then(response => (this.data = response.data))
      this.fileName = `Report_Spin ${this.before_datetime} ${this.after_datetime}`
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
        log.agent('', 'Report_Spin', 0, `ดาวน์โหลดไฟล์ Report ${name} วันที่ ${this.before_datetime} ถึงวันที่ ${this.after_datetime}`)
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
