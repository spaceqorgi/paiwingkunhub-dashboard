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
        <statistics-card-line hideChart class="mb-base" icon="UsersIcon" icon-right :statistic="countuser.topup"
          statisticTitle="เติมเงิน / คน" color="success" />
      </div>
      <div class="vx-col w-full sm:w-1/2 md:w-1/2 lg:w-1/4 xl:w-1/4" @click="activePrompt2=true">
        <statistics-card-line hideChart class="mb-base" icon="UserCheckIcon" icon-right
          :statistic="countuser.sagame" statisticTitle="SAGAME / คน" color="warning" />
      </div>
       <div class="vx-col w-full sm:w-1/2 md:w-1/2 lg:w-1/4 xl:w-1/4" @click="activePrompt3=true">
        <statistics-card-line hideChart class="mb-base" icon="UserCheckIcon" icon-right
          :statistic="countuser.sexygame" statisticTitle="SEXYGAME / คน" color="warning" />
      </div>
       <div class="vx-col w-full sm:w-1/2 md:w-1/2 lg:w-1/4 xl:w-1/4" @click="activePrompt4=true">
        <statistics-card-line hideChart class="mb-base" icon="UserCheckIcon" icon-right
          :statistic="countuser.jokergame" statisticTitle="JOKERSLOT / คน" color="warning" />
      </div>
      <div class="vx-col w-full sm:w-1/2 md:w-1/2 lg:w-1/4 xl:w-1/4" @click="activePrompt5=true">
        <statistics-card-line hideChart class="mb-base" icon="UserCheckIcon" icon-right
          :statistic="countuser.pggame" statisticTitle="PGSLOT / คน" color="warning" />
      </div>
            <div class="vx-col w-full sm:w-1/2 md:w-1/2 lg:w-1/4 xl:w-1/4" @click="activePrompt6=true">
        <statistics-card-line hideChart class="mb-base" icon="UserCheckIcon" icon-right
          :statistic="countuser.kmgame" statisticTitle="KM GAME / คน" color="warning" />
      </div>
        <div class="vx-col w-full sm:w-1/2 md:w-1/2 lg:w-1/4 xl:w-1/4" @click="activePrompt7=true">
        <statistics-card-line hideChart class="mb-base" icon="UserCheckIcon" icon-right
          :statistic="countuser.wmgame" statisticTitle="WM GAME / คน" color="warning" />
      </div>
              <div class="vx-col w-full sm:w-1/2 md:w-1/2 lg:w-1/4 xl:w-1/4" @click="activePrompt8=true">
        <statistics-card-line hideChart class="mb-base" icon="UserCheckIcon" icon-right
          :statistic="countuser.ambgame" statisticTitle="AMB GAME / คน" color="warning" />
      </div>
    </div>
    <vs-prompt title="Active เติมเงิน" class="export-options" @cancle="clearFields"
      @accept="exportToExcel(activeuser.excel.topup,'Active เติมเงิน',headerVal)" accept-text="Export" @close="clearFields"
      :active.sync="activePrompt1">
      <vs-input v-model="fileName" placeholder="Enter File Name.." class="w-full" />
      <v-select v-model="selectedFormat" :options="formats" class="my-4" />
      <div class="flex">
        <span class="mr-4">Cell Auto Width:</span>
        <vs-switch v-model="cellAutoWidth">Cell Auto Width</vs-switch>
      </div>
    </vs-prompt>
    <vs-prompt title="Active Sagame" class="export-options" @cancle="clearFields"
      @accept="exportToExcel(activeuser.excel.sagame, 'Active Sagame',headerVal1)" accept-text="Export" @close="clearFields"
      :active.sync="activePrompt2">
      <vs-input v-model="fileName" placeholder="Enter File Name.." class="w-full" />
      <v-select v-model="selectedFormat" :options="formats" class="my-4" />
      <div class="flex">
        <span class="mr-4">Cell Auto Width:</span>
        <vs-switch v-model="cellAutoWidth">Cell Auto Width</vs-switch>
      </div>
    </vs-prompt>
    <vs-prompt title="Active Sexygame" class="export-options" @cancle="clearFields"
      @accept="exportToExcel(activeuser.excel.sexygame, 'Active Sexygame',headerVal2)" accept-text="Export" @close="clearFields"
      :active.sync="activePrompt3">
      <vs-input v-model="fileName" placeholder="Enter File Name.." class="w-full" />
      <v-select v-model="selectedFormat" :options="formats" class="my-4" />
      <div class="flex">
        <span class="mr-4">Cell Auto Width:</span>
        <vs-switch v-model="cellAutoWidth">Cell Auto Width</vs-switch>
      </div>
    </vs-prompt>
    <vs-prompt title="Active JokerSlot" class="export-options" @cancle="clearFields"
      @accept="exportToExcel(activeuser.excel.jokergame, 'Active JokerGame',headerVal3)" accept-text="Export" @close="clearFields"
      :active.sync="activePrompt4">
      <vs-input v-model="fileName" placeholder="Enter File Name.." class="w-full" />
      <v-select v-model="selectedFormat" :options="formats" class="my-4" />
      <div class="flex">
        <span class="mr-4">Cell Auto Width:</span>
        <vs-switch v-model="cellAutoWidth">Cell Auto Width</vs-switch>
      </div>
    </vs-prompt>
    <vs-prompt title="Active PgSlot" class="export-options" @cancle="clearFields"
      @accept="exportToExcel(activeuser.excel.pggame, 'Active PGslot',headerVal4)" accept-text="Export" @close="clearFields"
      :active.sync="activePrompt5">
      <vs-input v-model="fileName" placeholder="Enter File Name.." class="w-full" />
      <v-select v-model="selectedFormat" :options="formats" class="my-4" />
      <div class="flex">
        <span class="mr-4">Cell Auto Width:</span>
        <vs-switch v-model="cellAutoWidth">Cell Auto Width</vs-switch>
      </div>
    </vs-prompt>
        <vs-prompt title="Active KMgame" class="export-options" @cancle="clearFields"
      @accept="exportToExcel(activeuser.excel.kmgame, 'Active KMgame',headerVal5)" accept-text="Export" @close="clearFields"
      :active.sync="activePrompt6">
      <vs-input v-model="fileName" placeholder="Enter File Name.." class="w-full" />
      <v-select v-model="selectedFormat" :options="formats" class="my-4" />
      <div class="flex">
        <span class="mr-4">Cell Auto Width:</span>
        <vs-switch v-model="cellAutoWidth">Cell Auto Width</vs-switch>
      </div>
    </vs-prompt>
            <vs-prompt title="Active WMgame" class="export-options" @cancle="clearFields"
      @accept="exportToExcel(activeuser.excel.wmgame, 'Active WMgame',headerVal6)" accept-text="Export" @close="clearFields"
      :active.sync="activePrompt7">
      <vs-input v-model="fileName" placeholder="Enter File Name.." class="w-full" />
      <v-select v-model="selectedFormat" :options="formats" class="my-4" />
      <div class="flex">
        <span class="mr-4">Cell Auto Width:</span>
        <vs-switch v-model="cellAutoWidth">Cell Auto Width</vs-switch>
      </div>
    </vs-prompt>
     <vs-prompt title="Active AMBpoker" class="export-options" @cancle="clearFields"
      @accept="exportToExcel(activeuser.excel.ambgame, 'Active WMgame',headerVal7)" accept-text="Export" @close="clearFields"
      :active.sync="activePrompt8">
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
      headerTitle: ['Username', 'เบอร์โทรศัพท์', 'LINE'],
      headerVal: ['topup_username', 'phone', 'email'],
      headerVal1: ['username', 'phone', 'email'],
      headerVal2: ['username', 'phone', 'email'],
      headerVal3: ['username', 'phone', 'email'],
      headerVal4: ['username', 'phone', 'email'],
      headerVal5: ['username', 'phone', 'email'],
      headerVal6: ['username', 'phone', 'email'],
      headerVal7: ['username', 'phone', 'email'],
      activeuser : 
      {
        count : {},
        excel : {}
      },
      countuser: {
        topup:'', 
        sagame:'',
        sexygame:'',
        jokergame:'',
        pggame:'',
        kmgame:'',
        wmgame:'',
        ambgame:''
      },
      data: [],
      activePrompt1: false,
      activePrompt2: false,
      activePrompt3: false,
      activePrompt4: false,
      activePrompt5: false,
      activePrompt6: false,
      activePrompt7: false,
      activePrompt8: false,
      formats: ['xlsx', 'csv', 'txt'],
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
      .get(`reportactiveuser/activeuser/${this.before_datetime }/${ this.after_datetime}`)
      .then(response => (this.activeuser.count = response.data))
    this.countuser.topup = this.activeuser.count.topupuser
    this.countuser.sagame = this.activeuser.count.playersa
    this.countuser.sexygame =  this.activeuser.count.playersexy
    this.countuser.jokergame = this.activeuser.count.playerjoker
    this.countuser.pggame = this.activeuser.count.playerpggame
    this.countuser.kmgame = this.activeuser.count.playerkmgame
    this.countuser.wmgame = this.activeuser.count.playerwm
    this.countuser.ambgame = this.activeuser.count.playeramb
    await axios
      .get(`reportactiveuser/dataactiveuser/${this.before_datetime }/${ this.after_datetime}`)
      .then(response => (this.activeuser.excel = response.data))
   
    this.fileName = `Report_Activeuser ${this.before_datetime} ${this.after_datetime}`
  },
  methods: {
    async selectdate_time () {
      await axios
        .get(`reportactiveuser/activeuser/${this.before_datetime }/${ this.after_datetime}`)
        .then(response => (this.activeuser.count = response.data))
      this.countuser.topup = this.activeuser.count.topupuser
      this.countuser.sagame = this.activeuser.count.playersa
      this.countuser.sexygame =  this.activeuser.count.playersexy
      this.countuser.jokergame = this.activeuser.count.playerjoker
      this.countuser.pggame = this.activeuser.count.playerpggame
      this.countuser.kmgame = this.activeuser.count.playerkmgame
      this.countuser.wmgame = this.activeuser.count.playerwm
      this.countuser.ambgame = this.activeuser.count.playeramb
      await axios
        .get(`reportactiveuser/dataactiveuser/${this.before_datetime }/${ this.after_datetime}`)
        .then(response => (this.activeuser.excel = response.data))
      this.fileName = `Report_Activeuser ${this.before_datetime} ${this.after_datetime}`
    },
    exportToExcel (count_data, name, headerVal) {
      import('@/vendor/Export2Excel').then(excel => {
        const list = count_data
        const data = this.formatJson(headerVal, list)
        excel.export_json_to_excel({
          header: this.headerTitle,
          data,
          filename: this.fileName,
          autoWidth: this.cellAutoWidth,
          bookType: this.selectedFormat
        })
        log.agent('', 'Report_Activeuser', 0,
          `ดาวน์โหลดไฟล์ Report ${name} วันที่ ${this.before_datetime} ถึงวันที่ ${this.after_datetime}`)
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
