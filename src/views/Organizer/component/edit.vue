<template>
  <vx-card no-shadow title="แก้ไขข้อมูล">
    <vs-row>
      <vs-col class="p-3" vs-sm="12" vs-md="12" vs-w="12">
        <vs-input
          class="w-full mt-10"
          label-placeholder="ชื่อผู้จัด"
          v-model="rowData.organizer_name"
          v-validate="'required'"
          name="organizer_name"
        />
        <span class="text-danger text-sm" v-show="errors.has('organizer_name')">{{
          errors.first('organizer_name')
        }}</span>

        <vs-input
          class="w-full mt-10"
          label-placeholder="เว็บไซต์ผู้จัด"
          v-model="rowData.organizer_website"
          v-validate="'required'"
          name="organizer_website"
        />
        <span class="text-danger text-sm" v-show="errors.has('organizer_website')">{{
          errors.first('organizer_website')
        }}</span>

        <vs-input
          class="w-full mt-10"
          label-placeholder="โซเชียลมีเดีย"
          v-model="rowData.organizer_social"
          v-validate="'required'"
          name="organizer_social"
        />
        <span class="text-danger text-sm" v-show="errors.has('organizer_social')">{{
          errors.first('organizer_social')
        }}</span>

        <vs-input
          class="w-full mt-10"
          label-placeholder="อีเมล"
          v-model="rowData.organizer_email"
          v-validate="'required'"
          name="organizer_email"
        />
        <span class="text-danger text-sm" v-show="errors.has('organizer_email')">{{
          errors.first('organizer_email')
        }}</span>

        <vs-input
          class="w-full mt-10"
          label-placeholder="โทรศัพท์"
          v-model="rowData.organizer_phone"
          v-validate="'required'"
          name="organizer_phone"
        />
        <span class="text-danger text-sm" v-show="errors.has('organizer_phone')">{{
          errors.first('organizer_phone')
        }}</span>

        <br>
        <label>กรุณาเลือกยูสเซอร์สำหรับผู้จัดนี้</label>
        <v-select
          v-model="selected_organizer_user_id"
          label="label"
          :options="organizer_user_id_options"
          :dir="$vs.rtl ? 'rtl' : 'ltr'"
          v-validate="'required'"
          name="organizer_user_id"
          class="mt-5"
        />
        <span class="text-danger text-sm" v-show="errors.has('organizer_user_id')">{{
            errors.first('organizer_user_id')
          }}</span>
      </vs-col>
    </vs-row>
    <div class="mt-6 flex flex-wrap items-center justify-end">
      <vs-button color="success" class="ml-4 mt-2" @click="submit">ยืนยัน</vs-button>
    </div>
  </vx-card>
</template>

<script>
import axios from '@/axios'
import { Validator } from 'vee-validate'
import vSelect from 'vue-select'
import store from '@/store/store'

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
    'v-select': vSelect
  },
  data () {
    return {
      // Bank data
      newRowData: {},
      rowData: {
        is_shown: true
      },
      errorLog: [],
      infoLog: '',
      selected_organizer_user_id: {
      },
      organizerUsers: [],
      AppActiveUser: store.state.AppActiveUser
    }
  },
  async created () {
    await axios.get('/organizer/user').then(response => {
      this.organizerUsers = response.data.data
    })
    this.selected_organizer_user_id = {
      id: this.rowData.id,
      label: this.rowData.username
    }
  },
  async mounted () {
    await this.getData()
  },
  computed: {
    organizer_user_id_options () {
      return this.organizerUsers.map(user => {
        return {
          id: user.id,
          label: user.username
        }
      })
    }
  },
  methods: {
    async getData () {
      await axios.get(`/organizer/crud/${this.$route.params.id}`).then(response => (this.rowData = response.data.data))
      this.newRowData = this.rowData
    },
    async submit () {
      this.$validator.validateAll().then(async result => {
        if (result) {
          const formData = new FormData()
          formData.append('organizer_name', this.rowData.organizer_name)
          formData.append('organizer_website', this.rowData.organizer_website)
          formData.append('organizer_social', this.rowData.organizer_social)
          formData.append('organizer_email', this.rowData.organizer_email)
          formData.append('organizer_phone', this.rowData.organizer_phone)
          formData.append('organizer_user_id', this.rowData.organizer_user_id)

          await axios
            .put(`/organizer/crud/${this.rowData.organizer_id}`, formData, {
              headers: {
                'Content-Type': 'multipart/form-data'
              }
            })
            .then(async () => {
              this.$vs.notify({
                time: 8000,
                color: 'success',
                position: 'top-right',
                icon: 'check_box',
                title: 'บันทึกข้อมูลสำเร็จ',
                text: 'อัพเดทข้อมูลผู้จัดสำเร็จ'
              })
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
