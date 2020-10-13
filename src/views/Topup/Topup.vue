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
            
          </div>
      
          
          <flat-pickr v-model="date" /> 
          <p class="mt-4">Selected Date: {{ date }}</p>
   
    <div>
      <vx-card >
    <vs-table stripe  max-items="20" pagination :data="userData" search>
    <template slot="thead">
          <vs-th>Datetime</vs-th>
          <vs-th>ชื่อผู้ใช้</vs-th>
          <vs-th>ประเภท</vs-th>
          <vs-th>ก่อนรับ</vs-th>
          <!-- <vs-th>Username</vs-th> -->
          <!-- <vs-th>Password</vs-th> -->
          <vs-th>เครดิตที่ได้รับ</vs-th>
          <vs-th>หลังรับ</vs-th>
          <vs-th>Info</vs-th>
    </template>
        <template slot-scope="{data}">
          <vs-tr :key="indextr" v-for="(tr, indextr) in data">
            <vs-td :data="tr.topup_datetime">
              {{moment(tr.topup_datetime).format('YYYY-MM-DD HH:mm:ss')  }}
            </vs-td>
      
            <vs-td class="text-danger"><router-link :to="`/user/${data[indextr].topup_username}`">{{ data[indextr].topup_username}}</router-link></vs-td>

            <vs-td :data="tr.topup_type">
              {{tr.topup_type}}
            </vs-td>
            <vs-td :data="tr.topup_before">
              {{currency(tr.topup_before)}}
            </vs-td>
            <vs-td :data="tr.topup_credit">
              {{currency(tr.topup_credit)}}
            </vs-td>
            <vs-td :data="tr.topup_after">
              {{currency(tr.topup_after)}}
            </vs-td>
            <vs-td :data="tr.topup_info">
              {{tr.topup_info}}
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
        .get(`topup/topupdate/${this.date}`)
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
      .get(`topup/topupdate/${this.date}`)
      .then(response => (this.userData = response.data))
    
  }
  
  
}

</script>
