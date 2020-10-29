<template>
  <div>
    <vx-card title="รายการประเภทการวิ่ง">
      <!-------------------------------------------------------------------Table------------------------------------------------------------------------------>
      <vs-table search :data="rowData">
        <template slot="thead">
          <vs-th sort-key="'ticket_name'">ประเภทการวิ่ง</vs-th>
          <vs-th sort-key="ticket_description">คำอธิบาย</vs-th>
          <vs-th sort-key="ticket_price">ราคา</vs-th>
          <vs-th sort-key="ticket_capacity">จำนวนทั้งหมด</vs-th>
          <vs-th sort-key="ticket_available">จำนวนที่เหลือ</vs-th>
        </template>

        <template slot-scope="{ data }">
          <vs-tr :key="indextr" v-for="(tr, indextr) in data">
            <vs-td :data="tr.ticket_name">{{ tr.ticket_name }}</vs-td>
            <vs-td :data="tr.ticket_description">{{ tr.ticket_description }}</vs-td>
            <vs-td :data="tr.ticket_price">{{ tr.ticket_price }}</vs-td>
            <vs-td :data="tr.ticket_capacity">{{ tr.ticket_capacity }}</vs-td>
            <vs-td :data="tr.ticket_available">{{ tr.ticket_available }}</vs-td>
          </vs-tr>
        </template>
      </vs-table>
      <!-------------------------------------------------------------------END Table------------------------------------------------------------------------------>
      </vx-card>
  </div>
</template>
<script>
import axios from '../../../axios'

export default {
  components: {
  },
  data () {
    return {
      searchQuery: '',
      rowData: [],
      rowDataCard: {}
    }
  },
  async mounted () {
    await axios
      .get(`/event/${this.$route.params.id}`)
      .then(response => (this.rowData = response.data.data.tickets))
  },
  methods: {
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
