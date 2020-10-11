<template>
  <div>
    <vx-card title="BANK SCB">
      <vs-table :data="bankscb">

        <template slot="thead">
          <vs-th>Id</vs-th>
          <vs-th>For</vs-th>
          <vs-th>Name</vs-th>
          <vs-th>Number</vs-th>
          <vs-th>Type</vs-th>
          <vs-th>แสดงหน้าเว็ป</vs-th>
          <vs-th>ดึงยอดธนาคาร</vs-th>
          <vs-th></vs-th>
        </template>

        <template slot-scope="{data}">
          <vs-tr :key="indextr" v-for="(tr, indextr) in data">
            <vs-td :data="tr.bank_id">
              {{tr.bank_id}}
            </vs-td>
            <vs-td :data="tr.bank_for">
              {{tr.bank_for}}
            </vs-td>
            <vs-td :data="tr.bank_fullname">
              {{tr.bank_fullname}}
            </vs-td>
            <vs-td :data="tr.bank_number">
              {{tr.bank_number}}
            </vs-td>
            <vs-td :data="typename[tr.bank_reserve]" v-if="tr.bank_reserve == 0" class="text-success">
              {{typename[tr.bank_reserve]}}
            </vs-td>
            <vs-td :data="typename[tr.bank_reserve]" v-if="tr.bank_reserve == 1" class="text-danger" >
              {{typename[tr.bank_reserve]}}
            </vs-td>
            <vs-td :data="typename[tr.bank_reserve]" v-if="tr.bank_show == 0 " class="text-danger">
              {{bankshow[tr.bank_show]}}
            </vs-td>
            <vs-td :data="typename[tr.bank_reserve]" v-if="tr.bank_show == 1 " class="text-success">
              {{bankshow[tr.bank_show]}}
            </vs-td>
             <vs-td :data="typename[tr.bank_reserve]" v-if="tr.bank_run == 0 " class="text-danger">
              {{bankrun[tr.bank_run]}}
            </vs-td>
            <vs-td :data="typename[tr.bank_reserve]" v-if="tr.bank_run == 1 " class="text-success">
              {{bankrun[tr.bank_run]}}
            </vs-td>
            <vs-td :data="tr.bank_number">
              <router-link :to="`/Bank/banklist/${bank}/${tr.bank_id}/${tr.bank_for}`">
                <vs-button type="border" size="small" icon-pack="feather" icon="icon-list" class="mr-2"
                  v-model="tr.bank_id">รายการเดินบัญชี</vs-button>
              </router-link>
            </vs-td>
            <vs-td :data="tr.bank_number">
              <router-link :to="`/Bank/banklistout/${bank}/${tr.bank_id}/${tr.bank_for}`">
                <vs-button type="border" size="small" icon-pack="feather" icon="icon-list" class="mr-2"
                  v-model="tr.bank_id">รายการเงินออกบัญชี</vs-button>
              </router-link>
            </vs-td>
          </vs-tr>
        </template>
      </vs-table>
    </vx-card>
  </div>
</template>

<script>
import axios from '../../axios'
export default {
  data () {
    return {
      bankscb: [],
      bank: 'sms_transaction',
      bankid: '',
      typename: ['บัญชีหลัก', 'บัญชีสำรอง'],
      bankrun: ['ปิด', 'เปิด'],
      bankshow: ['ปิด', 'เปิด']
    }
  },
  async mounted () {
    await axios
      .get('bank/bank/scb')
      .then(response => (this.bankscb = response.data))
  }
}

</script>
