<template>
  <vx-card title="กราฟข้อมูล" no-shadow>
    กราฟ
  </vx-card>
</template>

<script>
import axios from '../../../axios'
import { formatDate, formatPhoneNumber } from '@/functions'
import store from '@/store/store.js'

export default {
  data () {
    return {
      rowData: {},
      AppActiveUser: store.state.AppActiveUser
    }
  },
  computed: {
    imgSrc () {
      return `${process.env.VUE_APP_BASE_URL}/file${this.rowData.event_pic_path}`
    },
    pickupTypeSupport () {
      const pickup = this.rowData.pickup_type
      switch (pickup) {
      case 0:
        return 'รับหน้างาน'
      case 1:
        return 'ส่งไปรษณีย์'
      default:
        return 'รับหน้างาน และส่งไปรษณีย์'
      }
    }
  },
  async mounted () {
    await axios
      .get(`/event/${this.$route.params.id}`)
      .then((response) => (this.rowData = response.data.data))
  },
  methods: {
    formatDate (date) {
      const newDate = formatDate(date)
      if (newDate === 'Invalid Date') return '-'
      else return newDate
    },
    formatPhone (phone) {
      return formatPhoneNumber(phone)
    },
    async toggleIsPublished () {
      const formData = new FormData()
      formData.append('is_published', !this.rowData.is_published)
      await axios
        .put(`/event/${this.rowData.id}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        .then((response) => {
          console.log(response)
        })
        .catch((err) => {
          console.log(err.message)
          alert('เกิดข้อผิดพลาด โปรดติดต่อโปรแกรมเมอร์', err.message)
          this.rowData.is_published = !this.rowData.is_published
        })
    }
  }
}
</script>
<style scoped>
p {
  margin-bottom: 0.8rem;
}

img {
  border-radius: 2%;
  box-shadow: 2px 2px 5px #00000055;
}
</style>
