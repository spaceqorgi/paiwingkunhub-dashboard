<template>
  <div id="page-user-list">
    <div class="vx-card p-6">
      <div class="flex flex-wrap items-center">
        <!-- ITEMS PER PAGE -->
        <div class="flex-grow">
          <div class="vx-row">
            <div class="vx-col w-full">
              <vx-card title="เลือกวันเวลา">
                <label>เริ่มต้น: </label>
                <flat-pickr  v-model="before_datetime" placeholder="Date Time" />
                <br>
                <br>
                <label> สิ้นสุด: </label>
                <flat-pickr v-model="after_datetime" placeholder="Date Time" />
                <br>
                <br>
                <vs-button color="primary" @click="selectdate_time ()">ค้นหา</vs-button>
              </vx-card>
            </div>
          </div>
          <br>
          <vx-card>
            <div class="vx-card__title">
              <h4>ประวัติพนักงาน</h4>
              <br>
            </div>
            <div class="export-table">
              <vs-table stripe pagination max-items="10" :data="agentData" search>

                <template slot="thead">
                  <vs-th> DATETIME</vs-th>
                  <vs-th> USERNAME</vs-th>
                  <vs-th> TYPE </vs-th>
                  <vs-th> AMOUNT </vs-th>
                  <vs-th> INFO </vs-th>
                  <vs-th> ADMIN </vs-th>

                </template>

                <template slot-scope="{data}">
                  <vs-tr :key="indextr" v-for="(tr, indextr) in data">
                    <vs-td> {{data[indextr].ag_datetime}}</vs-td>
                    <vs-td class="text-danger">
                      <router-link :to="`/user/${data[indextr].ag_username}`">{{ data[indextr].ag_username}}
                      </router-link>
                    </vs-td>
                    <vs-td>{{ data[indextr].ag_type }}</vs-td>
                    <vs-td>{{ data[indextr].ag_amount }}</vs-td>
                    <vs-td>{{ data[indextr].ag_info }}</vs-td>
                    <vs-td>{{ data[indextr].ag_admin }}</vs-td>

                  </vs-tr>
                </template>

              </vs-table>
            </div>
          </vx-card>
          <br>
          <vx-card>
            <div class="vx-card__title">
              <h4>ประวัติใช้ยอด</h4>
              <br>
            </div>
            <div class="export-table">
              <vs-table stripe pagination max-items="10" :data="addbuttonData" search>

                <template slot="thead">
                  <vs-th> DATETIME</vs-th>
                  <vs-th> USERNAME</vs-th>
                  <vs-th> AMOUNT </vs-th>
                  <vs-th> INFO </vs-th>
                  <vs-th> ADMIN</vs-th>

                </template>

                <template slot-scope="{data}">
                  <vs-tr :key="indextr" v-for="(tr, indextr) in data">
                    <vs-td> {{data[indextr].add_datetime}}</vs-td>
                    <vs-td class="text-danger">
                      <router-link :to="`/user/${data[indextr].add_username}`">{{ data[indextr].add_username}}
                      </router-link>
                    </vs-td>
                    <vs-td>{{ data[indextr].add_amount }}</vs-td>
                    <vs-td>{{ data[indextr].add_info }}</vs-td>
                    <vs-td>{{ data[indextr].add_admin }}</vs-td>

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

// function currencyFormatter (params) {
//   return (params.value).replace(/\d(?=(\d{3})+\.)/g, '$&,')
// }
export default {
  components: {
    flatPickr
  },
  data () {
    return {
      cellAutoWidth: true,
      before_datetime: moment.tz('Asia/Bangkok').format('YYYY-MM-DD'),
      after_datetime: moment.tz('Asia/Bangkok').add(1, 'days').format('YYYY-MM-DD'),
      configdateTimePicker: {
        enableTime: true,
        dateFormat: 'Y-m-d H:i',
        time_24hr: true
      },
      agentData: [],
      addbuttonData: []
     

    }
  },
  async mounted () {
    await axios
      .get(`reportlog/agent/${this.before_datetime }/${ this.after_datetime}`)
      .then(response => (this.agentData = response.data))
    await axios
      .get(`reportlog/addbutton/${this.before_datetime }/${ this.after_datetime}`)
      .then(response => (this.addbuttonData = response.data))

  },
  methods: {
    async selectdate_time () {
      await axios
        .get(`reportlog/agent/${this.before_datetime }/${ this.after_datetime}`)
        .then(response => (this.agentData = response.data))
      await axios
        .get(`reportlog/addbutton/${this.before_datetime }/${ this.after_datetime}`)
        .then(response => (this.addbuttonData = response.data))
    }

  }

}
  

</script>
