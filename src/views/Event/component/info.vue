<template>
  <vx-card title="ภาพรวม" no-shadow>
    <vs-list>
      <vs-row>
        <vs-col vs-w="12">
          <h2 class="text-primary mb-2">{{ rowData.name }}</h2>
          <img
            class="my-2"
            width="500rem"
            height="auto"
            :src="imgSrc"
            :alt="rowData.name"
          />
        </vs-col>
      </vs-row>
      <vs-row>
        <vs-col class="p-3" vs-sm="12" vs-md="12" vs-w="6">
          <!--=========GROUP=========-->
          <vs-list-header
            title="ข้อมูลกิจกรรม"
            color="primary"
            icon="description"
          ></vs-list-header>

          <div class="my-10">
            <p><strong>รหัส:</strong> {{ rowData.id }}</p>
            <p><strong>ชื่องาน:</strong> {{ rowData.name }}</p>
            <p><strong>คำอธิบาย:</strong> {{ rowData.description }}</p>
            <p><strong>เว็บไซต์:</strong> {{ rowData.website }}</p>
            <p><strong>สถานที่จัด:</strong> {{ rowData.location }}</p>
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
          </div>
          <!--=========END=========-->
        </vs-col>
        <vs-col class="p-3" vs-sm="12" vs-md="12" vs-w="6">
          <!--=========GROUP=========-->
          <vs-list-header
            title="ข้อมูลผู้จัดงาน"
            color="success"
            icon="people"
          ></vs-list-header>
          <div class="my-10">
            <p><strong>ผู้จัด:</strong> {{ rowData.organizer_name }}</p>
            <p>
              <strong>เว็บไซต์งานวิ่ง:</strong> {{ rowData.organizer_website }}
            </p>
            <p>
              <strong>โซเชียลมีเดีย:</strong> {{ rowData.organizer_social }}
            </p>
            <p><strong>อีเมล:</strong> {{ rowData.organizer_email }}</p>
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
import {formatDate} from '@/functions'

export default {
  data () {
    return {
      rowData: {}
    }
  },
  computed: {
    imgSrc () {
      return `https://api-pwg.corgi.engineer/file${this.rowData.event_pic_path}`
    }
  },
  async mounted () {
    await axios
      .get(`/event/${this.$route.params.id}`)
      .then(response => (this.rowData = response.data.data))
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
</style>
