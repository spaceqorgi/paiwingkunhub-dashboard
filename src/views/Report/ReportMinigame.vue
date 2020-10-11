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
    <vx-card>
      <div class="vx-row">
        <div class="vx-col md:w-1/5 w-full">Type</div>
        <div class="vx-col md:w-1/5 w-full">Bonus</div>
        <div class="vx-col md:w-1/5 w-full">Credit</div>
        <div class="vx-col md:w-1/5 w-full"></div>
      </div>
      <br>
      <br>
      <div class="vx-row">
        <div class="vx-col md:w-1/5 w-full text-warning">เปิดไพ่</div>
        <div class="vx-col md:w-1/5 w-full text-warning">{{reportcard.countuser}} ครั้ง</div>
        <div class="vx-col md:w-1/5 w-full text-warning">{{reportcard.sumbonus}} Credit</div>
        <div class="vx-col md:w-1/5 w-full"></div>
      </div>
      <br>
      <div class="vx-row">
        <div class="vx-col md:w-1/5 w-full text-success">กงล้อ</div>
        <div class="vx-col md:w-1/5 w-full text-success">{{reportspin.countuser}} ครั้ง</div>
        <div class="vx-col md:w-1/5 w-full text-success">{{reportspin.sumbonus}} Credit</div>
        <div class="vx-col md:w-1/5 w-full"></div>
      </div>
      <br>
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
      reportcard: {},
      reportspin: {},
      data: [],
      activePrompt1: false,
      activePrompt2: false,
      fileName: '',
      cellAutoWidth: true,
      formats: ['xlsx', 'csv', 'txt'],
      selectedFormat: 'xlsx',
      headerTitle: ['จำนวนครั้ง', 'จำนวนคน', 'จำนวนเงิน'],
      headerVal: ['countbonus', 'countuser', 'sumbonus']


    }
  },
  async mounted () {
    await axios
      .get(`reportminigame/card/${this.before_datetime }/${ this.after_datetime}`)
      .then(response => (this.reportcard = response.data))
    this.fileName = `Report_Card ${this.before_datetime} ${this.after_datetime}`
    await axios
      .get(`reportminigame/spin/${this.before_datetime }/${ this.after_datetime}`)
      .then(response => (this.reportspin = response.data))
  },
  methods: {
    async selectdate_time () {
      await axios
        .get(`reportminigame/card/${this.before_datetime }/${ this.after_datetime}`)
        .then(response => (this.reportcard = response.data))
      this.fileName = `Report_Card ${this.before_datetime} ${this.after_datetime}`
      await axios
        .get(`reportminigame/spin/${this.before_datetime }/${ this.after_datetime}`)
        .then(response => (this.reportspin = response.data))
    }
  }
}

</script>

<style>

</style>
