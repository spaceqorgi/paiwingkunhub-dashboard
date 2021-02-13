<template>
  <vx-card no-shadow title="แก้ไขข้อมูล">
    <vs-row>
      <vs-col class="p-3" vs-sm="12" vs-md="12" vs-w="12">
        <label>กรุณาเลือกธนาคาร</label>
        <v-select
          v-model="selected_payment_bank"
          label="label"
          :options="payment_bank_options"
          :dir="$vs.rtl ? 'rtl' : 'ltr'"
          v-validate="'required'"
          name="payment_bank"
          class="mt-5"
        />
        <span class="text-danger text-sm" v-show="errors.has('payment_bank')">{{ errors.first('payment_bank') }}</span>

        <vs-input
          class="w-full mt-10"
          label-placeholder="ชื่อบัญชี"
          v-model="rowData.payment_account_name"
          v-validate="'required'"
          name="payment_account_name"
        />
        <span class="text-danger text-sm" v-show="errors.has('payment_account_name')">{{
          errors.first('payment_account_name')
        }}</span>

        <vs-input
          class="w-full mt-10"
          label-placeholder="เลขที่บัญชี"
          v-model="rowData.payment_account_number"
          v-validate="'required'"
          name="payment_account_number"
        />
        <span class="text-danger text-sm" v-show="errors.has('payment_account_number')">{{
          errors.first('payment_account_number')
        }}</span>

        <vs-input
          class="w-full mt-10"
          label-placeholder="สาขา"
          v-model="rowData.payment_branch"
          v-validate="'required'"
          name="payment_branch"
        />
        <span class="text-danger text-sm" v-show="errors.has('payment_branch')">{{
          errors.first('payment_branch')
        }}</span>

        <!-- INPUT GROUP -->
        <div class="mt-10">
          <label for="is_shown">แสดงในเว็บไซต์</label>
          <vs-switch class="my-2" name="is_shown" v-model="rowData.is_shown">
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
import { thaiBankInfo } from '@/functions'

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
      rowData: {},
      errorLog: [],
      infoLog: '',
      selected_payment_bank: {}
    }
  },
  computed: {
    payment_bank_options () {
      return Object.entries(thaiBankInfo).map(([bankCode, bank]) => {
        return {
          bankCode,
          label: `${bank.name} (${bank.acronym})`
        }
      })
    }
  },
  async mounted () {
    await this.getData()
  },
  methods: {
    async getData () {
      await axios.get(`/bank/private/${this.$route.params.id}`).then(response => (this.rowData = response.data.data))
      this.newRowData = this.rowData
      this.selected_payment_bank = {
        bankCode: this.rowData.payment_bank,
        label: thaiBankInfo[this.rowData.payment_bank].name
      }
    },
    async submit () {
      this.$validator.validateAll().then(async result => {
        if (result) {
          const formData = new FormData()
          formData.append('payment_bank', this.selected_payment_bank.bankCode)
          formData.append('payment_account_name', this.rowData.payment_account_name)
          formData.append('payment_account_number', this.rowData.payment_account_number)
          formData.append('payment_branch', this.rowData.payment_branch)
          formData.append('is_shown', this.rowData.is_shown)

          await axios
            .put(`/bank/${this.rowData.id}`, formData, {
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
                text: 'อัพเดทบัญชีธนาคารสำเร็จ'
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
