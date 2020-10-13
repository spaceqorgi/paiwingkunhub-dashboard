<template>
  <div class="vx-card p-6">
    <div class="flex flex-wrap items-center">
      <!-- ITEMS PER PAGE -->
      <div class="flex-grow">
        <div class="vx-card__title">
          <h4>รอทำรายการเครดิตฟรี
          </h4>
          
        </div>
      </div>
      <vs-button class="mr-6" size="small" icon-pack="feather" icon="icon-refresh-cw" color="success"
        @click="getdata()">ดึงรายการเครดิตฟรี</vs-button>
    </div>
    
    <vs-table max-items="20" pagination search :data="datalist">

      <template slot="thead">
        <vs-th sort-key="id">ID</vs-th>
        <vs-th sort-key="username">Username</vs-th>
        <vs-th sort-key="datetime">Datetime</vs-th>
        <vs-th> </vs-th>
        <vs-th sort-key="info">Info</vs-th>
      </template>

      <template slot-scope="{data}">
        <vs-tr :key="indextr" v-for="(tr, indextr) in data">

          <vs-td :data="data[indextr].id">
            {{ data[indextr].id }}
          </vs-td>

          <vs-td :data="data[indextr].username">
           <router-link :to="`/user/${data[indextr].username}`"> {{ data[indextr].username }}</router-link>
          </vs-td>

          <vs-td :data="data[indextr].datetime">
            {{ moment(data[indextr].datetime).format('YYYY-MM-DD HH:mm:ss') }}
          </vs-td>

          <vs-td v-if="data[indextr].status == 0">
            <vs-button class="mx-1" size="small" color="rgb(115, 103, 240)" type="filled" target :href="{url: 'http://178.128.113.119:5000/upload/displaypic/'+data[indextr].username+'-'+data[indextr].id+'.jpg'}">ดูรูปภาพ</vs-button>
            <vs-button class="mx-1" size="small" color="success" type="filled" @click="confrim(data[indextr].id,data[indextr].username)">ยืนยัน</vs-button>
            <vs-button class="mx-1" size="small" color="danger" type="filled" @click="reject(data[indextr].id,data[indextr].username)">ยกเลิก</vs-button>
          </vs-td>

          <vs-td :data="data[indextr].info">
            {{ data[indextr].info }}
          </vs-td>
        </vs-tr>
      </template>
    </vs-table>
    <!-- confrim popup -->
    <vs-popup classContent="popup-example" title="ยืนยันการแจกเครดิต" :active.sync="confrim_popup">
        
        <div class="text-center">
        <h2>กดปุ่มยืนยัน เพื่อยืนยันการแจกเครดิต</h2>
        
        <vs-button  color="primary"
          type="filled" @click="sentdata('confrim',idcreditfree,'-',username)">ยืนยัน</vs-button>
        </div>
        
      </vs-popup>
    <!-- reject popup -->
      <vs-popup classContent="popup-example" title="ยกเลิกการแจกเครดิต" :active.sync="reject_popup">
        
        <vx-input-group class="mb-base">
          <template slot="prepend">
            <div class="prepend-text bg-primary">
              <span>Message</span>
            </div>
          </template>
          <vs-input placeholder="Message" v-model="message" />
        </vx-input-group>
        <vs-button  color="primary"
          type="filled" @click="sentdata('reject',idcreditfree,message,username)">ยืนยัน</vs-button>
      </vs-popup>
  </div>
</template>

<script>
import axios from '../../axios'
export default {
  data () {
    return {
      datalist: [],
      confrim_popup : false,
      reject_popup: false,
      idcreditfree : '',
      message : '',
      statusCreditfree : '',
      username : ''
    }
  },
  async mounted () {
    await this.getdata()
  },
  methods:{
    async confrim (id, user) {
      this.confrim_popup = true
      this.idcreditfree = id
      this.username = user

    },
    async reject (id, user) {
      this.reject_popup = true
      this.idcreditfree = id
      this.username = user
    },
    async sentdata (status, id, message, username) {
      if (status === 'confrim') {
        await axios
          .post('creditfree/confrim', {
            idfree : id,
            messagefree : message,
            userfree : username
          })
          .then(response => (this.statusCreditfree = response.data))
        if (this.statusCreditfree.status === true) {
          await this.$vs.notify({
            time: 3000,
            color: 'success',
            position: 'top-right',
            icon: 'check_box',
            title: 'ทำรายการสำเร็จ',
            text: this.statusCreditfree.info
          })
          await this.getdata()
          this.confrim_popup = false
        } else {
          await this.$vs.notify({
            time: 8000,
            color: 'danger',
            position: 'top-right',
            icon: 'error',
            title: 'ทำรายการไม่สำเร็จ',
            text: this.statusCreditfree.info
          })
          await this.getdata()
          this.confrim_popup = false
        }
      } else if (status === 'reject') {
        await axios
          .post('creditfree/reject', {
            idfree : id,
            messagefree : message,
            userfree : username  
          })
          .then(response => (this.statusCreditfree = response.data))
        if (this.statusCreditfree.status === true) {
          this.$vs.notify({
            time: 3000,
            color: 'success',
            position: 'top-right',
            icon: 'check_box',
            title: 'ทำรายการสำเร็จ',
            text: this.statusCreditfree.info
          })
          await this.getdata()
          this.reject_popup = false
          
        } else {
          this.$vs.notify({
            time: 8000,
            color: 'danger',
            position: 'top-right',
            icon: 'error',
            title: 'ทำรายการไม่สำเร็จ',
            text: this.statusCreditfree.info
          })
          await this.getdata()
          this.reject_popup = false
        }

      }

    },
    async getdata () {
      await axios
        .get('creditfree/wait')
        .then(response => (this.datalist = response.data))
    }

  }
}

</script>

<style>

</style>
