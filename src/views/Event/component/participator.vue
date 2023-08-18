<template>
  <div>
    <vx-card :title="'ผู้ร่วมงาน ' + (rowData ? rowData.length : 0) + ' คน'">
      <div class="info-container">
        <ul class="info-list">
          <li class="info-item">
            <strong>รายได้รวม:</strong> {{ formatCurrency(stats.total) }}
          </li>
          <li class="info-item">
            <strong>รวมค่าสมัคร:</strong>
            {{ formatCurrency(stats.participation) }}
          </li>
          <li class="info-item">
            <strong>รวมค่าส่ง:</strong> {{ formatCurrency(stats.delivery) }}
          </li>
          <li class="info-item">
            <strong>ค่าธรรมเนียม Payment:</strong>
            {{ formatCurrency(stats.fee) }}
          </li>
                    <li class="info-item">
            <strong>รายได้สุทธิ:</strong> {{ formatCurrency(stats.net) }}
          </li>
        <li class="info-item">
            <strong>จำนวนเงินที่ต้องโอน:</strong>
            {{ formatCurrency(transferAmount) }}
          </li>
        </ul>
        <vs-button class="copy-button" @click="copyInfo">Copy</vs-button>
        <vue-json-to-csv
          v-if="rowData.length > 0"
          :json-data="rowData"
          :csv-title="getCsvName"
          :labels="getExportLabel"
          @update:success="alert('Update success')"
          @update:error="onErrorExport"
        >
          <vs-button>Export</vs-button>
        </vue-json-to-csv>
      </div>

      <!-------------------------------------------------------------------Table------------------------------------------------------------------------------>

      <vs-table
        :key="tableKey"
        search
        :data="rowData"
        noDataText="ไม่พบข้อมูล"
        sortBy="username"
        :sortDesc="false"
      >
        <template slot="thead">
          <vs-th sort-key="number">ลำดับ</vs-th>
          <vs-th sort-key="participation_id">register no.</vs-th>
          <vs-th sort-key="username">อีเมลที่ใช้</vs-th>
          <vs-th sort-key="name">ชื่อผู้สมัคร</vs-th>
          <vs-th sort-key="bib_id">BIB no.</vs-th>
          <vs-th sort-key="ticket_name">รายการที่สมัคร</vs-th>
          <vs-th sort-key="ticket_length_in_km">ระยะวิ่ง</vs-th>
          <!-- <vs-th sort-key="ticket_is_online">ประเภท</vs-th>
          <vs-th sort-key="total_progress">ส่งผลแล้ว</vs-th>
          <vs-th sort-key="progress_percent">ความคืบหน้า (%)</vs-th> -->
          <vs-th sort-key="status">สถานะ</vs-th>
          <vs-th sort-key="options">จัดการ</vs-th>
        </template>

        <template slot-scope="{ data }">
          <vs-tr :key="tr.participation_id + '-' + tr.index" v-for="tr in data">
            <vs-td :data="tr.index">{{ tr.index }}</vs-td>
            <vs-td :data="tr.participation_id">{{ tr.participation_id }}</vs-td>
            <vs-td :data="tr.username">
              <a v-if="AppActiveUser.role >= 2" :href="'/user/' + tr.user_id">{{
                tr.username
              }}</a>
              <span v-else>{{ tr.username }}</span>
            </vs-td>
            <vs-td :data="tr.first_name">{{
              tr.first_name + ' ' + tr.last_name
            }}</vs-td>
            <vs-td :data="tr.bib_id">{{ tr.bib_id }}</vs-td>
            <vs-td :data="tr.ticket_name">{{ tr.ticket_name }}</vs-td>
            <vs-td :data="tr.ticket_length_in_km">{{
              tr.ticket_length_in_km
            }}</vs-td>
            <!-- <vs-td v-if="tr.ticket_is_online" :data="tr.ticket_is_online">ออนไลน์</vs-td>
            <vs-td v-else :data="tr.ticket_is_online">ออฟไลน์</vs-td>
            <vs-td :data="tr.total_progress">{{ tr.ticket_is_online ? tr.total_progress : '-' }}</vs-td>
            <vs-td :data="tr.progress_percent">
              {{ tr.ticket_is_online ? tr.progress_percent : '-' }}
            </vs-td> -->
            <vs-td :data="tr.status">{{ tr.status_text }}</vs-td>
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
          สถานะ: {{ getStatus(currentOptionLookup.status) }}
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
        <p v-if="currentOptionLookup.status === 2">
          ช่องทางชำระ:
          {{ currentOptionLookup.omise_is_paid ? 'Payment' : 'โอนชำระ' }}
        </p>
        <p v-if="currentOptionLookup.approve_user_id">
          รหัสแอดมินที่รับผิดชอบ:
          <a :href="'/user/' + currentOptionLookup.approve_user_id">
            {{ currentOptionLookup.approve_user_id }}
          </a>
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
            <p>ชื่อ: {{ currentOptionLookup.first_name }}</p>
            <p>นามสกุล: {{ currentOptionLookup.last_name }}</p>
            <p v-if="currentOptionLookup.bib_id">
              BIB no.: {{ currentOptionLookup.bib_id }}
            </p>
            <p>เพศ: {{ currentOptionLookup.gender }}</p>
            <p>วันเกิด: {{ birthDay }}</p>
            <p>สัญชาติ: {{ currentOptionLookup.nationality }}</p>
            <p>ทีม/ชมรม: {{ currentOptionLookup.team }}</p>
            <p>เบอร์โทร: {{ phoneNumber }}</p>
            <p>ที่อยู่: {{ fullAddress }}</p>
            <p>
              ภูมิแพ้หรือโรคประจำตัว:
              {{ currentOptionLookup.allergy_or_disease }}
            </p>
            <p>กรุ๊ปเลือด: {{ currentOptionLookup.blood_type }}</p>
            <p>ผู้ติดต่อฉุกเฉิน: {{ currentOptionLookup.emergency_contact }}</p>
            <p>เบอร์โทรฉุกเฉิน: {{ emergencyPhoneNumber }}</p>
          </vs-col>
        </vs-row>
        <!-----------------------------------PRODUCTS---------------------------------------->
        <vs-row v-if="currentOptionLookup" vs-justify="left" class="my-3">
          <vs-divider />
          <h2>ของที่ระลึก</h2>
          <vs-col class="my-1" vs-w="12">
            {{ currentOptionLookup.products }}
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
  formatPhoneNumber,
} from '@/functions'
import VueJsonToCsv from 'vue-json-to-csv'
import dayjs from 'dayjs'
import store from '@/store/store.js'
import StatisticsCardLine from '@/components/statistics-cards/StatisticsCardLine.vue'

export default {
  components: {
    VueJsonToCsv,
    StatisticsCardLine,
  },
  data() {
    return {
      searchQuery: '',
      rowData: [],
      popupOptionLookup: false,
      currentOptionLookup: {},
      isAdding: false,
      tableKey: `table${Math.random().toString()}`,
      AppActiveUser: store.state.AppActiveUser,
    }
  },
  computed: {
    transferAmount () {
      if (this.stats) return parseFloat(this.stats.net) - parseFloat(this.stats.delivery)
    },
    activeUserInfo() {
      return this.$store.state.AppActiveUser
    },
    bankInfo() {
      const BANK_INFO = thaiBankInfo[this.currentOptionLookup.payment_bank]
      return BANK_INFO ? BANK_INFO : thaiBankInfo['-999']
    },
    birthDay() {
      return formatDate(this.currentOptionLookup.birth_day)
    },
    phoneNumber() {
      return this.currentOptionLookup.user_phone
    },
    emergencyPhoneNumber() {
      return this.currentOptionLookup.user_emergency_phone
    },
    fullAddress() {
      const info = this.currentOptionLookup
      return this.formatFullAddress(info)
    },
    getCsvName() {
      const name = this.rowData[0] ? this.rowData[0].name : 'ไม่พบข้อมูล'
      return `${dayjs().format('YYYY-MM-DD')}_${name}`
    },
    getExportLabel() {
      return {
        index: { title: 'ลำดับ' },
        participation_id: { title: 'register no.' },
        bib_id: { title: 'BIB no.' },
        first_name: { title: 'ชื่อ' },
        last_name: { title: 'นามสกุล' },
        name: { title: 'ชื่องาน' },
        ticket_name: { title: 'ประเภทที่เข้าร่วม' },
        ticket_length_in_km: { title: 'ระยะที่ต้องวิ่ง (กม.)' },
        // ticket_is_online: { title: 'ประเภทกิจกรรม' },
        // total_progress: { title: 'ระยะที่ส่งผลแล้ว (กม.)' },
        // progress_percent: { title: 'ความคืบหน้า (%)' },
        status_text: { title: 'สถานะ' },
        username: { title: 'อีเมล' },
        phone: { title: 'โทรศัพท์' },
        gender: { title: 'เพศ' },
        birth_day: { title: 'วันเกิด' },
        citizen_id: { title: 'เลขบัตรประชาชน/พาสปอร์ต' },
        nationality: { title: 'สัญชาติ' },
        team: { title: 'ทีม/ชมรม' },
        // address: { title: 'ที่อยู่' },
        // country: { title: 'ประเทศ' },
        // province: { title: 'จังหวัด' },
        // district: { title: 'เขต/อำเภอ' },
        // sub_district: { title: 'แขวง/ตำบล' },
        // postal_code: { title: 'รหัสไปรษณีย์' },
        allergy_or_disease: { title: 'ภูมิแพ้/โรคประจำตัว' },
        blood_type: { title: 'กรุ๊ปเลือด' },
        emergency_contact: { title: 'ติดต่อฉุกเฉิน' },
        emergency_phone: { title: 'เบอร์ติดต่อฉุกเฉิน' },
        pickup_choose: { title: 'วิธีรับอุปกรณ์' },
        full_address: { title: 'ที่อยู่สำหรับจัดส่ง' },
        payment_method: { title: 'ช่องทางชำระ' },
        participation_price: { title: 'ค่าสมัคร' },
        delivery_price: { title: 'ค่าส่ง' },
        total_price: { title: 'ค่าใช้จ่ายรวม' },
        net_price: { title: 'รายได้สุทธิ' },
        fee: { title: 'ค่าบริการ Payment' },
      }
    },
    imgSrc() {
      return `${process.env.VUE_APP_BASE_URL}/file${this.currentOptionLookup.slip_pic_path}`
    },
  },
  async mounted() {
    await this.getData()

    // Table component won't update hack
    this.tableKey = `table${Math.random().toString()}`

    const self = this

    this.exportData = this.rowData.forEach((row) => {
      row.user_birth_day = formatDate(row.user_birth_day)
      row.status_text = self.getStatus(row.status)
      row.user_bib_id_text = row.user_bib_id ? row.user_bib_id : '-'
      // const totalProgress = self.sumProgressKM(row.progresses)
      // row.total_progress = totalProgress
      // row.progress_percent = self.calculateProgress(row.ticket_length_in_km, totalProgress)
      row.user_phone = formatPhoneNumber(row.user_phone)
      row.user_emergency_phone = formatPhoneNumber(row.user_emergency_phone)
      row.products = self.formatProductOptions(row.products)
      row.pickup_choose = self.formatPickupChoose(row.pickup_choose)
      row.full_address = self.formatFullAddress(row)
      row.delivery_price = row.total_price - row.participation_price
      row.payment_method = row.omise_is_paid ? 'Payment' : 'โอนชำระ'
      row.net_price = row.omise_is_paid ? row.net : row.total_price
      row.fee = row.omise_is_paid ? row.fee : 0
    })
  },
  methods: {
    formatCurrency(amount) {
      return (
        new Intl.NumberFormat('en-US', {
          style: 'decimal',
        }).format(amount) + ' บาท'
      )
    },
    generateCopyText() {
      return [
        `รายได้รวม: ${this.formatCurrency(this.stats.total)}`,
        `รวมค่าสมัคร: ${this.formatCurrency(this.stats.participation)}`,
        `รวมค่าส่ง: ${this.formatCurrency(this.stats.delivery)}`,
        `ค่าธรรมเนียม Payment: ${this.formatCurrency(this.stats.fee)}`,
        `รายได้สุทธิ: ${this.formatCurrency(this.stats.net)}`,
        `ค่าธรรมเนียม Payment: ${this.formatCurrency(this.stats.fee)}`,
        `จำนวนเงินที่ต้องโอน: ${this.formatCurrency(this.transferAmount)}`,
      ].join('\n')
    },
    copyInfo() {
      const copyText = this.generateCopyText()
      const dummyTextarea = document.createElement('textarea')
      dummyTextarea.value = copyText
      document.body.appendChild(dummyTextarea)
      dummyTextarea.select()
      document.execCommand('copy')
      document.body.removeChild(dummyTextarea)
      this.$vs.notify({
        text: 'Copy ข้อมูลสำเร็จ',
        position: 'top-right',
        iconPack: 'feather',
        icon: 'icon-alert-circle',
        color: 'success',
      })
    },
    formatFullAddress(row) {
      const info = row
      const address = info.address ? info.address + ',' : ''
      const sub_district = info.sub_district ? info.sub_district + ',' : ''
      const district = info.district ? info.district + ',' : ''
      const province = info.province ? info.province + ',' : ''
      const zipcode = info.zipcode ? info.zipcode + ',' : ''
      const country = info.country ? 'ประเทศ' + info.country + '' : ''

      return `${address} ${sub_district} ${district} ${province} ${zipcode} ${country}`
    },
    formatPickupChoose(choice) {
      return choice == 1 ? 'จัดส่งไปรษณีย์' : 'รับหน้างาน'
    },
    formatProductOptions(products) {
      const result = []
      products.forEach((product) => {
        const text = `${product.name}: ${Object.values(
          product.product_options
        ).join('/')}`
        result.push(text)
      })
      return result.join(', ')
    },
    actionOptionLookup(row, adding = false) {
      this.isAdding = adding
      this.currentOptionLookup = row
      this.popupOptionLookup = true
    },
    calculateProgress(total_km_require, sum_km) {
      const percentage = (sum_km / total_km_require) * 100
      if (percentage <= 100) return percentage
      else return 100
    },
    cancel() {
      this.currentOptionLookup = {}
      this.popupOptionLookup = false
    },
    formatDateTime(date) {
      return formatDateTime(date)
    },
    async getData() {
      try {
        const response = await axios.get(
          `/event/${this.$route.params.id}/participator`,
          {
            params: {
              get_products: 1,
            },
          }
        )
        this.rowData = response.data.data
        this.stats = response.data.stats
      } catch (error) {
        console.error(error)
      }
    },
    getStatus(status) {
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
    sumProgressKM(progresses) {
      if (progresses.length > 0)
        return progresses.reduce((accumulator, progress) => {
          if (progress.status === 2)
            return parseFloat(progress.progress_in_km) + parseFloat(accumulator)
          else return accumulator
        }, 0)
      else return 0
    },
    async onSuccessExport() {
      alert('ดาวน์โหลดข้อมูลสำเร็จ')
    },
    async onErrorExport() {
      alert('เกิดข้อผิดพลาดในการดาวโหลดข้อมูล')
    },
  },
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

.info-container {
  background-color: #f4f4f4;
  border: 1px solid #ccc;
  padding: 15px;
  border-radius: 5px;
  margin: 20px 0;
}
.info-list {
  list-style: none;
  padding: 0;
  margin: 0;
}
.info-item {
  margin-bottom: 10px;
}
.info-item strong {
  font-weight: bold;
}
.copy-button {
  margin-right: 5px;
}
</style>
