<template>
  <vx-card title="ภาพรวม" no-shadow>
    <vs-list>
      <vs-row>
        <vs-col class="p-3" vs-sm="12" vs-md="12" vs-w="6">
          <!--=========GROUP=========-->
          <vs-list-header
            title="ข้อมูลกิจกรรม"
            color="success"
            icon="description"
          ></vs-list-header>

          <div class="my-10">
            <p>ชื่อ: {{ rowData.name }}</p>
            <p>คำอธิบาย: {{ rowData.description }}</p>
            <p>เว็บไซต์: {{ rowData.website }}</p>
            <p>สถานที่จัด: {{ rowData.location }}</p>
            <p>เริ่มสมัคร: {{ formatDate(rowData.register_start_date) }}</p>
            <p>สิ้นสุดสมัคร: {{ formatDate(rowData.register_end_date) }}</p>
            <p>เริ่มกิจกรรม: {{ formatDate(rowData.event_start_date) }}</p>
            <p>สิ้นสุดกิจกรรม: {{ formatDate(rowData.event_end_date) }}</p>
          </div>
          <!--=========END=========-->
        </vs-col>
        <vs-col class="p-3" vs-sm="12" vs-md="12" vs-w="6">
          <!--=========GROUP=========-->
          <vs-list-header
            title="ข้อมูลผู้จัดงาน"
            color="primary"
            icon="people"
          ></vs-list-header>
          <div class="my-10">
            <p>ผู้จัด: {{ rowData.organizer_name }}</p>
            <p>เว็บไซต์งานวิ่ง: {{ rowData.organizer_website }}</p>
            <p>โซเชียลมีเดีย: {{ rowData.organizer_social }}</p>
            <p>อีเมล: {{ rowData.organizer_email }}</p>
            <p>โทรศัพท์: {{ rowData.organizer_phone }}</p>
          </div>
          <!--=========END=========-->
        </vs-col>
      </vs-row>
    </vs-list>
  </vx-card>
</template>

<script>
import axios from '../../../axios'
import {formatDate} from '@/functions'

export default {
  data () {
    return {
      rowData: {}
    }
  },
  methods: {
    formatDate (date) {
      return formatDate(date)
    }
  },
  async mounted () {
    await axios
      .get(`/event/${this.$route.params.id}`).then(response => (this.rowData = response.data.data))
  }
}
</script>
<style scoped>
p {
  margin-bottom: 0.8rem;
}
</style>
