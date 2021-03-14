<template>
  <vx-card no-shadow title="จัดการ">
    <vs-row>
      <vs-col class="p-3" vs-sm="12" vs-md="12" vs-w="12">
        <vs-button icon="delete" color="danger" class="ml-4 mt-2" @click="showDeletePopup">ลบผู้จัดนี้</vs-button>
      </vs-col>
    </vs-row>
    <!-------------------------------------------------------------------Action popup------------------------------------------------------------------------------>
    <vs-popup title="โปรดยืนยันการลบข้อมูล" :active.sync="deletePopup">
      <div class="text-center">
        <h3 class="mb-4 text-primary">โปรดตรวจสอบข้อมูลให้ถูกต้องก่อนลบข้อมูล</h3>
        <h6 class="mb-4 text-danger">ข้อมูลของผู้จัดนี้จะถูกลบทั้งหมด</h6>

        <div class="my-4">
          <p>ชื่อผู้จัด: {{ rowData.organizer_name }}</p>
          <p>เว็บไซต์ผู้จัด: {{ rowData.organizer_website }}</p>
          <p>โซเชียลมีเดีย: {{ rowData.organizer_social }}</p>
          <p>อีเมล: {{ rowData.organizer_email }}</p>
          <p>โทรศัพท์: {{ rowData.organizer_phone }}</p>
        </div>

        <!----------------------------------------------------------------------------------------->
        <h6 class="mt-5 text-danger">
          โปรดกรอกชื่อผู้จัดเพื่อทำการยืนยัน
        </h6>
        <vs-input class="w-full my-3" v-model="confirmInput" name="name" />
        <vs-button
          :disabled="!confirmInputMatched"
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
    confirmInputMatched () {
      return this.rowData.organizer_name === this.confirmInput
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
        .delete(`/organizer/crud/${this.$route.params.id}`)
        .then(() => {
          this.deleteSuccess = true
        })
        .catch(error => {
          this.deleteError = error
        })

      if (this.deleteSuccess) {
        this.$vs.notify({
          title: 'ลบผู้จัดสำเร็จ',
          text: 'ลบผู้จัดสำเร็จ',
          position: 'top-right',
          iconPack: 'feather',
          icon: 'icon-alert-circle',
          color: 'success'
        })

        this.closeDeletePopup()
        // Redirect to bank search
        await this.$router.push('/organizer')
      } else {
        this.$vs.notify({
          title: 'ลบผู้จัดไม่สำเร็จ',
          text: 'ลบผู้จัดไม่สำเร็จ',
          position: 'top-right',
          iconPack: 'feather',
          icon: 'icon-alert-circle',
          color: 'danger'
        })
      }
    },
    async getData () {
      await axios.get(`/organizer/crud/${this.$route.params.id}`).then(response => (this.rowData = response.data.data))
      this.newRowData = this.rowData
    },
    showDeletePopup () {
      this.deletePopup = true
    }
  }
}
</script>
