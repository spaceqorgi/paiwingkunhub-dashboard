<template>
  <div>
    <vx-card title="สินค้า/ของที่ระลึก">
      <!-------------------------------------------------------------------Table------------------------------------------------------------------------------>
      <vs-table search :data="rowData" noDataText="ไม่พบข้อมูล">
        <template slot="thead">
          <vs-th sort-key="name">ชื่อสินค้า</vs-th>
          <vs-th sort-key="description">คำอธิบาย</vs-th>
          <vs-th sort-key="price">ราคา</vs-th>
          <vs-th sort-key="quantity">จำนวนในสต๊อก</vs-th>
          <vs-th sort-key="default_quantity">จำนวนตั้งต้น</vs-th>
          <vs-th sort-key="options">จัดการ</vs-th>
        </template>

        <template slot-scope="{ data }">
          <vs-tr :key="indextr" v-for="(tr, indextr) in data">
            <vs-td :data="tr.name">{{ tr.name }}</vs-td>
            <vs-td :data="tr.description">{{ tr.description }}</vs-td>
            <vs-td :data="tr.price">{{ tr.price }}</vs-td>
            <vs-td :data="tr.quantity">{{ tr.quantity }}</vs-td>
            <vs-td :data="tr.default_quantity">{{ tr.default_quantity }}</vs-td>
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
        title="ข้อมูลสินค้า"
        :active.sync="popupOptionLookup"
      >
        <div class="text-center">
          <vs-row vs-justify="center" class="my-4">
            <vs-col class="px-2" vs-sm="12" vs-w="6">
              <h3 class="text-primary">{{ currentOptionLookup.name }}</h3>
              <blockquote class="my-2">{{ currentOptionLookup.description }}</blockquote>
              <img class="my-2" width="200rem" height="auto" :src="imgSrc" />
              <h4 class="text-primary my-2"><strong>ราคา {{ currentOptionLookup.price }} บาท</strong></h4>
              <h4 class="text-primary my-2"><strong>จำนวน {{
                  currentOptionLookup.quantity
                }}/{{ currentOptionLookup.default_quantity }}</strong></h4>
              <div class="my-4">
                <h6 class="my-2">ตัวเลือก</h6>
                <ul v-if="currentOptionLookup.options">
                  <li v-for="option in productOptions" :key="option[0]">
                    {{ option[0] }}: {{ option[1].join(', ') }}
                  </li>
                </ul>
              </div>
            </vs-col>
            <vs-col class="px-2" vs-sm="12"  vs-w="6">
              <vs-input label="ชื่อสินค้า" v-model="currentOptionLookup.name" />
              <vs-textarea
                class="mt-3"
                label="คำอธิบาย"
                v-model="currentOptionLookup.description"
                width="100%"
              />
              <vs-divider/>
              <vs-input label="ราคา" v-model="currentOptionLookup.price" />
              <vs-input
                label="จำนวนตั้งต้น"
                v-model="currentOptionLookup.default_quantity"
              />
              <vs-input
                label="จำนวนในสต๊อก"
                v-model="currentOptionLookup.quantity"
              />
            </vs-col>
          </vs-row>
          <vs-button
            class="mx-1"
            size="small"
            color="success"
            type="filled"
            @click="editProduct"
            >แก้ไขข้อมูล</vs-button
          >
          <vs-button
            class="mx-1"
            size="small"
            color="danger"
            type="filled"
            @click="deleteProduct"
            >ลบสินค้า</vs-button
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
    imgSrc () {
      return `https://api-pwg.corgi.engineer/file${this.currentOptionLookup.product_pic_path}`
    },
    productOptions () {
      return Object.entries(this.currentOptionLookup.options)
    }
  },
  async mounted () {
    await axios
      .get(`/event/${this.$route.params.id}`)
      .then(response => (this.rowData = response.data.data.products))
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
    async deleteProduct () {
      await axios
        .delete(`/product/${this.currentOptionLookup.id}`)
        .then(() => (this.success = true))
        .catch(() => (this.success = false))

      if (this.success) this.$vs.notify({
        title: 'ทำรายการสำเร็จ',
        text: 'ลบสินค้าสำเร็จ',
        position: 'top-right',
        iconPack: 'feather',
        icon: 'icon-alert-circle',
        color: 'success'
      })
      else this.$vs.notify({
        title: 'เกิดข้อผิดพลาด',
        text: 'ลบสินค้าไม่สำเร็จสำเร็จ',
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
    async editProduct () {
      await axios
        .put(
          `/product/${this.currentOptionLookup.id}`,
          this.currentOptionLookup
        )
        .then(async () => {
          this.success = true
        })
        .catch(() => (this.success = false))

      if (this.success) {
        this.$vs.notify({
          title: 'ทำรายการสำเร็จ',
          text: 'แก้ไขข้อมูลสำเร็จ',
          position: 'top-right',
          iconPack: 'feather',
          icon: 'icon-alert-circle',
          color: 'success'
        })
      } else this.$vs.notify({
        title: 'เกิดข้อผิดพลาด',
        text: 'แก้ไขข้อมูลไม่สำเร็จ',
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
