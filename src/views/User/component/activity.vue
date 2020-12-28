<template>
  <div>
    <vx-card>
      <vs-table search :data="userData" noDataText="ไม่พบข้อมูล">
        <template slot="thead">
          <vs-th sort-key="id">รหัส</vs-th>
          <vs-th sort-key="event_name">ชื่องานวิ่ง</vs-th>
          <vs-th sort-key="event_start">เริ่มวิ่ง</vs-th>
          <vs-th sort-key="event_end">หมดเขตวิ่ง</vs-th>
          <vs-th sort-key="ticket_name">ประเภทการแข่งขัน</vs-th>
          <vs-th sort-key="ticket_price">ราคาตั๋ว</vs-th>
          <vs-th sort-key="ticket_length_in_km">ระยะวิ่งทั้งหมด</vs-th>
          <vs-th sort-key="ticket_status">สถานะ</vs-th>
          <vs-th sort-key="user_bib_id">เลข BIB</vs-th>
        </template>

        <template slot-scope="{ data }">
          <vs-tr :key="indextr" v-for="(tr, indextr) in data">
            <vs-td :data="tr.participation_id">
              {{ tr.participation_id }}
            </vs-td>
            <vs-td :data="tr.event_name">
              <router-link :to="`/event/${tr.event_id}`">{{ tr.name }}</router-link>
            </vs-td>
            <vs-td :data="tr.event_start_date">
              {{ formatDateTime(tr.event_start_date) }}
            </vs-td>
            <vs-td :data="tr.event_end_date">
              {{ formatDateTime(tr.event_end_date) }}
            </vs-td>
            <vs-td :data="tr.ticket_name">
              {{ tr.ticket_name }}
            </vs-td>
            <vs-td :data="tr.ticket_price">
              {{ tr.ticket_price }}
            </vs-td>
            <vs-td :data="tr.ticket_length_in_km">
              {{ tr.ticket_length_in_km }}
            </vs-td>
            <vs-td :data="tr.status">
              {{ getStatusText(tr.status) }}
            </vs-td>
            <vs-td :data="tr.user_bib_id">
              {{ tr.user_bib_id ? tr.user_bib_id : '-' }}
            </vs-td>
          </vs-tr>
        </template>
      </vs-table>
    </vx-card>
  </div>
</template>

<script>
import axios from '../../../axios'
import { formatDateTime } from '@/functions'

export default {
  components: {},
  data () {
    return {
      searchQuery: '',
      userData: [],
      userDataCard: {}
    }
  },
  async mounted () {
    await axios.get(`/user/${this.$route.params.id}/activity`).then(response => (this.userData = response.data.data))
  },
  methods: {
    formatDateTime (date) {
      return formatDateTime(date)
    },
    getStatusText (status) {
      if (status === 0) return 'ยังไม่ชำระเงิน'
      else if (status === 1) return 'รอการยืนยัน'
      else if (status === 2) return 'สมัครสำเร็จ'
      else if (status === -1) return 'ยกเลิกการชำระเงิน'
      else return 'ข้อมูลผิดพลาด โปรดติดต่อโปรแกรมเมอร์'
    }
  }
}
</script>

<style lang="scss" scoped>
#page-user-list {
  .user-list-filters {
    .vs__actions {
      position: absolute;
      right: 0;
      top: 50%;
      transform: translateY(-58%);
    }
  }
}

div.ag-root .ag-cell-focus {
  -webkit-user-select: text;
  -moz-user-select: text;
  -ms-user-select: text;
  user-select: text;
}
</style>
