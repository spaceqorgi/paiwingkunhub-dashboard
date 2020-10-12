<template>
  <div class="vx-col w-full">
    <div class="vx-row">
      <div class="vx-col w-full">
        <vs-prompt title="Export To Excel" class="export-options" @cancle="clearFields" @accept="exportToExcel"
          accept-text="Export" @close="clearFields" :active.sync="activePrompt">
          <vs-input v-model="fileName" placeholder="Enter File Name.." class="w-full" />
          <v-select v-model="selectedFormat" :options="formats" class="my-4" />
          <div class="flex">
            <span class="mr-4">Cell Auto Width:</span>
            <vs-switch v-model="cellAutoWidth">Cell Auto Width</vs-switch>
          </div>
        </vs-prompt>

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
        <vs-prompt class="export-options" @cancle="clearFields" @accept="exportToExcel(data[0],'สมัครสมาชิกใหม่รับโบนัส 50%')" accept-text="Export" @close="clearFields" :active.sync="activePrompt1" title="สมัครสมาชิกใหม่รับโบนัส 50%">
        <vs-input v-model="fileName" placeholder="Enter File Name.."  class="w-full" />
        <v-select v-model="selectedFormat" :options="formats" class="my-4" />
        <div class="flex">
          <span class="mr-4">Cell Auto Width:</span>
          <vs-switch v-model="cellAutoWidth">Cell Auto Width</vs-switch>
        </div>
    </vs-prompt>
  <vs-prompt class="export-options" @cancle="clearFields" @accept="exportToExcel(data[1],'ฝากเงินครั้งแรกของวันรับโบนัส 10%')" accept-text="Export" @close="clearFields" :active.sync="activePrompt2" title="ฝากเงินครั้งแรกของวันรับโบนัส 10%">
        <vs-input v-model="fileName" placeholder="Enter File Name.."  class="w-full" />
        <v-select v-model="selectedFormat" :options="formats" class="my-4" />
        <div class="flex">
          <span class="mr-4">Cell Auto Width:</span>
          <vs-switch v-model="cellAutoWidth">Cell Auto Width</vs-switch>
        </div>
    </vs-prompt>
     <vs-prompt class="export-options" @cancle="clearFields" @accept="exportToExcel(data[2],'แนะนำเพื่อน')" accept-text="Export" @close="clearFields" :active.sync="activePrompt3" title="แนะนำเพื่อน">
        <vs-input v-model="fileName" placeholder="Enter File Name.."  class="w-full" />
        <v-select v-model="selectedFormat" :options="formats" class="my-4" />
        <div class="flex">
          <span class="mr-4">Cell Auto Width:</span>
          <vs-switch v-model="cellAutoWidth">Cell Auto Width</vs-switch>
        </div>
    </vs-prompt>
     <vs-prompt class="export-options" @cancle="clearFields" @accept="exportToExcel(data[3],'คืนยอดเล่น')" accept-text="Export" @close="clearFields" :active.sync="activePrompt4" title="คืนยอดเล่น">
        <vs-input v-model="fileName" placeholder="Enter File Name.."  class="w-full" />
        <v-select v-model="selectedFormat" :options="formats" class="my-4" />
        <div class="flex">
          <span class="mr-4">Cell Auto Width:</span>
          <vs-switch v-model="cellAutoWidth">Cell Auto Width</vs-switch>
        </div>
    </vs-prompt>
     <vs-prompt class="export-options" @cancle="clearFields" @accept="exportToExcel(data[4],'กงล้อลุ้นโชค')" accept-text="Export" @close="clearFields" :active.sync="activePrompt5" title="กงล้อลุ้นโชค">
        <vs-input v-model="fileName" placeholder="Enter File Name.."  class="w-full" />
        <v-select v-model="selectedFormat" :options="formats" class="my-4" />
        <div class="flex">
          <span class="mr-4">Cell Auto Width:</span>
          <vs-switch v-model="cellAutoWidth">Cell Auto Width</vs-switch>
        </div>
    </vs-prompt>
     <vs-prompt class="export-options" @cancle="clearFields" @accept="exportToExcel(data[5],'เปิดการ์ดลุ้นโชค')" accept-text="Export" @close="clearFields" :active.sync="activePrompt6" title="เปิดการ์ดลุ้นโชค">
        <vs-input v-model="fileName" placeholder="Enter File Name.."  class="w-full" />
        <v-select v-model="selectedFormat" :options="formats" class="my-4" />
        <div class="flex">
          <span class="mr-4">Cell Auto Width:</span>
          <vs-switch v-model="cellAutoWidth">Cell Auto Width</vs-switch>
        </div>
    </vs-prompt>
    <br>
  <vx-card>
  <div class="vx-row" >
    <div class="vx-col md:w-1/5 w-full">Type</div>
    <div class="vx-col md:w-1/5 w-full">Bonus</div>
    <div class="vx-col md:w-1/5 w-full">User</div>
    <div class="vx-col md:w-1/5 w-full">Credit</div>
    <div class="vx-col md:w-1/5 w-full"></div>
  </div>
  <br>
  <br>
  <div class="vx-row" >
    <div class="vx-col md:w-1/5 w-full text-warning">สมัครสมาชิกใหม่รับโบนัส 50%</div>
    <div class="vx-col md:w-1/5 w-full text-warning">{{rpbonus.countbonus50}} ครั้ง</div>
     <div class="vx-col md:w-1/5 w-full text-warning">{{rpbonus.countuser50}} คน</div>
    <div class="vx-col md:w-1/5 w-full text-warning">{{rpbonus.sumbonus50}} Credit</div>
    <div class="vx-col md:w-1/5 w-full text-warning"><vs-button @click="activePrompt1 = true">Export</vs-button></div>
  </div>
  <br>
  <div class="vx-row" >
    <div class="vx-col md:w-1/5 w-full text-success">ฝากเงินครั้งแรกของวันรับโบนัส 10%</div>
    <div class="vx-col md:w-1/5 w-full text-success">{{rpbonus.countbonus10}} ครั้ง</div>
    <div class="vx-col md:w-1/5 w-full text-success">{{rpbonus.countuser10}} คน</div>
    <div class="vx-col md:w-1/5 w-full text-success">{{rpbonus.sumbonus10}} Credit</div>
    <div class="vx-col md:w-1/5 w-full text-success"><vs-button @click="activePrompt2 = true">Export</vs-button></div>
  </div>
  <br>
  <div class="vx-row" >
    <div class="vx-col md:w-1/5 w-full text-danger">แนะนำเพื่อน</div>
    <div class="vx-col md:w-1/5 w-full text-danger">{{rpbonus.countaff}} ครั้ง</div>
    <div class="vx-col md:w-1/5 w-full text-danger">{{rpbonus.countuseraff}} คน</div>
    <div class="vx-col md:w-1/5 w-full text-danger">{{rpbonus.sumaff}} Credit</div>
    <div class="vx-col md:w-1/5 w-full text-danger"><vs-button @click="activePrompt3 = true">Export</vs-button></div>
  </div>
  <br>
  <div class="vx-row" >
    <div class="vx-col md:w-1/5 w-full text-warning">คืนเครดิต</div>
    <div class="vx-col md:w-1/5 w-full text-warning">{{rpbonus.countturn}} ครั้ง</div>
    <div class="vx-col md:w-1/5 w-full text-warning">{{rpbonus.countuserturn}} คน</div>
    <div class="vx-col md:w-1/5 w-full text-warning">{{rpbonus.sumturn}} Credit</div>
    <div class="vx-col md:w-1/5 w-full text-warning"><vs-button @click="activePrompt4 = true">Export</vs-button></div>
  </div>
  <br>
  <div class="vx-row" >
    <div class="vx-col md:w-1/5 w-full text-success">เปิดการ์ดลุ้นโชค</div>
    <div class="vx-col md:w-1/5 w-full text-success">{{rpbonus.countcard}} ครั้ง</div>
    <div class="vx-col md:w-1/5 w-full text-success">{{rpbonus.countusercard}} คน</div>
    <div class="vx-col md:w-1/5 w-full text-success">{{rpbonus.sumcard}} Credit</div>
  </div>
  <br>
  <br>
  <div class="vx-row" >
    <div class="vx-col md:w-1/5 w-full text-danger">เปิดกงล้อลุ้นโชค</div>
    <div class="vx-col md:w-1/5 w-full text-danger">{{rpbonus.countspin}} ครั้ง</div>
    <div class="vx-col md:w-1/5 w-full text-danger">{{rpbonus.countuserspin}} คน</div>
    <div class="vx-col md:w-1/5 w-full text-danger">{{rpbonus.sumspin}} Credit</div>
  </div>
  <br>
  <br>
  <div class="vx-row" >
    <div class="vx-col md:w-1/5 w-full text-warning">เครดิตฟรี</div>
    <div class="vx-col md:w-1/5 w-full text-warning">{{rpbonus.countcreditfree}} ครั้ง</div>
    <div class="vx-col md:w-1/5 w-full text-warning">{{rpbonus.countusercreditfree}} คน</div>
    <div class="vx-col md:w-1/5 w-full text-warning">{{rpbonus.sumcreditfree}} Credit</div>
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
      rpbonus:{},
      data:[],
      activePrompt: false,
      activePrompt1: false,
      activePrompt2: false,
      activePrompt3: false,
      activePrompt4: false,
      activePrompt5: false,
      activePrompt6: false,
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
      .get(`reportbonus/bonus/${this.before_datetime }/${ this.after_datetime}`)
      .then(response => (this.rpbonus = response.data))
    await axios
      .get(`reportbonus/databonus/${this.before_datetime }/${ this.after_datetime}`)
      .then(response => (this.data = response.data))
    this.fileName = `Report_Bonus ${this.before_datetime} ${this.after_datetime}`
  },
  methods: {
    async selectdate_time () {
      await axios
        .get(`reportbonus/bonus/${this.before_datetime }/${ this.after_datetime}`)
        .then(response => (this.rpbonus = response.data))
      await axios
        .get(`reportbonus/databonus/${this.before_datetime }/${ this.after_datetime}`)
        .then(response => (this.data = response.data))
      this.fileName = `Report_Bonus ${this.before_datetime} ${this.after_datetime}`
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
        log.agent('', 'Report_Bonus', 0, `ดาวน์โหลดไฟล์ Report ${name} วันที่ ${this.before_datetime} ถึงวันที่ ${this.after_datetime}`)
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
