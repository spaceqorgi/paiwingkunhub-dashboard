<template>
  <div class="vx-card p-6">
    <div class="flex flex-wrap items-center">
      <!-- ITEMS PER PAGE -->
      <div class="flex-grow">
        <div class="vx-card__title">
          <h4>รายการเครดิตฟรีที่ดำเนินการแล้ว</h4>
          <br>
          <h3>เลือกวันที่</h3>
          <br>
          <flat-pickr v-model="date" />
          <p class="mt-4">Selected Date: {{ date }}</p>
          <br>
        </div>
      </div>
      <vs-button class="mr-6" size="small" icon-pack="feather" icon="icon-refresh-cw" color="success"
        @click="getdata()">ดึงรายการเครดิตฟรี</vs-button>
    </div>
    <br>
    <vs-table max-items="20" pagination search :data="datalist">

      <template slot="thead">
        <vs-th sort-key="id">ID</vs-th>
        <vs-th sort-key="username">Username</vs-th>
        <vs-th sort-key="datetime">Datetime</vs-th>
        <vs-th>message</vs-th>
        <vs-th>Action</vs-th>
        <vs-th sort-key="info">Info</vs-th>
        <vs-th sort-key="admin">Admin</vs-th>

      </template>

      <template slot-scope="{data}">
        <vs-tr :key="indextr" v-for="(tr, indextr) in data">

          <vs-td :data="data[indextr].id">
            {{ data[indextr].id }}
          </vs-td>

          <vs-td :data="data[indextr].username">
            <router-link :to="`/member/${data[indextr].username}`"> {{ data[indextr].username }}</router-link>
          </vs-td>

          <vs-td :data="data[indextr].datetime">
            {{ moment(data[indextr].datetime).format('YYYY-MM-DD HH:mm:ss') }}
          </vs-td>
          <vs-td :data="data[indextr].message">
            {{ data[indextr].message }}
          </vs-td>
          <vs-td :data="data[indextr].status" v-if="data[indextr].status == 1" class="text-success">
            สำเร็จ
          </vs-td>
          <vs-td :data="data[indextr].status" v-else-if="data[indextr].status == 2" class="text-danger">
            ยกเลิก
          </vs-td>
          <vs-td :data="data[indextr].info">
            {{ data[indextr].info }}
          </vs-td>
          <vs-td :data="data[indextr].admin">
            {{ data[indextr].admin }}
          </vs-td>
        </vs-tr>
      </template>
    </vs-table>
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
    vSelect,
    flatPickr
  },
  data () {
    return {
      date: moment.tz('Asia/Bangkok').format('YYYY-MM-DD'),
      events: ['onChange'],
      config: {},
      datalist: []
    
    }
  },
  methods: {
    getdata () {
      axios
        .get(`creditfree/list/${this.date}`)
        .then(response => (this.datalist = response.data))
    }
  },
  watch: {
    date (newValue) {
      this.date = newValue
      this.getdata()
    }
  },
  async mounted () {
  
    await axios
      .get(`creditfree/list/${this.date}`)
      .then(response => (this.datalist = response.data))
    
  }
  
  
}

</script>

<style>

</style>
