<template>
  <div>
    <vs-row vs-align="center">
      <vs-col vs-w="12">
        <div class="vx-card p-6">
          <div class="flex flex-wrap items-center">
            <!-- ITEMS PER PAGE -->
            <div class="flex-grow">
              <!-- START SECTION -->
              <h4 class="my-10">ข้อมูลงานวิ่ง</h4>
              <!-- INPUT GROUP -->
              <div class="mt-10">
                <vs-input
                  class="w-full"
                  v-validate="'required'"
                  label-placeholder="ชื่องาน"
                  v-model="name"
                  name="name"
                />
                <span class="text-danger text-sm" v-show="errors.has('name')">{{
                  errors.first('name')
                }}</span>
              </div>
              <!-- END INPUT GROUP -->
              <!-- INPUT GROUP -->
              <div class="mt-10">
                <vs-textarea
                  class="w-full"
                  v-validate="'required'"
                  label="คำอธิบาย"
                  v-model="description"
                  name="description"
                />
                <span
                  class="text-danger text-sm"
                  v-show="errors.has('description')"
                  >{{ errors.first('description') }}</span
                >
              </div>
              <!-- END INPUT GROUP -->
              <!-- INPUT GROUP -->
              <div class="mt-10">
                <vs-input
                  class="w-full"
                  v-validate="'required'"
                  label-placeholder="เว็บไซต์งานวิ่ง"
                  v-model="website"
                  name="website"
                />
                <span
                  class="text-danger text-sm"
                  v-show="errors.has('website')"
                  >{{ errors.first('website') }}</span
                >
              </div>
              <!-- END INPUT GROUP -->
              <!-- INPUT GROUP -->
              <div class="mt-10 mb-5">
                <vs-input
                  class="w-full"
                  v-validate="'required'"
                  label-placeholder="สถานที่จัด"
                  v-model="location"
                  name="location"
                />
                <span
                  class="text-danger text-sm"
                  v-show="errors.has('location')"
                  >{{ errors.first('location') }}</span
                >
              </div>
              <!-- END INPUT GROUP -->
              <vs-divider />
              <h4>ช่วงเวลา</h4>
              <!-- DATE INPUT GROUP -->
              <div class="mt-10 mb-5">
                <p class="my-2"><label>เปิดรับสมัคร</label></p>
                <flat-pickr
                  :config="configDateTimePicker"
                  v-model="register_start_date"
                  placeholder="เปิดรับสมัคร"
                  class="mr-4"
                />
                <p class="my-2"><label>ปิดรับสมัคร</label></p>
                <flat-pickr
                  :config="configDateTimePicker"
                  v-model="register_end_date"
                  placeholder="ปิดรับสมัคร"
                />
              </div>
              <!-- END INPUT GROUP -->
              <!-- DATE INPUT GROUP -->
              <div class="mt-10 mb-5">
                <p class="my-2"><label>เริ่มกิจกรรม</label></p>
                <flat-pickr
                  :config="configDateTimePicker"
                  v-model="event_start_date"
                  placeholder="เริ่มกิจกรรม"
                  class="mr-4"
                />
                <p class="my-2"><label>สิ้นสุดกิจกรรม</label></p>
                <flat-pickr
                  :config="configDateTimePicker"
                  v-model="event_end_date"
                  placeholder="สิ้นสุดกิจกรรม"
                />
              </div>
              <!-- END INPUT GROUP -->
              <vs-divider />
              <!-- PICTURE INPUT GROUP -->
              <div class="mt-2">
                <h4>อัพโหลดรูปภาพ</h4>
                <vs-input
                  class="inputx mt-5"
                  placeholder="คัดลอกรูป และวางที่นี่"
                  :value="selectedFile.name"
                  @paste="onPaste"
                />
                <vs-checkbox
                  class="my-5"
                  disabled="true"
                  :color="chk_box.color"
                  v-model="chk_box.data"
                  >{{ chk_box.text }}
                </vs-checkbox>
                <canvas
                  style="border: 1px solid grey"
                  id="mycanvas"
                  width="200"
                  height="200"
                ></canvas>
              </div>
              <!-- END PICTURE INPUT GROUP -->
              <vs-divider />
              <!-- END SECTION -->

              <!-- START TICKET SECTION -->
              <h4 class="mt-10 mb-5">ประเภทการแข่งขัน</h4>
              <!-- TICKET INPUT GROUP -->
              <vs-row v-for="(input, index) in tickets" :key="'ticket' + index">
                <vs-col
                  vs-type="flex"
                  vs-w="3"
                  vs-sm="12"
                  vs-md="4"
                  class="mb-4 mr-4"
                >
                  <vs-input
                    class="w-full"
                    v-validate="'required'"
                    label-placeholder="ประเภทการแข่งขัน"
                    v-model="input.ticket_name"
                    :name="index + 'ticket_name'"
                  />
                </vs-col>
                <vs-col
                  vs-type="flex"
                  vs-w="3"
                  vs-sm="12"
                  vs-md="4"
                  class="mb-4 mr-4"
                >
                  <vs-input
                    class="w-full"
                    v-validate="'required'"
                    label-placeholder="คำอธิบาย"
                    v-model="input.description"
                    :name="index + 'description'"
                  />
                </vs-col>
                <vs-col
                  vs-type="flex"
                  vs-w="2"
                  vs-sm="12"
                  vs-md="2"
                  class="mb-4 mr-4"
                >
                  <vs-input
                    class="w-full"
                    v-validate="'required'"
                    label-placeholder="ราคา"
                    v-model="input.ticket_price"
                    :name="index + 'ticket_price'"
                  />
                </vs-col>
                <vs-col
                  vs-type="flex"
                  vs-w="1"
                  vs-sm="12"
                  vs-md="1"
                  class="mb-4 mr-4"
                >
                  <vs-input
                    class="w-full"
                    v-validate="'required'"
                    label-placeholder="ระยะทางวิ่ง"
                    v-model="input.ticket_length_in_km"
                    :name="index + 'ticket_length_in_km'"
                  />
                </vs-col>
                <vs-col
                  vs-type="flex"
                  vs-w="1"
                  vs-sm="12"
                  vs-md="1"
                  class="mb-4 mr-4"
                >
                  <vs-input
                    class="w-full"
                    v-validate="'required'"
                    label-placeholder="จำนวน"
                    v-model="input.ticket_capacity"
                    :name="index + 'ticket_capacity'"
                  />
                </vs-col>
                <vs-col
                  vs-type="flex"
                  vs-w="1"
                  vs-sm="6"
                  class="mb-4 mr-4 py-1"
                >
                  <vs-checkbox
                    class="my-5"
                    color="blue"
                    v-model="input.ticket_is_online"
                    :name="index + 'ticket_is_online'"
                    >ออนไลน์
                  </vs-checkbox>
                </vs-col>
              </vs-row>
              <vs-row>
                <vs-button
                  color="success"
                  type="relief"
                  class="mt-2 mr-2"
                  @click="addRow"
                  >เพิ่มประเภท
                </vs-button>
                <vs-button
                  v-if="tickets.length > 1"
                  color="danger"
                  type="relief"
                  class="mt-2 mr-2"
                  @click="deleteRow(tickets.length - 1)"
                  >ลดประเภท
                </vs-button>
              </vs-row>
              <!-- END TICKET INPUT GROUP -->
              <vs-divider />
              <!-- END TICKET SECTION -->

              <!-- START PRODUCT SECTION -->
              <h4 class="mt-10 mb-5">สินค้า/ของที่ระลึก</h4>
              <!-- PRODUCT INPUT GROUP -->
              <vs-row
                v-for="(input, index) in products"
                :key="'product' + index"
              >
                <vs-col
                  vs-type="flex"
                  vs-w="3"
                  vs-sm="12"
                  vs-md="4"
                  class="mb-4 mr-4"
                >
                  <vs-input
                    class="w-full"
                    v-validate="'required'"
                    label-placeholder="ชื่อสินค้า"
                    v-model="input.name"
                    :name="index + 'name'"
                  />
                </vs-col>
                <vs-col
                  vs-type="flex"
                  vs-w="3"
                  vs-sm="12"
                  vs-md="4"
                  class="mb-4 mr-4"
                >
                  <vs-input
                    class="w-full"
                    v-validate="'required'"
                    label-placeholder="คำอธิบาย"
                    v-model="input.description"
                    :name="index + 'description'"
                  />
                </vs-col>
                <vs-col
                  vs-type="flex"
                  vs-w="2"
                  vs-sm="12"
                  vs-md="2"
                  class="mb-4 mr-4"
                >
                  <vs-input
                    class="w-full"
                    v-validate="'required'"
                    label-placeholder="ราคา"
                    v-model="input.price"
                    :name="index + 'price'"
                  />
                </vs-col>
                <vs-col
                  vs-type="flex"
                  vs-w="1"
                  vs-sm="12"
                  vs-md="1"
                  class="mb-4 mr-4"
                >
                  <vs-input
                    class="w-full"
                    v-validate="'required'"
                    label-placeholder="จำนวน"
                    v-model="input.quantity"
                    :name="index + 'quantity'"
                  />
                </vs-col>
              </vs-row>
              <vs-row>
                <vs-button
                  color="success"
                  type="relief"
                  class="mt-2 mr-2"
                  @click="addProductRow"
                  >เพิ่มสินค้า
                </vs-button>
                <vs-button
                  v-if="products.length > 1"
                  color="danger"
                  type="relief"
                  class="mt-2 mr-2"
                  @click="deleteProductRow(products.length - 1)"
                  >ลดสินค้า
                </vs-button>
              </vs-row>
              <!-- END PRODUCT INPUT GROUP -->
              <vs-divider />
              <!-- END PRODUCT SECTION -->

              <!-- START SECTION -->
              <h4 class="mt-10 mb-8">ข้อมูลผู้จัด</h4>
              <!-- INPUT GROUP -->
              <div class="mt-5">
                <vs-checkbox
                  class="my-5"
                  color="success"
                  v-model="is_adding_organizer"
                  name="add_new_organizer"
                  >เพิ่มผู้จัดใหม่
                </vs-checkbox>
                <label v-if="!is_adding_organizer">กรุณาเลือกผู้จัด</label>
                <v-select
                  v-if="!is_adding_organizer"
                  v-model="selected_organizer"
                  label="label"
                  :options="organizer_options"
                  :dir="$vs.rtl ? 'rtl' : 'ltr'"
                  v-validate="'required'"
                  name="organizer_id"
                  class="mt-5"
                />
                <span
                  class="text-danger text-sm"
                  v-show="errors.has('organizer_id')"
                  >{{ errors.first('organizer_id') }}</span
                >
              </div>
              <!-- END INPUT GROUP -->
              <!-- INPUT GROUP -->
              <div class="mt-10">
                <vs-input
                  v-if="is_adding_organizer"
                  class="w-full"
                  v-validate="'required'"
                  label-placeholder="ชื่อผู้จัด"
                  v-model="selected_organizer.organizer_name"
                  name="organizer_name"
                />
                <span
                  class="text-danger text-sm"
                  v-show="errors.has('organizer_name')"
                  >{{ errors.first('organizer_name') }}</span
                >
              </div>
              <!-- END INPUT GROUP -->
              <!-- INPUT GROUP -->
              <div class="mt-10">
                <vs-input
                  v-if="selected_organizer.id || is_adding_organizer"
                  :readonly="!is_adding_organizer"
                  class="w-full"
                  v-validate="'required'"
                  label-placeholder="เว็บไซต์ผู้จัด"
                  v-model="selected_organizer.organizer_website"
                  name="organizer_website"
                />
                <span
                  class="text-danger text-sm"
                  v-show="errors.has('organizer_website')"
                  >{{ errors.first('organizer_website') }}</span
                >
              </div>
              <!-- END INPUT GROUP -->
              <!-- INPUT GROUP -->
              <div class="mt-10">
                <vs-input
                  v-if="selected_organizer.id || is_adding_organizer"
                  :readonly="!is_adding_organizer"
                  class="w-full"
                  v-validate="'required'"
                  label-placeholder="โซเชียลมีเดีย"
                  v-model="selected_organizer.organizer_social"
                  name="organizer_social"
                />
                <span
                  class="text-danger text-sm"
                  v-show="errors.has('organizer_social')"
                  >{{ errors.first('organizer_social') }}</span
                >
              </div>
              <!-- END INPUT GROUP -->
              <!-- INPUT GROUP -->
              <div class="mt-10">
                <vs-input
                  v-if="selected_organizer.id || is_adding_organizer"
                  :readonly="!is_adding_organizer"
                  class="w-full"
                  v-validate="'required'"
                  label-placeholder="โทรศัพท์"
                  v-model="selected_organizer.organizer_phone"
                  name="organizer_phone"
                />
                <span
                  class="text-danger text-sm"
                  v-show="errors.has('organizer_phone')"
                  >{{ errors.first('organizer_phone') }}</span
                >
              </div>
              <!-- END INPUT GROUP -->
              <!-- INPUT GROUP -->
              <div class="mt-10">
                <vs-input
                  v-if="selected_organizer.id || is_adding_organizer"
                  :readonly="!is_adding_organizer"
                  class="w-full"
                  v-validate="'required'"
                  label-placeholder="อีเมล"
                  v-model="selected_organizer.organizer_email"
                  name="organizer_email"
                />
                <span
                  class="text-danger text-sm"
                  v-show="errors.has('organizer_email')"
                  >{{ errors.first('organizer_email') }}</span
                >
              </div>
              <!-- END INPUT GROUP -->
              <!-- INPUT GROUP -->
              <div class="mt-6 flex flex-wrap items-center justify-end">
                <vs-button
                  color="success"
                  type="relief"
                  class="mt-8"
                  @click="addNewEvent"
                  >เพิ่มงานวิ่ง
                </vs-button>
              </div>
              <!-- END INPUT GROUP -->
              <!-- END SECTION -->
            </div>
          </div>
        </div>
      </vs-col>
      <!--TODO: Mayne add another col here called Preview or History-->
    </vs-row>
  </div>
</template>

<script>
import axios from '../../axios'
import vSelect from 'vue-select'
import flatPickr from 'vue-flatpickr-component'
import 'flatpickr/dist/flatpickr.css'
import { Thai as ThaiLocale } from 'flatpickr/dist/l10n/th.js'
import dayjs from 'dayjs'

export default {
  components: {
    'v-select': vSelect,
    flatPickr
  },
  data () {
    return {
      // Config
      configDateTimePicker: {
        enableTime: true,
        // dateFormat: 'd/m/Y H:i',
        locale: ThaiLocale,
        time_24hr: true
      },
      // Event data
      name: '',
      description: '',
      website: '',
      location: '',
      event_start_date: '',
      event_end_date: '',
      register_start_date: '',
      register_end_date: '',
      tickets: [
        {
          ticket_name: '',
          ticket_description: '',
          ticket_price: '',
          ticket_capacity: '',
          ticket_length_in_km: '',
          ticket_is_online: true
        }
      ],
      products: [
        {
          name: '',
          description: '',
          price: '',
          quantity: '',
          product_pic: ''
        }
      ],
      selectedFile: [],
      chk_box: { text: 'กรุณาวางรูป', color: 'danger', data: false },
      organizers: [],
      selected_organizer: {
        id: '',
        label: '',
        organizer_name: '',
        organizer_website: '',
        organizer_social: '',
        organizer_phone: '',
        organizer_email: ''
      },
      is_adding_organizer: false
    }
  },
  computed: {
    organizer_options () {
      return this.organizers.map(organizer => {
        return {
          id: organizer.organizer_id,
          label: organizer.organizer_name,
          organizer_name: organizer.organizer_name,
          organizer_website: organizer.organizer_website,
          organizer_social: organizer.organizer_social,
          organizer_phone: organizer.organizer_phone,
          organizer_email: organizer.organizer_email
        }
      })
    }
  },
  watch: {
    selectedFile () {
      if (this.selectedFile.name.length > 0) {
        this.chk_box.text = 'วางรูปสำเร็จ'
        this.chk_box.color = 'success'
        this.chk_box.data = true
      } else {
        this.chk_box.text = 'วางรูปไม่สำเร็จ'
        this.chk_box.color = 'danger'
        this.chk_box.data = false
      }
    }
  },
  async created () {
    await axios.get('/organizer').then(response => {
      this.organizers = response.data.data
    })
  },
  methods: {
    async addNewEvent () {
      console.log('Add event')
      const formData = new FormData()
      formData.append('name', this.name)
      formData.append('description', this.description)
      formData.append('website', this.website)
      formData.append('location', this.location)
      formData.append('event_start_date', this.event_start_date)
      formData.append('event_end_date', this.event_end_date)
      formData.append('register_start_date', this.register_start_date)
      formData.append('register_end_date', this.register_end_date)
      formData.append('tickets', JSON.stringify(this.tickets))
      // TODO: Uncomment this
      // formData.append('products', JSON.stringify(this.products))
      /*
            On adding new organizer, append form data with info,
            otherwise, just append organizer_id.
            This process is automatic,
            The api service will determine whether to create new organizer or not.
            */
      if (this.is_adding_organizer) {
        formData.append('is_adding_organizer', this.is_adding_organizer)
        formData.append(
          'organizer_name',
          this.selected_organizer.organizer_name
        )
        formData.append(
          'organizer_website',
          this.selected_organizer.organizer_website
        )
        formData.append(
          'organizer_phone',
          this.selected_organizer.organizer_phone
        )
        formData.append(
          'organizer_email',
          this.selected_organizer.organizer_email
        )
        formData.append(
          'organizer_social',
          this.selected_organizer.organizer_social
        )
      } else {
        formData.append('organizer_id', this.selected_organizer.id)
      }
      /*
            Append file data as blob in the form, if any
            */
      if (this.selectedFile) formData.append('file', this.selectedFile)

      await axios
        .post('/event', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        .then(response => {
          this.$vs.notify({
            time: 10000,
            color: 'success',
            position: 'top-right',
            icon: 'success',
            title: 'บันทึกข้อมูลสำเร็จ',
            text: `เพิ่มงานวิ่งสำเร็จ รหัส ${response.data.data.id}: '${response.data.data.name}'`
          })
          this.$router.push(`/event/${response.data.data.id}`)
        })
        .catch(() => {
          this.$vs.notify({
            time: 10000,
            color: 'danger',
            position: 'top-right',
            icon: 'error',
            title: 'บันทึกข้อมูลไม่สำเร็จ',
            text: 'ไม่สามารถเพิ่มงานวิ่งได้'
          })
        })
    },
    addProductRow () {
      this.products.push({
        name: '',
        description: '',
        price: '',
        quantity: '',
        product_pic: ''
      })
    },
    addRow () {
      this.tickets.push({
        ticket_name: '',
        ticket_description: '',
        ticket_price: '',
        ticket_capacity: '',
        ticket_available: '',
        ticket_length_in_km: '',
        ticket_is_online: true
      })
    },
    deleteProductRow (index) {
      this.products.splice(index, 1)
    },
    deleteRow (index) {
      this.tickets.splice(index, 1)
    },
    onFileChange (e) {
      const selectedFile = e.target.files[0]
      this.selectedFile = selectedFile
    },
    onPaste (evt) {
      // Handle the event
      this.retrieveImageFromClipboardAsBlob(evt, function (imageBlob) {
        // If there's an image, display it in the canvas
        if (imageBlob) {
          const canvas = document.getElementById('mycanvas')
          const ctx = canvas.getContext('2d')

          // Create an image to render the blob on the canvas
          const img = new Image()

          // Once the image loads, render the img on the canvas
          img.onload = function () {
            // Update dimensions of the canvas with the dimensions of the image
            canvas.width = 300
            canvas.height = 300

            // Draw the image
            ctx.drawImage(img, 0, 0)
          }

          // Crossbrowser support for URL
          const URLObj = window.URL || window.webkitURL

          // Creates a DOMString containing a URL representing the object given in the parameter
          // namely the original Blob
          img.src = URLObj.createObjectURL(imageBlob)
        }
      })
    },
    async onUploadFile () {
      const formData = new FormData()
      formData.append('file', this.selectedFile)
      // sending file to the backend
      await axios
        .post('upload/upload', formData)
        .then()
        .catch()
    },
    retrieveImageFromClipboardAsBlob (pasteEvent, callback) {
      if (pasteEvent.clipboardData === false) {
        if (typeof callback === 'function') {
          callback(undefined)
        }
      }

      const items = pasteEvent.clipboardData.items

      if (items === undefined) {
        if (typeof callback === 'function') {
          callback(undefined)
        }
      }

      for (let i = 0; i < items.length; i++) {
        // Skip content if not image
        if (items[i].type.indexOf('image') === -1) continue
        // Retrieve image on clipboard as blob
        const blob = items[i].getAsFile()

        if (typeof callback === 'function') {
          callback(blob)
          this.selectedFile = blob
        }
      }
    }
  }
}
</script>
