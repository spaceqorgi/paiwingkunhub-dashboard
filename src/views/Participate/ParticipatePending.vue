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
      <vs-table
        stripe
        pagination
        max-items="20"
        search
        :data="rowData"
        noDataText="ไม่พบข้อมูล"
      >
        <template slot="thead">
          <!----------------------------------------    TH-------------------------------------------->
          <vs-th sort-key="participation_id">รหัส</vs-th>
          <vs-th sort-key="submit_date">ส่งสลิปเมื่อ</vs-th>
          <vs-th sort-key="username">ชื่อผู้ใช้</vs-th>
          <vs-th sort-key="event_name">ชื่องาน</vs-th>
          <vs-th sort-key="ticket_name">ประเภทการแข่งขัน</vs-th>
          <vs-th>จัดการ</vs-th>
          <!----------------------------------------END TH-------------------------------------------->
        </template>
        <template slot-scope="{ data }">
          <vs-tr :key="index" v-for="(tr, index) in data">
            <!------------------------------------------TD--------------------------------------------->
            <vs-td :data="tr.participation_id">{{ tr.participation_id }}</vs-td>
            <vs-td :data="tr.submit_date">{{
              formatDateTime(tr.submit_date)
            }}</vs-td>
            <vs-td
              ><router-link :to="`/user/${tr.user_id}`">{{
                tr.username
              }}</router-link></vs-td
            >
            <vs-td :data="tr.name">
              <router-link :to="`/event/${tr.event_id}`">{{
                tr.name
              }}</router-link>
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
                @click="showPopupInspect(tr)"
                >ตรวจสอบ
              </vs-button>
            </vs-td>
            <!---------------------------------------END TD------------------------------------------->
          </vs-tr>
        </template>
      </vs-table>
      <!-------------------------------------------------------------------END Table------------------------------------------------------------------------------>
      <!-------------------------------------------------------------------Action popup------------------------------------------------------------------------------>
      <vs-popup
        classContent="popup-example"
        title="ตรวจสอบข้อมูลการชำระเงิน"
        :active.sync="popupInspect"
      >
        <div class="text-center">
          <h3 class="mb-4 text-primary">โปรดตรวจสอบหลักฐานการโอนเงิน</h3>
          <img class="my-2" width="200rem" height="auto" :src="imgSrc"  alt="หลักฐาน"/>
          <h4>
            ยอดที่แจ้งชำระ:
            <span class="text-primary">{{
              currentInspectedParticipation.total_price
            }}</span>
            บาท
          </h4>
          <!----------------------------------------------------------------------------------------->
          <vs-divider />
          <h6 v-if="currentInspectedParticipation.payment_bank">
            ธนาคาร: {{ bankInfo.name }}
          </h6>
          <h6 v-if="currentInspectedParticipation.payment_branch">
            สาขา: {{ currentInspectedParticipation.payment_branch }}
          </h6>
          <h6 v-if="currentInspectedParticipation.payment_account_name">
            ชื่อบัญชี: {{ currentInspectedParticipation.payment_account_name }}
          </h6>
          <h6 v-if="currentInspectedParticipation.payment_account_number">
            เลขบัญชี: {{ currentInspectedParticipation.payment_account_number }}
          </h6>
          <vs-divider />
          <!----------------------------------------------------------------------------------------->
          <div class="my-4">
            <p>
              ชื่อผู้ใช้:
              <router-link
                :to="`/user/${currentInspectedParticipation.user_id}`"
              >
                {{ currentInspectedParticipation.username }}
              </router-link>
            </p>
            <p>
              ชื่องาน:
              <router-link
                :to="`/event/${currentInspectedParticipation.event_id}`"
                >{{ currentInspectedParticipation.name }}</router-link
              >
            </p>
            <p>ประเภท: {{ currentInspectedParticipation.ticket_name }}</p>
            <p>
              สมัครเมื่อ:
              {{ formatDateTime(currentInspectedParticipation.register_date) }}
            </p>
            <p>
              ส่งหลักฐานเมื่อ:
              {{ formatDateTime(currentInspectedParticipation.submit_date) }}
            </p>
            <p>
              โอนเงินเมื่อ (ลูกค้ากรอก):
              {{
                currentInspectedParticipation.transfer_date
                  ? formatDateTime(currentInspectedParticipation.transfer_date)
                  : 'ไม่ระบุ'
              }}
            </p>
          </div>
          <!----------------------------------------------------------------------------------------->
          <vs-button
            class="mx-1"
            size="small"
            color="success"
            type="filled"
            @click="confirmPayment"
            >ยืนยันการชำระเงิน</vs-button
          >
          <vs-button
            class="mx-1"
            size="small"
            color="danger"
            type="filled"
            @click="rejectPayment"
            >ยกเลิกการชำระ!</vs-button
          >
          <vs-button
            class="mx-1"
            size="small"
            color="dark"
            type="filled"
            @click="cancel"
            >ปิด</vs-button
          >
          <!----------------------------------------------------------------------------------------->
        </div>
      </vs-popup>
      <!---------------------------------------------------------------------END Action popup--------------------------------------------------------------------->
    </div>
  </div>
</template>

<script>
import axios from '../../axios'
import {formatDateTime, thaiBankInfo} from '@/functions'

export default {
  data () {
    return {
      rowData: [],
      popupInspect: false,
      currentInspectedParticipation: {}
    }
  },
  computed: {
    activeUserInfo () {
      return this.$store.state.AppActiveUser
    },
    bankInfo () {
      const BANK_INFO =
        thaiBankInfo[this.currentInspectedParticipation.payment_bank]
      return BANK_INFO ? BANK_INFO : thaiBankInfo['-999']
    },
    imgSrc () {
      return `https://api-pwg.corgi.engineer/file${this.currentInspectedParticipation.slip_pic_path}`
    }
  },
  async mounted () {
    await this.getData()
  },
  methods: {
    cancel () {
      this.popupInspect = false
      this.currentInspectedParticipation = {}
    },
    async confirmPayment () {
      await axios
        .put(
          `/participate/approve/${this.currentInspectedParticipation.participation_id}`,
          { approve_user_id: this.activeUserInfo.id }
        )
        .then(async () => {
          this.success = true
        })
        .catch(() => (this.success = false))

      if (this.success) {
        this.$vs.notify({
          title: 'ทำรายการสำเร็จ',
          text: 'ยืนยันการชำระเงินสำเร็จ',
          position: 'top-right',
          iconPack: 'feather',
          icon: 'icon-alert-circle',
          color: 'success'
        })
      } else this.$vs.notify({
        title: 'เกิดข้อผิดพลาด',
        text: 'ยืนยันการชำระไม่สำเร็จ',
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
      await axios
        .get('/participate', { params: { status: 1 } })
        .then(response => {
          this.rowData = response.data.data
        })
    },
    async rejectPayment () {
      await axios
        .put(
          `/participate/reject/${this.currentInspectedParticipation.participation_id}`,
          { reject_reason: this.currentInspectedParticipation.reject_reason }
        )
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
        text: 'ยกเลิกการชำระไม่สำเร็จ',
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
      this.currentInspectedParticipation = row
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
