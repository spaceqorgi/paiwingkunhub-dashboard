<template>
  <div>
    <vx-card title="ผู้ร่วมงาน">
      <!-------------------------------------------------------------------Table------------------------------------------------------------------------------>
      <vs-table search :data="rowData" noDataText="ไม่พบข้อมูล">
        <template slot="thead">
          <vs-th sort-key="id">รหัส</vs-th>
          <vs-th sort-key="username">อีเมลผู้ใช้</vs-th>
          <vs-th sort-key="ticket_name">รายการเข้าร่วมประเภท</vs-th>
          <vs-th sort-key="ticket_length_in_km">ระยะที่ต้องวิ่ง</vs-th>
          <vs-th sort-key="status">สถานะ</vs-th>
          <vs-th sort-key="options">จัดการ</vs-th>
        </template>

        <template slot-scope="{ data }">
          <vs-tr :key="tr.participation_id" v-for="tr in data">
            <vs-td :data="tr.participation_id">{{ tr.participation_id }}</vs-td>
            <vs-td :data="tr.username">{{ tr.username }}</vs-td>
            <vs-td :data="tr.ticket_name">{{ tr.ticket_name }}</vs-td>
            <vs-td :data="tr.ticket_length_in_km">{{ tr.ticket_length_in_km }}</vs-td>
            <vs-td :data="tr.status">{{ getStatus(tr.status) }}</vs-td>
            <vs-td :data="tr.options">
              <vs-button class="mx-1" size="small" color="dark" type="filled" @click="actionOptionLookup(tr)"
                >ดูข้อมูล
              </vs-button>
            </vs-td>
          </vs-tr>
        </template>
      </vs-table>
      <!-------------------------------------------------------------------END Table------------------------------------------------------------------------------>
    </vx-card>
    <!-------------------------------------------------------------------Action popup------------------------------------------------------------------------------>
    <vs-popup classContent="popup-example" title="ข้อมูลการสมัครวิ่ง" :active.sync="popupOptionLookup">
      <div class="px-5 my-5">
        <h1 class="text-primary my-1">{{ currentOptionLookup.username }}</h1>
        <h3 class="my-1">{{ currentOptionLookup.name }}</h3>
        <h3 class="my-1">{{ currentOptionLookup.ticket_name }}</h3>
        <p class="my-2">{{ currentOptionLookup.ticket_description }}</p>
        <!----------------------------------------------------------------------------------------->
        <vs-divider />
        <h3 class="text-primary">{{ getStatus(currentOptionLookup.status) }}</h3>
        <img class="my-2" width="200rem" height="auto" :src="imgSrc" alt="หลักฐาน" />
        <h4 v-if="currentOptionLookup.status === 2 || currentOptionLookup.status === 1" class="text-primary my-2">
          ยอดที่ชำระแล้ว: {{ currentOptionLookup.total_price }} บาท
        </h4>
        <h6>วันที่สมัคร: {{ formatDateTime(currentOptionLookup.register_date) }}</h6>
        <h6>วันแจ้งโอนเงิน: {{ formatDateTime(currentOptionLookup.submit_date) }}</h6>
        <h6 v-if="currentOptionLookup.status === 2">
          วันที่ยืนยัน: {{ formatDateTime(currentOptionLookup.review_date) }}
        </h6>
        <h6 v-else-if="currentOptionLookup.status === -1">
          วันที่ปฏิเสธ: {{ formatDateTime(currentOptionLookup.review_date) }}
        </h6>
        <h6 v-if="currentOptionLookup.approve_user_id !== ''">
          <a :href="'/user/' + currentOptionLookup.approve_user_id">รหัสแอดมินที่รับผิดชอบ: {{ currentOptionLookup.approve_user_id }}</a>
        </h6>
        <!----------------------------------------------------------------------------------------->
        <vs-divider />
        <h6 v-if="currentOptionLookup.payment_bank">ธนาคาร: {{ bankInfo.name }}</h6>
        <h6 v-if="currentOptionLookup.payment_branch">สาขา: {{ currentOptionLookup.payment_branch }}</h6>
        <h6 v-if="currentOptionLookup.payment_account_name">
          ชื่อบัญชี: {{ currentOptionLookup.payment_account_name }}
        </h6>
        <h6 v-if="currentOptionLookup.payment_account_number">
          เลขบัญชี: {{ currentOptionLookup.payment_account_number }}
        </h6>
        <vs-divider />
        <!----------------------------------------------------------------------------------------->
        <vs-row vs-justify="center" class="my-3">
          <vs-col vs-w="12">
            <h6>อีเมลผู้ใช้: <a :href="'/user/'+ currentOptionLookup.user_id">{{ currentOptionLookup.username }}</a></h6>
            <h6>ชื่อ: {{ currentOptionLookup.user_first_name }}</h6>
            <h6>นามสกุล: {{ currentOptionLookup.user_last_name }}</h6>
            <h6>เพศ: {{ currentOptionLookup.user_gender }}</h6>
            <h6>วันเกิด: {{ birthDay }}</h6>
            <h6>สัญชาติ: {{ currentOptionLookup.user_nationality }}</h6>
            <h6>ทีม/ชมรถ: {{ currentOptionLookup.user_team }}</h6>
            <h6>ที่อยู่: {{ fullAddress }}</h6>
            <h6>ภูมิแพ้หรือโรคประจำตัว: {{ currentOptionLookup.user_allergy_or_disease }}</h6>
            <h6>กรุ๊ปเลือด: {{ currentOptionLookup.user_blood_type }}</h6>
            <h6>ผู้ติดต่อฉุกเฉิน: {{ currentOptionLookup.user_emergency_contact }}</h6>
            <h6>เบอร์โทรฉุกเฉิน: {{ currentOptionLookup.user_emergency_phone }}</h6>
          </vs-col>
        </vs-row>
      </div>
    </vs-popup>
    <!---------------------------------------------------------------------END Action popup--------------------------------------------------------------------->
  </div>
</template>
<script>
import axios from '../../../axios'
import { formatDate, formatDateTime, thaiBankInfo } from '@/functions'

export default {
  components: {},
  data () {
    return {
      searchQuery: '',
      rowData: [],
      rowDataCard: {},
      popupOptionLookup: false,
      currentOptionLookup: {},
      isAdding: false
    }
  },
  computed: {
    activeUserInfo () {
      return this.$store.state.AppActiveUser
    },
    bankInfo () {
      const BANK_INFO = thaiBankInfo[this.currentOptionLookup.payment_bank]
      return BANK_INFO ? BANK_INFO : thaiBankInfo['-999']
    },
    birthDay () {
      return formatDate(this.currentOptionLookup.birth_day)
    },
    fullAddress () {
      const info = this.currentOptionLookup
      const address = info.user_address ? info.user_address : ''
      const sub_district = info.user_sub_district ? info.user_sub_district : ''
      const district = info.user_district ? info.user_district : ''
      const province = info.user_province ? info.user_province : ''
      const zipcode = info.user_zipcode ? info.user_zipcode : ''
      const country = info.user_country ? info.user_country : ''

      return `${address} ${sub_district} ${district} ${province} ${zipcode} ${country}`
    },
    imgSrc () {
      return `${process.env.VUE_APP_BASE_URL}/file${this.currentOptionLookup.slip_pic_path}`
    }
  },
  async mounted () {
    await this.getData()
  },
  methods: {
    actionOptionLookup (row, adding = false) {
      this.isAdding = adding
      this.currentOptionLookup = row
      this.popupOptionLookup = true
    },
    cancel () {
      this.currentOptionLookup = {}
      this.popupOptionLookup = false
    },
    formatDateTime (date) {
      return formatDateTime(date)
    },
    async getData () {
      await axios.get(`/event/${this.$route.params.id}/participator`).then(response => (this.rowData = response.data.data))
    },
    getStatus (status) {
      switch (status) {
      case 0: return 'รอแจ้งโอน'
      case 1: return 'รอยืนยัน'
      case 2: return 'สมัครสำเร็จ'
      case -1: return 'ถูกปฏิเสธ'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
#page-user-list {
  .user-list-filters {
    .vs__actions {
      position: absolute;
      right: 0;
      top: 50%;
      transform: translateY(-58%);
    }
  }
}

div.ag-root .ag-cell-focus {
  -webkit-user-select: text;
  -moz-user-select: text;
  -ms-user-select: text;
  user-select: text;
}
</style>
