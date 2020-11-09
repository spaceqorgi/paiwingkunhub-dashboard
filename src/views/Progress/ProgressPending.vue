<template>
  <div id="page-list-wait">
    <div class="vx-card p-6">
      <div class="flex flex-wrap items-center">
        <!-- ITEMS PER PAGE -->
        <div class="flex-grow">
          <div class="vx-card__title">
            <h4>
              ผลวิ่งรอยืนยัน
            </h4>
          </div>
        </div>
      </div>
      <!-------------------------------------------------------------------Table------------------------------------------------------------------------------>
      <vs-table stripe pagination max-items="20" search :data="rowData" noDataText="ไม่พบข้อมูล">
        <template slot="thead">
          <vs-th sort-key="progress_id">รหัส</vs-th>
          <vs-th sort-key="submit_date">ส่งผลเมื่อ</vs-th>
          <vs-th sort-key="username">ชื่อผู้ใช้</vs-th>
          <vs-th sort-key="event_name">ชื่องาน</vs-th>
          <vs-th sort-key="ticket_name">ประเภทการแข่งขัน</vs-th>
          <vs-th sort-key="progress_in_km">ระยะวิ่ง (km)</vs-th>
          <vs-th>จัดการ</vs-th>
        </template>
        <template slot-scope="{ data }">
          <vs-tr :key="index" v-for="(tr, index) in data">
            <vs-td :data="tr.progress_id">{{ tr.progress_id }}</vs-td>
            <vs-td :data="tr.submit_date">{{ formatDateTime(tr.submit_date) }}</vs-td>
            <vs-td
              ><router-link :to="`/user/${tr.user_id}`">{{ tr.username }}</router-link></vs-td
            >
            <vs-td :data="tr.name">
              <router-link :to="`/event/${tr.event_id}`">{{ tr.name }}</router-link>
            </vs-td>
            <vs-td :data="tr.ticket_name">
              {{ tr.ticket_name }}
            </vs-td>
            <vs-td :data="tr.progress_in_km">
              {{ tr.progress_in_km }}
            </vs-td>
            <vs-td>
              <vs-button class="mx-1" size="small" color="primary" type="filled" @click="showPopupInspect(tr)"
                >ตรวจสอบ
              </vs-button>
            </vs-td>
          </vs-tr>
        </template>
      </vs-table>
      <!-------------------------------------------------------------------END Table------------------------------------------------------------------------------>
      <!-------------------------------------------------------------------Action popup------------------------------------------------------------------------------>
      <vs-popup classContent="popup-example" title="ตรวจสอบข้อมูลผลวิ่ง" :active.sync="popupInspect">
        <div class="text-center">
          <h3 class="mb-4 text-primary">โปรดตรวจสอบหลักฐานการวิ่ง</h3>
          <img class="my-2" width="200rem" height="auto" :src="imgSrc" alt="หลักฐาน" />
          <h4 class="text-primary">ระยะทางที่วิ่ง: {{ currentInspectedProgress.progress_in_km }} km</h4>
          <div class="my-4">
            <p>
              ชื่อผู้ใช้:
              <router-link :to="`/user/${currentInspectedProgress.user_id}`">
                {{ currentInspectedProgress.username }}
              </router-link>
            </p>
            <p>
              ชื่องาน:
              <router-link :to="`/event/${currentInspectedProgress.event_id}`">{{
                currentInspectedProgress.name
              }}</router-link>
            </p>
            <p>ประเภท: {{ currentInspectedProgress.ticket_name }}</p>
            <p>
              ส่งหลักฐานเมื่อ:
              {{ formatDateTime(currentInspectedProgress.submit_date) }}
            </p>
          </div>
          <vs-button class="mx-1" size="small" color="success" type="filled" @click="confirmPayment"
            >ยืนยันผลวิ่ง</vs-button
          >
          <vs-button class="mx-1" size="small" color="danger" type="filled" @click="rejectProgress"
            >ยกเลิกผลวิ่ง!</vs-button
          >
          <vs-button class="mx-1" size="small" color="dark" type="filled" @click="cancel">ปิด</vs-button>
        </div>
      </vs-popup>
      <!---------------------------------------------------------------------END Action popup--------------------------------------------------------------------->
    </div>
  </div>
</template>

<script>
import axios from '../../axios'
import { formatDateTime } from '@/functions'

export default {
  data () {
    return {
      rowData: [],
      popupInspect: false,
      currentInspectedProgress: {}
    }
  },
  computed: {
    activeUserInfo () {
      return this.$store.state.AppActiveUser
    },
    imgSrc () {
      return `https://api-pwg.corgi.engineer/file${this.currentInspectedProgress.proof_pic_path}`
    }
  },
  async mounted () {
    await this.getData()
  },
  methods: {
    cancel () {
      this.popupInspect = false
      this.currentInspectedProgress = {}
    },
    async confirmPayment () {
      await axios
        .put(`/progress/approve/${this.currentInspectedProgress.progress_id}`, {
          approve_user_id: this.activeUserInfo.id
        })
        .then(async () => {
          this.success = true
        })
        .catch(() => (this.success = false))

      if (this.success) {
        this.$vs.notify({
          title: 'ทำรายการสำเร็จ',
          text: 'ยืนยันผลวิ่งสำเร็จ',
          position: 'top-right',
          iconPack: 'feather',
          icon: 'icon-alert-circle',
          color: 'success'
        })
      } else this.$vs.notify({
        title: 'เกิดข้อผิดพลาด',
        text: 'ยืนยันผลวิ่งไม่สำเร็จ',
        position: 'top-right',
        iconPack: 'feather',
        icon: 'icon-alert-circle',
        color: 'danger'
      })

      this.cancel()
      if (this.rowData.length === 1) setTimeout(function () {
        window.location.reload()
      }, 300)
      else await this.getData()
    },
    formatDateTime (date) {
      return formatDateTime(date)
    },
    async getData () {
      // GET  waiting withdraw data
      await axios.get('/progress', { params: { status: 1 } }).then(response => {
        this.rowData = response.data.data
      })
    },
    async rejectProgress () {
      await axios
        .put(`/progress/reject/${this.currentInspectedProgress.progress_id}`, {
          reject_reason: this.currentInspectedProgress.reject_reason
        })
        .then(() => (this.success = true))
        .catch(() => (this.success = false))

      if (this.success) this.$vs.notify({
        title: 'ทำรายการสำเร็จ',
        text: 'ยกเลิกผลวิ่งสำเร็จ',
        position: 'top-right',
        iconPack: 'feather',
        icon: 'icon-alert-circle',
        color: 'success'
      })
      else this.$vs.notify({
        title: 'เกิดข้อผิดพลาด',
        text: 'ยกเลิกผลวิ่งไม่สำเร็จ',
        position: 'top-right',
        iconPack: 'feather',
        icon: 'icon-alert-circle',
        color: 'danger'
      })

      this.cancel()
      if (this.rowData.length === 1) setTimeout(function () {
        window.location.reload()
      }, 300)
      else await this.getData()
    },
    async showPopupInspect (row) {
      this.currentInspectedProgress = row
      this.popupInspect = true
    }
  }
}
</script>

<style lang="scss" scoped>
h4 {
  margin: 0.75em;
}
h6 {
  margin: 0.55em;
}
p {
  margin: 0.55em;
}
</style>
