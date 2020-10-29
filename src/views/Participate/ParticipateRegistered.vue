<template>
  <div id="page-list-wait">
    <div class="vx-card p-6">
      <div class="flex flex-wrap items-center">
        <!-- ITEMS PER PAGE -->
        <div class="flex-grow">
          <div class="vx-card__title">
            <h4>
              รายการรอชำระเงิน
            </h4>
          </div>
        </div>
      </div>
      <!-------------------------------------------------------------------Table------------------------------------------------------------------------------>
      <vs-table stripe pagination max-items="20" search :data="rowData">
        <template slot="thead">
          <vs-th sort-key="participation_id">รหัส</vs-th>
          <vs-th sort-key="datetime">สมัครเมื่อ</vs-th>
          <vs-th sort-key="username">ชื่อผู้ใช้</vs-th>
          <vs-th sort-key="event_name">ชื่องาน</vs-th>
          <vs-th sort-key="ticket_name">ประเภทการวิ่ง</vs-th>
          <vs-th>จัดการ</vs-th>
        </template>
        <template slot-scope="{ data }">
          <vs-tr :key="index" v-for="(tr, index) in data">
            <vs-td :data="tr.participation_id">{{ tr.participation_id }}</vs-td>
            <vs-td :data="tr.register_date">{{ formatDateTime(tr.register_date) }}</vs-td>
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
                >ดูข้อมูล
              </vs-button>
            </vs-td>
          </vs-tr>
        </template>
      </vs-table>
      <!-------------------------------------------------------------------END Table------------------------------------------------------------------------------>
      <!-------------------------------------------------------------------Action popup------------------------------------------------------------------------------>
      <vs-popup
        classContent="popup-example"
        title="ข้อมูลการสมัคร"
        :active.sync="popupInspect"
      >
        <div class="text-center">
          <h3 class="text-warning">ลูกค้ายังไม่แจ้งชำระเงิน</h3>
          <img class="my-2" width="200rem" height="auto" :src="imgSrc" />
          <h4 class="text-primary">
            ยอดที่ต้องชำระ: {{ currentInspectedParticipation.total_price }} บาท
          </h4>
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
          </div>
          <vs-button
            class="mx-1"
            size="small"
            color="dark"
            type="filled"
            @click="cancel"
          >ปิด</vs-button
          >
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
      currentInspectedParticipation: {}
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
    formatDateTime (date) {
      return formatDateTime(date)
    },
    async getData () {
      // GET  waiting withdraw data
      await axios
        .get('/participate', { params: { status: 0 } })
        .then(response => (this.rowData = response.data.data))
    },
    async rowAction () {},
    async showPopupInspect (row) {
      this.currentInspectedParticipation = row
      this.popupInspect = true
    }
  }
}
</script>

<style lang="scss" scoped>
p {
  margin: 0.75em;
}
</style>
