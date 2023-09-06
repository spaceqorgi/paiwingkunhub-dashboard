<template>
  <vx-card no-shadow title="ส่งอีเมลถึงลูกค้า">
    <vs-row>
      <vs-col vs-w="12">
        <div>
          <h2>ตั้งค่าข้อความอีเมล</h2>
          <p>สามารถปล่อยว่างไว้เพื่อให้ระบบส่งข้อความแบบ Default ได้</p>
          <vs-input class="w-full mb-10" label-placeholder="Subject" v-model="subject" />
          <vs-input class="w-full mb-10" label-placeholder="Title" v-model="title" />
          <vs-input class="w-full mb-10" label-placeholder="Subtitle" v-model="subTitle" />
          <vs-input class="w-full mb-10" label-placeholder="Caption" v-model="caption" />
        </div>
        <div class="mt-2">
          <h4 class="mb-5">อัพโหลดรูปภาพอีเมล</h4>
          <p class="my-2 mb-4">รูปภาพปัจจุบัน (Preview)</p>
          <img class="my-4" width="200rem" height="auto" :src="imgSrc" alt="ภาพประกอบอีเมล" :key="imgKey" />
          <vue-dropzone class="dropbox" ref="myVueDropzone" id="dropzone" :options="dropzoneOptions"></vue-dropzone>
        </div>
        <div class="mt-5">
          <vs-button
            :disabled="isLoading"
            class="mr-2"
            style="float: left"
            icon="send"
            @click="uploadImage"
            color="primary"
            type="filled"
          >
            บันทึกรูปภาพ
          </vs-button>
        </div>
      </vs-col>
      <vs-col>
        <div class="mt-5">
          <h2 class="mb-2">เลือกรูปแบบอีเมล</h2>
          <p class="my-2">กดเพื่อส่งอีเมล</p>
          <vs-button
            :disabled="isLoading"
            class="mr-2"
            style="float: left"
            icon="send"
            @click="openPopupReminds"
            color="primary"
            type="filled"
          >
            แจ้งให้ชำระเงิน
          </vs-button>
          <vs-button
            :disabled="isLoading"
            class="mr-2"
            style="float: left"
            icon="send"
            @click="openPopupNews"
            color="primary"
            type="filled"
          >
            แจ้งข่าวสารถึงลูกค้าทุกคน
          </vs-button>
        </div>
      </vs-col>
    </vs-row>
    <!-------------------------------------------------------------------Action popup------------------------------------------------------------------------------>
    <vs-popup classContent="popup-email-preview" title="ตรวจสอบภาพตัวอย่างอีเมล" :active.sync="popupEmailPreview">
      <div class="text-center">
        <h3 class="mb-4 text-primary">ยืนยันการส่งอีเมล</h3>

        <!-- Email Preview Content -->
        <div class="email-content mb-4">
          <h4><strong>Subject:</strong> {{ emailSubject }}</h4>
          <p v-html="emailBodyPreview"></p>
        </div>

        <!-- Buttons -->
        <vs-button
          v-if="popupType == 'reminds'"
          class="mx-1"
          size="small"
          color="success"
          type="filled"
          @click="sendReminders"
          >ส่งอีเมล</vs-button
        >
        <vs-button
          v-else-if="popupType == 'news'"
          class="mx-1"
          size="small"
          color="success"
          type="filled"
          @click="sendReminders"
          >ส่งอีเมล</vs-button
        >
        <vs-button class="mx-1" size="small" color="dark" type="filled" @click="cancel">ยกเลิก</vs-button>
      </div>
    </vs-popup>
    <!---------------------------------------------------------------------END Action popup--------------------------------------------------------------------->
  </vx-card>
</template>

<script>
import axios from '../../../axios'
import 'flatpickr/dist/flatpickr.css'
import { formatDateTime } from '@/functions'

import vue2Dropzone from 'vue2-dropzone'
import 'vue2-dropzone/dist/vue2Dropzone.min.css'

export default {
  components: {
    'vue-dropzone': vue2Dropzone,
  },
  data() {
    return {
      rowData: {},
      title: '',
      subject: '',
      subTitle: '',
      caption: '',
      isLoading: false,
      // Dropzone
      dropzoneOptions: {
        url: 'https://httpbin.org/post',
        paramName: 'file',
        autoProcessQueue: false,
        maxFilesize: 999,
        maxFiles: 1,
        acceptedFiles: 'image/*',
        dictDefaultMessage: 'ลากไฟล์ หรือกดคลิกเพื่ออัพโหลดรูปภาพ',
        addRemoveLinks: true,
      },
      imgKey: 0,
      popupEmailPreview: false,
      emailSubject: '-',
      emailBodyPreview: {},
      popupType: 'reminds',
    }
  },
  async mounted() {
    await this.getData()
  },
  computed: {
    imgSrc() {
      if (this.rowData.email_pic_path)
        return `${process.env.VUE_APP_BASE_URL}/file${this.rowData.email_pic_path}?v=${this.imgKey}`
      else return false
    },
  },
  methods: {
    cancel() {
      this.popupEmailPreview = false
      this.currentInspectedProgress = {}
    },
    openPopupReminds() {
      this.popupType = 'reminds'
      this.popupEmailPreview = true
      this.sendReminders(true)
    },
    openPopupNews() {
      this.popupType = 'news'
      this.popupEmailPreview = true
      this.sendNews(true)
    },
    async getData() {
      this.isLoading = true
      await axios.get(`/event/${this.$route.params.id}`).then((response) => (this.rowData = response.data.data))
      this.isLoading = false
    },
    async uploadImage() {
      const formData = new FormData()
      const imageFile = this.$refs.myVueDropzone.getAcceptedFiles()[0]
      if (imageFile) formData.append('file', imageFile)
      await axios
        .post(`/event/${this.$route.params.id}/upload/mail/image`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .catch((error) =>
          this.$vs.notify({
            time: 8000,
            color: 'danger',
            position: 'top-right',
            icon: 'error',
            title: 'บันทึกขัอมูลไม่สำเร็จ',
            text: `เกิดข้อผิดพลาด ERROR: ${error.message}`,
          })
        )

      this.$vs.notify({
        time: 8000,
        color: 'success',
        position: 'top-right',
        icon: 'check_box',
        title: 'บันทึกข้อมูลสำเร็จ',
        text: `อัพโหลดรูปภาพอีเมลสำเร็จ`,
      })

      await this.getData()
      this.imgKey += 1
    },
    async sendReminders(preview = false) {
      if (this.isLoading) return false
      this.isLoading = true

      const { id, name } = this.rowData

      const { title, subject, subTitle, caption } = this

      const params = {
        eventID: id,
        eventName: name,
        title,
        subject,
        subTitle,
        caption,
        event: this.rowData,
        imgSrc: this.imgSrc,
      }

      if (preview) {
        params['dryRun'] = 1
      }

      const response = await axios.post(`/mail/reminds`, params).catch((err) => {
        console.log(err.message)
        if (!preview) {
          this.$vs.notify({
            time: 10000,
            color: 'danger',
            position: 'top-right',
            icon: 'error',
            title: `ส่งเมลไม่สำเร็จ`,
            text: err.response.data.message,
          })
        }
      })

      const { mailingList } = response.data

      this.emailSubject = mailingList.Subject
      this.emailBodyPreview = mailingList.HtmlBody

      if (!preview) {
        this.$vs.notify({
          time: 10000,
          color: 'success',
          position: 'top-right',
          icon: 'check',
          title: response.data.message,
        })
        this.cancel()
      }

      this.isLoading = false
    },
    async sendNews(preview = false) {
      if (this.isLoading) return false
      this.isLoading = true

      const { id, name } = this.rowData

      const { title, subject, subTitle, caption } = this

      const params = {
        eventID: id,
        eventName: name,
        title,
        subject,
        subTitle,
        caption,
        event: this.rowData,
        imgSrc: this.imgSrc,
      }

      if (preview) {
        params['dryRun'] = 1
      }

      const response = await axios.post(`/mail/news`, params).catch((err) => {
        console.log(err.message)
        this.$vs.notify({
          time: 10000,
          color: 'danger',
          position: 'top-right',
          icon: 'error',
          title: `ส่งเมลไม่สำเร็จ`,
          text: err.response.data.message,
        })
      })

      const { mailingList } = response.data

      this.emailSubject = mailingList.Subject
      this.emailBodyPreview = mailingList.HtmlBody

      if (!preview) {
        this.$vs.notify({
          time: 10000,
          color: 'success',
          position: 'top-right',
          icon: 'check',
          title: response.data.message,
        })
        this.cancel()
      }

      this.isLoading = false
    },
  },
}
</script>

<style>
.dz-error-message {
  top: 65px !important;
}

.dz-preview .dz-progress {
  display: none !important;
}
</style>
