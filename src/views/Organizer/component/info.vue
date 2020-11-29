<template>
  <vx-card title="ภาพรวม" no-shadow>
    <vs-list>
      <vs-row>
        <vs-col vs-w="12">
          <h2 class="text-primary mb-2">{{ rowData.organizer_name }}</h2>
        </vs-col>
      </vs-row>
      <vs-row>
        <vs-col class="p-3" vs-sm="12" vs-md="12" vs-w="6">
          <!--=========GROUP=========-->
          <div class="my-5">
            <p><strong>รหัส:</strong> {{ rowData.organizer_id }}</p>
            <p><strong>ชื่อผู้จัด:</strong> {{ rowData.organizer_name }}</p>
            <p><strong>เว็บไซต์ผู้จัด:</strong> {{ rowData.organizer_website }}</p>
            <p><strong>โซเชียลมีเดีย:</strong> {{ rowData.organizer_social }}</p>
            <p><strong>อีเมล:</strong> {{ rowData.organizer_email }}</p>
            <p><strong>โทรศัพท์:</strong> {{ rowData.organizer_phone }}</p>
            <p><strong>บัญชีผู้จัด:</strong><router-link :to="'/user/' + rowData.id"> {{ rowData.username }}</router-link></p>
          </div>
          <!--=========END=========-->
        </vs-col>
      </vs-row>
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
    await axios.get(`/organizer/crud/${this.$route.params.id}`).then(response => (this.rowData = response.data.data))
  }
}
</script>
<style scoped>
p {
  margin-bottom: 0.8rem;
  font-size: 1.5em;
}

img {
  border-radius: 2%;
  box-shadow: 2px 2px 5px #00000055;
}
</style>
