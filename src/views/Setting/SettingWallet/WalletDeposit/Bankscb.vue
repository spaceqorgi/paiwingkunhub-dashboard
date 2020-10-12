<template>
  <div>
    <vx-card title="BANK SCB">
      <vs-table stripe :data="bankscb">

        <template slot="thead">
          <vs-th>Id</vs-th>
          <vs-th>For</vs-th>
          <vs-th>Name</vs-th>
          <vs-th>Bank Number</vs-th>
          <!-- <vs-th>Username</vs-th>
          <vs-th>Password</vs-th> -->
          <vs-th>Type</vs-th>
          <vs-th></vs-th>
          <vs-th>แสดงหน้าเว็บ</vs-th>
          <vs-th>ดึงยอดธนาคาร</vs-th>
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
            <!-- <vs-td :data="tr.bank_username">
              {{tr.bank_username}}

            </vs-td>
            <vs-td :data="tr.bank_password">
              {{tr.bank_password}}
            </vs-td> -->
             <vs-td  v-if="tr.bank_reserve == 0" class="text-success">
              บัญชีหลัก
            </vs-td>
            <vs-td  v-if="tr.bank_reserve == 1" class="text-danger">
              บัญชีสำรอง
            </vs-td>
            <vs-td >
              <div class="flex">
                <vs-button type="border" size="small" icon-pack="feather" icon="icon-edit" color="warning" class="mr-2"
                
                @click="$router.push('/SettingWalletDeposit/SettingWalletedit/'+bank+'/'+tr.bank_id)">แก้ไขบัญชีฝาก
              </vs-button>
 <!-- <vs-button type="border" size="small" icon-pack="feather" icon="icon-trash" class="mr-2"  @click="popup_delbank(tr.bank_id,tr.bank_number,tr.bank_fullname)">ลบบัญชีฝาก</vs-button> -->
              </div>
            </vs-td>
             <vs-td :data="tr.bank_show">
              <vs-switch v-if="tr.bank_reserve == 0" v-model="tr.bank_show" @click="update_bankshow(tr.bank_id,tr.bank_fullname,tr.bank_show)">
                <span slot="on">On</span>
                <span slot="off">Off</span>
              </vs-switch>
            </vs-td>
            <vs-td :data="tr.bank_run">
              <vs-switch  v-model="tr.bank_run" @click="update_bankrun(tr.bank_id,tr.bank_fullname,tr.bank_run)">
                <span slot="on">On</span>
                <span slot="off">Off</span>
              </vs-switch>
            </vs-td>
          </vs-tr>
        </template>

      </vs-table>
            <vs-popup classContent="popup-example" title="ลบผู้ใช้บัญชีฝาก" :active.sync="popup_del_bank">
      <h4> คุณกำลังจะลบเลขบัญชี: <b style="color:#F61340">{{delete_bankno}} </b></h4> <small >กรุณายืนยันตัวตน โปรดยืนยัน <b> Password</b> ของคุณ</small> 
      <br>
      <vx-input-group class="mb-base">
        <template slot="prepend">
          <div class="prepend-text bg-primary">
            <span>Username</span>
          </div>
        </template>
        <vs-input placeholder="Username" v-model="admin_user.username" disabled />
      </vx-input-group>

      <vx-input-group class="mb-base">
        <template slot="prepend">
          <div class="prepend-text bg-primary">
            <span>Password</span>
          </div>
        </template>

        <vs-input ref="inputPassword" placeholder="Password" v-model="admin_pass" />
      </vx-input-group>
      <vs-button @click="deletedata()" color="primary" type="filled">ยืนยัน</vs-button>
    </vs-popup>
    </vx-card>
  </div>
</template>

<script>
import axios from '../../../../axios'
import log from '../../../../log'
export default {
  data () {
    return {
      bankscb: [],
      bank: 'sa_bank',
      bankid:'',
      delete_id: '',
      delete_bankno:'',
      admin_user: this.$store.state.AppActiveUser,
      admin_pass:'',
      popup_del_bank: false
    }
  },
  async mounted () {
    await axios
      .get('bank/bank/scb')
      .then(response => (this.bankscb = response.data))
  },
  methods: {
    async update_bankshow (bank_id, bank_fullname, bank_show) {
      if (bank_show === 1 || bank_show === true) {
        bank_show = 0
      } else {
        bank_show = 1
      }
      await axios
        .post('bank/updatebankshow', {
          bank: 'scb',
          id: bank_id,
          show: bank_show
        })
        .then(response => (this.onoff_status = response.data))
      if (this.onoff_status === true) {
        this.$vs.notify({
          time: 3000,
          color: bank_show === 1 ? 'success' : 'warning',
          position: 'top-right',
          icon: bank_show === 1 ? 'check_box' : 'error',
          title: bank_show === 1 ? 'เปิดแสดง scb หน้าเว็บสำเร็จ' : 'ปิดแสดง scb หน้าเว็บสำเร็จ',
          text: bank_show === 1 ? `บัญชี : ${bank_fullname}` : `บัญชี : ${bank_fullname}`
        })
        const text = bank_show === 1 ? `เปิดแสดงหน้าเว็บบัญชี : ${  bank_fullname}` : `ปิดแสดงหน้าเว็บบัญชี : ${  bank_fullname}`
        await log.agent('', 'Bank_Show', 0, text)
      } else {
        this.$vs.notify({
          time: 8000,
          color: 'danger',
          position: 'top-right',
          icon: 'error',
          title: bank_show === 1 ? 'เปิดแสดง scb หน้าเว็บไม่สำเร็จ!!' : 'ปิดแสดง scb หน้าเว็บไม่สำเร็จ!!',
          text: 'กรุณาติดต่อทีมงานโปรแกรมเมอร์'
        })
      }
    },
    async update_bankrun (bank_id, bank_fullname, bank_run) {
      if (bank_run === 1 || bank_run === true) {
        bank_run = 0
      } else {
        bank_run = 1
      }
      await axios
        .post('bank/bank_all/run', {
          bankid:bank_id,
          bankrun:bank_run,
          bank:'scb'
        })
        .then(response => (this.onoff_status = response.data))
      if (this.onoff_status.status === true) {
        this.$vs.notify({
          time: 3000,
          color: bank_run === 1 ? 'success' : 'warning',
          position: 'top-right',
          icon: bank_run === 1 ? 'check_box' : 'error',
          title: bank_run === 1 ? 'เปิดแสดง SCB หน้าเว็บสำเร็จ' : 'ปิดแสดง SCB หน้าเว็บสำเร็จ',
          text: bank_run === 1 ? `บัญชี : ${bank_fullname}` : `บัญชี : ${bank_fullname}`
        })
        const text = bank_run === 1 ? `เปิดดึงยอดบัญชี : ${  bank_fullname}` : `ปิดดึงยอดบัญชี : ${  bank_fullname}`
        await log.agent('', 'Bank_Run', 0, text)
      } else {
        this.$vs.notify({
          time: 8000,
          color: 'danger',
          position: 'top-right',
          icon: 'error',
          title: bank_run === 1 ? 'เปิดดึงยอด SCB หน้าเว็บไม่สำเร็จ!!' : 'ปิดดึงยอด SCB หน้าเว็บไม่สำเร็จ!!',
          text: 'กรุณาติดต่อทีมงานโปรแกรมเมอร์'
        })
      }
    },
    async popup_delbank (id, user, name) {
      this.delete_id = id
      this.delete_bankno = user
      this.delete_name = name
      this.popup_del_bank = true
      this.$nextTick(() => {
        this.$refs.inputPassword.$el.querySelector('input').focus()
      })
    },
    async deletedata () {
      await axios
        .post('settingwallet/deletebankdeposit', {
          admin_user: this.admin_user.username,
          admin_pass: this.admin_pass,
          bankid: this.delete_id,
          bank: this.bank
        }).then(response => (this.status = response.data))
      if (this.status.status === true) {
        this.$vs.notify({
          time: 3000,
          color: 'success',
          position: 'top-right',
          icon: 'check_box',
          title: this.status.info
        })
        log.agent('', 'Del_Deposit_Scb', 0, `ลบบัญชีฝาก Scb เลขบัญชี : ${  this.delete_bankno} ชื่อเจ้าของบัญชี : ${  this.delete_name}`)
        setTimeout(() => { window.location.reload() }, 1500)
      } else {
        this.$vs.notify({
          time: 8000,
          color: 'danger',
          position: 'top-right',
          icon: 'error',
          title: 'ลบข้อมูลไม่สำเร็จ',
          text: this.status.info
        })
      }
    }
    
    
  }
}

</script>
