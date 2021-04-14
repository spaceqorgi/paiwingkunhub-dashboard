<template>
  <div>
    <vx-card title="ผู้ร่วมงาน">
      <vue-json-to-csv
        v-if="rowData.length > 0"
        :json-data="rowData"
        :csv-title="getCsvName"
        :labels="getExportLabel"
        @update:success="alert('boo')"
        @update:error="onErrorExport"
      >
        <vs-button>EXPORT</vs-button>
      </vue-json-to-csv>
      <!-------------------------------------------------------------------Table------------------------------------------------------------------------------>
      <vs-table :key="tableKey" search :data="rowData" noDataText="ไม่พบข้อมูล">
        <template slot="thead">
          <vs-th sort-key="id">รหัส</vs-th>
          <vs-th sort-key="username">อีเมลผู้ใช้</vs-th>
          <vs-th sort-key="ticket_name">รายการเข้าร่วมประเภท</vs-th>
          <vs-th sort-key="ticket_length_in_km">ระยะที่ต้องวิ่ง</vs-th>
          <vs-th sort-key="total_progress">ระยะที่ส่งผลแล้ว</vs-th>
          <vs-th sort-key="progress_percent">ความคืบหน้า (%)</vs-th>
          <vs-th sort-key="status">สถานะ</vs-th>
          <vs-th sort-key="user_bib_id">เลข bib</vs-th>
          <vs-th sort-key="options">จัดการ</vs-th>
        </template>

        <template slot-scope="{ data }">
          <vs-tr :key="tr.participation_id" v-for="tr in data">
            <vs-td :data="tr.participation_id">{{ tr.participation_id }}</vs-td>
            <vs-td :data="tr.username">
              <a v-if="AppActiveUser.role >= 2" :href="'/user/' + tr.user_id">{{
                tr.username
              }}</a>
              <span v-else>{{ tr.username }}</span>
            </vs-td>
            <vs-td :data="tr.ticket_name">{{ tr.ticket_name }}</vs-td>
            <vs-td :data="tr.ticket_length_in_km">{{
              tr.ticket_length_in_km
            }}</vs-td>
            <vs-td :data="tr.total_progress">{{ tr.total_progress }}</vs-td>
            <vs-td :data="tr.progress_percent">
              {{ tr.progress_percent }}
            </vs-td>
            <vs-td :data="tr.status">{{ tr.status_text }}</vs-td>
            <vs-td :data="tr.user_bib_id">{{ tr.user_bib_id_text }}</vs-td>
            <vs-td :data="tr.options">
              <vs-button
                class="mx-1"
                size="small"
                color="dark"
                type="filled"
                @click="actionOptionLookup(tr)"
                >ดูข้อมูล
              </vs-button>
            </vs-td>
          </vs-tr>
        </template>
      </vs-table>
      <!-------------------------------------------------------------------END Table------------------------------------------------------------------------------>
    </vx-card>
    <!-------------------------------------------------------------------Action popup------------------------------------------------------------------------------>
    <vs-popup
      classContent="popup-example"
      title="ข้อมูลการสมัครวิ่ง"
      :active.sync="popupOptionLookup"
    >
      <div class="px-5 my-5">
        <h1 class="text-primary my-1">{{ currentOptionLookup.username }}</h1>
        <h3 class="my-1">{{ currentOptionLookup.name }}</h3>
        <h3 class="my-1">{{ currentOptionLookup.ticket_name }}</h3>
        <p class="my-2">{{ currentOptionLookup.ticket_description }}</p>
        <!----------------------------------------------------------------------------------------->
        <vs-divider />
        <h3 class="text-primary">
          {{ getStatus(currentOptionLookup.status) }}
        </h3>
        <a :href="imgSrc"
          ><img
            class="my-2"
            width="200rem"
            height="auto"
            :src="imgSrc"
            alt="หลักฐาน"
        /></a>
        <h4
          v-if="
            currentOptionLookup.status === 2 || currentOptionLookup.status === 1
          "
          class="text-primary my-2"
        >
          ยอดที่ชำระแล้ว: {{ currentOptionLookup.total_price }} บาท
        </h4>
        <p>
          วันที่สมัคร: {{ formatDateTime(currentOptionLookup.register_date) }}
        </p>
        <p>
          วันแจ้งโอนเงิน: {{ formatDateTime(currentOptionLookup.submit_date) }}
        </p>
        <p v-if="currentOptionLookup.status === 2">
          วันที่ยืนยัน: {{ formatDateTime(currentOptionLookup.review_date) }}
        </p>
        <p v-else-if="currentOptionLookup.status === -1">
          วันที่ปฏิเสธ: {{ formatDateTime(currentOptionLookup.review_date) }}
        </p>
        <p v-if="currentOptionLookup.approve_user_id !== ''">
          <a :href="'/user/' + currentOptionLookup.approve_user_id"
            >รหัสแอดมินที่รับผิดชอบ:
            {{ currentOptionLookup.approve_user_id }}</a
          >
        </p>
        <!----------------------------------------------------------------------------------------->
        <vs-divider />
        <p v-if="currentOptionLookup.payment_bank">
          ธนาคาร: {{ bankInfo.name }}
        </p>
        <p v-if="currentOptionLookup.payment_branch">
          สาขา: {{ currentOptionLookup.payment_branch }}
        </p>
        <p v-if="currentOptionLookup.payment_account_name">
          ชื่อบัญชี: {{ currentOptionLookup.payment_account_name }}
        </p>
        <p v-if="currentOptionLookup.payment_account_number">
          เลขบัญชี: {{ currentOptionLookup.payment_account_number }}
        </p>
        <vs-divider />
        <!----------------------------------------------------------------------------------------->
        <vs-row vs-justify="center" class="my-3">
          <vs-col vs-w="12">
            <p>
              อีเมลผู้ใช้:
              <a
                v-if="AppActiveUser.role >= 2"
                :href="'/user/' + currentOptionLookup.user_id"
                >{{ currentOptionLookup.username }}</a
              >
              <span v-else>{{ currentOptionLookup.username }}</span>
            </p>
            <p>ชื่อ: {{ currentOptionLookup.user_first_name }}</p>
            <p>นามสกุล: {{ currentOptionLookup.user_last_name }}</p>
            <p>เพศ: {{ currentOptionLookup.user_gender }}</p>
            <p>วันเกิด: {{ birthDay }}</p>
            <p>สัญชาติ: {{ currentOptionLookup.user_nationality }}</p>
            <p>ทีม/ชมรม: {{ currentOptionLookup.user_team }}</p>
            <p>เบอร์โทร: {{ phoneNumber }}</p>
            <p>ที่อยู่: {{ fullAddress }}</p>
            <p>
              ภูมิแพ้หรือโรคประจำตัว:
              {{ currentOptionLookup.user_allergy_or_disease }}
            </p>
            <p>กรุ๊ปเลือด: {{ currentOptionLookup.user_blood_type }}</p>
            <p>
              ผู้ติดต่อฉุกเฉิน: {{ currentOptionLookup.user_emergency_contact }}
            </p>
            <p>เบอร์โทรฉุกเฉิน: {{ emergencyPhoneNumber }}</p>
          </vs-col>
        </vs-row>
        <!-----------------------------------PRODUCTS---------------------------------------->
        <vs-row
          v-if="currentOptionLookup || currentOptionLookup.products.length > 0"
          vs-justify="left"
          class="my-3"
        >
          <vs-divider />
          <h2>ของที่ระลึก</h2>
          <vs-col vs-w="12">
            <div
              :key="product.id"
              v-for="(product, id) in currentOptionLookup.products"
            >
              <h5 class="my-2">{{ id + 1 }}. {{ product.name }}</h5>
              <p :key="name" v-for="(value, name) in product.product_options">
                {{ name }}: {{ value }}
              </p>
            </div>
          </vs-col>
        </vs-row>
      </div>
    </vs-popup>
    <!---------------------------------------------------------------------END Action popup--------------------------------------------------------------------->
  </div>
</template>
<script>
import axios from '../../../axios'
import {
  formatDate,
  formatDateTime,
  thaiBankInfo,
  formatPhoneNumber
} from '@/functions'
import VueJsonToCsv from 'vue-json-to-csv'
import dayjs from 'dayjs'
import store from '@/store/store.js'

export default {
  components: {
    VueJsonToCsv
  },
  data () {
    return {
      searchQuery: '',
      rowData: [],
      popupOptionLookup: false,
      currentOptionLookup: {},
      isAdding: false,
      tableKey: `table${Math.random().toString()}`,
      AppActiveUser: store.state.AppActiveUser
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
    phoneNumber () {
      return this.currentOptionLookup.user_phone
    },
    emergencyPhoneNumber () {
      return this.currentOptionLookup.user_emergency_phone
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
    getCsvName () {
      const name = this.rowData[0] ? this.rowData[0].name : 'ไม่พบข้อมูล'
      return `${dayjs().format('YYYY-MM-DD')}_${name}`
    },
    getExportLabel () {
      return {
        participation_id: { title: 'รหัส' },
        user_bib_id_text: { title: 'เลข bib' },
        user_first_name: { title: 'ชื่อ' },
        user_last_name: { title: 'นามสกุล' },
        name: { title: 'ชื่องาน' },
        ticket_name: { title: 'ประเภทแข่งขัน' },
        ticket_length_in_km: { title: 'ระยะที่ต้องวิ่ง (กม.)' },
        total_progress: { title: 'ระยะที่ส่งผลแล้ว (กม.)' },
        progress_percent: { title: 'ความคืบหน้า (%)' },
        status_text: { title: 'สถานะ' },
        username: { title: 'อีเมล' },
        user_phone: { title: 'โทรศัพท์' },
        user_gender: { title: 'เพศ' },
        user_birth_day: { title: 'วันเกิด' },
        user_citizen_id: { title: 'เลขบัตรประชาชน/พาสปอร์ต' },
        user_nationality: { title: 'สัญชาติ' },
        user_team: { title: 'ทีม/ชมรม' },
        user_address: { title: 'ที่อยู่' },
        user_country: { title: 'ประเทศ' },
        user_province: { title: 'จังหวัด' },
        user_district: { title: 'เขต/อำเภอ' },
        user_sub_district: { title: 'แขวง/ตำบล' },
        user_postal_code: { title: 'รหัสไปรษณีย์' },
        user_allergy_or_disease: { title: 'ภูมิแพ้/โรคประจำตัว' },
        user_blood_type: { title: 'กรุ๊ปเลือด' },
        user_emergency_contact: { title: 'ติดต่อฉุกเฉิน' },
        user_emergency_phone: { title: 'เบอร์ติดต่อฉุกเฉิน' },
        products: { title: 'ของที่ระลึก' }
      }
    },
    imgSrc () {
      return `${process.env.VUE_APP_BASE_URL}/file${this.currentOptionLookup.slip_pic_path}`
    }
  },
  async mounted () {
    await this.getData()

    const self = this

    this.exportData = this.rowData.forEach((row) => {
      row.user_birth_day = formatDate(row.user_birth_day)
      row.status_text = self.getStatus(row.status)
      row.user_bib_id_text = row.user_bib_id ? row.user_bib_id : '-'
      const totalProgress = self.sumProgressKM(row.progresses)
      row.total_progress = totalProgress
      row.progress_percent = self.calculateProgress(
        row.ticket_length_in_km,
        totalProgress
      )
      row.user_phone = formatPhoneNumber(row.user_phone)
      row.user_emergency_phone = formatPhoneNumber(row.user_emergency_phone)
      row.products = self.formatProductOptions(row.products)
    })

    // Table component won't update hack
    this.tableKey = `table${Math.random().toString()}`
  },
  methods: {
    formatProductOptions (products) {
      return products
    },
    actionOptionLookup (row, adding = false) {
      this.isAdding = adding
      this.currentOptionLookup = row
      this.popupOptionLookup = true
    },
    calculateProgress (total_km_require, sum_km) {
      const percentage = (sum_km / total_km_require) * 100
      if (percentage <= 100) return percentage
      else return 100
    },
    cancel () {
      this.currentOptionLookup = {}
      this.popupOptionLookup = false
    },
    formatDateTime (date) {
      return formatDateTime(date)
    },
    async getData () {
      await axios
        .get(`/event/${this.$route.params.id}/participator`, {
          params: {
            get_products: 1
          }
        })
        .then((response) => (this.rowData = response.data.data))
    },
    getStatus (status) {
      switch (status) {
      case 0:
        return 'รอแจ้งโอน'
      case 1:
        return 'รอยืนยัน'
      case 2:
        return 'สมัครสำเร็จ'
      case -1:
        return 'ถูกปฏิเสธ'
      }
    },
    sumProgressKM (progresses) {
      if (progresses.length > 0) return progresses.reduce((accumulator, progress) => {
        if (progress.status === 2) return parseFloat(progress.progress_in_km) + parseFloat(accumulator)
        else return accumulator
      }, 0)
      else return 0
    },
    async onSuccessExport () {
      alert('ดาวน์โหลดข้อมูลสำเร็จ')
    },
    async onErrorExport () {
      alert('เกิดข้อผิดพลาดในการดาวโหลดข้อมูล')
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
