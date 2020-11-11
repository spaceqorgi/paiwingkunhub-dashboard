<template>
  <vx-card no-shadow>
    <!--=========GROUP=========-->
    <h1 class="text-primary">เปลี่ยนรหัสผ่าน</h1>
    <vs-row>
      <vs-col class="p-3" vs-sm="12" vs-md="12" vs-w="12">
        <p>โปรดกรอกรหัสผ่านให้ตรงกัน</p>
        <vs-input class="w-full mt-10" label-placeholder="รหัสผ่าน" v-model="password" type="password" />
        <vs-input class="w-full mt-10" label-placeholder="ยืนยันรหัสผ่าน" v-model="confirmPassword" type="password" />
        <vs-button :disabled="!passwordMatch && password !== ''" icon="edit" color="primary" class="ml-4 mt-10" @click="showActionPopup"
          >เปลี่ยนรหัสผ่าน</vs-button
        >
      </vs-col>
    </vs-row>
    <!-------------------------------------------------------------------Action popup------------------------------------------------------------------------------>
    <vs-popup title="โปรดยืนยันการเปลี่ยนรหัสผ่าน" :active.sync="actionPopup">
      <div class="text-center">
        <vs-button class="mx-1" size="small" color="danger" type="filled" @click="confirmAction"
          >ยืนยันการเปลี่ยนรหัสผ่าน</vs-button
        >
        <vs-button class="mx-1" size="small" color="dark" type="filled" @click="closeActionPopup">ปิด</vs-button>
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
      // Action popup
      actionPopup: false,
      password: '',
      confirmPassword: '',
      actionSuccess: '',
      actionError: ''
    }
  },
  computed: {
    passwordMatch () {
      return this.password === this.confirmPassword
    }
  },
  async mounted () {
    await axios.get(`/user/${this.$route.params.id}`).then(response => {
      this.userData = response.data.data
    })
  },
  methods: {
    closeActionPopup () {
      this.actionPopup = false
      this.password = ''
      this.confirmPassword = ''
      this.actionSuccess = false
      this.actionError = ''
    },
    async confirmAction () {
      await axios
        .post('/auth/admin/password/force_change', {
          username: this.userData.username,
          newPassword: this.password
        })
        .then(() => {
          this.actionSuccess = true
        })
        .catch(error => {
          this.actionError = error
        })

      if (this.actionSuccess) {
        this.$vs.notify({
          title: 'ทำการสำเร็จ',
          text: 'รหัสผ่านถูกเปลี่ยนสำเร็จ',
          position: 'top-right',
          iconPack: 'feather',
          icon: 'icon-alert-circle',
          color: 'success'
        })

        this.closeActionPopup()
        // Redirect to event search
        await this.$router.push('/admin')
      } else {
        this.$vs.notify({
          title: 'เกิดข้อผิดพลาด',
          text: 'เปลี่ยนรหัสผ่านไม่สำเร็จ',
          position: 'top-right',
          iconPack: 'feather',
          icon: 'icon-alert-circle',
          color: 'danger'
        })
      }
    },
    showActionPopup () {
      this.actionPopup = true
    }
  }
}
</script>

<style scoped>
p {
  margin-bottom: 0.8rem;
}
</style>
