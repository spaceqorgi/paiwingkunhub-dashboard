<template>
  <div>
    <vx-card title="ประเภทการแข่งขัน">
      <!-------------------------------------------------------------------Table------------------------------------------------------------------------------>
      <vs-table search :data="rowData" noDataText="ไม่พบข้อมูล">
        <template slot="thead">
          <vs-th sort-key="ticket_name">ประเภทการแข่งขัน</vs-th>
          <vs-th sort-key="ticket_description">คำอธิบาย</vs-th>
          <vs-th sort-key="ticket_price">ราคา</vs-th>
          <vs-th sort-key="ticket_available">จำนวนที่เหลือ</vs-th>
          <vs-th sort-key="ticket_capacity">จำนวนทั้งหมด</vs-th>
          <vs-th sort-key="options">จัดการ</vs-th>
        </template>

        <template slot-scope="{ data }">
          <vs-tr :key="tr.id" v-for="tr in data">
            <vs-td :data="tr.ticket_name">{{ tr.ticket_name }}</vs-td>
            <vs-td :data="tr.ticket_description">{{ tr.ticket_description }}</vs-td>
            <vs-td :data="tr.ticket_price">{{ tr.ticket_price }}</vs-td>
            <vs-td :data="tr.ticket_capacity">{{ tr.ticket_capacity }}</vs-td>
            <vs-td :data="tr.ticket_available">{{ tr.ticket_available }}</vs-td>
            <vs-td :data="tr.options">
              <vs-button class="mx-1" size="small" color="dark" type="filled" @click="actionOptionLookup(tr)"
                >ดูข้อมูล
              </vs-button>
            </vs-td>
          </vs-tr>
        </template>
      </vs-table>
      <div class="text-left">
        <vs-button class="mt-4" @click="actionOptionLookup({ event_id: $route.params.id }, true)"
          >เพิ่มรายการแข่งขัน</vs-button
        >
      </div>
      <!-------------------------------------------------------------------END Table------------------------------------------------------------------------------>
      <!-------------------------------------------------------------------Action popup------------------------------------------------------------------------------>
      <vs-popup classContent="popup-example" title="ข้อมูลประเภทการแข่งขัน" :active.sync="popupOptionLookup">
        <div class="px-5 my-5">
          <h3 class="text-primary">{{ currentOptionLookup.ticket_name }}</h3>
          <p class="my-2">{{ currentOptionLookup.ticket_description }}</p>
          <vs-row vs-justify="center" class="my-3">
            <vs-col class="my-1" vs-w="12" vs-justify="center"
              ><vs-input label="ประเภทการแข่งขัน" v-model="currentOptionLookup.ticket_name"
            /></vs-col>
            <vs-col class="my-1" vs-w="12" vs-justify="center"
              ><vs-textarea label="คำอธิบาย" v-model="currentOptionLookup.ticket_description"
            /></vs-col>
          </vs-row>
          <vs-divider />
          <vs-row vs-justify="center" class="my-3">
            <vs-col class="my-1" vs-sm="12" vs-w="6" vs-justify="center">
              <vs-input label="จำนวนตั้งต้น" v-model="currentOptionLookup.ticket_capacity" />
            </vs-col>
            <vs-col class="my-1" vs-sm="12" vs-w="6" vs-justify="center">
              <vs-input label="จำนวนคงเหลือ" v-model="currentOptionLookup.ticket_available" />
            </vs-col>
          </vs-row>
          <vs-row vs-justify="center" class="my-3">
            <vs-col class="my-1" vs-sm="12" vs-w="6" vs-justify="center"
              ><vs-input label="ราคา" v-model="currentOptionLookup.ticket_price"
            /></vs-col>
            <vs-col class="my-1" vs-sm="12" vs-w="6"
              ><vs-input label="ระยะทาง" v-model="currentOptionLookup.ticket_length_in_km"
            /></vs-col>
          </vs-row>
          <vs-row vs-justify="center" class="my-3">
            <vs-col class="my-1" vs-w="12" vs-justify="center">
              <vs-checkbox v-model="currentOptionLookup.ticket_is_online">วิ่งออนไลน์?</vs-checkbox>
            </vs-col>
          </vs-row>
          <vs-button v-if="isAdding" class="mx-1" size="small" color="success" type="filled" @click="editTicket"
            >เพิ่มรายการ</vs-button
          >
          <vs-button v-else-if="!isAdding" class="mx-1" size="small" color="success" type="filled" @click="editTicket"
            >แก้ไขข้อมูล</vs-button
          >
          <vs-button class="mx-1" size="small" color="danger" type="filled" @click="deleteTicket"
            >ลบประเภทการแข่งขัน</vs-button
          >
          <vs-button class="mx-1" size="small" color="dark" type="filled" @click="cancel">ปิด</vs-button>
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
      currentOptionLookup: {},
      isAdding: false
    }
  },
  computed: {
    productOptions () {
      return Object.entries(this.currentOptionLookup.options)
    }
  },
  async mounted () {
    await this.getData()
  },
  methods: {
    actionOptionLookup (row, adding = false) {
      this.isAdding = adding
      this.currentOptionLookup = row
      this.popupOptionLookup = true
    },
    cancel () {
      this.currentOptionLookup = {}
      this.popupOptionLookup = false
    },
    async deleteTicket () {
      await axios
        .delete(`/ticket/${this.currentOptionLookup.id}`)
        .then(() => (this.success = true))
        .catch(() => (this.success = false))

      if (this.success) this.$vs.notify({
        title: 'ทำรายการสำเร็จ',
        text: 'ลบรายการสำเร็จ',
        position: 'top-right',
        iconPack: 'feather',
        icon: 'icon-alert-circle',
        color: 'success'
      })
      else this.$vs.notify({
        title: 'เกิดข้อผิดพลาด',
        text: 'ลบรายการไม่สำเร็จสำเร็จ',
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
    async editTicket () {
      if (this.isAdding) await axios
        .post('/ticket', this.currentOptionLookup)
        .then(async () => {
          this.success = true
        })
        .catch(() => (this.success = false))
      else await axios
        .put(`/ticket/${this.currentOptionLookup.id}`, this.currentOptionLookup)
        .then(async () => {
          this.success = true
        })
        .catch(() => (this.success = false))

      if (this.success) {
        this.$vs.notify({
          title: 'สำเร็จ',
          text: 'ทำรายการสำเร็จ',
          position: 'top-right',
          iconPack: 'feather',
          icon: 'icon-alert-circle',
          color: 'success'
        })
      } else this.$vs.notify({
        title: 'เกิดข้อผิดพลาด',
        text: 'ทำรายการสำเร็จ',
        position: 'top-right',
        iconPack: 'feather',
        icon: 'icon-alert-circle',
        color: 'danger'
      })

      /*====================================================================
      Cleanup and close popup
      ====================================================================*/
      this.cancel()
      if (this.rowData.length === 1) setTimeout(function () {
        window.location.reload()
      }, 300)
      else await this.getData()
    },
    async getData () {
      await axios.get(`/event/${this.$route.params.id}`).then(response => (this.rowData = response.data.data.tickets))
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
