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
        <div class="mt-5">
          <h2 class="mb-2">เลือกรูปแบบอีเมล</h2>
          <p class="my-2">กดเพื่อส่งอีเมล</p>
          <vs-button
            :disabled="isLoading"
            class="mr-2"
            style="float: left"
            icon="send"
            @click="sendReminders"
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
            @click="sendNews"
            color="primary"
            type="filled"
          >
            แจ้งข่าวสารถึงลูกค้าทุกคน
          </vs-button>
        </div>
      </vs-col>
    </vs-row>
  </vx-card>
</template>

<script>
import axios from '../../../axios'
import 'flatpickr/dist/flatpickr.css'
import vue2Dropzone from 'vue2-dropzone'
import { formatDateTime } from '@/functions'

export default {
  components: {},
  data() {
    return {
      newRowData: {},
      rowData: {},
      title: '',
      subject: '',
      subTitle: '',
      caption: '',
      isLoading: false,
    }
  },
  async mounted() {
    await this.getData()
  },
  methods: {
    async getData() {
      await axios.get(`/event/${this.$route.params.id}`).then((response) => (this.rowData = response.data.data))
      this.newRowData = this.rowData
    },
    async sendReminders() {
      this.isLoading = true
      if (this.isLoading) return false

      const { id, name } = this.newRowData

      const { title, subject, subTitle, caption } = this

      const params = {
        eventID: id,
        eventName: name,
        title,
        subject,
        subTitle,
        caption,
        event: this.newRowData,
        // dryRun: 1,
      }

      await axios
        .post(`/mail/reminds`, params)
        .then((response) => {
          console.log(response)
          this.$vs.notify({
            time: 10000,
            color: 'success',
            position: 'top-right',
            icon: 'check',
            title: response.data.message,
          })
        })
        .catch((err) => {
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

      this.isLoading = false
    },
    async sendNews() {
      this.isLoading = true
      if (this.isLoading) return false

      const { id, name } = this.newRowData

      const { title, subject, subTitle, caption } = this

      const params = {
        eventID: id,
        eventName: name,
        title,
        subject,
        subTitle,
        caption,
        event: this.newRowData,
      }

      await axios
        .post(`/mail/news`, params)
        .then((response) => {
          console.log(response)
          this.$vs.notify({
            time: 10000,
            color: 'success',
            position: 'top-right',
            icon: 'check',
            title: response.data.message,
          })
        })
        .catch((err) => {
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

      this.isLoading = false
    },
  },
}
</script>

<style>
.dz-error-message {
  top: 65px !important;
}
</style>
