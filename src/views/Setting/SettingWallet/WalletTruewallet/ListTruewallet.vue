<template>
  <div>
    <vx-card title="TRUE WALLET">
      <vs-table stripe :data="listwallet">

        <template slot="thead">
          <vs-th>ID</vs-th>
          <vs-th>E-MAIL</vs-th>
          <vs-th>PHONE</vs-th>
          <!-- <vs-th>Password</vs-th> -->
          <vs-th>NAME</vs-th>
          <vs-th></vs-th>
        </template>

        <template slot-scope="{data}">
          <vs-tr :key="indextr" v-for="(tr, indextr) in data">
            <vs-td :data="tr.wallet_no">
              {{tr.wallet_no}}
            </vs-td>
            <vs-td :data="tr.wallet_email">
              {{tr.wallet_email}}
            </vs-td>
            <vs-td :data="tr.wallet_phone">
              {{tr.wallet_phone}}
            </vs-td>
            <!-- <vs-td :data="tr.wallet_pass">
              {{tr.wallet_pass}}
            </vs-td> -->
            <vs-td :data="tr.wallet_name">
              {{tr.wallet_name}}
            </vs-td>
             <vs-td>
               <div class="flex">
                <vs-button type="border" size="small" icon-pack="feather" icon="icon-edit" color="warning" class="mr-2"
                v-model="tr.wallet_no" @click="$router.push('/settingwallettruewallet/editListtruewallet/'+bank+'/'+tr.wallet_no)">แก้ไขบัญชีทรูวอลเล็ต</vs-button>
                <!-- <vs-button type="border" size="small" icon-pack="feather" icon="icon-trash" class="mr-2"  @click="popup_delwallet(tr.wallet_no,tr.wallet_phone,tr.wallet_name)">ลบบัญชีทรูวอลเล็ต</vs-button> -->
               </div>
            </vs-td>
          </vs-tr>
        </template>

      </vs-table>
      <vs-popup classContent="popup-example" title="ลบยูสเซอร์บัญชีฝาก" :active.sync="popup_del_wallet">
      <h4> คุณกำลังจะลบเลขบัญชี: <b style="color:#F61340">{{delete_bankno}}  </b></h4> <small >กรุณายืนยันตัวตน โปรดยืนยัน <b> Password</b> ของคุณ</small> 
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
      listwallet: [],
      bank:'setting_wallet',
      delete_id: '',
      delete_bankno:'',
      admin_user: this.$store.state.AppActiveUser,
      admin_pass:'',
      popup_del_wallet: false
    }
  },
  async mounted () {
    await axios
      .get('/settingwallet/settingwallet')
      .then(response => (this.listwallet = response.data))
  },
  methods: {
    async popup_delwallet (id, user, name) {
      this.delete_id = id
      this.delete_bankno = user
      this.delete_name = name
      this.popup_del_wallet = true
      this.$nextTick(() => {
        this.$refs.inputPassword.$el.querySelector('input').focus()
      })
    },
    async deletedata () {
      await axios
        .post('settingwallet/deletetruewallet', {
          admin_user: this.admin_user.username,
          admin_pass: this.admin_pass,
          walletno: this.delete_id,
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
        log.agent('', 'Del_Truewallet', 0, `ลบบัญชีทรูวอเล็ท : ${  this.delete_bankno} ชื่อเจ้าของเบอร์ : ${  this.delete_name}`)
        setTimeout(() => { window.location.reload() }, 1500)
      }
    }
  }
}

</script>
