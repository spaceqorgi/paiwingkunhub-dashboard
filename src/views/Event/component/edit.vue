<template>
  <vx-card no-shadow title="แก้ไขข้อมูล">
    <vs-row>
      <vs-col class="p-3" vs-sm="12" vs-md="12" vs-w="12">
        <h4 class="mb-10">ข้อมูลงานวิ่ง</h4>
        <vs-input
          class="w-full mt-10"
          label-placeholder="ชื่องาน"
          v-model.trim="rowData.name"
          v-validate="'required'"
          name="name"
        />
        <span class="text-danger text-sm" v-show="errors.has('name')">{{ errors.first('name') }}</span>

        <vs-input
          class="w-full mt-10"
          label-placeholder="คำอธิบาย"
          v-model.trim="rowData.description"
          v-validate="'required'"
          name="description"
        />
        <span class="text-danger text-sm" v-show="errors.has('description')">{{ errors.first('description') }}</span>

        <vs-input
          class="w-full mt-10"
          label-placeholder="เว็บไซต์"
          v-model.trim="rowData.website"
          name="website"
        />

        <vs-input
          class="w-full mt-10"
          label-placeholder="รุ่นอายุต่ำกว่า 19 สำหรับระบบ BIB"
          v-model.trim="rowData.bib_minimum_age"
          name="bib_minimum_age"
        />

        <!-- INPUT GROUP -->
        <div class="mt-10 mb-5">
          <h4>ช่องทางการรับของ</h4>
          <ul class="my-5">
            <li class="my-1">
              <vs-radio v-model="rowData.pickup_type" vs-name="pickup_type" vs-value="0">รับหน้างาน</vs-radio>
            </li>
            <li class="my-1">
              <vs-radio v-model="rowData.pickup_type" vs-name="pickup_type" vs-value="1">ส่งไปรษณีย์</vs-radio>
            </li>
            <li class="my-1">
              <vs-radio v-model="rowData.pickup_type" vs-name="pickup_type" vs-value="2">รับหน้างาน และส่งไปรษณีย์
              </vs-radio>
            </li>
          </ul>
        </div>
        <!-- END INPUT GROUP -->
        <!-- INPUT GROUP -->
        <div v-if="rowData.pickup_type > 0" class="mt-10 mb-5">
          <vs-input
            class="w-full"
            type="number"
            label-placeholder="ค่าจัดส่ง"
            v-model.trim="rowData.delivery_cost"
            name="delivery_cost"
          />
          <span class="text-danger text-sm" v-show="errors.has('delivery_cost')">{{ errors.first('delivery_cost')
            }}</span>
        </div>
        <!-- END INPUT GROUP -->
      </vs-col>
    </vs-row>
    <vs-divider />
    <vs-row>
      <vs-col class="mr-4 my-2" vs-sm="12" vs-w="6">
        <div class="mt-2">
          <h4 class="mb-5">อัพโหลดรูปภาพ</h4>
          <p class="mt-3 mb-4">รูปภาพปัจจุบัน</p>
          <img class="my-4" width="500rem" height="auto" :src="imgSrc" :alt="rowData.name" />
          <p class="mt-8 mb-2">อัพโหลดรูปภาพใหม่ ถ้าต้องการ</p>
          <vue-dropzone class="dropbox" ref="myVueDropzone" id="dropzone" :options="dropzoneOptions"></vue-dropzone>
        </div>
      </vs-col>
    </vs-row>
    <vs-divider />
    <vs-row class="p-3" vs-sm="12" vs-md="12" vs-w="6">
      <vs-col class="mr-4 my-2" vs-sm="12" vs-w="6">
        <h4 class="mb-10">ช่วงเวลา</h4>
        <label>เปิดรับสมัคร</label>
        <br />
        <flat-pickr :config="configDateTimePicker" v-model.trim="rowData.register_start_date"
                    placeholder="เปิดรับสมัคร" />
      </vs-col>

      <vs-col class="mr-4 my-2" vs-sm="12" vs-w="6">
        <label>ปิดรับสมัคร</label>
        <br />
        <flat-pickr :config="configDateTimePicker" v-model.trim="rowData.register_end_date" placeholder="ปิดรับสมัคร" />
      </vs-col>

      <vs-col class="mr-4 my-2" vs-sm="12" vs-w="6">
        <label>เริ่มกิจกรรม</label>
        <br />
        <flat-pickr :config="configDateTimePicker" v-model.trim="rowData.event_start_date" placeholder="เริ่มกิจกรรม" />
      </vs-col>

      <vs-col class="mr-4 my-2" vs-sm="12" vs-w="6">
        <label>สิ้นสุดกิจกรรม</label>
        <br />
        <flat-pickr :config="configDateTimePicker" v-model.trim="rowData.event_end_date" placeholder="สิ้นสุดกิจกรรม" />
      </vs-col>
    </vs-row>
    <vs-divider />
    <vs-row class="p-3" vs-sm="12" vs-md="12" vs-w="12">
      <vs-col class="mr-4 my-2" vs-sm="12" vs-w="12">
        <!-- Additional info -->
        <h4>สำหรับงานวิ่งแบบออฟไลน์ (วิ่งในสถานที่จริง)</h4>
        <!-- INPUT GROUP -->
        <div class="mt-10 mb-5">
          <vs-input
            class="w-full"
            label-placeholder="สถานที่จัด"
            v-model.trim="rowData.location"
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
            v-model.trim="rowData.pickup_date"
            name="pickup_date"
          />
          <span class="text-danger text-sm" v-show="errors.has('pickup_date')">{{ errors.first('pickup_date') }}</span>
        </div>
        <!-- END INPUT GROUP -->
        <!-- INPUT GROUP -->
        <div class="mt-10">
          <vs-input
            class="w-full"
            label-placeholder="สถานที่รับอุปกรณ์ (รับของหน้างาน)"
            v-model.trim="rowData.pickup_location"
            name="pickup_location"
          />
          <span class="text-danger text-sm" v-show="errors.has('pickup_location')">{{ errors.first('pickup_location')
            }}</span>
        </div>
        <!-- END INPUT GROUP -->
        <h5 class="my-10">กรณีเลือกรับของทางไปรษณีย์</h5>
        <!-- INPUT GROUP -->
        <div class="mt-10 mb-10">
          <vs-input
            class="w-full"
            label-placeholder="ช่วงเวลาจัดส่งอุปกรณ์ (ส่งของทางไปรษณีย์)"
            v-model.trim="rowData.local_delivery_period"
            name="local_delivery_period"
          />
          <span class="text-danger text-sm"
                v-show="errors.has('local_delivery_period')">{{ errors.first('local_delivery_period') }}</span>
        </div>
        <!-- END INPUT GROUP -->

        <h4>สำหรับงานวิ่งแบบ Virtual Run</h4>
        <!-- DATE INPUT GROUP -->
        <div class="mt-5 mb-5">
          <p class="my-2"><label>เริ่มการจัดส่งของที่ระลึก</label></p>
          <flat-pickr
            :config="configDateTimePicker"
            v-model.trim="rowData.virtual_delivery_start_date"
            placeholder="เริ่มการจัดส่งของที่ระลึก"
            class="mr-4"
          />
          <p class="my-2"><label>สิ้นสุดการจัดส่งของที่ระลึก</label></p>
          <flat-pickr :config="configDateTimePicker" v-model.trim="rowData.virtual_delivery_end_date"
                      placeholder="สิ้นสุดการจัดส่งของที่ระลึก" />
        </div>
        <!-- END INPUT GROUP -->
        <!-- END Additional info -->
      </vs-col>
    </vs-row>
    <vs-divider />
    <vs-row>
      <vs-col>
        <h4 class="mt-10 mb-8">ข้อมูลผู้จัด</h4>
        <!-- INPUT GROUP -->
        <div class="mt-5">
          <!--          <vs-checkbox class="my-5" color="success" v-model.trim="is_adding_organizer" name="add_new_organizer"-->
          <!--            >เพิ่มผู้จัดใหม่-->
          <!--          </vs-checkbox>-->
          <label v-if="!is_adding_organizer">กรุณาเลือกผู้จัด</label>
          <v-select
            v-if="!is_adding_organizer"
            v-model.trim="selected_organizer"
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
            v-model.trim="selected_organizer.organizer_name"
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
            v-model.trim="selected_organizer.organizer_website"
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
            v-model.trim="selected_organizer.organizer_social"
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
            label-placeholder="โทรศัพท์"
            v-model.trim="selected_organizer.organizer_phone"
            name="organizer_phone"
          />
          <span class="text-danger text-sm" v-show="errors.has('organizer_phone')">{{
              errors.first('organizer_phone')
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
            v-model.trim="selected_organizer.organizer_email"
            name="organizer_email"
          />
          <span class="text-danger text-sm" v-show="errors.has('organizer_email')">{{
              errors.first('organizer_email')
            }}</span>
        </div>
        <!-- END INPUT GROUP -->
        <!-- INPUT GROUP -->
        <div class="mt-10">
          <label>แสดงในเว็บไซต์</label>
          <vs-switch class="my-2" name="is_published" v-model.trim="rowData.is_published">
            <span slot="on">แสดง</span>
            <span slot="off">ไม่แสดง</span>
          </vs-switch>
        </div>
        <!-- END INPUT GROUP -->
      </vs-col>
    </vs-row>
    <div class="mt-6 flex flex-wrap items-center justify-end">
      <vs-button color="success" class="ml-4 mt-2" @click="submit">ยืนยัน</vs-button>
    </div>
  </vx-card>
</template>

<script>
import axios from '../../../axios'
import { Validator } from 'vee-validate'
import vSelect from 'vue-select'
import flatPickr from 'vue-flatpickr-component'
import 'flatpickr/dist/flatpickr.css'
import { Thai as ThaiLocale } from 'flatpickr/dist/l10n/th.js'

import vue2Dropzone from 'vue2-dropzone'
import 'vue2-dropzone/dist/vue2Dropzone.min.css'

const dict = {
  custom: {
    name: {
      required: 'กรุณากรอกข้อมูล'
    },
    phone: {
      required: 'กรุณากรอกข้อมูล',
      numeric: 'ต้องเป็นตัวเลขเท่านั้น'
    }
  }
}
Validator.localize('en', dict)
export default {
  components: {
    flatPickr,
    'v-select': vSelect,
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
      // Dropzone
      dropzoneOptions: {
        url: 'https://httpbin.org/post',
        paramName: 'file',
        autoProcessQueue: 'false',
        autoQueue: 'false',
        maxFilesize: 10,
        maxFiles: 1,
        acceptedFiles: 'image/*',
        dictDefaultMessage: 'ลากไฟล์ หรือกดคลิกเพื่ออัพโหลดรูปภาพ'
      },
      // Event data
      newRowData: {},
      rowData: {},
      errorLog: [],
      infoLog: '',
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
    imgSrc () {
      return `${process.env.VUE_APP_BASE_URL}/file${this.rowData.event_pic_path}`
    },
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
  async created () {
    await axios.get('/organizer/crud').then(response => {
      this.organizers = response.data.data
    })
  },
  async mounted () {
    await this.getData()
  },
  methods: {
    async getData () {
      await axios.get(`/event/${this.$route.params.id}`).then(response => (this.rowData = response.data.data))
      this.newRowData = this.rowData
      this.selected_organizer = {
        id: this.rowData.organizer_id,
        label: this.rowData.organizer_name,
        organizer_name: this.rowData.organizer_name,
        organizer_website: this.rowData.organizer_website,
        organizer_social: this.rowData.organizer_social,
        organizer_phone: this.rowData.organizer_phone,
        organizer_email: this.rowData.organizer_email
      }
    },
    async submit () {
      this.$validator.validateAll().then(async result => {
        if (result) {
          const formData = new FormData()
          formData.append('name', this.rowData.name)
          formData.append('description', this.rowData.description)
          formData.append('website', this.rowData.website)
          formData.append('location', this.rowData.location)
          formData.append('bib_minimum_age', this.rowData.bib_minimum_age)
          formData.append('pickup_type', this.rowData.pickup_type)
          formData.append('pickup_date', this.rowData.pickup_date)
          formData.append('pickup_location', this.rowData.pickup_location)
          formData.append('local_delivery_period', this.rowData.local_delivery_period)
          formData.append('delivery_cost', this.rowData.delivery_cost)
          formData.append('event_start_date', this.rowData.event_start_date)
          formData.append('event_end_date', this.rowData.event_end_date)
          formData.append('event_pic_path', this.rowData.event_pic_path)
          formData.append('register_start_date', this.rowData.register_start_date)
          formData.append('register_end_date', this.rowData.register_end_date)
          formData.append('is_published', this.rowData.is_published)
          formData.append('virtual_delivery_start_date', this.rowData.virtual_delivery_start_date)
          formData.append('virtual_delivery_end_date', this.rowData.virtual_delivery_end_date)

          /*====================================================================
          Append file data as blob in the form, if any
          ====================================================================*/
          const imageFile = this.$refs.myVueDropzone.getAcceptedFiles()[0]
          if (imageFile) formData.append('file', imageFile)

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

          await axios
            .put(`/event/${this.rowData.id}`, formData, {
              headers: {
                'Content-Type': 'multipart/form-data'
              }
            })
            .then(async response => {
              this.$vs.notify({
                time: 8000,
                color: 'success',
                position: 'top-right',
                icon: 'check_box',
                title: 'บันทึกข้อมูลสำเร็จ',
                text: `อัพเดทงานวิ่งรหัส ${response.data.data.id}`
              })
              if (imageFile) setTimeout(function () {
                window.location.reload()
              }, 300)
            })
            .catch(error => this.$vs.notify({
              time: 8000,
              color: 'danger',
              position: 'top-right',
              icon: 'error',
              title: 'บันทึกขัอมูลไม่สำเร็จ',
              text: `เกิดข้อผิดพลาด ERROR: ${error.message}`
            })
            )
        } else {
          this.$vs.notify({
            time: 3000,
            color: 'warning',
            position: 'top-right',
            icon: 'error',
            title: 'บันทึกข้อมูลไม่สำเร็จ',
            text: 'กรุณากรอกข้อมูลให้ครบ'
          })
        }
      })
    }
  }
}
</script>
