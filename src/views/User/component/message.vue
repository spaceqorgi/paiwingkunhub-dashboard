<template>
  <div>
    <vx-card>
      <h4 class="mb-4">ส่งข้อความถึงลูกค้า</h4>
      <div class="vx-row">
        <div class="vx-col md:w-5/5 w-full mt-2 mx-5">
          <vx-input-group class="mb-base">
            <label for="ีusername"> ชื่อยูสเซอร์ </label>
            <vs-input class="mt-2" readonly v-model="username" type="text" name="username" />
            <template slot="append"> </template>
          </vx-input-group>
          <vx-input-group class="mb-base">
            <label for="message"> ข้อความ </label>
            <vs-textarea class="mt-2" style="resize: none" height="300px" v-model="message" name="message" />
            <template slot="append"> </template>
          </vx-input-group>
          <vs-input-group class="mb-base">
            <vs-button
              class="mr-5"
              style="float: left"
              icon="send"
              v-on:click="sendMessage"
              color="primary"
              type="filled"
            >
              ส่งข้อความ
            </vs-button>
          </vs-input-group>
        </div>
      </div>
      <div class="vx-row"></div>
    </vx-card>
  </div>
</template>

<script>
import axios from 'axios'
import log from '../../../log'

export default {
  data() {
    return {
      message: '',
      username: this.$route.params.id,
    }
  },
  methods: {
    async sendMessage() {
      await axios({
        method: 'post',
        url: process.env.VUE_APP_SOCKET_URL || 'http://localhost:8000',
        data: {
          username: this.username,
          message: this.message,
        },
      })
        .then((response) => this.handleMessageResponse(response.data))
        .catch((error) => this.handleMessageResponse(error, true))

      this.message = ''
    },
    handleMessageResponse(data, error = false) {
      if (error) {
        this.$vs.notify({
          time: 5000,
          color: 'danger',
          position: 'top-right',
          icon: 'danger',
          title: 'เกิดข้อผิดพลาด',
          text: `${error}`,
        })
        return
      }

      let notification = {}
      if (data.status === 200)
        notification = {
          time: 5000,
          color: 'success',
          position: 'top-right',
          icon: 'check',
          title: 'ส่งข้อความสำเร็จ',
          text: `ส่งข้อความถึง ${this.username} สำเร็จ`,
        }
      else if (data.status === 201)
        notification = {
          time: 5000,
          color: 'warning',
          position: 'top-right',
          icon: 'warning',
          title: 'ผู้ใช้ไม่ออนไลน์',
          text: `ผู้ใช้ ${this.username} จะได้รับข้อตวามเมื่อเข้าสู่ระบบ`,
        }
      else if (data.status === 422)
        notification = {
          time: 5000,
          color: 'danger',
          position: 'top-right',
          icon: 'danger',
          title: 'เกิดข้อผิดพลาด',
          text: `${data}`,
        }

      // Log successfully sent message
      if (data.status === 200 || data.status === 201) log.data(this.username, 'Message_sent', 0, this.message)

      this.$vs.notify(notification)
    },
  },
}
</script>

<style></style>
