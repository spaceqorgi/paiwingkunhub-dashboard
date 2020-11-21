<template>
  <vs-card class="p-5">
    <h2 class="mb-10">ตั้งค่าระบบ</h2>
    <h3 class="my-8">เปลี่ยนบัญชีสำเร็จส่งอีเมลอัตโนมัติ</h3>
    <vs-input class="my-8" label-placeholder="อีเมล" v-model.trim="rowData.mailer_email" />
    <vs-input class="my-8" type="password" label-placeholder="รหัสผ่าน" v-model.trim="rowData.mailer_password" />
    <vs-button @click="saveMailerInfo">บันทึกข้อมูล</vs-button>
  </vs-card>
</template>

<script>
import axios from '@/axios'

export default {
  data () {
    return {
      rowData: {},
      error: null
    }
  },
  computed: {},
  async mounted () {
    await this.getData()
  },
  methods: {
    async getData () {
      await axios
        .get('/setting')
        .then(result => {
          this.rowData = result.data.data[0]
        })
        .catch(error => {
          this.error = error
        })

      if (this.error) {
        this.$vs.notify({
          title: 'เกิดข้อผิดพลาด',
          text: this.error.message,
          position: 'top-right',
          iconPack: 'feather',
          icon: 'icon-alert-circle',
          color: 'danger'
        })
      }

      this.error = null
    },
    async saveMailerInfo () {
      await axios.put('/setting/0', {
        mailer_email: this.rowData.mailer_email,
        mailer_password: this.rowData.mailer_password
      }).catch(error => { this.error = error })

      if (this.error) {
        this.$vs.notify({
          title: 'เกิดข้อผิดพลาด',
          text: this.error.message,
          position: 'top-right',
          iconPack: 'feather',
          icon: 'icon-alert-circle',
          color: 'danger'
        })
      } else {
        this.$vs.notify({
          title: 'บันทึกสำเร็จ',
          text: 'อัพเดทข้อมูลสำเร็จ',
          position: 'top-right',
          iconPack: 'feather',
          icon: 'icon-alert-circle',
          color: 'success'
        })
      }

      this.error = null
    }
  }
}
</script>

<style lang="scss"></style>
