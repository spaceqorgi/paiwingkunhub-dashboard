<template>
  <vx-card title="ภาพรวม" no-shadow>
    <vs-list>
      <vs-row>
        <vs-col vs-w="12">
          <h2 class="text-primary mb-2">{{ rowData.name }}</h2>
          <img class="my-5" width="500rem" height="auto" :src="imgSrc" :alt="rowData.name" />
        </vs-col>
      </vs-row>
      <vs-row>
        <vs-col vs-w="12">
          <div v-if="AppActiveUser.role >= 2" class="mt-2">
            <label>แสดงในเว็บไซต์</label>
            <vs-switch class="my-2" name="is_published" v-model="rowData.is_published" @click="toggleIsPublished()">
              <span slot="on">แสดง</span>
              <span slot="off">ไม่แสดง</span>
            </vs-switch>
          </div>
        </vs-col>
      </vs-row>
      <vs-row>
        <vs-col class="p-3" vs-sm="12" vs-md="12" vs-w="6">
          <!--=========GROUP=========-->
          <vs-list-header title="ข้อมูลกิจกรรม" color="primary" icon="description"></vs-list-header>

          <div class="my-5">
            <h6 class="mt-4 mb-1">รหัส</h6>
            <p>{{ rowData.id || '-' }}</p>
            <h6 class="mt-4 mb-1">ชื่องาน</h6>
            <p>{{ rowData.name || '-' }}</p>
            <h6 class="mt-4 mb-1">ลิงค์หน้าเว็บไซต์</h6>
            <p>
              <a :href="`https://paiwingkunhub.com/share/${rowData.slug}`">{{
                `https://paiwingkunhub.com/share/${rowData.slug}`
              }}</a>
            </p>
            <h6 class="mt-4 mb-1">เว็บไซต์กิจกรรม</h6>
            <p>
              <a :href="rowData.website">{{ rowData.website || '-' }}</a>
            </p>
            <h6 class="mt-4 mb-1">รุ่นอายุน้อย สำหรับ BIB No.</h6>
            <p>{{ rowData.bib_minimum_age || '-' }}</p>
            <h6 class="mt-4 mb-1">ช่องทางการรับของ</h6>
            <p>{{ pickupTypeSupport }}</p>
            <h6 class="mt-4 mb-1">ค่าจัดส่ง</h6>
            <p>{{ rowData.delivery_cost + ' บาท' || '-' }}</p>
            <vs-divider />
            <h6 class="mt-4 mb-1">ช่วงเวลารับสมคร</h6>
            <p>{{ formatDate(rowData.register_start_date) }} - {{ formatDate(rowData.register_end_date) }}</p>
            <h6 class="mt-4 mb-1">ช่วงเวลากิจกรรม</h6>
            <p>{{ formatDate(rowData.event_start_date) }} - {{ formatDate(rowData.event_end_date) }}</p>
            <vs-divider />
            <h6 class="mt-4 mb-1">สถานที่จัด</h6>
            <p>{{ rowData.location || '-' }}</p>
            <h6 class="mt-4 mb-1">วันรับอุปกรณ์</h6>
            <p>{{ rowData.pickup_date ? rowData.pickup_date : '-' }}</p>
            <h6 class="mt-4 mb-1">สถานที่รับอุปกรณ์</h6>
            <p>{{ rowData.pickup_location ? rowData.pickup_location : '-' }}</p>
            <h6 class="mt-4 mb-1">ช่วงเวลาจัดส่งอุปกรณ์</h6>
            <p>{{ rowData.local_delivery_period || '-' }}</p>
            <h6 class="mt-4 mb-1">เริ่มการจัดส่งของที่ระลึก</h6>
            <p>{{ formatDate(rowData.virtual_delivery_start_date) }}</p>
            <h6 class="mt-4 mb-1">สิ้นสุดการจัดส่งของที่ระลึก</h6>
            <p>{{ formatDate(rowData.virtual_delivery_end_date) }}</p>
          </div>
          <!--=========END=========-->
        </vs-col>
        <vs-col class="p-3" vs-sm="12" vs-md="12" vs-w="6">
          <!--=========GROUP=========-->
          <vs-list-header title="ข้อมูลผู้จัดงาน" color="success" icon="people"></vs-list-header>
          <div class="my-5">
            <h6 class="mt-4 mb-1">ผู้จัด</h6>
            <p>{{ rowData.organizer_name }}</p>
            <h6 class="mt-4 mb-1">เว็บไซต์ผู้จัด</h6>
            <p>
              <a
                v-if="rowData.organizer && rowData.organizer_website.includes('://')"
                :href="rowData.organizer_website"
                >{{ rowData.organizer_website }}</a
              >
              <span v-else> {{ rowData.organizer_website }} </span>
            </p>
            <h6 class="mt-4 mb-1">โซเชียลมีเดีย</h6>
            <p>{{ rowData.organizer_social }}</p>
            <h6 class="mt-4 mb-1">อีเมล:</h6>
            <p>
              <a
                v-if="rowData.organizer && rowData.organizer_email.includes('://')"
                :href="'mailto:' + rowData.organizer_email"
                >{{ rowData.organizer_email }}</a
              >
              <span v-else> {{ rowData.organizer_email }} </span>
            </p>
            <h6 class="mt-4 mb-1">โทรศัพท์</h6>
            <p>{{ formatPhone(rowData.organizer_phone) }}</p>
          </div>
          <!--=========END=========-->
        </vs-col>
      </vs-row>
      <vs-row>
        <vs-col>
          <vs-divider />
          <h6 class="mt-4 mb-1">คำอธิบาย (Preview)</h6>
          <div class="description-show" v-html="rowData.description"></div>
        </vs-col>
      </vs-row>
    </vs-list>
  </vx-card>
</template>

<script>
import axios from '../../../axios'
import { formatDateThai, formatPhoneNumber } from '@/functions'
import store from '@/store/store.js'

export default {
  data() {
    return {
      rowData: {},
      AppActiveUser: store.state.AppActiveUser,
    }
  },
  computed: {
    imgSrc() {
      return `${process.env.VUE_APP_BASE_URL}/file${this.rowData.event_pic_path}`
    },
    pickupTypeSupport() {
      const pickup = this.rowData.pickup_type
      switch (pickup) {
        case 0:
          return 'รับหน้างาน'
        case 1:
          return 'ส่งไปรษณีย์'
        default:
          return 'รับหน้างาน และส่งไปรษณีย์'
      }
    },
  },
  async mounted() {
    await axios.get(`/event/${this.$route.params.id}`).then((response) => (this.rowData = response.data.data))
  },
  methods: {
    formatDate(date) {
      const newDate = formatDateThai(date)
      if (newDate === 'Invalid Date') return '-'
      else return newDate
    },
    formatPhone(phone) {
      return formatPhoneNumber(phone)
    },
    async toggleIsPublished() {
      const formData = new FormData()
      formData.append('is_published', !this.rowData.is_published)
      await axios
        .put(`/event/${this.rowData.id}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then((response) => {
          console.log(response)
          this.$vs.notify({
            time: 10000,
            color: 'success',
            position: 'top-right',
            icon: 'check',
            title: `${this.rowData.is_published ? 'เปิด' : 'ปิด'}แสดงหน้าเว็บสำเร็จ`,
            text: `${this.rowData.is_published ? 'เปิด' : 'ปิด'}แสดง ${this.rowData.name} ในหน้าเว็บสำเร็จ`,
          })
        })
        .catch((err) => {
          console.log(err.message)
          this.$vs.notify({
            time: 10000,
            color: 'danger',
            position: 'top-right',
            icon: 'error',
            title: `${this.rowData.is_published ? 'เปิด' : 'ปิด'}แสดงในหน้าเว็บไม่สำเร็จ`,
            text: 'โปรดติดต่อโปรแกรมเมอร์',
          })
          this.rowData.is_published = !this.rowData.is_published
        })
    },
  },
}
</script>
<style scoped>
img {
  border-radius: 2%;
  box-shadow: 2px 2px 5px #00000055;
}
</style>
