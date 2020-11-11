<template>
  <vx-card no-shadow title="จัดการ">
    <vs-row>
      <vs-col class="p-3" vs-sm="12" vs-md="12" vs-w="12">
        <vs-button icon="delete" color="danger" class="ml-4 mt-2" @click="showDeletePopup">ลบงานวิ่งนี้</vs-button>
      </vs-col>
    </vs-row>
    <!-------------------------------------------------------------------Action popup------------------------------------------------------------------------------>
    <vs-popup title="โปรดยืนยันการลบข้อมูล" :active.sync="deletePopup">
      <div class="text-center">
        <h3 class="mb-4 text-primary">โปรดตรวจสอบข้อมูลให้ถูกต้องก่อนลบข้อมูล</h3>
        <h6 class="mb-4 text-danger">ข้อมูลอื่น ๆ ที่เกี่ยวข้องกับงานวิ่งนี้จะถูกลบทั้งหมด</h6>
        <div class="my-4">
          <p>
            ชื่องาน:
            <router-link :to="`/event/${rowData.id}`">{{ rowData.name }}</router-link>
          </p>
          <p>คำอธิบาย: {{ rowData.description }}</p>
          <p>
            เปิดรับสมัคร:
            {{ formatDateTime(rowData.register_start_date) }}
          </p>
          <p>
            ปิดรับสมัคร:
            {{ formatDateTime(rowData.register_end_date) }}
          </p>
          <p>
            เริ่มกิจกรรม:
            {{ formatDateTime(rowData.event_start_date) }}
          </p>
          <p>
            สิ้นสุดกิจกรรม:
            {{ formatDateTime(rowData.event_start_date) }}
          </p>
        </div>
        <!----------------------------------------------------------------------------------------->
        <h6 class="mt-5 text-danger">โปรดใส่ชื่องานวิ่งให้ถูกต้องเพื่อทำการยืนยัน</h6>
        <vs-input class="w-full my-3" v-model="inputEventName" name="name" />
        <vs-button
          :disabled="!eventNameMatched"
          class="mx-1"
          size="small"
          color="danger"
          type="filled"
          @click="confirmDeletion"
          >ยืนยันการลบ</vs-button
        >
        <vs-button class="mx-1" size="small" color="dark" type="filled" @click="closeDeletePopup">ปิด</vs-button>
        <!----------------------------------------------------------------------------------------->
      </div>
    </vs-popup>
    <!---------------------------------------------------------------------END Action popup--------------------------------------------------------------------->
  </vx-card>
</template>

<script>
import axios from '../../../axios'
import 'flatpickr/dist/flatpickr.css'
import 'vue2-dropzone/dist/vue2Dropzone.min.css'
import { formatDateTime } from '@/functions'

export default {
  data () {
    return {
      // Event data
      newRowData: {},
      rowData: {},
      // Delete popup
      deletePopup: false,
      inputEventName: '',
      deleteSuccess: '',
      deleteError: ''
    }
  },
  computed: {
    imgSrc () {
      return `https://api-pwg.corgi.engineer/file${this.rowData.event_pic_path}`
    },
    eventNameMatched () {
      return this.rowData.name === this.inputEventName
    }
  },
  async created () {
    await axios.get('/organizer').then(response => {
      this.organizers = response.data.data
    })
  },
  async mounted () {
    await this.getData()
  },
  methods: {
    closeDeletePopup () {
      this.deletePopup = false
      this.inputEventName = ''
      this.deleteSuccess = false
      this.deleteError = ''
    },
    formatDateTime (date) {
      return formatDateTime(date)
    },
    async getData () {
      await axios.get(`/event/${this.$route.params.id}`).then(response => (this.rowData = response.data.data))
      this.newRowData = this.rowData
    },
    showDeletePopup () {
      this.deletePopup = true
    },
    async confirmDeletion () {
      await axios
        .delete(`/event/${this.$route.params.id}`)
        .then(() => {
          this.deleteSuccess = true
        })
        .catch(error => {
          this.deleteError = error
        })

      if (this.deleteSuccess) {
        this.$vs.notify({
          title: 'ลบงานวิ่งสำเร็จ',
          text: 'ลบงานวิ่งสำเร็จ',
          position: 'top-right',
          iconPack: 'feather',
          icon: 'icon-alert-circle',
          color: 'success'
        })

        this.closeDeletePopup()
        // Redirect to event search
        await this.$router.push('/search_event')
      } else {
        this.$vs.notify({
          title: 'ลบงานวิ่งไม่สำเร็จ',
          text: 'ลบงานวิ่งไม่สำเร็จ',
          position: 'top-right',
          iconPack: 'feather',
          icon: 'icon-alert-circle',
          color: 'danger'
        })
      }
    }
  }
}
</script>
