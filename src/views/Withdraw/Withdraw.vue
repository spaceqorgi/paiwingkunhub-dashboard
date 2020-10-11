<template>
  <div>
    <vx-card>
      <div class="vx-row">
        <div class="vx-col md:w-1/5 w-full"></div>
        <div class="vx-col md:w-1/5 w-full">จำนวนพนักงานถอนเงิน</div>
        <div class="vx-col md:w-1/5 w-full"></div>
        <div class="vx-col md:w-1/5 w-full">List</div>
      </div>
      <br>
      <br>
      <div v-for="(item, index) in data" :key="index">
        <div class="vx-row">
          <div class="vx-col md:w-1/5 w-full "></div>
          <div class="vx-col md:w-1/5 w-full ">คนที่ {{item}} </div>
          <div class="vx-col md:w-1/5 w-full "></div>
          <div class="vx-col md:w-1/5 w-full ">
            <router-link :to="`/withdrawwait/${item}`">
              <vs-button color="primary" type="border" icon-pack="feather" icon="icon-list">List {{item}}</vs-button>
            </router-link>
          </div>
        </div>
        <br>
      </div>

      <div class="vx-row">
        <div class="vx-col md:w-1/5 w-full "></div>
        <div class="vx-col md:w-1/5 w-full ">ยอดใหญ่ <span class="text-danger">{{count_withdraw.count_amount}}</span> รายการ
        </div>
        <div class="vx-col md:w-1/5 w-full "></div>
        <div class="vx-col md:w-1/5 w-full ">
          <router-link to="/withdrawwait/large">
            <vs-button color="primary" type="border" icon-pack="feather" icon="icon-list">List ยอดใหญ่</vs-button>
          </router-link>
        </div>
      </div>
      <br>
      <div class="vx-row">
        <div class="vx-col md:w-1/5 w-full "></div>
        <div class="vx-col md:w-1/5 w-full ">รวม <span class="text-danger">{{count_withdraw.count_wd}}</span> รายการ
        </div>
        <div class="vx-col md:w-1/5 w-full "></div>
        <div class="vx-col md:w-1/5 w-full ">
          <router-link to="/withdrawwait/all">
            <vs-button color="primary" type="border" icon-pack="feather" icon="icon-list">List ทั้งหมด</vs-button>
          </router-link>
        </div>
      </div>
    </vx-card>
  </div>
</template>

<script>
import axios from '../../axios'
export default {
  data () {
    return {
      get_data: [],
      data: '',
      count_withdraw: []
    }
  },
  async mounted () {
    // GET staff.length withdraw 
    await axios
      .get('settingwithdraw/settingwithdraw')
      .then(response => (this.get_data = response.data))
    this.data = this.get_data[0].setting_data

    // GET count waiting withdraw
    await axios
      .get('withdraw/countwithdraw')
      .then(response => (this.count_withdraw = response.data))
  }
}

</script>

<style>

</style>
