<template>
  <vx-card no-shadow title="จัดการ">
    <vs-row>
      <vs-col class="p-3" vs-sm="12" vs-md="12" vs-w="12">
        <vs-button icon="delete" color="danger" class="ml-4 mt-2" @click="showDeletePopup">ลบบัญชีธนาคารนี้</vs-button>
      </vs-col>
    </vs-row>
    <!-------------------------------------------------------------------Action popup------------------------------------------------------------------------------>
    <vs-popup title="โปรดยืนยันการลบข้อมูล" :active.sync="deletePopup">
      <div class="text-center">
        <h3 class="mb-4 text-primary">โปรดตรวจสอบข้อมูลให้ถูกต้องก่อนลบข้อมูล</h3>
        <h6 class="mb-4 text-danger">ข้อมูลของบัญชีธนาคารนี้จะถูกลบทั้งหมด</h6>

        <div class="my-4">
          <p>ธนาคาร: {{ bankInfo.name }} ({{ bankInfo.acronym }})</p>
          <p>เลขบัญชี: {{ rowData.payment_account_number }}</p>
          <p>ชื่อบัญชี: {{ rowData.payment_account_name }}</p>
          <p>สาขา: {{ rowData.payment_branch }}</p>
        </div>

        <!----------------------------------------------------------------------------------------->
        <h6 class="mt-5 text-danger">
          โปรดกรอกเลขบัญชีธนาคารเพื่อทำการยืนยัน
        </h6>
        <vs-input class="w-full my-3" v-model="confirmInput" name="name" />
        <vs-button
          :disabled="!bankNameMatched"
          class="mx-1"
          size="small"
          color="danger"
          type="filled"
          @click="confirmDeletion"
          >ยืนยันการลบ</vs-button
        >
        <vs-button class="mx-1" size="small" color="dark" type="filled" @click="closeDeletePopup">ปิด</vs-button>
        <!----------------------------------------------------------------------------------------->
      </div>
    </vs-popup>
    <!---------------------------------------------------------------------END Action popup--------------------------------------------------------------------->
  </vx-card>
</template>

<script>
import axios from '../../../axios'
import 'flatpickr/dist/flatpickr.css'
import 'vue2-dropzone/dist/vue2Dropzone.min.css'
import { formatDateTime, thaiBankInfo } from '@/functions'

export default {
  data () {
    return {
      // Bank data
      newRowData: {},
      rowData: {},
      // Delete popup
      deletePopup: false,
      confirmInput: '',
      deleteSuccess: '',
      deleteError: ''
    }
  },
  computed: {
    bankInfo () {
      const BANK_INFO = thaiBankInfo[this.rowData.payment_bank]
      return BANK_INFO ? BANK_INFO : thaiBankInfo['-999']
    },
    bankNameMatched () {
      return this.rowData.payment_account_number === this.confirmInput
    }
  },
  async mounted () {
    await this.getData()
  },
  methods: {
    closeDeletePopup () {
      this.deletePopup = false
      this.confirmInput = ''
      this.deleteSuccess = false
      this.deleteError = ''
    },
    async confirmDeletion () {
      await axios
        .delete(`/bank/${this.$route.params.id}`)
        .then(() => {
          this.deleteSuccess = true
        })
        .catch(error => {
          this.deleteError = error
        })

      if (this.deleteSuccess) {
        this.$vs.notify({
          title: 'ลบบัญชีธนาคารสำเร็จ',
          text: 'ลบบัญชีธนาคารสำเร็จ',
          position: 'top-right',
          iconPack: 'feather',
          icon: 'icon-alert-circle',
          color: 'success'
        })

        this.closeDeletePopup()
        // Redirect to bank search
        await this.$router.push('/bank')
      } else {
        this.$vs.notify({
          title: 'ลบบัญชีธนาคารไม่สำเร็จ',
          text: 'ลบบัญชีธนาคารไม่สำเร็จ',
          position: 'top-right',
          iconPack: 'feather',
          icon: 'icon-alert-circle',
          color: 'danger'
        })
      }
    },
    formatDateTime (date) {
      return formatDateTime(date)
    },
    async getData () {
      await axios.get(`/bank/private/${this.$route.params.id}`).then(response => (this.rowData = response.data.data))
      this.newRowData = this.rowData
    },
    showDeletePopup () {
      this.deletePopup = true
    }
  }
}
</script>
