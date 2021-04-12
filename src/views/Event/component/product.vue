∏<template>
  <div>
    <vx-card title="ของที่ระลึก">
      <!-------------------------------------------------------------------Table------------------------------------------------------------------------------>
      <vs-table search :data="rowData" noDataText="ไม่พบข้อมูล">
        <template slot="thead">
          <vs-th sort-key="name">ชื่อของที่ระลึก</vs-th>
          <vs-th sort-key="description">คำอธิบาย</vs-th>
          <!--          <vs-th sort-key="price">ราคา</vs-th>-->
          <vs-th sort-key="quantity">จำนวนในสต๊อก</vs-th>
          <vs-th sort-key="default_quantity">จำนวนตั้งต้น</vs-th>
          <vs-th sort-key="options">จัดการ</vs-th>
        </template>

        <template slot-scope="{ data }">
          <vs-tr :key="indextr" v-for="(tr, indextr) in data">
            <vs-td :data="tr.name">{{ tr.name }}</vs-td>
            <vs-td :data="tr.description">{{ tr.description }}</vs-td>
            <!--            <vs-td :data="tr.price">{{ tr.price }}</vs-td>-->
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
      <div class="text-left">
        <vs-button class="mt-4" @click="actionOptionLookup({}, true)"
          >เพิ่มของที่ระลึก</vs-button
        >
      </div>
      <!-------------------------------------------------------------------END Table------------------------------------------------------------------------------>
      <!-------------------------------------------------------------------Action popup------------------------------------------------------------------------------>
      <vs-popup
        classContent="popup-example"
        title="ข้อมูลของที่ระลึก"
        :active.sync="popupOptionLookup"
      >
        <div class="px-5 my-5">
          <vs-row class="my-4">
            <!------------------PREVIEW FOR EDITING---------------->
            <vs-col v-if="!isAdding" class="px-2" vs-sm="12" vs-w="12">
              <h3 class="text-primary">{{ currentOptionLookup.name }}</h3>
              <blockquote class="my-2">
                {{ currentOptionLookup.description }}
              </blockquote>
              <img
                class="my-2"
                width="200rem"
                height="auto"
                :src="imgSrc"
                alt="event-image"
              />
              <!--              <h5 class="text-primary my-2">ราคา {{ currentOptionLookup.price }} บาท</h5>-->
              <h5 class="text-primary my-2">
                จำนวน {{ currentOptionLookup.quantity }}/{{
                  currentOptionLookup.default_quantity
                }}
              </h5>
              <div class="my-4">
                <h6 class="my-2">ตัวเลือก</h6>
                <ul v-if="currentOptionLookup.options">
                  <li v-for="option in productOptions" :key="option[0]">
                    {{ option[0] }}: {{ option[1].join(', ') }}
                  </li>
                </ul>
              </div>
              <vs-divider />
            </vs-col>
            <!------------------INPUTS--------------->
            <vs-col class="px-2" vs-sm="12" vs-w="12">
              <vs-input
                label="ชื่อของที่ระลึก"
                v-model="currentOptionLookup.name"
              />
              <vs-textarea
                class="mt-3"
                label="คำอธิบาย"
                v-model="currentOptionLookup.description"
                width="100%"
              />
              <vs-divider />
              <!--              <vs-input label="ราคา" v-model="currentOptionLookup.price" />-->
              <vs-input
                v-if="!isAdding"
                type="number"
                label="จำนวนในสต๊อก"
                v-model="currentOptionLookup.quantity"
              />
              <vs-input
                type="number"
                label="จำนวนตั้งต้น"
                v-model="currentOptionLookup.default_quantity"
              />
              <vs-divider />
              <!-- PICTURE INPUT GROUP -->
              <div class="my-3 pr-5">
                <vue-dropzone
                  class="dropbox"
                  ref="myVueDropzone"
                  id="dropzone"
                  :options="dropzoneOptions"
                ></vue-dropzone>
              </div>
              <!-- END PICTURE INPUT GROUP -->
            </vs-col>
          </vs-row>
          <vs-row v-if="isAdding">
            <!-- START OPTIONS SECTION -->
            <vs-col vs-w="12">
              <h4 class="mt-10 mb-5">ตัวเลือก</h4>
              <p class="my-1" style="color: gray">
                เพื่อตัวเลือกให้ของที่ระลึก เช่น ไซส์, สี,
                เนื้อผ้า, แขนสั้น - ยาว เป็นต้น
              </p>
              <vs-button
                color="lightblue"
                type="filled"
                class="mt-2 mr-2"
                size="small"
                @click="showExample = !showExample"
                >ดูตัวอย่าง
              </vs-button>
              <div v-if="showExample">
                <img src="@/assets/images/examples/add-product1.png" />
                <img src="@/assets/images/examples/add-product2.png" />
              </div>
              <div v-if="options.length !== 0" class="mt-5 mb-5">
                <p>
                  ใส่เครื่องหมาย <strong>,</strong> เพื่อเพิ่มชอยส์
                </p>
              </div>
            </vs-col>
            <!-- OPTIONS INPUT GROUP -->
            <vs-row v-for="(input, index) in options" :key="'ticket' + index">
              <vs-col vs-type="flex" vs-w="5" class="mb-4 mr-4">
                <vs-input
                  class="w-full"
                  v-validate="'required'"
                  label-placeholder="ตัวเลือก"
                  v-model="input.option_name"
                  :name="index + 'option_name'"
                />
              </vs-col>
              <vs-col vs-type="flex" vs-w="5" class="mb-4">
                <vs-input
                  class="w-full"
                  v-validate="'required'"
                  label-placeholder="ชอยส์"
                  v-model="input.option_value"
                  :name="index + 'option_value'"
                />
              </vs-col>
            </vs-row>
            <vs-row>
              <vs-button
                color="success"
                type="relief"
                class="mt-2 mr-2"
                size="small"
                @click="addRow"
                >เพิ่มตัวเลือก
              </vs-button>
              <vs-button
                v-if="options.length >= 1"
                color="danger"
                type="relief"
                size="small"
                class="mt-2 mr-2"
                @click="deleteRow(options.length - 1)"
                >ลดตัวเลือก
              </vs-button>
            </vs-row>
            <!-- END OPTIONS INPUT GROUP -->
            <vs-divider />
            <!-- END OPTIONS SECTION -->
          </vs-row>
          <vs-button
            v-if="!isAdding"
            class="mx-1"
            size="small"
            color="success"
            type="filled"
            @click="submitProduct"
            >บันทึกข้อมูล</vs-button
          >
          <vs-button
            v-else
            class="mx-1"
            size="small"
            color="success"
            type="filled"
            @click="submitProduct"
            >เพิ่มของที่ระลึก</vs-button
          >
          <vs-button
            v-if="!isAdding"
            class="mx-1"
            size="small"
            color="danger"
            type="filled"
            @click="deleteProduct"
            >ลบของที่ระลึก</vs-button
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

import vue2Dropzone from 'vue2-dropzone'
import 'vue2-dropzone/dist/vue2Dropzone.min.css'

export default {
  components: {
    'vue-dropzone': vue2Dropzone
  },
  data () {
    return {
      searchQuery: '',
      rowData: [],
      rowDataCard: {},
      popupOptionLookup: false,
      currentOptionLookup: {},
      isAdding: false,
      // Dropzone
      dropzoneOptions: {
        url: 'https://httpbin.org/post',
        paramName: 'file',
        autoProcessQueue: 'false',
        autoQueue: 'false',
        maxFilesize: 999,
        maxFiles: 1,
        acceptedFiles: 'image/*',
        dictDefaultMessage: 'ลากไฟล์ หรือกดคลิกเพื่ออัพโหลดรูปภาพ',
        addRemoveLinks: true
      },
      // Options
      options: [],
      showExample: false
    }
  },
  computed: {
    imgSrc () {
      return `${process.env.VUE_APP_BASE_URL}/file${this.currentOptionLookup.product_pic_path}`
    },
    productOptions () {
      return Object.entries(this.currentOptionLookup.options)
    }
  },
  async mounted () {
    await this.getData()
  },
  methods: {
    addRow () {
      this.options.push({
        option_name: '',
        option_value: ''
      })
    },
    deleteRow (index) {
      this.options.splice(index, 1)
    },
    actionOptionLookup (row, adding = false) {
      this.isAdding = adding
      this.currentOptionLookup = row
      this.$refs.myVueDropzone.removeAllFiles(true)
      this.popupOptionLookup = true
    },
    cancel () {
      this.currentOptionLookup = {}
      this.$refs.myVueDropzone.removeAllFiles(true)
      this.popupOptionLookup = false
      this.options = []
    },
    async deleteProduct () {
      await axios
        .delete(`/product/${this.currentOptionLookup.id}`)
        .then(() => (this.success = true))
        .catch(() => (this.success = false))

      if (this.success) this.$vs.notify({
        title: 'ทำรายการสำเร็จ',
        text: 'ลบของที่ระลึกสำเร็จ',
        position: 'top-right',
        iconPack: 'feather',
        icon: 'icon-alert-circle',
        color: 'success'
      })
      else this.$vs.notify({
        title: 'เกิดข้อผิดพลาด',
        text: 'ลบของที่ระลึกไม่สำเร็จ',
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
    async getData () {
      await axios
        .get(`/event/${this.$route.params.id}`)
        .then((response) => (this.rowData = response.data.data.products))
    },
    async submitProduct () {
      const formData = new FormData()
      formData.append('name', this.currentOptionLookup.name)
      formData.append(
        'description',
        this.currentOptionLookup.description ? this.currentOptionLookup.description : ''
      )
      // formData.append('price', this.currentOptionLookup.price)
      formData.append(
        'quantity',
        this.isAdding ? this.currentOptionLookup.default_quantity : this.currentOptionLookup.quantity
      )
      formData.append(
        'default_quantity',
        this.currentOptionLookup.default_quantity
      )
      formData.append(
        'product_pic_path',
        this.currentOptionLookup.product_pic_path
      )

      if (this.options.length > 0) {
        const optionsObject = {}
        for (const option of this.options) {
          console.log(option)
          optionsObject[option.option_name] = option.option_value
            .split(',')
            .map(function (item) {
              return item.trim()
            })
        }
        formData.append('options', JSON.stringify(optionsObject))
      }

      if (this.isAdding) formData.append('event_id', this.$route.params.id)
      else formData.append('event_id', this.currentOptionLookup.event_id)

      /*====================================================================
      Append file data as blob in the form, if any
      ====================================================================*/
      const imageFile = this.$refs.myVueDropzone.getAcceptedFiles()[0]
      if (imageFile) formData.append('file', imageFile)

      /*====================================================================
      If isAdding is true send POST, otherwise send PUT
      ====================================================================*/
      if (this.isAdding) {
        await axios
          .post('/product', formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          })
          .then(async () => {
            this.success = true
          })
          .catch(() => (this.success = false))
      } else {
        await axios
          .put(`/product/${this.currentOptionLookup.id}`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          })
          .then(async () => {
            this.success = true
          })
          .catch(() => (this.success = false))
      }

      /*====================================================================
      Show notification accordingly
      ====================================================================*/
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
        text: 'ทำรายการไม่สำเร็จ',
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

.dz-error-message {
  top: 65px !important;
}
</style>
