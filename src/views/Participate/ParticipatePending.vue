<template>
  <div id="page-list-wait">
    <div class="vx-card p-6">
      <div class="flex flex-wrap items-center">
        <!-- ITEMS PER PAGE -->
        <div class="flex-grow">
          <div class="vx-card__title">
            <h4>
              รายการรอยืนยัน
            </h4>
          </div>
        </div>
      </div>
      <!-------------------------------------------------------------------Table------------------------------------------------------------------------------>
      <vs-table stripe pagination max-items="20" search :data="rowData">
        <template slot="thead">
          <vs-th sort-key="datetime">ส่งสลิปเมื่อ</vs-th>
          <vs-th sort-key="username">ชื่อผู้ใช้</vs-th>
          <vs-th sort-key="event_name">ชื่องาน</vs-th>
          <vs-th sort-key="ticket_name">ประเภทตั๋ว</vs-th>
          <vs-th>จัดการ</vs-th>
        </template>
        <template slot-scope="{ data }">
          <vs-tr :key="index" v-for="(tr, index) in data">
            <vs-td :data="tr.submit_date">{{ formatDateTime(tr.submit_date) }}</vs-td>
            <vs-td
              ><router-link :to="`/user/${tr.user_id}`">{{ tr.username }}</router-link></vs-td>
            <vs-td :data="tr.name">
              <router-link :to="`/event/${tr.event_id}`">{{ tr.name }}</router-link>
            </vs-td>
            <vs-td :data="tr.ticket_name">
              {{ tr.ticket_name }}
            </vs-td>
            <vs-td>
              <vs-button
                class="mx-1"
                size="small"
                color="primary"
                type="filled"
                @click="rowAction(tr)"
                >จัดการ
              </vs-button>
            </vs-td>
          </vs-tr>
        </template>
      </vs-table>
      <!-------------------------------------------------------------------END Table------------------------------------------------------------------------------>
      <!-------------------------------------------------------------------Action popup------------------------------------------------------------------------------>
      <vs-popup classContent="popup-example" title="ยืนยันการชำระเงิน" :active.sync="popupConfirm">
        <div class="text-center">
          <h3 class="text-success">โปรดตรวจสอบหลักฐานการโอนเงิน</h3>
          <p>ชื่อผู้ใช้ {{this.confirmingParticipation.username}}</p>
          <p>ชื่องาน {{this.confirmingParticipation.name}}</p>
          <p>ประเภท {{this.confirmingParticipation.ticket_name}}</p>
          <vs-button class="mx-1" size="small" color="success" type="filled" @click="confirmPayment">ยืนยันรายการ</vs-button>
          <vs-button class="mx-1" size="small" color="danger" type="filled" @click="rejectPayment">ยกเลิกรายการ</vs-button>
          <vs-button class="mx-1" size="small" color="dark" type="filled" @click="closePopup">ปิด</vs-button>
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
      popupConfirm: false,
      confirmingParticipation: {}
    }
  },
  methods: {
    formatDateTime (date) {
      return formatDateTime(date)
    },
    async getData () {
      // GET  waiting withdraw data
      await axios
        .get('/participate', { params: { status: 1 } })
        .then(response => (this.rowData = response.data.data))
    },
    rowAction (row) {
      this.confirmingParticipation = row
      this.popupConfirm = true
    },
    async confirmPayment () {
      await axios.post(`/participate/approve/${this.confirmingParticipation.id}`)
        .then(this.$vs.notify({
          title: 'ทำรายการสำเร็จ',
          text: 'ยืนยันการชำระเงินสำเร็จ',
          position: 'top-right',
          iconPack: 'feather',
          icon: 'icon-alert-circle',
          color: 'success'
        }))
        .catch(this.$vs.notify({
          title: 'เกิดข้อผิดพลาด',
          text: 'ยืนยันการชำระไม่สำเร็จ',
          position: 'top-right',
          iconPack: 'feather',
          icon: 'icon-alert-circle',
          color: 'danger'
        }))
    },
    async rejectPayment () {
      await axios.post(`/participate/reject/${this.confirmingParticipation.id}`)
        .then(this.$vs.notify({
          title: 'ทำรายการสำเร็จ',
          text: 'ยกเลิกการชำระเงินสำเร็จ',
          position: 'top-right',
          iconPack: 'feather',
          icon: 'icon-alert-circle',
          color: 'success'
        }))
        .catch(this.$vs.notify({
          title: 'เกิดข้อผิดพลาด',
          text: 'ยกเลิกการชำระไม่สำเร็จ',
          position: 'top-right',
          iconPack: 'feather',
          icon: 'icon-alert-circle',
          color: 'danger'
        }))
    },
    cancel () {
      this.popupConfirm = false
      this.confirmingParticipation = {}
    }
  },
  async mounted () {
    await this.getData()
  }
}
</script>

<style lang="scss" scoped>
</style>
