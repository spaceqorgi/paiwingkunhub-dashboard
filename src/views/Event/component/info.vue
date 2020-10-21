<template>
  <vx-card no-shadow>
    <vs-list>
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
        <p>เริ่มกิจกรรม: {{ rowData.event_start_date }}</p>
        <p>สิ้นสุดกิจกรรม: {{ rowData.event_end_date }}</p>
      </div>
      <!--=========END=========-->
      <!--=========GROUP=========-->
      <vs-list-header
        title="ข้อมูลผู้จัดงาน"
        color="purple"
        icon="people"
      ></vs-list-header>
      <div class="my-10">
        <p>ผู้จัด: {{ rowData.organizer_name }}</p>
        <p>เว็บไซต์งานวิ่ง: {{ rowData.organizer_website }}</p>
        <p>โซเชียลมีเดีย: {{ rowData.organizer_social }}</p>
        <p>อีเมลล์: {{ rowData.organizer_email }}</p>
        <p>โทรศัพท์: {{ rowData.organizer_phone }}</p>
      </div>
      <!--=========END=========-->
    </vs-list>
  </vx-card>
</template>

<script>
import axios from '../../../axios'

export default {
  data () {
    return {
      rowData: {}
    }
  },
  async mounted() {
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
