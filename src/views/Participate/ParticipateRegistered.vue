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
      <vs-table stripe pagination max-items="20" search :data="rowData">
        <template slot="thead">
          <vs-th sort-key="datetime">สมัครเมื่อ</vs-th>
          <vs-th sort-key="username">ชื่อผู้ใช้</vs-th>
          <vs-th sort-key="event_name">ชื่องาน</vs-th>
          <vs-th sort-key="ticket_name">ประเภทตั๋ว</vs-th>
          <vs-th>จัดการ</vs-th>
        </template>
        <template slot-scope="{ data }">
          <vs-tr :key="index" v-for="(tr, index) in data">
            <vs-td :data="tr.register_date">
              {{ formatDateTime(tr.register_date) }}
            </vs-td>
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
                @click="rowAction"
                >จัดการ
              </vs-button>
            </vs-td>
          </vs-tr>
        </template>
      </vs-table>
    </div>
  </div>
</template>

<script>
import axios from '../../axios'
import { formatDateTime } from '@/functions'

export default {
  data () {
    return {
      rowData: []
    }
  },
  methods: {
    formatDateTime (date) {
      return formatDateTime(date)
    },
    async getData () {
      // GET  waiting withdraw data
      await axios
        .get('/participate', { params: { status: 0 } })
        .then(response => (this.rowData = response.data.data))
    },
    async rowAction () {
    }
  },
  async mounted () {
    await this.getData()
  }
}
</script>

<style lang="scss" scoped>
</style>
