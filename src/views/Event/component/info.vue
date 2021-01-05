<template>
  <vx-card title="ภาพรวม" no-shadow>
    <vs-list>
      <vs-row>
        <vs-col vs-w="12">
          <h2 class="text-primary mb-2">{{ rowData.name }}</h2>
          <img class="my-10" width="500rem" height="auto" :src="imgSrc" :alt="rowData.name" />
        </vs-col>
      </vs-row>
      <vs-row>
        <vs-col class="p-3" vs-sm="12" vs-md="12" vs-w="6">
          <!--=========GROUP=========-->
          <vs-list-header title="ข้อมูลกิจกรรม" color="primary" icon="description"></vs-list-header>

          <div class="my-10">
            <p><strong>รหัส:</strong> {{ rowData.id }}</p>
            <p><strong>ชื่องาน:</strong> {{ rowData.name }}</p>
            <p><strong>คำอธิบาย:</strong> {{ rowData.description }}</p>
            <p><strong>เว็บไซต์: </strong><a :href="rowData.website">{{ rowData.website }}</a></p>
            <p><strong>รุ่นอายุต่ำกว่า 19 สำหรับระบบ BIB:</strong> {{ rowData.bib_minimum_age }}</p>
            <p><strong>ช่องทางการรับของ:</strong> {{ pickupTypeSupport }}</p>
            <p><strong>ค่าจัดส่ง:</strong> {{ rowData.delivery_cost }}</p>
            <vs-divider/>
            <p>
              <strong>เริ่มสมัคร:</strong>
              {{ formatDate(rowData.register_start_date) }}
            </p>
            <p>
              <strong>สิ้นสุดสมัคร:</strong>
              {{ formatDate(rowData.register_end_date) }}
            </p>
            <p>
              <strong>เริ่มกิจกรรม:</strong>
              {{ formatDate(rowData.event_start_date) }}
            </p>
            <p>
              <strong>สิ้นสุดกิจกรรม:</strong>
              {{ formatDate(rowData.event_end_date) }}
            </p>
            <vs-divider/>
            <p><strong>สถานที่จัด:</strong> {{ rowData.location }}</p>
            <p><strong>วันรับอุปกรณ์:</strong> {{ rowData.pickup_date }}</p>
            <p><strong>สถานที่รับอุปกรณ์:</strong> {{ rowData.pickup_location }}</p>
            <p><strong>ช่วงเวลาจัดส่งอุปกรณ์:</strong> {{ rowData.local_delivery_period }}</p>
            <vs-divider/>
            <p><strong>เริ่มการจัดส่งของที่ระลึก:</strong> {{ formatDate(rowData.virtual_delivery_start_date) }}</p>
            <p><strong>สิ้นสุดการจัดส่งของที่ระลึก:</strong> {{ formatDate(rowData.virtual_delivery_end_date) }}</p>
            <vs-divider/>
            <p><strong>แสดงหน้าเว็บไซต์:</strong> {{ rowData.is_published ? 'แสดง' : 'ไม่แสดง' }}</p>
          </div>
          <!--=========END=========-->
        </vs-col>
        <vs-col class="p-3" vs-sm="12" vs-md="12" vs-w="6">
          <!--=========GROUP=========-->
          <vs-list-header title="ข้อมูลผู้จัดงาน" color="success" icon="people"></vs-list-header>
          <div class="my-10">
            <p><strong>ผู้จัด:</strong> {{ rowData.organizer_name }}</p>
            <p><strong>เว็บไซต์ผู้จัด: </strong><a :href="rowData.organizer_website">{{ rowData.organizer_website }}</a></p>
            <p><strong>โซเชียลมีเดีย:</strong> {{ rowData.organizer_social }}</p>
            <p><strong>อีเมล: </strong><a :href="'mailto:' + rowData.organizer_email">{{ rowData.organizer_email }}</a></p>
            <p><strong>โทรศัพท์:</strong> {{ rowData.organizer_phone }}</p>
          </div>
          <!--=========END=========-->
        </vs-col>
      </vs-row>
    </vs-list>
  </vx-card>
</template>

<script>
import axios from '../../../axios'
import { formatDate } from '@/functions'

export default {
  data () {
    return {
      rowData: {}
    }
  },
  computed: {
    imgSrc () {
      return `${process.env.VUE_APP_BASE_URL}/file${this.rowData.event_pic_path}`
    },
    pickupTypeSupport () {
      const pickup = this.rowData.pickup_type
      switch (pickup) {
      case 0: return 'รับหน้างาน'
      case 1: return 'ส่งไปรษณีย์'
      default: return 'รับหน้างาน และส่งไปรษณีย์'
      }
    }
  },
  async mounted () {
    await axios.get(`/event/${this.$route.params.id}`).then(response => (this.rowData = response.data.data))
  },
  methods: {
    formatDate (date) {
      return formatDate(date)
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
