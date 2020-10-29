<template>
  <div>
    <vx-card title="รายการสินค้า/ของที่ระลึก">
      <!-------------------------------------------------------------------Table------------------------------------------------------------------------------>
      <vs-table search :data="rowData">
        <template slot="thead">
          <vs-th sort-key="'name'">ชื่อสินค้า</vs-th>
          <vs-th sort-key="description">คำอธิบาย</vs-th>
          <vs-th sort-key="price">ราคา</vs-th>
          <vs-th sort-key="default_quantity">จำนวนตั้งต้น</vs-th>
          <vs-th sort-key="quantity">จำนวนในสต๊อก</vs-th>
          <vs-th sort-key="options">ตัวเลือก</vs-th>
        </template>

        <template slot-scope="{ data }">
          <vs-tr :key="indextr" v-for="(tr, indextr) in data">
            <vs-td :data="tr.name">{{ tr.name }}</vs-td>
            <vs-td :data="tr.description">{{ tr.description }}</vs-td>
            <vs-td :data="tr.price">{{ tr.price }}</vs-td>
            <vs-td :data="tr.default_quantity">{{ tr.default_quantity }}</vs-td>
            <vs-td :data="tr.quantity">{{ tr.quantity }}</vs-td>
            <vs-td :data="tr.options">
              <vs-button
                class="mx-1"
                size="small"
                color="dark"
                type="filled"
                @click="actionOptionLookup(tr)"
                >ดูตัวเลือก
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
          <h3 class="text-success">{{ currentOptionLookup.name }}</h3>
          <img class="my-2" width="200rem" height="auto" :src="imgSrc" />
          <div class="my-4">
            <p></p>
          </div>
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
    },
    deleteProduct () {
    },
    editProduct () {
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
