<template>
  <vx-card no-shadow title="แก้ไขข้อมูลงานวิ่ง">
    <vs-row>
      <vs-col class="p-3" vs-sm="12" vs-md="12" vs-w="6">
        <vs-input
          class="w-full mt-4"
          label="ชื่องาน"
          v-model="rowData.name"
          v-validate="'required'"
          name="name"
        />
        <span class="text-danger text-sm" v-show="errors.has('name')">{{
          errors.first('name')
        }}</span>

        <vs-input
          class="w-full mt-4"
          label="คำอธิบาย"
          v-model="rowData.description"
          v-validate="'required'"
          name="description"
        />
        <span class="text-danger text-sm" v-show="errors.has('description')">{{
          errors.first('description')
        }}</span>

        <vs-input
          class="w-full mt-4"
          label="เว็บไซต์"
          v-model="rowData.website"
          v-validate="'required'"
          name="website"
        />
        <span class="text-danger text-sm" v-show="errors.has('website')">{{
          errors.first('website')
        }}</span>

        <vs-input
          class="w-full mt-4"
          label="สถานที่"
          v-model="rowData.location"
          v-validate="'required'"
          name="location"
        />
        <span class="text-danger text-sm" v-show="errors.has('location')">{{
          errors.first('location')
        }}</span>
      </vs-col>
      <vs-col class="p-3" vs-sm="12" vs-md="12" vs-w="6">
        <vs-input
          class="w-full mt-4"
          label="เริ่มกิจกรรม"
          v-model="rowData.event_start_date"
          name="event_start_date"
          type="date"
        />
        <span
          class="text-danger text-sm"
          v-show="errors.has('event_start_date')"
          >{{ errors.first('event_start_date') }}</span
        >

        <vs-input
          class="w-full mt-4"
          label="สิ้นสุดกิจกรรม"
          v-model="rowData.event_end_date"
          name="event_end_date"
          type="date"
        />
        <span
          class="text-danger text-sm"
          v-show="errors.has('event_end_date')"
          >{{ errors.first('event_end_date') }}</span
        >

        <vs-input
          class="w-full mt-4"
          label="ปิดรับสมัคร"
          v-model="rowData.register_end_date"
          name="register_end_date"
          type="date"
        />
        <span
          class="text-danger text-sm"
          v-show="errors.has('register_end_date')"
        >{{ errors.first('register_end_date') }}</span
        >

        <vs-input
          class="w-full mt-4"
          label="เปิดรับสมัคร"
          v-model="rowData.register_start_date"
          name="register_start_date"
          type="date"
        />
        <span
          class="text-danger text-sm"
          v-show="errors.has('register_start_date')"
          >{{ errors.first('register_start_date') }}</span
        >
      </vs-col>
    </vs-row>
    <div class="mt-6 flex flex-wrap items-center justify-end">
      <vs-button color="success" class="ml-4 mt-2" @click="submit"
        >ยืนยัน</vs-button
      >
    </div>
  </vx-card>
</template>

<script>
import axios from '../../../axios'
import log from '../../../log'
import { Validator } from 'vee-validate'

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
  components: {},
  data () {
    return {
      newrowData: {},
      rowData: {},
      errorlog: [],
      info_log: ''
    }
  },
  methods: {
    async submit () {
      this.$validator.validateAll().then(async result => {
        if (result) {
          await axios
            .put(`/event/${this.rowData.id}`, {
              name: this.rowData.name,
              description: this.rowData.description,
              website: this.rowData.name,
              location: this.rowData.location,
              event_start_date: this.rowData.event_start_date,
              event_end_date: this.rowData.event_end_date,
              register_start_date: this.rowData.register_start_date,
              register_end_date: this.rowData.register_end_date
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
              // await this.compareBeforeAndAfterData()
              // await log.data(this.rowData.name, 'Edit_info', 0, this.info_log)
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
    },
    async compareBeforeAndAfterData () {
      if (this.rowData.name !== this.newrowData.name) {
        this.info_log += `ชื่อ : ${this.rowData.name} > ${this.newrowData.name} `
      }
      if (this.rowData.description !== this.newrowData.description) {
        this.info_log += `ชื่องานวิ่ง : ${this.rowData.description} > ${this.newrowData.description} `
      }
      if (this.rowData.website !== this.newrowData.website) {
        this.info_log += `เว็บไซต์ : ${this.rowData.website} > ${this.newrowData.website} `
      }
      if (this.rowData.location !== this.newrowData.location) {
        this.info_log += `สถานที่จัด : ${this.rowData.location} > ${this.newrowData.location} `
      }
      if (this.rowData.event_start_date !== this.newrowData.event_start_date) {
        this.info_log += `เริ่มกิจกรรม : ${this.rowData.event_start_date} > ${this.newrowData.event_start_date} `
      }
      if (this.rowData.event_end_date !== this.newrowData.event_end_date) {
        this.info_log += `สิ้นสุดกิจกรรม : ${this.rowData.event_end_date} > ${this.newrowData.event_end_date} `
      }
      if (
        this.rowData.register_start_date !== this.newrowData.register_start_date
      ) {
        this.info_log += `เริ่มรับสมัคร : ${this.rowData.register_start_date} > ${this.newrowData.register_start_date} `
      }
      if (
        this.rowData.register_end_date !== this.newrowData.register_end_date
      ) {
        this.info_log += `ปิดรับสมัคร : ${this.rowData.register_end_date} > ${this.newrowData.register_end_date} `
      }
    }
  },
  async mounted () {
    await axios
      .get(`/event/${this.$route.params.id}`)
      .then(response => (this.rowData = response.data.data))
    this.newrowData.name = this.rowData.name
    this.newrowData.website = this.rowData.website
    this.newrowData.description = this.rowData.description
    this.newrowData.website = this.rowData.website
    this.newrowData.location = this.rowData.location
    this.newrowData.event_start_date = this.rowData.event_start_date
    this.newrowData.event_end_date = this.rowData.event_end_date
    this.newrowData.register_start_date = this.rowData.register_start_date
    this.newrowData.register_end_date = this.rowData.register_end_date
  }
}
</script>
