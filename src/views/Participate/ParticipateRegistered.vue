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
      <vs-table stripe pagination max-items="20" search :data="rowData" noDataText="ไม่พบข้อมูล">
        <template slot="thead">
          <vs-th sort-key="participation_id">รหัส</vs-th>
          <vs-th sort-key="register_date">สมัครเมื่อ</vs-th>
          <vs-th sort-key="username">ชื่อผู้ใช้</vs-th>
          <vs-th sort-key="event_name">ชื่องาน</vs-th>
          <vs-th sort-key="ticket_name">ประเภทการแข่งขัน</vs-th>
          <vs-th>จัดการ</vs-th>
        </template>
        <template slot-scope="{ data }">
          <vs-tr :key="index" v-for="(tr, index) in data">
            <vs-td :data="tr.participation_id">{{ tr.participation_id }}</vs-td>
            <vs-td :data="tr.register_date">{{ formatDateTime(tr.register_date) }}</vs-td>
            <vs-td
              ><router-link :to="`/user/${tr.user_id}`">{{ tr.username }}</router-link></vs-td
            >
            <vs-td :data="tr.name">
              <router-link :to="`/event/${tr.event_id}`">{{ tr.name }}</router-link>
            </vs-td>
            <vs-td :data="tr.ticket_name">
              {{ tr.ticket_name }}
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
      <vs-popup classContent="popup-example" title="ข้อมูลการสมัคร" :active.sync="popupInspect">
        <div class="text-center">
          <h3 class="text-warning">ยังไม่ชำระเงิน</h3>
          <h4>ยอดที่ต้องชำระ: <span class="text-primary">{{ currentInspectedParticipation.total_price }}</span> บาท</h4>
          <div class="my-4">
            <p>
              ชื่อผู้ใช้:
              <a :href="`/user/${currentInspectedParticipation.user_id}`">
                {{ currentInspectedParticipation.username }}
              </a>
            </p>
            <p>
              ชื่องาน:
              <a :href="`/event/${currentInspectedParticipation.event_id}`">{{
                currentInspectedParticipation.name
              }}</a>
            </p>
            <p>ประเภท: {{ currentInspectedParticipation.ticket_name }}</p>
            <p>
              สมัครเมื่อ:
              {{ formatDateTime(currentInspectedParticipation.register_date) }}
            </p>
          </div>
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
        .get('/participate', { params: { status: '-1,0' } })
        .then(response => (this.rowData = response.data.data))
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
