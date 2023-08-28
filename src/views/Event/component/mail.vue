<template>
  <vx-card no-shadow title="ส่งอีเมลถึงลูกค้า">
    <vs-row>
      <vs-col vs-w="12">
        <div>
          <!-- <h2 class="mb-2">{{ newRowData.id }}</h2>
          <h2 class="mb-2">{{ newRowData.name }}</h2>
          <div style="background: lightgray; padding: 5px; margin: 5px; border-radious: 5px">
            <p class="mb-2">{{ newRowData }}</p>
          </div> -->
          <vs-input class="w-full mb-5" label-placeholder="Subject" v-model="subject" />
          <vs-input class="w-full mb-5" label-placeholder="Title" v-model="title" />
          <vs-input class="w-full mb-5" label-placeholder="Subtitle" v-model="subTitle" />
          <vs-input class="w-full mb-5" label-placeholder="Caption" v-model="caption" />
          <vs-button
            class="mr-2"
            style="float: left"
            size="small"
            icon="send"
            @click="sendReminders"
            color="primary"
            type="filled"
          >
            แจ้งปิดรับสมัคร
          </vs-button>
          <vs-button
            class="mr-2"
            style="float: left"
            size="small"
            icon="send"
            @click="sendNews"
            color="primary"
            type="filled"
          >
            แจ้งข่าวสาร
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
      await axios
        .post(`/mail/reminds`)
        .then((response) => {
          console.log(response)
          this.$vs.notify({
            time: 10000,
            color: 'success',
            position: 'top-right',
            icon: 'success',
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
    },
    async sendNews() {
      await axios
        .post(`/mail/news`)
        .then((response) => {
          console.log(response)
          this.$vs.notify({
            time: 10000,
            color: 'success',
            position: 'top-right',
            icon: 'success',
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
    },
  },
}
</script>

<style>
.dz-error-message {
  top: 65px !important;
}
</style>
