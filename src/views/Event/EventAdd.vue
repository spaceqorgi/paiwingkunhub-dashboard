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
                  label-placeholder="ชื่องาน*"
                  v-model="name"
                  name="name"
                />
                <span class="text-danger text-sm" v-show="errors.has('name')">{{ errors.first('name') }}</span>
              </div>
              <!-- END INPUT GROUP -->
              <!-- INPUT GROUP -->
              <div class="mt-10">
                <vs-textarea
                  class="w-full"
                  v-validate="'required'"
                  label="คำอธิบาย*"
                  v-model="description"
                  name="description"
                  height="20rem"
                />
                <span class="text-danger text-sm" v-show="errors.has('description')">{{
                    errors.first('description')
                  }}</span>
              </div>
              <!-- END INPUT GROUP -->
              <!-- INPUT GROUP -->
              <div class="mt-10">
                <vs-input
                  class="w-full"
                  label-placeholder="เว็บไซต์งานวิ่ง"
                  v-model="website"
                  name="website"
                />
                <span class="text-danger text-sm" v-show="errors.has('website')">{{ errors.first('website') }}</span>
              </div>
              <!-- END INPUT GROUP -->

              <!-- INPUT GROUP -->
              <div class="mt-10 mb-5">
                <vs-input
                  class="w-full"
                  type="number"
                  v-validate="'required'"
                  label-placeholder="รุ่นอายุน้อย สำหรับระบบ Register*"
                  v-model="bib_minimum_age"
                  name="bib_minimum_age"
                />
                <span class="text-danger text-sm" v-show="errors.has('bib_minimum_age')">{{ errors.first('bib_minimum_age') }}</span>
              </div>
              <!-- END INPUT GROUP -->
              <!-- INPUT GROUP -->
              <div class="mt-10 mb-5">
                <h3>ช่องทางการรับของ*</h3>
                <ul class="my-5">
                  <li class="my-1">
                    <vs-radio v-model="pickup_type" vs-name="pickup_type" vs-value="0">รับหน้างาน</vs-radio>
                  </li>
                  <li class="my-1">
                    <vs-radio v-model="pickup_type" vs-name="pickup_type" vs-value="1">ส่งไปรษณีย์</vs-radio>
                  </li>
                  <li class="my-1">
                    <vs-radio v-model="pickup_type" vs-name="pickup_type" vs-value="2">รับหน้างาน และส่งไปรษณีย์</vs-radio>
                  </li>
                </ul>
              </div>
              <!-- INPUT GROUP -->
              <div v-if="pickup_type > 0" class="mt-5 mb-5">
                <vs-input
                  class="w-full"
                  type="number"
                  label-placeholder="ค่าจัดส่ง"
                  v-model="delivery_cost"
                  name="delivery_cost"
                />
                <span class="text-danger text-sm" v-show="errors.has('delivery_cost')">{{ errors.first('delivery_cost') }}</span>
              </div>
              <!-- END INPUT GROUP -->
              <!-- END INPUT GROUP -->
              <vs-divider />
              <h4>ช่วงเวลารับสมัคร*</h4>
              <!-- DATE INPUT GROUP -->
              <div class="mt-5 mb-5">
                <p class="my-2"><label>เปิดรับสมัคร</label></p>
                <flat-pickr
                  :config="configDateTimePicker"
                  v-model="register_start_date"
                  placeholder="เปิดรับสมัคร"
                  class="mr-4"
                />
                <p class="my-2"><label>ปิดรับสมัคร</label></p>
                <flat-pickr :config="configDateTimePicker" v-model="register_end_date" placeholder="ปิดรับสมัคร" />
              </div>
              <!-- END INPUT GROUP -->
              <vs-divider />
              <h4>ช่วงเวลากิจกรรม*</h4>
              <!-- DATE INPUT GROUP -->
              <div class="mt-5 mb-5">
                <p class="my-2"><label>เริ่มกิจกรรม</label></p>
                <flat-pickr
                  :config="configDateTimePicker"
                  v-model="event_start_date"
                  placeholder="เริ่มกิจกรรม"
                  class="mr-4"
                />
                <p class="my-2"><label>สิ้นสุดกิจกรรม</label></p>
                <flat-pickr :config="configDateTimePicker" v-model="event_end_date" placeholder="สิ้นสุดกิจกรรม" />
              </div>
              <!-- END INPUT GROUP -->

              <!-- Additional info -->
              <vs-divider />
              <h4>สำหรับงานวิ่งแบบออฟไลน์ (วิ่งในสถานที่จริง)</h4>
              <!-- INPUT GROUP -->
              <div class="mt-10 mb-5">
                <vs-input
                  class="w-full"
                  label-placeholder="สถานที่จัด"
                  v-model="location"
                  name="location"
                />
                <span class="text-danger text-sm" v-show="errors.has('location')">{{ errors.first('location') }}</span>
              </div>
              <!-- END INPUT GROUP -->
              <h5 class="my-10">กรณีเลือกรับของหน้างาน</h5>
              <!-- INPUT GROUP -->
              <div class="mt-10">
                <vs-input
                  class="w-full"
                  label-placeholder="วันรับอุปกรณ์ (รับของหน้างาน)"
                  v-model="pickup_date"
                  name="pickup_date"
                />
                <span class="text-danger text-sm" v-show="errors.has('pickup_date')">{{ errors.first('pickup_date')
                  }}</span>
              </div>
              <!-- END INPUT GROUP -->
              <!-- INPUT GROUP -->
              <div class="mt-10">
                <vs-input
                  class="w-full"
                  label-placeholder="สถานที่รับอุปกรณ์ (รับของหน้างาน)"
                  v-model="pickup_location"
                  name="pickup_location"
                />
                <span class="text-danger text-sm"
                      v-show="errors.has('pickup_location')">{{ errors.first('pickup_location') }}</span>
              </div>
              <!-- END INPUT GROUP -->
              <h5 class="my-10">กรณีเลือกรับของทางไปรษณีย์</h5>
              <!-- INPUT GROUP -->
              <div class="mt-10 mb-10">
                <vs-input
                  class="w-full"
                  label-placeholder="ช่วงเวลาจัดส่งอุปกรณ์ (ส่งของทางไปรษณีย์)"
                  v-model="local_delivery_period"
                  name="local_delivery_period"
                />
                <span class="text-danger text-sm"
                      v-show="errors.has('local_delivery_period')">{{ errors.first('local_delivery_period') }}</span>
              </div>
              <!-- END INPUT GROUP -->

              <vs-divider />
              <h4>สำหรับงานวิ่งแบบ Virtual Run</h4>
              <!-- DATE INPUT GROUP -->
              <div class="mt-5 mb-5">
                <p class="my-2"><label>เริ่มการจัดส่งของที่ระลึก</label></p>
                <flat-pickr
                  :config="configDateTimePicker"
                  v-model="virtual_delivery_start_date"
                  placeholder="เริ่มการจัดส่งของที่ระลึก"
                  class="mr-4"
                />
                <p class="my-2"><label>สิ้นสุดการจัดส่งของที่ระลึก</label></p>
                <flat-pickr :config="configDateTimePicker" v-model="virtual_delivery_end_date"
                            placeholder="สิ้นสุดการจัดส่งของที่ระลึก" />
              </div>
              <!-- END INPUT GROUP -->
              <!-- END Additional info -->

              <vs-divider />
              <!-- PICTURE INPUT GROUP -->
              <div class="mt-2">
                <h4 class="mb-5">อัพโหลดรูปภาพ</h4>
                <vue-dropzone
                  class="dropbox"
                  ref="myVueDropzone"
                  id="dropzone"
                  :options="dropzoneOptions"
                ></vue-dropzone>
              </div>
              <!-- END PICTURE INPUT GROUP -->
              <vs-divider />
              <!-- END SECTION -->

              <!-- START TICKET SECTION -->
              <h4 class="mt-10 mb-5">ประเภทการแข่งขัน*</h4>
              <!-- TICKET INPUT GROUP -->
              <vs-row v-for="(input, index) in tickets" :key="'ticket' + index">
                <vs-col vs-type="flex" vs-w="3" vs-sm="12" vs-md="4" class="mb-4 mr-4">
                  <vs-input
                    class="w-full"
                    v-validate="'required'"
                    label-placeholder="ประเภทการแข่งขัน"
                    v-model="input.ticket_name"
                    :name="index + 'ticket_name'"
                  />
                </vs-col>
                <vs-col vs-type="flex" vs-w="3" vs-sm="12" vs-md="4" class="mb-4 mr-4">
                  <vs-input
                    class="w-full"
                    v-validate="'required'"
                    label-placeholder="คำอธิบาย"
                    v-model="input.ticket_description"
                    :name="index + 'description'"
                  />
                </vs-col>
                <vs-col vs-type="flex" vs-w="2" vs-sm="12" vs-md="2" class="mb-4 mr-4">
                  <vs-input
                    class="w-full"
                    v-validate="'required'"
                    label-placeholder="ราคา"
                    v-model="input.ticket_price"
                    :name="index + 'ticket_price'"
                    type="number"
                  />
                </vs-col>
                <vs-col vs-type="flex" vs-w="1" vs-sm="12" vs-md="1" class="mb-4 mr-4">
                  <vs-input
                    class="w-full"
                    v-validate="'required'"
                    label-placeholder="ระยะทางวิ่ง"
                    v-model="input.ticket_length_in_km"
                    :name="index + 'ticket_length_in_km'"
                    type="number"
                  />
                </vs-col>
                <vs-col vs-type="flex" vs-w="1" vs-sm="12" vs-md="1" class="mb-4 mr-4">
                  <vs-input
                    class="w-full"
                    v-validate="'required'"
                    label-placeholder="จำนวน"
                    v-model="input.ticket_capacity"
                    :name="index + 'ticket_capacity'"
                    type="number"
                  />
                </vs-col>
                <vs-col vs-type="flex" vs-w="1" vs-sm="6" class="mb-4 mr-4 py-1">
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
                <vs-button color="success" type="relief" class="mt-2 mr-2" @click="addRow">เพิ่มประเภท</vs-button>
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

              <!-- START SECTION -->
              <h4 class="mt-10 mb-8">ข้อมูลผู้จัด*</h4>
              <!-- INPUT GROUP -->
              <div class="mt-5">
                <vs-checkbox class="my-5" color="success" v-model="is_adding_organizer" name="add_new_organizer"
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
                <span class="text-danger text-sm" v-show="errors.has('organizer_id')">{{
                    errors.first('organizer_id')
                  }}</span>
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
                <span class="text-danger text-sm" v-show="errors.has('organizer_name')">{{
                    errors.first('organizer_name')
                  }}</span>
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
                <span class="text-danger text-sm" v-show="errors.has('organizer_website')">{{
                    errors.first('organizer_website')
                  }}</span>
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
                <span class="text-danger text-sm" v-show="errors.has('organizer_social')">{{
                    errors.first('organizer_social')
                  }}</span>
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
                <span class="text-danger text-sm" v-show="errors.has('organizer_email')">{{
                    errors.first('organizer_email')
                  }}</span>
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
                <span class="text-danger text-sm" v-show="errors.has('organizer_phone')">{{
                    errors.first('organizer_phone')
                  }}</span>
              </div>
              <!-- END INPUT GROUP -->
              <!-- INPUT GROUP -->
              <div class="mt-6 flex flex-wrap items-center justify-end">
                <vs-button :disabled="!validateForm" color="success" type="relief" class="mt-8" @click="addNewEvent"
                >เพิ่มงานวิ่ง
                </vs-button>
              </div>
              <!-- END INPUT GROUP -->
              <!-- END SECTION -->
            </div>
          </div>
        </div>
      </vs-col>
    </vs-row>
  </div>
</template>

<script>
import axios from '../../axios'
import vSelect from 'vue-select'
import flatPickr from 'vue-flatpickr-component'
import 'flatpickr/dist/flatpickr.css'
import { Thai as ThaiLocale } from 'flatpickr/dist/l10n/th.js'

import vue2Dropzone from 'vue2-dropzone'
import 'vue2-dropzone/dist/vue2Dropzone.min.css'

export default {
  components: {
    'v-select': vSelect,
    flatPickr,
    'vue-dropzone': vue2Dropzone
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
      bib_minimum_age: 19,
      pickup_type: '',
      pickup_date: '',
      pickup_location: '',
      local_delivery_period: '',
      delivery_cost: '',
      event_start_date: null,
      event_end_date: null,
      register_start_date: null,
      register_end_date: null,
      virtual_delivery_start_date: null,
      virtual_delivery_end_date: null,
      // Ticket
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
      // Organizer
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
    },
    validateForm () {
      return (
        this.name &&
        this.description &&
        this.event_start_date &&
        this.event_end_date &&
        this.register_start_date &&
        this.register_end_date &&
        this.tickets.length >= 1 &&
        this.tickets[0].ticket_name &&
        this.tickets[0].ticket_description &&
        this.tickets[0].ticket_capacity &&
        this.tickets[0].ticket_length_in_km &&
        this.tickets[0].ticket_price &&
        this.selected_organizer.id &&
        this.selected_organizer.label &&
        this.selected_organizer.organizer_name &&
        this.selected_organizer.organizer_website &&
        this.selected_organizer.organizer_social &&
        this.selected_organizer.organizer_phone &&
        this.selected_organizer.organizer_email
      )
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
    await axios.get('/organizer/crud').then(response => {
      this.organizers = response.data.data
    })
  },
  methods: {
    async addNewEvent () {
      const formData = new FormData()
      formData.append('name', this.name)
      formData.append('description', this.description)
      formData.append('website', this.website)
      formData.append('location', this.location)
      formData.append('bib_minimum_age', this.bib_minimum_age)
      formData.append('pickup_type', this.pickup_type)
      formData.append('pickup_date', this.pickup_date)
      formData.append('pickup_location', this.pickup_location)
      formData.append('local_delivery_period', this.local_delivery_period)
      if (this.delivery_cost) formData.append('delivery_cost', this.delivery_cost)
      formData.append('event_start_date', this.event_start_date)
      formData.append('event_end_date', this.event_end_date)
      formData.append('register_start_date', this.register_start_date)
      formData.append('register_end_date', this.register_end_date)
      if (this.virtual_delivery_start_date) formData.append('virtual_delivery_start_date', this.virtual_delivery_start_date)
      if (this.virtual_delivery_end_date) formData.append('virtual_delivery_end_date', this.virtual_delivery_end_date)
      formData.append('tickets', JSON.stringify(this.tickets))

      /*====================================================================
      On adding new organizer, append form data with info,
      otherwise, just append organizer_id. This process is automatic,
      The api service will determine whether to create new organizer or not.
      ====================================================================*/
      if (this.is_adding_organizer) {
        formData.append('is_adding_organizer', this.is_adding_organizer)
        formData.append('organizer_name', this.selected_organizer.organizer_name)
        formData.append('organizer_website', this.selected_organizer.organizer_website)
        formData.append('organizer_phone', this.selected_organizer.organizer_phone)
        formData.append('organizer_email', this.selected_organizer.organizer_email)
        formData.append('organizer_social', this.selected_organizer.organizer_social)
      } else {
        formData.append('organizer_id', this.selected_organizer.id)
      }

      /*======================================================================
      Append file data as blob in the form, if any
      ====================================================================*/
      const imageFile = this.$refs.myVueDropzone.getAcceptedFiles()[0]
      if (imageFile) formData.append('file', imageFile)

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
    deleteRow (index) {
      this.tickets.splice(index, 1)
    }
  }
}
</script>

<style>
.dz-error-message {
  top: 65px!important;
}
</style>
