<template>
  <div>
    <vx-card>
      <vs-table search :data="userData" noDataText="ไม่พบข้อมูล">
        <template slot="thead">
          <vs-th sort-key="id">รหัส</vs-th>
          <vs-th sort-key="name">ชื่อของที่ระลึก</vs-th>
          <vs-th sort-key="event_name">ชื่องานวิ่ง</vs-th>
          <vs-th sort-key="ticket_name">ชื่อรายการ</vs-th>
          <vs-th sort-key="price">ราคา</vs-th>
          <vs-th sort-key="quantity">จำนวนที่เหลือ</vs-th>
          <vs-th sort-key="option">ตัวเลือก</vs-th>
<!--          <vs-th sort-key="status">สถานะ</vs-th>-->
        </template>

        <template slot-scope="{ data }">
          <vs-tr :key="indextr" v-for="(tr, indextr) in data">
            <vs-td :data="tr.id">
              {{ tr.id }}
            </vs-td>
            <vs-td :data="tr.name">
              {{ tr.name }}
            </vs-td>
            <vs-td :data="tr.event_name">
              <router-link :to="`/event/${tr.event_id}`">{{ tr.event_name }}</router-link>
            </vs-td>
            <vs-td :data="tr.ticket_name">
              {{ tr.ticket_name }}
            </vs-td>
            <vs-td :data="tr.price">
              {{ tr.price }}
            </vs-td>
            <vs-td :data="tr.quantity">
              {{ tr.quantity }}
            </vs-td>
            <vs-td :data="tr.product_options">
              {{ getOptions(tr.product_options) }}
            </vs-td>
<!--            <vs-td :data="tr.product_tracking_status">-->
<!--             {{ getStatusText(tr.product_tracking_status) }}-->
<!--            </vs-td>-->
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
    await axios.get(`/user/${this.$route.params.id}/product`).then(response => (this.userData = response.data.data))
  },
  methods: {
    formatDateTime (date) {
      return formatDateTime(date)
    },
    getStatusText (status) {
      if (status) return 'จัดส่งแล้ว'
      else return 'ยังไม่ส่ง'
    },
    getOptions (options) {
      const result = []
      for (const [key, value] of Object.entries(options)) {
        result.push(`${key}: ${value}`)
      }
      return result.join(', ')
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
