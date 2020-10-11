<template>
  <div>
    <vx-card title="BANK BAY">
      <vs-table stripe :data="bankbay">

        <template slot="thead">
          <vs-th>Id</vs-th>
          <vs-th>Name</vs-th>
          <vs-th>Bank Number</vs-th>
          <!-- <vs-th>Username</vs-th>
          <vs-th>Password</vs-th> -->
          <vs-th>Phone</vs-th>
          <vs-th></vs-th>
        </template>

        <template slot-scope="{data}">
          <vs-tr :key="indextr" v-for="(tr, indextr) in data">
            <vs-td :data="tr.bank_id">
              {{tr.bank_id}}
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
            <vs-td :data="tr.bank_phone">
              {{tr.bank_phone}}
            </vs-td>
            <vs-td>
              <div class="flex">
                <vs-button type="border" size="small" icon-pack="feather" icon="icon-edit" color="warning" class="mr-2"
                v-model="tr.wallet_no" @click="$router.push('/SettingWalletWithdraw/EditWithdraw/'+bank+'/'+tr.bank_id)">แก้ไขบัญชีถอน
                </vs-button>
                 <!-- <vs-button type="border" size="small" icon-pack="feather" icon="icon-trash" class="mr-2"  @click="popup_delbank(tr.bank_id,tr.bank_number,tr.bank_fullname)">ลบบัญชีถอน</vs-button> -->
              </div>
            </vs-td>
          </vs-tr>
        </template>

      </vs-table>
            <vs-popup classContent="popup-example" title="ลบยูสเซอร์บัญชีฝาก" :active.sync="popup_del_bank">
      <h4> คุณกำลังจะลบเลขบัญชี: <b style="color:#F61340">{{delete_bankno}}</b></h4> <small >กรุณายืนยันตัวตน โปรดยืนยัน <b> Password</b> ของคุณ</small> 
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
      bankbay: [],
      bank:'sa_bank_transfer_bay',
      delete_id: '',
      delete_bankno:'',
      admin_user: this.$store.state.AppActiveUser,
      admin_pass:'',
      popup_del_bank: false
    }
  },
  async mounted () {
    await axios
      .get('settingwallet/banktransfer/bay')
      .then(response => (this.bankbay = response.data))
  },
  methods: {
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
      if (this.status.status === false) {

        this.$vs.notify({
          time: 8000,
          color: 'danger',
          position: 'top-right',
          icon: 'error',
          title: 'ลบข้อมูลไม่สำเร็จ',
          text: this.status.info
        })
   
      } else {

        this.$vs.notify({
          time: 3000,
          color: 'success',
          position: 'top-right',
          icon: 'check_box',
          title: this.status.info
        })
        log.agent('', 'Del_Withdraw_Bay', 0, `ลบบัญชีถอน Bay เลขบัญชี : ${  this.delete_bankno} ชื่อเจ้าของบัญชี : ${  this.delete_name}`)
        setTimeout(() => { window.location.reload() }, 1500)
      }
    }
  }
}

</script>
