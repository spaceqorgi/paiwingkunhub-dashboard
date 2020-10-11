<template>
  <div id="page-user-list">

    <div class="flex flex-wrap items-center">


      <!-- ITEMS PER PAGE -->
      <div class="flex-grow">
        <div class="vx-row">
          <div class="vx-col w-full">
          </div>
        </div>
        <br>

        <vx-card>

          <div class="export-table">
            <vs-table pagination max-items="20" :data="topup_wd" search>

              <template slot="header">
                <h3>ประวัติฝาก-ถอน 2 เดือนล่าสุด</h3>

              </template>

              <template slot="thead">

                <vs-th sort-key="datetime">วัน/เวลา</vs-th>
                <vs-th sort-key="data_type"> ฝาก/ถอน</vs-th>
                <vs-th sort-key="type"> ช่องทาง</vs-th>
                <vs-th sort-key="amount"> จำนวนเงิน </vs-th>
                <vs-th sort-key="before"> ก่อนรับ </vs-th>
                <vs-th sort-key="credit"> เครดิตที่ได้รับ </vs-th>
                <vs-th sort-key="after"> หลังรับ </vs-th>
                <vs-th sort-key="info"> รายละเอียด </vs-th>
                <vs-th sort-key="used_datetime"> วัน/เวลา ดำเนินการ </vs-th>
                <vs-th sort-key="viewslip"> ดูสลิป </vs-th>

              </template>

              <template slot-scope="{data}">

                <vs-tr :key="indextr" v-for="(tr, indextr) in data">
                  <!-- <vs-button radius color="primary" type="flat"   @click="gotomember(data[indextr].member_username)">{{ data[indextr].member_username}}</vs-button> -->
                  <vs-td>{{ data[indextr].datetime}}</vs-td>
                  <vs-td :class="tr.data_type == 'ฝาก'?'text-success':tr.data_type == 'ถอน'?'text-danger':null">
                    {{ data[indextr].data_type}} <span v-if="tr.data_type == 'ถอน'"
                      :class="tr.status == 1?'text-success':tr.status == 2 || tr.status == 3 ?'text-warning':tr.status == 4?'text-danger':null">
                      ({{chk_status_wd(data[indextr].status)}}) </span>
                  </vs-td>
                  <vs-td>{{ data[indextr].type}}</vs-td>
                  <vs-td :class="tr.data_type == 'ฝาก'?'text-success':tr.data_type == 'ถอน'?'text-danger':null">
                    {{ data[indextr].amount }}</vs-td>
                  <vs-td>{{ data[indextr].before}}</vs-td>
                  <vs-td>{{ data[indextr].credit}}</vs-td>
                  <vs-td>{{ data[indextr].after}}</vs-td>
                  <vs-td>{{ data[indextr].info}}</vs-td>
                  <vs-td>{{ data[indextr].used_datetime}}</vs-td>
                  <vs-td v-if="data[indextr].type =='KBANK'"><vs-button  size="small" color="primary" type="border" icon-pack="feather" icon="icon-search" target :href="{url: 'http://167.71.206.86:5000/upload/displaypic/'+data[indextr].id+'.jpg'}"></vs-button></vs-td>
                  <vs-td v-else-if="data[indextr].type =='SCB'"><vs-button  size="small" color="primary" type="border" icon-pack="feather" icon="icon-search" target :href="{url: 'http://167.71.206.86:5000/upload/displaypic/'+data[indextr].id+'.jpg'}"></vs-button></vs-td>
                  <vs-td v-else-if="data[indextr].type =='Admin'"><vs-button  size="small" color="primary" type="border" icon-pack="feather" icon="icon-search" target :href="{url: 'http://167.71.206.86:5000/upload/displaypic/'+data[indextr].id+'.jpg'}"></vs-button></vs-td>
                  <vs-td v-else-if="data[indextr].type =='Wallet'"><vs-button  size="small" color="primary" type="border" icon-pack="feather" icon="icon-search" target :href="{url: 'http://167.71.206.86:5000/upload/displaypic/'+data[indextr].id+'.jpg'}"></vs-button></vs-td>
                  <vs-td v-else></vs-td>
                  
                  
                </vs-tr>

              </template>
            </vs-table>
          </div>
        </vx-card>

      </div>
    </div>

  </div>
</template>

<script>
import vSelect from 'vue-select'
import axios from '../../../axios'
export default {
  components: {
    vSelect
  },
  data () {
    return {
      topup_wd: [],
      status_wd: ''
    }
  },
  async mounted () {
    await axios
      .get(`/member/topupwd/${  this.$route.params.username}`)
      .then(response => (this.topup_wd = response.data))
  },
  methods: {
    chk_status_wd (status) {
      if (status === 0) {
        return 'กำลังรอทำรายการ'
      } else if (status === 1) {
        return 'ทำรายการสำเร็จ'
      } else if (status === 2) {
        return 'คืนเครดิต'
      } else if (status === 3) {
        return 'ยกเลิกการถอนเงิน'
      } else if (status === 4) {
        return 'ทำรายการไม่สำเร็จ'
      }
    }
  }
}

</script>

<style lang="scss" scooped>
  #page-user-list {
    .user-list-filters {
      .vs__actions {
        position: absolute;
        right: 0;
        top: 50%;
        transform: translateY(-58%);
      }
    }
  }

</style>
