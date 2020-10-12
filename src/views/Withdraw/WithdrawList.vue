<template>


  <div id="page-user-list">
    <div class="vx-card p-6">
      <div class="vx-card__header">
        <div class="vx-card__title">
        </div>
      </div>
      <div class="flex flex-wrap items-center">

        <!-- ITEMS PER PAGE -->
        <div class="flex-grow">
          <div class="vx-card__title">
            <h4>เลือกวันที่</h4>
            <br>
          </div>
          <flat-pickr v-model="date" />
          <p class="mt-4">Selected Date: {{ date }}</p>
 <br>
    <div>
      <vx-card >
    <vs-table stripe  max-items="20" pagination :data="userData" search>
    <template slot="thead">
          <vs-th>Datetimm</vs-th>
          <vs-th>USERNANE</vs-th>
          <vs-th>CREDIT</vs-th>
          <vs-th>STATUS</vs-th>
          <vs-th>Info</vs-th>
          <vs-th>BANK</vs-th>
          <vs-th>ADMIN</vs-th>
    </template>
        <template slot-scope="{data}">
          <vs-tr :key="indextr" v-for="(tr, indextr) in data">
            <vs-td :data="tr.wd_datetime">
              {{moment(tr.wd_datetime).format('YYYY-MM-DD HH:mm:ss')  }}
            </vs-td>
            <vs-td class="text-danger"><router-link :to="`/user/${data[indextr].wd_username}`">{{ data[indextr].wd_username}}</router-link></vs-td>
            <vs-td :data="tr.wd_amount">
              {{currency(tr.wd_amount)}}
            </vs-td>
            <vs-td  :data="tr.wd_status" v-if="tr.wd_status == 0">
               รอทำรายการ
            </vs-td>
            <vs-td class="text-success" :data="tr.wd_status" v-else-if="tr.wd_status == 1">
               ทำรายการสำเร็จ
            </vs-td>
            <vs-td class="text-wraning" :data="tr.wd_status" v-else-if="tr.wd_status == 3">
               คืนเครดิต
            </vs-td>
            <vs-td class="text-danger" :data="tr.wd_status" v-else-if="tr.wd_status == 2">
               ยกเลิกถอน{{tr.wd_status}}
            </vs-td>
            <vs-td :data="tr.wd_info">
              {{tr.wd_info}}
            </vs-td>
            <vs-td :data="tr.wd_bank_acc">
              {{tr.wd_bank_acc}}
            </vs-td>
            <vs-td :data="tr.wd_admin">
              {{tr.wd_admin}}
            </vs-td>
          </vs-tr>
        </template>
      </vs-table>
      </vx-card>
            </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
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
    // eslint-disable-next-line vue/no-unused-components
    vSelect,
    flatPickr
  },
  data () {
    return {
      date: moment.tz('Asia/Bangkok').format('YYYY-MM-DD'),
      events: ['onChange'],
      config: {},
      searchQuery: '',
      userData: [],
      components: '',
      bankscb: []
    
    }
  },
  methods: {
    updateSearchQuery (val) {
      this.gridApi.setQuickFilter(val)
    },
    currency (amount) {
      if (amount >= 0) {
        if (typeof amount === 'number') {
          amount = String(Math.abs(amount))
        }
        return (amount).replace(/\d(?=(\d{3})+\.)/g, '$&,')
      } else {
        return `${(amount).replace(/\d(?=(\d{3})+\.)/g, '$&,')}`
      }

    },
    selectdate () {
      axios
        .get(`withdraw/withdrawlist/${this.date}`)
        .then(response => (this.userData = response.data))
        // this.gridApi = this.gridOptions.api
    }

  },
  watch: {
    date (newValue) {
      this.date = newValue
      this.selectdate()
    }
  },
  async mounted () {
  
    await axios
      .get(`withdraw/withdrawlist/${this.date}`)
      .then(response => (this.userData = response.data))
    
  }
  
  
}

</script>
