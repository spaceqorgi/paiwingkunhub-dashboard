<template>
  <vx-card no-shadow title="จัดการ">
    <vs-row>
      <vs-col class="p-3" vs-sm="12" vs-md="12" vs-w="12">
        <h3 class="mb-5">ระบบเลข BIB</h3>
        <p class="my-3">ลำดับเลข BIB ปัจจุบัน: {{ rowData.bib_sequence }}</p>
        <div class="mt-2 mb-8">
          <p class="mt-4 mb-4">รูปภาพ BIB ปัจจุบัน</p>
          <img class="my-2" width="500rem" height="auto" :src="bibImgSrc" :alt="'BIB ' + rowData.name" />
          <p class="mt-8 mb-4">อัพโหลดรูปภาพ BIB ใหม่ ถ้าต้องการ</p>
          <vue-dropzone class="dropbox" ref="myVueDropzone" id="dropzone" :options="dropzoneOptions"></vue-dropzone>
        </div>
        <vs-button icon="add" color="success" class="ml-4 mt-2" @click="submit">อัพเดทภาพ BIB</vs-button>
      </vs-col>
    </vs-row>
    <vs-divider />
    <vs-row>
      <vs-col class="p-3" vs-sm="12" vs-md="12" vs-w="12">
        <h3 class="my-5">โซนอันตราย!</h3>
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
            <a :href="`/event/${rowData.id}`">{{ rowData.name }}</a>
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
        <vs-input class="w-full my-3" v-model.trim="inputEventName" name="name" />
        <vs-button
          :disabled="!eventNameMatched"
          class="mx-1"
          size="small"
          color="danger"
          type="filled"
          @click="confirmDeletion"
        >ยืนยันการลบ
        </vs-button
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
import vue2Dropzone from 'vue2-dropzone'
import 'vue2-dropzone/dist/vue2Dropzone.min.css'
import { formatDateTime } from '@/functions'

export default {
  components: {
    'vue-dropzone': vue2Dropzone
  },
  data () {
    return {
      // Event data
      newRowData: {},
      rowData: {},
      // Delete popup
      deletePopup: false,
      inputEventName: '',
      deleteSuccess: '',
      deleteError: '',
      // Dropzone
      dropzoneOptions: {
        url: 'https://httpbin.org/post',
        paramName: 'file',
        autoProcessQueue: 'false',
        autoQueue: 'false',
        maxFilesize: 10,
        maxFiles: 1,
        acceptedFiles: 'image/*',
        dictDefaultMessage: 'ลากไฟล์ หรือกดคลิกเพื่ออัพโหลดรูปภาพ'
      }
    }
  },
  computed: {
    bibImgSrc () {
      return `${process.env.VUE_APP_BASE_URL}/file${this.rowData.bib_pic_path}`
    },
    eventNameMatched () {
      return this.rowData.name === this.inputEventName
    },
    imgSrc () {
      return `${process.env.VUE_APP_BASE_URL}/file${this.rowData.event_pic_path}`
    }
  },
  async created () {
    await axios.get('/organizer/crud').then(response => {
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
    async submit () {
      this.$validator.validateAll().then(async result => {
        if (result) {
          const formData = new FormData()
          formData.append('bib_pic_path', this.rowData.bib_pic_path)

          /*====================================================================
          Append file data as blob in the form, if any
          ====================================================================*/
          const imageFile = this.$refs.myVueDropzone.getAcceptedFiles()[0]
          if (imageFile) formData.append('file', imageFile)

          await axios
            .put(`/event/${this.rowData.id}/update_bib`, formData, {
              headers: {
                'Content-Type': 'multipart/form-data'
              }
            })
            .then(async response => {
              this.$vs.notify({
                time: 8000,
                color: 'success',
                position: 'top-right',
                icon: 'check_box',
                title: 'บันทึกข้อมูลสำเร็จ',
                text: `อัพเดทรูปภาพ BIB ของงานวิ่งรหัส ${response.data.data.id}`
              })
              if (imageFile) setTimeout(function () {
                window.location.reload()
              }, 300)
            })
            .catch(error => this.$vs.notify({
              time: 8000,
              color: 'danger',
              position: 'top-right',
              icon: 'error',
              title: 'บันทึกขัอมูลไม่สำเร็จ',
              text: `เกิดข้อผิดพลาด ERROR: ${error.message}`
            })
            )
        } else {
          this.$vs.notify({
            time: 3000,
            color: 'warning',
            position: 'top-right',
            icon: 'error',
            title: 'บันทึกข้อมูลไม่สำเร็จ',
            text: 'กรุณากรอกข้อมูลให้ครบ'
          })
        }
      })
    }
  }
}
</script>
