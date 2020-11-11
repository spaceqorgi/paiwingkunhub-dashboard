<template>
  <vx-card title="ภาพรวม" no-shadow>
    <vs-list>
      <vs-row>
        <vs-col vs-w="12">
          <h2 class="text-primary mb-2">{{ rowData.payment_account_name }} ({{ bankInfo.acronym }})</h2>
        </vs-col>
      </vs-row>
      <vs-row>
        <vs-col class="p-3" vs-sm="12" vs-md="12" vs-w="6">
          <!--=========GROUP=========-->
          <div class="my-5">
            <p><strong>รหัส:</strong> {{ rowData.id }}</p>
            <p><strong>ธนาคาร:</strong> {{ bankInfo.name }} ({{ bankInfo.acronym }})</p>
            <p><strong>ชื่อบัญชี:</strong> {{ rowData.payment_account_name }}</p>
            <p><strong>เลขที่บัญชี:</strong> {{ rowData.payment_account_number }}</p>
            <p><strong>สาขา:</strong> {{ rowData.payment_branch }}</p>
            <p><strong>แสดงหน้าเว็บ:</strong> {{ rowData.is_shown ? 'แสดง' : 'ไม่แสดง' }}</p>
          </div>
          <!--=========END=========-->
        </vs-col>
      </vs-row>
    </vs-list>
  </vx-card>
</template>

<script>
import axios from '../../../axios'
import { formatDate, thaiBankInfo } from '@/functions'

export default {
  data () {
    return {
      rowData: {}
    }
  },
  computed: {
    bankInfo () {
      const BANK_INFO = thaiBankInfo[this.rowData.payment_bank]
      return BANK_INFO ? BANK_INFO : thaiBankInfo['-999']
    }
  },
  async mounted () {
    await axios.get(`/bank/private/${this.$route.params.id}`).then(response => (this.rowData = response.data.data))
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
  font-size: 1.5em;
}

img {
  border-radius: 2%;
  box-shadow: 2px 2px 5px #00000055;
}
</style>
