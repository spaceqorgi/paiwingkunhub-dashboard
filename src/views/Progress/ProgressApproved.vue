<template>
  <div id="page-list-wait">
    <div class="vx-card p-6">
      <div class="flex flex-wrap items-center">
        <!-- ITEMS PER PAGE -->
        <div class="flex-grow">
          <div class="vx-card__title">
            <h4>
              ผลวิ่งยืนยันสำเร็จ {{rowData.length}} รายการ
            </h4>
          </div>
        </div>
      </div>
      <!-------------------------------------------------------------------Table------------------------------------------------------------------------------>
      <vs-table stripe pagination max-items="20" search :data="rowData" noDataText="ไม่พบข้อมูล">
        <template slot="thead">
          <vs-th sort-key="participation_id">รหัส</vs-th>
          <vs-th sort-key="review_date">ยืนยันเมื่อ</vs-th>
          <vs-th sort-key="username">ชื่อผู้ใช้</vs-th>
          <vs-th sort-key="event_name">ชื่องาน</vs-th>
          <vs-th sort-key="ticket_name">ประเภทการแข่งขัน</vs-th>
          <vs-th sort-key="progress_in_km">ระยะวิ่ง (km)</vs-th>
          <vs-th sort-key="admin">แอดมินที่ยืนยัน</vs-th>
          <vs-th>จัดการ</vs-th>
        </template>
        <template slot-scope="{ data }">
          <vs-tr :key="index" v-for="(tr, index) in data">
            <vs-td :data="tr.progress_id">{{ tr.progress_id }}</vs-td>
            <vs-td :data="tr.review_date">{{ formatDateTime(tr.review_date) }}</vs-td>
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
            <vs-td :data="tr.approve_user_id">
              <router-link :to="`/user/${tr.approve_user_id}`">{{ tr.approve_user_id }}</router-link>
            </vs-td>
            <vs-td>
              <vs-button class="mx-1" size="small" color="primary" type="filled" @click="showPopupInspect(tr)"
                >ดูข้อมูล
              </vs-button>
            </vs-td>
          </vs-tr>
        </template>
      </vs-table>
      <!-------------------------------------------------------------------END Table------------------------------------------------------------------------------>
      <!-------------------------------------------------------------------Action popup------------------------------------------------------------------------------>
      <vs-popup classContent="popup-example" title="ข้อมูลผลวิ่ง" :active.sync="popupInspect">
        <div class="text-center">
          <h3 class="text-success">ผลวิ่งนี้ได้รับการยืนยันแล้ว</h3>
          <a v-if="imgSrc" :href="imgSrc"><img class="my-2" width="200rem" height="auto" :src="imgSrc" alt="หลักฐาน" target="_blank"/></a>
          <h4 class="text-primary">ระยะทางที่วิ่ง: {{ currentInspectedProgress.progress_in_km }} km</h4>
          <div class="my-4">
            <p>
              รหัสใบสมัคร:
              <a>
                {{ currentInspectedProgress.participation_id }}
              </a>
            </p>
            <p>
              ชื่อผู้ใช้:
              <a :href="`/user/${currentInspectedProgress.user_id}`">
                {{ currentInspectedProgress.username }}
              </a>
            </p>
            <p>
              ชื่องาน:
              <a :href="`/event/${currentInspectedProgress.event_id}`">{{
                currentInspectedProgress.name
              }}</a>
            </p>
            <p>ประเภท: {{ currentInspectedProgress.ticket_name }}</p>
            <p>
              ส่งหลักฐานเมื่อ:
              {{ formatDateTime(currentInspectedProgress.submit_date) }}
            </p>
            <p>
              ยืนยันผลเมื่อ:
              {{ formatDateTime(currentInspectedProgress.review_date) }}
            </p>
          </div>
          <vs-button class="mx-1" size="small" color="warning" type="filled" @click="unapproveProgress"
            >ยกเลิกการยืนยัน</vs-button
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
      if (this.currentInspectedProgress.proof_pic_path)
      return `${process.env.VUE_APP_BASE_URL}/file${this.currentInspectedProgress.proof_pic_path}`
      else return false
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
    formatDateTime (date) {
      return formatDateTime(date)
    },
    async getData () {
      // GET  waiting withdraw data
      await axios.get('/progress', { params: { status: 2 } }).then(response => {
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
        text: 'ยกเลิกการชำระเงินสำเร็จ',
        position: 'top-right',
        iconPack: 'feather',
        icon: 'icon-alert-circle',
        color: 'success'
      })
      else this.$vs.notify({
        title: 'เกิดข้อผิดพลาด',
        text: 'ยกเลิกการชำระเงินไม่สำเร็จ',
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
    },
    async unapproveProgress () {
      await axios
        .put(`/progress/unapprove/${this.currentInspectedProgress.progress_id}`, {
          approve_user_id: this.activeUserInfo.id
        })
        .then(() => {
          this.success = true
        })
        .catch(() => (this.success = false))

      if (this.success) {
        this.$vs.notify({
          title: 'ทำรายการสำเร็จ',
          text: 'ยกเลิกการยืนยันสำเร็จ',
          position: 'top-right',
          iconPack: 'feather',
          icon: 'icon-alert-circle',
          color: 'success'
        })
      } else this.$vs.notify({
        title: 'เกิดข้อผิดพลาด',
        text: 'ยกเลิกการยืนยันไม่สำเร็จ',
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
