<template>
  <vx-card title="ภาพรวม" no-shadow>
    <vs-list>
      <vs-row>
        <vs-col vs-w="12">
          <h2 class="text-primary mb-2">{{ rowData.name }}</h2>
          <img
            class="my-10"
            width="500rem"
            height="auto"
            :src="imgSrc"
            :alt="rowData.name"
          />
        </vs-col>
      </vs-row>
      <vs-row>
        <vs-col class="p-3" vs-sm="12" vs-md="12" vs-w="6">
          <!--=========GROUP=========-->
          <vs-list-header
            title="ข้อมูลกิจกรรม"
            color="primary"
            icon="description"
          ></vs-list-header>

          <div class="my-10">
            <p><strong>รหัส:</strong> {{ rowData.id ? rowData.id : '-' }}</p>
            <p>
              <strong>ชื่องาน:</strong> {{ rowData.name ? rowData.name : '-' }}
            </p>
            <p>
              <strong>คำอธิบาย:</strong>
              {{ rowData.description ? rowData.description : '-' }}
            </p>
            <p>
              <strong>เว็บไซต์: </strong
              ><a :href="rowData.website">{{
                rowData.website ? rowData.website : '-'
              }}</a>
            </p>
            <p>
              <strong>รุ่นอายุต่ำกว่า 19 สำหรับระบบ BIB:</strong>
              {{ rowData.bib_minimum_age ? rowData.bib_minimum_age : '-' }}
            </p>
            <p><strong>ช่องทางการรับของ:</strong> {{ pickupTypeSupport }}</p>
            <p>
              <strong>ค่าจัดส่ง:</strong>
              {{ rowData.delivery_cost ? rowData.delivery_cost : '-' }}
            </p>
            <vs-divider />
            <p>
              <strong>เริ่มสมัคร:</strong>
              {{ formatDate(rowData.register_start_date) }}
            </p>
            <p>
              <strong>สิ้นสุดสมัคร:</strong>
              {{ formatDate(rowData.register_end_date) }}
            </p>
            <p>
              <strong>เริ่มกิจกรรม:</strong>
              {{ formatDate(rowData.event_start_date) }}
            </p>
            <p>
              <strong>สิ้นสุดกิจกรรม:</strong>
              {{ formatDate(rowData.event_end_date) }}
            </p>
            <vs-divider />
            <p>
              <strong>สถานที่จัด:</strong>
              {{ rowData.location ? rowData.location : '-' }}
            </p>
            <p>
              <strong>วันรับอุปกรณ์:</strong>
              {{ rowData.pickup_date ? rowData.pickup_date : '-' }}
            </p>
            <p>
              <strong>สถานที่รับอุปกรณ์:</strong>
              {{ rowData.pickup_location ? rowData.pickup_location : '-' }}
            </p>
            <p>
              <strong>ช่วงเวลาจัดส่งอุปกรณ์:</strong>
              {{
                rowData.local_delivery_period
                  ? rowData.local_delivery_period
                  : '-'
              }}
            </p>
            <vs-divider />
            <p>
              <strong>เริ่มการจัดส่งของที่ระลึก:</strong>
              {{ formatDate(rowData.virtual_delivery_start_date) }}
            </p>
            <p>
              <strong>สิ้นสุดการจัดส่งของที่ระลึก:</strong>
              {{ formatDate(rowData.virtual_delivery_end_date) }}
            </p>
            <vs-divider />
            <!-- INPUT GROUP -->
            <div v-if="AppActiveUser.role >= 2" class="mt-10">
              <label>แสดงในเว็บไซต์</label>
              <vs-switch
                class="my-2"
                name="is_published"
                v-model="rowData.is_published"
                @click="toggleIsPublished()"
              >
                <span slot="on">แสดง</span>
                <span slot="off">ไม่แสดง</span>
              </vs-switch>
            </div>
            <!-- END INPUT GROUP -->
          </div>
          <!--=========END=========-->
        </vs-col>
        <vs-col class="p-3" vs-sm="12" vs-md="12" vs-w="6">
          <!--=========GROUP=========-->
          <vs-list-header
            title="ข้อมูลผู้จัดงาน"
            color="success"
            icon="people"
          ></vs-list-header>
          <div class="my-10">
            <p><strong>ผู้จัด:</strong> {{ rowData.organizer_name }}</p>
            <p>
              <strong>เว็บไซต์ผู้จัด: </strong
              ><a v-if="rowData.organizer_website.includes('://')" :href="rowData.organizer_website">{{
                rowData.organizer_website
              }}</a>
              <span v-else> {{ rowData.organizer_website }} </span>
            </p>
            <p>
              <strong>โซเชียลมีเดีย:</strong> {{ rowData.organizer_social }}
            </p>
            <p>
              <strong>อีเมล: </strong
              ><a v-if="rowData.organizer_website.includes('://')" :href="'mailto:' + rowData.organizer_email">{{
                rowData.organizer_email
              }}</a>
              <span v-else> {{ rowData.organizer_email }} </span>
            </p>
            <p><strong>โทรศัพท์:</strong> {{ formatPhone(rowData.organizer_phone) }}</p>
          </div>
          <!--=========END=========-->
        </vs-col>
      </vs-row>
    </vs-list>
  </vx-card>
</template>

<script>
import axios from '../../../axios'
import { formatDate, formatPhoneNumber } from '@/functions'
import store from '@/store/store.js'

export default {
  data () {
    return {
      rowData: {},
      AppActiveUser: store.state.AppActiveUser
    }
  },
  computed: {
    imgSrc () {
      return `${process.env.VUE_APP_BASE_URL}/file${this.rowData.event_pic_path}`
    },
    pickupTypeSupport () {
      const pickup = this.rowData.pickup_type
      switch (pickup) {
      case 0:
        return 'รับหน้างาน'
      case 1:
        return 'ส่งไปรษณีย์'
      default:
        return 'รับหน้างาน และส่งไปรษณีย์'
      }
    }
  },
  async mounted () {
    await axios
      .get(`/event/${this.$route.params.id}`)
      .then((response) => (this.rowData = response.data.data))
  },
  methods: {
    formatDate (date) {
      const newDate = formatDate(date)
      if (newDate === 'Invalid Date') return '-'
      else return newDate
    },
    formatPhone (phone) {
      return formatPhoneNumber(phone)
    },
    async toggleIsPublished () {
      const formData = new FormData()
      formData.append('is_published', !this.rowData.is_published)
      await axios
        .put(`/event/${this.rowData.id}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        .then((response) => {
          console.log(response)
        })
        .catch((err) => {
          console.log(err.message)
          alert('เกิดข้อผิดพลาด โปรดติดต่อโปรแกรมเมอร์', err.message)
          this.rowData.is_published = !this.rowData.is_published
        })
    }
  }
}
</script>
<style scoped>
p {
  margin-bottom: 0.8rem;
}

img {
  border-radius: 2%;
  box-shadow: 2px 2px 5px #00000055;
}
</style>
