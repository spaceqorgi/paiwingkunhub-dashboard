<template>
  <vx-card no-shadow>
    <vs-list>
      <!--=========GROUP=========-->
      <vs-list-header
        title="ข้อมูลทั่วไป"
        color="success"
        icon="description"
      ></vs-list-header>
      <div class="my-10">
        <p>ชื่อ : {{ rowData.name }}</p>
        <vs-divider />
        <p>
          คำอธิบาย : {{ rowData.description }}}
        </p>
        <vs-divider />
        <p>สถานที่จัด : {{ rowData.location }}</p>
        <vs-divider />
        <p>ผู้จัด : {{ rowData.organizer }}</p>
        <vs-divider />
        <p>เว็บไซต์ : {{ rowData.website }}</p>
        <vs-divider />
        <p>ผู้ติดต่อฉุกเฉิน : {{ rowData.emergency_contact }}</p>
        <vs-divider />
        <p>เบอร์ติดต่อฉุกเฉิน : {{ rowData.emergency_phone }}</p>
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
  async mounted () {
    await axios
      .get(`/event/${ this.$route.params.id }`).then(response => (this.rowData = response.data.data))
  }
}
</script>
