<template>
  <div>
    <vx-card title="ประเภทการแข่งขัน">
      <!-------------------------------------------------------------------Table------------------------------------------------------------------------------>
      <vs-table search :data="rowData" noDataText="ไม่พบข้อมูล">
        <template slot="thead">
          <vs-th sort-key="'ticket_name'">ประเภทการแข่งขัน</vs-th>
          <vs-th sort-key="ticket_description">คำอธิบาย</vs-th>
          <vs-th sort-key="ticket_price">ราคา</vs-th>
          <vs-th sort-key="ticket_capacity">จำนวนทั้งหมด</vs-th>
          <vs-th sort-key="ticket_available">จำนวนที่เหลือ</vs-th>
          <vs-th sort-key="options">จัดการ</vs-th>
        </template>

        <template slot-scope="{ data }">
          <vs-tr :key="indextr" v-for="(tr, indextr) in data">
            <vs-td :data="tr.ticket_name">{{ tr.ticket_name }}</vs-td>
            <vs-td :data="tr.ticket_description">{{
              tr.ticket_description
            }}</vs-td>
            <vs-td :data="tr.ticket_price">{{ tr.ticket_price }}</vs-td>
            <vs-td :data="tr.ticket_capacity">{{ tr.ticket_capacity }}</vs-td>
            <vs-td :data="tr.ticket_available">{{ tr.ticket_available }}</vs-td>
            <vs-td :data="tr.options">
              <vs-button
                class="mx-1"
                size="small"
                color="dark"
                type="filled"
                @click="actionOptionLookup(tr)"
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
        title="ข้อมูลประเภทการแข่งขัน"
        :active.sync="popupOptionLookup"
      >
        <div class="text-center">
          <h3 class="text-primary">{{ currentOptionLookup.ticket_name }}</h3>
          <p class="my-2">{{ currentOptionLookup.ticket_description }}</p>
          <div class="my-4">
            <p>ราคา: {{ currentOptionLookup.ticket_price }}</p>
            <p>จำนวนตั้งต้น: {{ currentOptionLookup.ticket_capacity }}</p>
            <p>จำนวนคงเหลือ: {{ currentOptionLookup.ticket_available }}</p>
            <p>ระยะทาง: {{ currentOptionLookup.ticket_length_in_km }}</p>
            <p v-if="currentOptionLookup.ticket_is_online">
              วิ่งออนไลน์
            </p>
            <p v-else>
              วิ่งออฟไลน์
            </p>
          </div>
          <vs-button
            class="mx-1"
            size="small"
            color="success"
            type="filled"
            @click="editTicket"
            >แก้ไขข้อมูล</vs-button
          >
          <vs-button
            class="mx-1"
            size="small"
            color="danger"
            type="filled"
            @click="deleteTicket"
            >ลบประเภทการแข่งขัน</vs-button
          >
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
    </vx-card>
  </div>
</template>
<script>
import axios from '../../../axios'

export default {
  components: {},
  data () {
    return {
      searchQuery: '',
      rowData: [],
      rowDataCard: {},
      popupOptionLookup: false,
      currentOptionLookup: {}
    }
  },
  computed: {
    productOptions () {
      return Object.entries(this.currentOptionLookup.options)
    }
  },
  async mounted () {
    await axios
      .get(`/event/${this.$route.params.id}`)
      .then(response => (this.rowData = response.data.data.tickets))
  },
  methods: {
    actionOptionLookup (row) {
      this.popupOptionLookup = true
      this.currentOptionLookup = row
    },
    cancel () {
      this.popupOptionLookup = false
      this.currentOptionLookup = {}
    },
    deleteTicket () {},
    editTicket () {}
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
