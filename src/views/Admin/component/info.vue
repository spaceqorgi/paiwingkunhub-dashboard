<template>
  <vx-card no-shadow>
    <!--=========GROUP=========-->
    <h1 class="text-primary">ข้อมูลบัญชีแอดมิน</h1>
    <div class="my-10">
      <p><strong>อีเมล:</strong> {{ userData.username }}</p>
      <p><strong>ประเภท:</strong> {{ role }}</p>
    </div>
    <!--=========END=========-->
    <vs-row>
      <vs-col class="p-3" vs-sm="12" vs-md="12" vs-w="12">
        <vs-button icon="delete" color="danger" class="ml-4 mt-2" @click="showDeletePopup">ลบบัญชี</vs-button>
      </vs-col>
    </vs-row>
    <!-------------------------------------------------------------------Action popup------------------------------------------------------------------------------>
    <vs-popup title="โปรดยืนยันการลบข้อมูล" :active.sync="deletePopup">
      <div class="text-center">
        <h3 class="mb-4 text-primary">โปรดตรวจสอบข้อมูลให้ถูกต้องก่อนลบข้อมูล</h3>
        <div class="my-4">
          <p>
            อีเมล:
            {{ userData.username }}
          </p>
        </div>
        <!----------------------------------------------------------------------------------------->
        <h6 class="mt-5 text-danger">โปรดใส่อีเมลให้ถูกต้องเพื่อทำการยืนยัน</h6>
        <vs-input class="w-full my-3" v-model="confirmEmail" name="name" />
        <vs-button
          :disabled="!emailMatched"
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

export default {
  data () {
    return {
      userData: {},
      // Delete popup
      deletePopup: false,
      confirmEmail: '',
      deleteSuccess: '',
      deleteError: ''
    }
  },
  async mounted () {
    await axios.get(`/user/${this.$route.params.id}`).then(response => {
      this.userData = response.data.data
    })
  },
  computed: {
    role () {
      switch (this.userData.role) {
      case 0:
        return 'ผู้ใชัทั่วไป'
      case 1:
        return 'ผู้จัด'
      case 2:
        return 'สตาฟ'
      case 3:
        return 'แอดมิน'
      default:
        return 'ผู้ใชัทั่วไป'
      }
    },
    emailMatched () {
      return this.userData.username === this.confirmEmail
    }
  },
  methods: {
    closeDeletePopup () {
      this.deletePopup = false
      this.confirmEmail = ''
      this.deleteSuccess = false
      this.deleteError = ''
    },
    showDeletePopup () {
      this.deletePopup = true
    },
    async confirmDeletion () {
      await axios
        .delete(`/user/${this.$route.params.id}`)
        .then(() => {
          this.deleteSuccess = true
        })
        .catch(error => {
          this.deleteError = error
        })

      if (this.deleteSuccess) {
        this.$vs.notify({
          title: 'ลบงานวิ่่งสำเร็จ',
          text: 'ลบแอดมินสำเร็จ',
          position: 'top-right',
          iconPack: 'feather',
          icon: 'icon-alert-circle',
          color: 'success'
        })

        this.closeDeletePopup()
        // Redirect to event search
        await this.$router.push(`/admin/${this.$route.params.id}`)
      } else {
        this.$vs.notify({
          title: 'ลบงานวิ่่งไม่สำเร็จ',
          text: 'ลบแอดมินไม่สำเร็จ',
          position: 'top-right',
          iconPack: 'feather',
          icon: 'icon-alert-circle',
          color: 'danger'
        })
      }
    }
  }
}
</script>

<style scoped>
p {
  margin-bottom: 0.8rem;
}
</style>
